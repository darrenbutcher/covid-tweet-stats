import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import { Redirect } from "@reach/router"
//import { isLoggedIn } from "../utils/auth"
import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"

const isLoggedIn = () => false

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const [user, loading, error] = useAuthState(firebase.auth())

  if (!user && location.pathname !== `/app/login`) {
    // If we’re not logged in, redirect to the home page.
    navigate(`/app/login`, { replace: true })
    return null
  }

  return <Component location={location} {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute
