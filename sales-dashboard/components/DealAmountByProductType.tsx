import { ResponsiveAreaBump } from "@nivo/bump"

export default function DealAmountByProductType({ data }) {
  const productTypes = [...new Set(data.map((d) => d.Product_Type))]
  const years = [...new Set(data.map((d) => d.Created_Date.getFullYear()))]

  const chartData = productTypes.map((product) => {
    const yearData = years.map((year) => {
      const amount = data
        .filter((d) => d.Product_Type === product && d.Created_Date.getFullYear() === year)
        .reduce((sum, d) => sum + d.Deal_Amount, 0)
      return { x: year, y: amount }
    })
    return { id: product, data: yearData }
  })

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveAreaBump
        data={chartData}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        spacing={8}
        colors={{ scheme: "nivo" }}
        blendMode="multiply"
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          { match: { id: "Hardware" }, id: "dots" },
          { match: { id: "Software" }, id: "lines" },
        ]}
        startLabel="id"
        endLabel="id"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -36,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: 32,
        }}
      />
    </div>
  )
}

