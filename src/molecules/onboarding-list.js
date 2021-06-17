import React from "react"
import Div100vh from "react-div-100vh"
export const G = props => {
  return (
    <Div100vh
      style={{
        minHeight: "100rvh",
        backgroundColor: "rebeccapurple",
      }}
      data-history="/getting-started"
    >
      <div style={{ padding: "16px" }}>
        <div>
          <h2 style={{ paddingBottom: "16px", textAlign: "center" }}>
            Welcome to the Logon App
          </h2>
          <p style={{ textAlign: "center" }}>
            This application is a test out certian features neeed to create a
            PWA.
          </p>
        </div>
      </div>
    </Div100vh>
  )
}

export const H = props => {
  console.log("second props: ", props)
  return (
    <Div100vh
      style={{
        minHeight: "100rvh",
        backgroundColor: "rebeccapurple",
      }}
      data-history="/personal-info"
    >
      <div style={{ padding: "16px" }}>
        <div>Second Dos</div>
      </div>
    </Div100vh>
  )
}

export const I = props => {
  return (
    <Div100vh
      style={{
        minHeight: "100rvh",
        backgroundColor: "rebeccapurple",
      }}
      data-history="/interests"
    >
      <div style={{ padding: "16px" }}>
        <div>Third Tres</div>
      </div>
    </Div100vh>
  )
}

export const J = props => {
  return (
    <Div100vh
      style={{
        minHeight: "100rvh",
        backgroundColor: "rebeccapurple",
      }}
      data-history="/completed"
    >
      <div style={{ padding: "16px" }}>
        <div>Final Fin</div>
      </div>
    </Div100vh>
  )
}
