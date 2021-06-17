import React, { createContext } from "react"
const FirebaseContext = createContext()

export { FirebaseContext }

export default ({ children }) => {
  if (!app.apps.length) {
    app.initializeApp(config)
  }
  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  )
}
