import React, { useState } from "react"
import firebase from "gatsby-plugin-firebase"
import { navigate } from "@reach/router"
import { GoogleLoginButton } from "react-social-login-buttons"
import { useAuthState } from "react-firebase-hooks/auth"
import { useQuery } from "urql"
import axios from "axios"

const isOnBoardedQuery = `
query {
  me {
    account {
      isOnboarded
    }
  }
}
`

const isOnBoardedQuery = `
query {
  me {
    account {
      isOnboarded
    }
  }
}
`

const Login = props => {
  const [user, loading] = useAuthState(firebase.auth())
  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        navigate("/app/feed")
      })
  }
  return (
    <div>
      <GoogleLoginButton onClick={login} style={{ width: "216px" }} />
    </div>
  )
}

export default Login
