import React from "react"
import { Redirect } from "@reach/router"
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

const Home = props => {
  const [result, reexecuteQuery] = useQuery({
    query: isOnBoardedQuery,
  })
  const { data, fetching } = result
  console.log(props)

  if (
    props.location.state.isOnboarded === false ||
    (data && data.me.account.isOnboarded === false)
  ) {
    return <Redirect to="/app/onboarding" noThrow />
  }
}

export default Home
