import React, { useEffect, useState } from "react"
import { Tabs, Tab, Panel } from "@bumaga/tabs"
import { Link } from "gatsby"
import { SizeMe } from "react-sizeme"
import useDimensions from "react-use-dimensions"
import { IoIosStats, IoMdList } from "react-icons/io"
import { FaRegCreditCard, FaRegUserCircle } from "react-icons/fa"

export default () => {
  const [ref, { width }] = useDimensions()
  const display = width > 750 ? "none" : "block"
  return (
    <div ref={ref}>
      <div
        style={{
          display: display,
          height: "60px",
          position: "fixed",
          bottom: 0,
          borderTop: "1px solid #f5f5f5",
          width: "100%",
          backgroundColor: "white",
          boxShadow: "0px -2px 3px rgba(50, 50, 50, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "60px",
          }}
        >
          <Link
            activeStyle={{
              //borderTop: "3px solid #181818",
              color: "#181818",
              //color: "rebeccapurple",
            }}
            style={{
              borderTop: "3px solid #ffffff",
              textDecoration: "none",
              height: "60px",
              alignItems: "center",
              display: "flex",
              color: "#909090",
              width: "56px",
              fontWeight: "bold",
              WebkitTapHighlightColor: "transparent",
            }}
            to="/app/feed"
          >
            <div>
              <IoMdList style={{ width: "56", margin: "0 auto" }} />
              <h6 style={{ textAlign: "center" }}>Feed</h6>
            </div>
          </Link>
          <Link
            activeStyle={{
              //borderTop: "3px solid #181818",
              color: "#181818",
              //color: "rebeccapurple",
            }}
            style={{
              borderTop: "3px solid #ffffff",
              textDecoration: "none",
              height: "60px",
              alignItems: "center",
              fontWeight: "bold",
              display: "flex",
              color: "#909090",
              width: "56px",
              fontWeight: "bold",
              WebkitTapHighlightColor: "transparent",
            }}
            to="/app/plans"
          >
            <div>
              <FaRegCreditCard style={{ width: "56", margin: "0 auto" }} />
              <h6 style={{ textAlign: "center" }}>Plans</h6>
            </div>
          </Link>
          <Link
            activeStyle={{
              //borderTop: "3px solid #181818",
              color: "#181818",
              //color: "rebeccapurple",
            }}
            style={{
              borderTop: "3px solid #ffffff",
              textDecoration: "none",
              height: "60px",
              alignItems: "center",
              display: "flex",
              color: "#909090",
              width: "56px",
              fontWeight: "bold",
              WebkitTapHighlightColor: "transparent",
            }}
            to="/app/stats"
          >
            <div>
              <IoIosStats style={{ width: "56", margin: "0 auto" }} />
              <h6 style={{ textAlign: "center" }}>Stats</h6>
            </div>
          </Link>
          <Link
            activeStyle={{
              //borderTop: "3px solid #181818",
              color: "#181818",
              //color: "rebeccapurple",
            }}
            style={{
              borderTop: "3px solid #ffffff",
              textDecoration: "none",
              height: "60px",
              alignItems: "center",
              display: "flex",
              color: "#909090",
              width: "56px",
              fontWeight: "bold",
              WebkitTapHighlightColor: "transparent",
            }}
            to="/app/account"
          >
            <div>
              <FaRegUserCircle style={{ width: "56", margin: "0 auto" }} />
              <h6 style={{ textAlign: "center" }}>Account</h6>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
