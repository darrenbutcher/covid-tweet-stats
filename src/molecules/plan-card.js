import React, { useState, useEffect } from "react"
// import { useQuery } from "urql"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useStripe } from "./stripe"

const planQuery = gql`
  query plans {
    me {
      account {
        plan {
          name
        }
      }
    }
  }
`

const PlanCard = () => {
  const [plan, setPlan] = useState()
  const [user] = useAuthState(firebase.auth())
  const { data, loading } = useQuery(planQuery)

  const [stripePromise] = useStripe()

  if (loading && !data) return null

  const handleClick = async plan => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise
    await stripe.redirectToCheckout({
      items: [
        // Replace with the ID of your plan
        { plan, quantity: 1 },
      ],
      successUrl: "http://localhost:8000/app/feed",
      cancelUrl: "http://localhost:8000/app/plans",
      clientReferenceId: user.uid,
    })
  }

  if (user && !data) {
    return null
  } else {
    return (
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <div
          style={{
            width: "400px",
            height: "216px",
            border: "1px solid #181818",
            borderRadius: "8px",
            padding: "16px",
            margin: "4px",
            backgroundColor: "#181818",
            color: "#ffffff",
          }}
        >
          <h3 style={{ marginBottom: "16px", letterSpacing: ".1em" }}>LITE</h3>
          <p style={{ marginBottom: "24px" }}>
            Free plan. Some limitted features to try out this product.
          </p>
          <h1 style={{ marginBottom: "16px" }}>
            $0 <span style={{ fontSize: ".5em" }}>/ mo</span>
          </h1>
          <button
            style={{
              padding: "8px 16px 8px 16px",
              backgroundColor: "#ffffff",
              color: "#181818",
              borderRadius: "8px",
              border: "none",
            }}
            onClick={() => null}
          >
            {data.me.account.plan.name === "lite"
              ? "Current Plan"
              : "Try for Free"}
          </button>
        </div>
        <div
          style={{
            width: "400px",
            height: "216px",
            border: "1px solid #181818",
            borderRadius: "8px",
            padding: "16px",
            margin: "4px",
            backgroundColor: "#181818",
            color: "#ffffff",
          }}
        >
          <h3 style={{ marginBottom: "16px", letterSpacing: ".1em" }}>BASIC</h3>
          <p style={{ marginBottom: "24px" }}>
            All 'Lite' features. Extra features to enhance the use of this
            product.
          </p>
          <h1 style={{ marginBottom: "16px" }}>
            $5 <span style={{ fontSize: ".5em" }}>/ mo</span>
          </h1>
          <button
            style={{
              padding: "8px 16px 8px 16px",
              backgroundColor: "#ffffff",
              color: "#181818",
              borderRadius: "8px",
              border: "none",
            }}
            onClick={() => handleClick("plan_HFAwKQiACZPh2Z")}
          >
            {data.me.account.plan.name === "basic"
              ? "Current Plan"
              : "Upgrade to Basic"}
          </button>
        </div>
        <div
          style={{
            width: "400px",
            height: "216px",
            border: "1px solid #181818",
            borderRadius: "8px",
            padding: "16px",
            margin: "4px",
            backgroundColor: "#181818",
            color: "#ffffff",
          }}
        >
          <h3 style={{ marginBottom: "16px", letterSpacing: ".1em" }}>PRO</h3>
          <p style={{ marginBottom: "24px" }}>
            All 'Basic' features. Extra features for professional use of this
            product.
          </p>
          <h1 style={{ marginBottom: "16px" }}>
            $20 <span style={{ fontSize: ".5em" }}>/ mo</span>
          </h1>
          <button
            style={{
              padding: "8px 16px 8px 16px",
              backgroundColor: "#ffffff",
              color: "#181818",
              borderRadius: "8px",
              border: "none",
            }}
            onClick={() => handleClick("plan_HFApu0xGY5xD54")}
          >
            {data.me.account.plan.name === "pro"
              ? "Current Plan"
              : "Upgrade to Pro"}
          </button>
        </div>
      </div>
    )
  }
}

export default PlanCard
