/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "firebase/auth"
import "firebase/firestore"
import "./src/globals.css"
import React, { createContext, useContext } from "react"
import StripeProvider from "./src/molecules/stripe"
import GraphQLAuthProvider from "./src/graphql-auth-provider"

export const wrapRootElement = ({ element }) => (
  <GraphQLAuthProvider>
    <StripeProvider>{element}</StripeProvider>
  </GraphQLAuthProvider>
)
