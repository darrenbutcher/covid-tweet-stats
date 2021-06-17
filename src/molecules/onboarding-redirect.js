import React from "react"
import { navigate } from "gatsby"
import { useQuery } from "urql"

const isOnBoardedQuery = `
query {
  me {
    account {
      isOnboarded
    }
  }
}
`

const OnboardingRedirect = ({ children, ...props }) => {
  const [result, reexecuteQuery] = useQuery({
    query: isOnBoardedQuery,
  })
  const { data, fetching } = result

  if (data && data.me.account.isOnboarded === false) {
    if (props.path !== "/app/onboarding") {
      navigate("/app/onboarding", { replace: true })
      return null
    }
  }

  return children
}

export default OnboardingRedirect
