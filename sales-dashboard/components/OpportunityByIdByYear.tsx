import { ResponsiveLine } from "@nivo/line"

export default function OpportunityByIdByYear({ data }) {
  const yearlyData = data.reduce((acc, d) => {
    const year = new Date(d.Created_Date).getFullYear()
    if (!isNaN(year)) {
      if (!acc[year]) {
        acc[year] = { x: year, y: 0 }
      }
      acc[year].y++
    }
    return acc
  }, {})

  const chartData = [
    {
      id: "Opportunities",
      data: Object.values(yearlyData)
        .sort((a, b) => a.x - b.x)
        .map((d) => ({ x: d.x.toString(), y: d.y })), // Convert x to string to avoid NaN issues
    },
  ]

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Year",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number of Opportunities",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  )
}

