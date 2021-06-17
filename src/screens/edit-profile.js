import React, { useEffect } from "react"
import { Link } from "@reach/router"
import { motion, AnimatePresence } from "framer-motion"
import Layout from "../molecules/layout"

const EditProfileScreen = () => {
  useEffect(() => {
    console.log("mounting")
    return () => {
      console.log("unmouting")
    }
  }, [])

  return (
    <Layout>
      <div>
        <div>Some info goes here</div>
        <br />
        <br />
        <br />
        <Link to="/app/account">Back to Account</Link>
      </div>
    </Layout>
  )
}

export default EditProfileScreen
