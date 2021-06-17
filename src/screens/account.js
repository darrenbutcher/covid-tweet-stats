import React, { useEffect, useState } from "react"
import { useQuery } from "urql"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { Link } from "@reach/router"
import { motion, AnimatePresence } from "framer-motion"

const profileQuery = gql`
  {
    me {
      profile {
        firstName
        lastName
        uid
      }
    }
  }
`

const Account = () => {
  const { loading, error, data } = useQuery(profileQuery)

  if (loading && !data) return null

  const { firstName = "", lastName = "", uid = "" } = data?.me?.profile
  return (
    <>
      <motion.div
        exit={{
          x: "-100vw",
        }}
        animate={{
          x: 0,
        }}
      >
        <h3>Account</h3>
        <br />
        <p>Firstname: {firstName}</p>
        <p>Lastname: {lastName}</p>
        <br />
        <br />
        <br />
        <Link to="/app/profile/edit">Edit Profile</Link>
        <br />
        <br />
        <br />
        <button
          style={{
            padding: "8px 16px 8px 16px",
            backgroundColor: "#181818",
            color: "#ffffff",
            borderRadius: "8px",
            border: "none",
          }}
          onClick={() => firebase.auth().signOut()}
        >
          Logout
        </button>
      </motion.div>
    </>
  )
}

export default Account
