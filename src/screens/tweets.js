import React, { useEffect, useState } from "react"
// import { useQuery } from "urql"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const feedQuery = gql`
  {
    stats {
      id
      tweet
    }
  }
`

const Tweets = () => {
  const [stats, setStats] = useState()
  const { loading, error, data } = useQuery(feedQuery)

  if (loading && !data) return null
  if (error) return `Error! ${error}`

  return (
    <>
      <h3 style={{ marginBottom: "16px" }}>Feed</h3>
      <ul>
        {data.stats.map(data => {
          return (
            <li style={{ marginBottom: "16px" }} key={data.id}>
              {data.tweet}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Tweets
