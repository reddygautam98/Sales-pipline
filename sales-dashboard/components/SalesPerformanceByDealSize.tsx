import { ResponsiveScatterPlot } from "@nivo/scatterplot"

export default function SalesPerformanceByDealSize({ data }) {
  const chartData = data
    .map((d) => {
      const dealAmount = Number.parseFloat(d.Deal_Amount)
      const daysToClose = (new Date(d.Closed_Date) - new Date(d.Created_Date)) / (1000 * 60 * 60 * 24)

      // Only include valid numerical data points
      if (!isNaN(dealAmount) && !isNaN(daysToClose) && daysToClose >= 0) {
        return {
          x: dealAmount,
          y: daysToClose,
          group: d.Opportunity_Size,
        }
      }
      return null
    })
    .filter(Boolean) // Remove any null values

  const groups = [...new Set(chartData.map((d) => d.group))]

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveScatterPlot
        data={groups.map((group) => ({
          id: group,
          data: chartData.filter((d) => d.group === group),
        }))}
        margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        xScale={{ type: "linear", min: 0, max: "auto" }}
        xFormat=">-.2f"
        yScale={{ type: "linear", min: 0, max: "auto" }}
        yFormat=">-.2f"
        blendMode="multiply"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Deal Amount",
          legendPosition: "middle",
          legendOffset: 46,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Days to Close",
          legendPosition: "middle",
          legendOffset: -60,
        }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 130,
            translateY: 0,
            itemWidth: 100,
            itemHeight: 12,
            itemsSpacing: 5,
            itemDirection: "left-to-right",
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
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

