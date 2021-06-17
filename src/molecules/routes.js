import React from "react"
import { Router, useLocation } from "@reach/router"
import Layout from "../molecules/layout"
import Header from "../molecules/app-header"
import PrivateRoute from "../molecules/private-route"
import Login from "../screens/login"
import Account from "../screens/account"
import Tweets from "../screens/tweets"
import Stats from "../screens/stats"
import Plans from "../screens/plans"
import Home from "../screens/home"
import TabBar from "../molecules/tab-bar"
import Onboarding from "../screens/onboarding"
import EditProfileScreen from "../screens/edit-profile"
import { AnimatePresence } from "framer-motion"

const Routes = props => {
  const location = useLocation()
  if (
    props.location.pathname === "/app/onboarding" ||
    props.location.pathname === "/app/profile/edit"
  ) {
    return (
      <Router location={location} key={location.key}>
        <Onboarding path="/app/onboarding" />
        <EditProfileScreen path="/app/profile/edit" />
      </Router>
    )
  }
  return (
    <>
      <Layout>
        <Router location={location} key={location.key}>
          <Login path="/app/login" />
          <PrivateRoute path="/app/account" component={Account} />
          <PrivateRoute path="/app/stats" component={Stats} />
          <Plans path="/app/plans" />
          <Tweets path="/app/feed" />
        </Router>
      </Layout>
      <TabBar />
    </>
  )
}

export default Routes
