import React, { createContext, useContext } from "react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe("pk_test_kSISNwFCVgLEUDgoPe3xARJp00WKUevHa8")
const StripeContext = createContext()

export const useStripe = () => {
  const stripePromise = useContext(StripeContext)
  return [stripePromise]
}

export default ({ children }) => {
  return (
    <StripeContext.Provider value={stripePromise}>
      {children}
    </StripeContext.Provider>
  )
}
