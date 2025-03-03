import { ResponsiveTreeMap } from "@nivo/treemap"

export default function WonDealsAndDealAmount({ data }) {
  const wonDeals = data.filter((d) => d.Status === "Won")
  const salesRepData = wonDeals.reduce((acc, d) => {
    if (!acc[d.Sales_Rep]) {
      acc[d.Sales_Rep] = { name: d.Sales_Rep, count: 0, amount: 0 }
    }
    acc[d.Sales_Rep].count++
    acc[d.Sales_Rep].amount += d.Deal_Amount
    return acc
  }, {})

  const chartData = {
    name: "Won Deals",
    children: Object.values(salesRepData).map((rep) => ({
      name: rep.name,
      count: rep.count,
      value: rep.amount,
    })),
  }

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveTreeMap
        data={chartData}
        identity="name"
        value="value"
        valueFormat=".02s"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.2]] }}
        parentLabelPosition="left"
        parentLabelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        borderColor={{ from: "color", modifiers: [["darker", 0.1]] }}
      />
    </div>
  )
}

