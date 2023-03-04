import React, { Component, Fragment } from "react";
import { ResponsiveBar } from "@nivo/bar";

const SuperDashboardProgram = ({ data }) => {
  return (
    <Fragment>
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="ranking"
        margin={{
          top: 10,
          right: 50,
          bottom: 40,
          left: 100,
        }}
        padding={0.5}
        borderRadius={3}
        borderWidth={1}
        groupMode="grouped"
        colors="#1b84d6"
        layout={"horizontal"}
        axisTop={null}
        axisRight={null}
        enableGridX
        enableGridY
        enableLabel={false}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Departments",
          legendPosition: "middle",
          legendOffset: -60,
          fontWeight: "bold",
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number of Students",
          legendPosition: "middle",
          legendOffset: 35,
        }}
      />
    </Fragment>
  );
};
//     );
//   }
// }

export default SuperDashboardProgram;
