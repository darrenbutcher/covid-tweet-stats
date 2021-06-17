import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  createRef,
} from "react"
import { navigate } from "gatsby"
import Div100vh from "react-div-100vh"
import Swiper from "react-id-swiper"
import useDimensions from "react-use-dimensions"
import ReactDOM from "react-dom"
import "swiper/css/swiper.css"
import "../ob.css"

import GettingStarted from "../screens/getting-started"
import HowTo from "../screens/how-to"
import AboutYourself from "../screens/about-yourself"
import Interests from "../screens/interests"
import Completed from "../screens/completed"

const SlideContainer = ({ children }) => <div>{children}</div>

const SlideSwiper = ({ getSwiper, children, ...rest }) => {
  return (
    <Swiper {...rest} getSwiper={getSwiper}>
      {children.map((child, slideIndex) => {
        return (
          <div style={{ backgroundColor: "red" }} key={slideIndex}>
            {child}
          </div>
        )
      })}
    </Swiper>
  )
}

const SlideNavigation = props => {
  return (
    <div
      style={{
        width: "100%",
        position: "fixed",
        bottom: 24,
        left: 0,
        zIndex: 11,
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: "16px",
        paddingRight: "16px",
        flexDirection: props.isFirst || props.isLast ? "row-reverse" : "row",
      }}
    >
      {props.children}
    </div>
  )
}

const OnboardSwiper = ({ changeNew, children, ...props }) => {
  const [swiper, setSwiper] = useState(null)
  const [isFirst, setFirst] = useState(true)
  const [isLast, setLast] = useState(false)
  const [activeIndex, setActiveIndex] = useState()
  const nextRef = useRef()
  const [screens, setScreens] = useState([])
  const [ref, { height }] = useDimensions()
  const [dataz, setDataz] = useState()

  const pagination =
    height < 275
      ? {}
      : {
          el: ".swiper-pagination",
          clickable: false,
        }

  const noSwiping = height < 275 ? true : false
  const params = {
    pagination,
    noSwiping,
  }

  useLayoutEffect(() => {
    const screens = children.map(child => {
      return child.props.hasForm ? createRef() : null
    })
    setScreens(screens)
  }, [])

  const slideValidCheck = id =>
    screens[id] ? screens[id].current.isValid() : true

  useEffect(() => {
    if (swiper !== null) {
      setFirst(swiper.isBeginning)
      setActiveIndex(swiper.activeIndex)

      if (slideValidCheck(activeIndex)) {
        if (!props.hideNavigation && nextRef.current) {
          nextRef.current.style.backgroundColor = "#181818"
          nextRef.current.style.opacity = 1
          nextRef.current.removeAttribute("disabled")
        }
        swiper.allowSlideNext = true
      } else {
        if (!props.hideNavigation && nextRef.current) {
          nextRef.current.style.backgroundColor = "#000"
          nextRef.current.style.opacity = 0.2
          nextRef.current.setAttribute("disabled", true)
        }
        swiper.allowSlideNext = false
      }

      swiper.on("slideChange", () => {
        setFirst(swiper.isBeginning)
        setLast(swiper.isEnd)
        setActiveIndex(swiper.activeIndex)
      })

      swiper.on("slideNextTransitionStart", () => {
        slideValidCheck(activeIndex)
          ? (swiper.allowSlideNext = true) && goSlideNext()
          : (swiper.allowSlideNext = false)
      })

      swiper.on("slideNextTransitionEnd", () => {
        if (isLast) swiper.allowSlidePrev = false
      })

      swiper.on("slidePrevTransitionEnd", () => {
        // If you go back to the prev slide, you'll be able again to swipe to the next slide
        swiper.allowSlideNext = true
      })

      return () => {
        if (swiper !== null) {
          swiper.off("slideChange")
          swiper.off("slideNextTransitionStart")
          swiper.off("slideNextTransitionEnd")
          swiper.off("slidePrevTransitionEnd")
        }
      }
    }
  }, [swiper, activeIndex])

  const onSubmit = data => {
    // this will be form the store
    setData(prevState => {
      return { ...prevState, data }
    })
  }

  const handleInputValidationCheck = () => {
    if (slideValidCheck(activeIndex)) {
      if (!props.hideNavigation && nextRef.current) {
        nextRef.current.style.backgroundColor = "#181818"
        nextRef.current.style.opacity = 1
        nextRef.current.removeAttribute("disabled")
      }
      swiper.allowSlideNext = true
    } else {
      if (!props.hideNavigation && nextRef.current) {
        nextRef.current.style.backgroundColor = "#000"
        nextRef.current.style.opacity = 0.2
        nextRef.current.setAttribute("disabled", true)
      }
      swiper.allowSlideNext = false
    }
  }

  const goNext = () => {
    if (swiper !== null && slideValidCheck(activeIndex)) {
      if (isLast) {
        navigate(props.onCompleteNavigation)
      }

      swiper.slideNext()
    }
  }

  const goSlideNext = () => {
    if (screens[activeIndex]?.current.beforeNext)
      screens[activeIndex].current.beforeNext()

    if (activeIndex === swiper.slides.length - 2) {
      if (props.onComplete) props.onComplete()
      screens.map(screen => {
        if (screen) screen.current.onSubmit(onSubmit)
      })
    }
  }

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev()
    }
  }

  const renderPrev = () => {
    if (swiper !== null && !isFirst && !isLast) {
      return (
        <button
          style={{
            padding: "8px 16px 8px 16px",
            backgroundColor: "#181818",
            color: "#ffffff",
            borderRadius: "8px",
            border: "none",
          }}
          onClick={goPrev}
        >
          Previous
        </button>
      )
    } else {
      return null
    }
  }

  const renderNext = () => {
    return (
      <button
        ref={nextRef}
        style={{
          backgroundColor: slideValidCheck(activeIndex) ? "#181818" : "#000",
          opacity: slideValidCheck(activeIndex) ? 1 : 0.2,
          padding: "8px 16px 8px 16px",
          color: "#ffffff",
          borderRadius: "8px",
          border: "none",
        }}
        onClick={goNext}
      >
        {isLast ? "Get started" : "Next"}
      </button>
    )
  }

  return (
    <div ref={ref}>
      <SlideContainer>
        <SlideSwiper {...params} getSwiper={setSwiper}>
          {children.map((child, i) => {
            if (child.props.hasForm) {
              return React.cloneElement(child, {
                key: i,
                onChange: () => handleInputValidationCheck(),
                ref: screens[i],
              })
            } else {
              return child
            }
          })}
        </SlideSwiper>
        {props.hideNavigation || height < 275 ? null : (
          <SlideNavigation isFirst={isFirst} isLast={isLast}>
            {renderPrev()}
            {renderNext()}
          </SlideNavigation>
        )}
      </SlideContainer>
    </div>
  )
}

export default OnboardSwiper
