import React from "react"
import Div100vh from "react-div-100vh"

const FullScreen = props => {
  const isCenter = props.center ? { height: "100rvh" } : { minHeight: "100rvh" }
  return (
    <Div100vh
      style={{
        ...isCenter,
        backgroundColor: props.background ? props.background : "white",
        display: "block",
      }}
    >
      <div
        style={{
          padding: props.padding ? props.padding : "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
          flexDirection: "column",
        }}
      >
        {props.children}
      </div>
    </Div100vh>
  )
}

export default FullScreen
