import React, { useEffect, useLayoutEffect, useState } from "react"
import { Router, navigate, Redirect } from "@reach/router"
import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import {
  createClient,
  Provider,
  dedupExchange,
  fetchExchange,
  subscriptionExchange,
  // cacheExchange,
} from "urql"
import { cacheExchange } from "@urql/exchange-graphcache"
import { devtoolsExchange } from "@urql/devtools"
import { ApolloClient } from "apollo-client"
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory"
import { HttpLink, createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { ApolloProvider } from "@apollo/react-hooks"
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
import Routes from "../molecules/routes"
import Onboarding from "../screens/onboarding"
import StripeProvider from "../molecules/stripe"

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: "https://hasura.buildthat.xyz/v1/graphql",
})

const client = new ApolloClient({
  cache,
  link,
})

const App = props => {
  const [user, loading, error] = useAuthState(firebase.auth())
  const [isOnboarded, setIsOnboarded] = useState()
  const cache = cacheExchange({
    keys: {
      stats: data => data.id,
    },
  })

  const httpLink = createHttpLink({
    uri: "https://hasura.buildthat.xyz/v1/graphql",
  })

  useEffect(() => {
    const fetchClaims = async () => {
      const idTokenResult = await user.getIdTokenResult()
      const hasuraClaim = idTokenResult.claims["https://hasura.io/jwt/claims"]
      const io = idTokenResult.claims.isOnboarded

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

  const client = createClient({
    url: "https://hasura.buildthat.xyz/v1/graphql",
    fetchOptions: () => {
      const headers = user?.xa
        ? {
            authorization: `Bearer ${user.xa}`,
          }
        : {}

      return {
        headers,
      }
    },
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cache,
      fetchExchange,
      // subscriptionExchange({
      //   forwardSubscription: operation => subscriptionClient.request(operation),
      // }),
    ],
    // requestPolicy: "cache-and-network",
  })

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
  })

  if (loading) {
    return (
      <>
        <Header loading={loading} />
        <TabBar />
      </>
    )
  }

  if (isOnboarded === false) {
    if (props.location.pathname === "/app/onboarding") {
      return (
        // <Provider value={client}>
        <Router>
          <Onboarding path="/app/onboarding" />
        </Router>
        // </Provider>
      )
    }
  }

  return (
    <ApolloProvider client={client}>
      <StripeProvider>
        <Router>
          {/* <Onboarding path="/app/onboarding" /> */}
          <PrivateRoute
            path="/app"
            component={Home}
            location={props.location}
          />
        </Router>
        <Header />
        <Layout>
          <Router>
            <Login path="/app/login" />
            <PrivateRoute path="/app/account" component={Account} />
            <PrivateRoute path="/app/stats" component={Stats} />
            <Plans path="/app/plans" />
            <Tweets path="/app/feed" />
          </Router>
        </Layout>
        <TabBar />
      </StripeProvider>
    </ApolloProvider>
  )
}

export default App
