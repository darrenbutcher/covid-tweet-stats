import React from "react"
import PieChart from "../molecules/pie-chart"
// import { useQuery } from "urql"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const sayCoronavirusQ = gql`
  query say_coronavirus {
    corona: search_stats_aggregate(args: { search: "#coronavirus" }) {
      total: aggregate {
        count
      }
    }
  }
`

const sayCovidQ = gql`
  query say_covid {
    covid: search_stats_aggregate(args: { search: "#covid" }) {
      total: aggregate {
        count
      }
    }
  }
`

const Stats = () => {
  const sayCovidquery = useQuery(sayCovidQ)
  const sayCoronaquery = useQuery(sayCoronavirusQ)
  if (!sayCoronaquery.data || !sayCovidquery.data) {
    return null
  }

  const data = [
    {
      id: "Say coronavirus",
      label: "#corona",
      value: sayCoronaquery.data.corona.total.count,
      color: "#000000",
    },
    {
      id: "Say covid",
      label: "#covid",
      value: sayCovidquery.data.covid.total.count,
      color: "#ffffff",
    },
  ]

  return (
    <>
      {!sayCoronaquery.data && !sayCovidquery.data ? (
        <div>Loading...</div>
      ) : (
        <div style={{ height: "50vh" }}>
          <PieChart data={data} />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <span>
              <h1>{sayCovidquery.data.covid.total.count}</h1>
              <span>Say Covid</span>
            </span>
            <span>
              <h1>{sayCoronaquery.data.corona.total.count}</h1>
              <span>Say Corona</span>
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default Stats
