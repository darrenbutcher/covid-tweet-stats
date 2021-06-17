import React, { useEffect, createContext } from "react"
import { Router, navigate, Redirect } from "@reach/router"
import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { ApolloClient } from "apollo-client"
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { ApolloProvider } from "@apollo/react-hooks"
import StripeProvider from "./molecules/stripe"

const AuthContext = createContext()

const GraphQLAuthProvider = props => {
  const [user, loading, error] = useAuthState(firebase.auth())

  const httpLink = createHttpLink({
    uri: "https://hasura.buildthat.xyz/v1/graphql",
  })

  useEffect(() => {
    const fetchClaims = async () => {
      const idTokenResult = await user.getIdTokenResult()
      const hasuraClaim = idTokenResult.claims["https://hasura.io/jwt/claims"]
      const io = idTokenResult.claims.isOnboarded
      if (io === false) navigate("/app/onboarding")
      console.log("claims: ", idTokenResult)

      if (!hasuraClaim) user.getIdTokenResult(true)
    }

    if (user) {
      fetchClaims()

      const claimsDoc = firebase.firestore().collection("claims").doc(user.uid)
      let lastCommitted

      const listenToClaims = () => {
        if (claimsDoc) claimsDoc.onSnapshot(onNewClaims)
      }

      const onNewClaims = snapshot => {
        const data = snapshot.data()
        if (!data) return

        if (data._lastCommitted) {
          if (
            data._forceRefresh === true ||
            (lastCommitted && !data._lastCommitted.isEqual(lastCommitted))
          ) {
            // Force a r if (data._isOnboarded)efresh of the user's ID token
            console.log("Refreshing token")
            user.getIdToken(true)

            if (data._forceRefresh === true) {
              firebase.firestore().collection("claims").doc(user.uid).update({
                _forceRefresh: false,
              })
            }
          }
        }
        lastCommitted = data._lastCommitted
      }
      listenToClaims()
    }
  }, [user, loading, error])

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    const token = user?.xa
    if (token)
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      }

    return headers
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  })

  if (loading) {
    return null
  }

  return (
    <AuthContext.Provider>
      <ApolloProvider client={client}>
        <StripeProvider>{props.children}</StripeProvider>
      </ApolloProvider>
    </AuthContext.Provider>
  )
}

export default GraphQLAuthProvider
