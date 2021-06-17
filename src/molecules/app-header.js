import React from "react"
import { Link } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { isBrowser } from "react-device-detect"

const AppHeader = prop => {
  const [user, loading, error] = useAuthState(firebase.auth())
  // const logout = async () => {
  //   try {
  //     await firebase.auth().signOut()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  if (isBrowser && loading && user)
    return (
      <nav
        style={{
          height: "60px",
          paddingLeft: "16px",
          backgroundColor: "#181818",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      />
    )

  if (isBrowser)
    return (
      <nav
        style={{
          height: "60px",
          paddingLeft: "16px",
          backgroundColor: "#181818",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h3 style={{ color: "#ffffff" }}>L</h3>
        <ul style={{ display: "flex", listStyle: "none", marginLeft: "16px" }}>
          {/* <li style={{ marginRight: "16px", alignSelf: "center" }}>
          <Link style={{ textDecoration: "none" }} to="/app">
            Home
          </Link>
        </li> */}
          <li style={{ marginRight: "16px", alignSelf: "center" }}>
            <Link
              activeStyle={{
                borderBottom: "2px solid #ffffff",
              }}
              style={{ textDecoration: "none", color: "#ffffff" }}
              to="/app/feed"
            >
              Feed
            </Link>
          </li>
          <li style={{ marginRight: "16px", alignSelf: "center" }}>
            <Link
              activeStyle={{
                borderBottom: "2px solid #ffffff",
              }}
              style={{ textDecoration: "none", color: "#ffffff" }}
              to="/app/plans"
            >
              Plans
            </Link>
          </li>

          <li style={{ marginRight: "16px", alignSelf: "center" }}>
            <Link
              activeStyle={{
                borderBottom: "2px solid #ffffff",
              }}
              style={{ textDecoration: "none", color: "#ffffff" }}
              to="/app/stats"
            >
              Stats
            </Link>
          </li>
          {user ? (
            <li style={{ marginRight: "16px", alignSelf: "center" }}>
              <Link
                activeStyle={{
                  borderBottom: "2px solid #ffffff",
                }}
                style={{ textDecoration: "none", color: "#ffffff" }}
                to="/app/account"
              >
                Account
              </Link>
            </li>
          ) : null}
          {!user ? (
            <li style={{ paddingRight: "16px", alignSelf: "center" }}>
              <Link
                activeStyle={{
                  borderBottom: "2px solid #ffffff",
                }}
                style={{ textDecoration: "none", color: "#ffffff" }}
                to="/app/login"
              >
                Login
              </Link>
            </li>
          ) : (
            <li style={{ alignSelf: "center" }}>
              <button
                style={{
                  padding: "8px 16px 8px 16px",
                  backgroundColor: "#ffffff",
                  color: "#181818",
                  borderRadius: "8px",
                  border: "none",
                }}
                onClick={() => firebase.auth().signOut()}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    )

  return null
}

export default AppHeader
