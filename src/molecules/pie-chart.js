import React from "react"
import { ResponsivePie } from "@nivo/pie"

const PieChart = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 10, right: 80, bottom: 100, left: 80 }}
    innerRadius={0.5}
    padAngle={8}
    cornerRadius={3}
    colors={["#e4e4e4", "#181818"]}
    borderWidth={2}
    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    radialLabelsSkipAngle={10}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor="#333333"
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={16}
    radialLabelsLinkHorizontalLength={24}
    radialLabelsLinkStrokeWidth={1}
    radialLabelsLinkColor={{ from: "color" }}
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor="#ffffff"
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "Say coronavirus",
        },
        id: "dots",
      },
      {
        match: {
          id: "Say covid",
        },
        id: "lines",
      },
    ]}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        translateY: 56,
        itemWidth: 130,
        itemHeight: 18,
        itemTextColor: "#999",
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
)

export default PieChart
