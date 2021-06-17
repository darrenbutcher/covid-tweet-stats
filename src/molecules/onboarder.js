import React from "react"
import { navigate } from "@reach/router"
import Onboarding from "react-onboarding-pro"
import Div100vh from "react-div-100vh"
import "react-onboarding-pro/build/index.css"
import "../ob.css"

const config = {
  steps: [
    {
      title: "Welcome to the platform",
      description: "Navigate around the UI to start using it",
    },
    {
      title: "Who are you?",
      description: "Help the community identify you",
      type: "form",
      fields: [
        {
          label: "First Name",
          name: "first_name",
          type: "text",
          placeholder: "John",
          validation: "[a-zA-Z]",
        },
        {
          label: "Last Name",
          name: "last_name",
          type: "text",
          placeholder: "Doe",
          validation: "",
        },
      ],
      onSubmit: () => null,
    },
    {
      title: "Thank you",
      description: "Navigate around the UI to start using it",
      type: "form",
      onSubmit: () => navigate("/"),
    },
  ],
  overlayClose: false,
}

const Onboarder = () => {
  return <Div100vh>{Onboarding(config)}</Div100vh>
}

export default Onboarder
