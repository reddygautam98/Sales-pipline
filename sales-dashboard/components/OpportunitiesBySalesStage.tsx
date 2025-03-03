import { ResponsiveFunnel } from "@nivo/funnel"

export default function OpportunitiesBySalesStage({ data }) {
  const stageCounts = data.reduce((acc, d) => {
    acc[d.Sales_Stage] = (acc[d.Sales_Stage] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(stageCounts)
    .map(([id, value]) => ({ id, value, label: `${id}: ${value}` }))
    .sort((a, b) => b.value - a.value)

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveFunnel
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        valueFormat=">-.4s"
        colors={{ scheme: "spectral" }}
        borderWidth={20}
        labelColor={{ from: "color", modifiers: [["darker", 3]] }}
        beforeSeparatorLength={100}
        beforeSeparatorOffset={20}
        afterSeparatorLength={100}
        afterSeparatorOffset={20}
        currentPartSizeExtension={10}
        currentBorderWidth={40}
        motionConfig="wobbly"
      />
    </div>
  )
}

