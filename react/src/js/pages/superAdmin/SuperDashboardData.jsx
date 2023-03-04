// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from "@nivo/pie";
import React, { useState } from "react";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const SuperDashboard = ({ data /* see data tab */ }) => (
  <ResponsivePie
    data={data}
    colors={{ scheme: "paired" }}
    margin={{ top: 0, right: 40, bottom: 120, left: 40 }}
    innerRadius={0.4}
    startAngle={0}
    theme={{
      fontSize: 13,
      fontWeight: "bold",
    }}
    padAngle={0.7}
    enableArcLinkLabels={false}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsSkipAngle={1}
    arcLinkLabelsTextColor="#252525"
    arcLinkLabelsThickness={2}
    arcLinkLabelsDiagonalLength={8}
    arcLinkLabelsTextOffset={1}
    arcLinkLabelsStraightLength={11}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabel={(d) => `${d.id} ${d.value}`}
    arcLabelsSkipAngle={1}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 5]],
    }}
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
      {
        id: "stud",
        type: "patternLines",
        background: "rgba(27, 132, 214, 0.3)",
        color: "rgba(27, 132, 214, 0.3)",
        rotation: -45,
        lineWidth: 6,
      },
      {
        id: "teach",
        type: "patternLines",
        background: "rgba(27, 132, 214, 0.5)",
        color: "rgba(27, 132, 214, 0.5)",
        rotation: -45,
        lineWidth: 6,
      },
    ]}
    fill={[
      {
        match: {
          id: "Students",
        },
        id: "stud",
      },
      {
        match: {
          id: "Teachers",
        },
        id: "teach",
      },
      {
        match: {
          id: "c",
        },
        id: "dots",
      },
      {
        match: {
          id: "go",
        },
        id: "dots",
      },
      {
        match: {
          id: "python",
        },
        id: "dots",
      },
      {
        match: {
          id: "lisp",
        },
        id: "lines",
      },
      {
        match: {
          id: "elixir",
        },
        id: "lines",
      },
      {
        match: {
          id: "javascript",
        },
        id: "lines",
      },
    ]}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 41,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 0,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 20,
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
);

export default SuperDashboard;
