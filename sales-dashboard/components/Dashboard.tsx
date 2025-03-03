"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import KPICard from "./KPICard"
import OpportunitiesBySalesStage from "./OpportunitiesBySalesStage"
import OpportunitiesByStatusAndStage from "./OpportunitiesByStatusAndStage"
import DealAmountByProductType from "./DealAmountByProductType"
import SalesPerformanceByDealSize from "./SalesPerformanceByDealSize"
import OpportunityByIdByYear from "./OpportunityByIdByYear"
import WonDealsAndDealAmount from "./WonDealsAndDealAmount"

export default function Dashboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sales_pipeline_data-UWudte1R2ERlMmgxuGZjBE1jibpygs.csv",
    )
      .then((response) => response.text())
      .then((text) => {
        const rows = text.split("\n").slice(1)
        const parsedData = rows
          .map((row) => {
            const [
              Opportunity_ID,
              Created_Date,
              Closed_Date,
              Sales_Stage,
              Product_Type,
              Sales_Rep,
              Opportunity_Size,
              Deal_Amount,
              Status,
            ] = row.split(",")
            return {
              Opportunity_ID,
              Created_Date: new Date(Created_Date),
              Closed_Date: new Date(Closed_Date),
              Sales_Stage,
              Product_Type,
              Sales_Rep,
              Opportunity_Size,
              Deal_Amount: Number.parseFloat(Deal_Amount),
              Status,
            }
          })
          .filter((d) => !isNaN(d.Created_Date) && !isNaN(d.Closed_Date) && !isNaN(d.Deal_Amount)) // Filter out invalid data
        setData(parsedData)
        setLoading(false)
      })
  }, [])

  const calculateKPIs = () => {
    const totalOpportunities = data.length
    const wonDeals = data.filter((d) => d.Status === "Won")
    const totalWon = wonDeals.length
    const totalDealAmount = wonDeals.reduce((sum, d) => sum + d.Deal_Amount, 0)
    const averageDealSize = totalWon > 0 ? totalDealAmount / totalWon : 0
    const conversionRate = totalOpportunities > 0 ? (totalWon / totalOpportunities) * 100 : 0
    const averageTimeToConvert =
      totalWon > 0 ? wonDeals.reduce((sum, d) => sum + (d.Closed_Date - d.Created_Date), 0) / (totalWon * 86400000) : 0 // Convert ms to days

    return {
      averageDealSize: averageDealSize.toFixed(2),
      averageTimeToConvert: averageTimeToConvert.toFixed(1),
      conversionRate: conversionRate.toFixed(2),
      totalOpportunities,
      totalWon,
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  const kpis = calculateKPIs()

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-800">Sales Pipeline Dashboard 📊</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        <KPICard title="Average Deal Size" value={`$${kpis.averageDealSize}`} icon="💰" />
        <KPICard title="Avg. Time to Convert" value={`${kpis.averageTimeToConvert} days`} icon="⏱️" />
        <KPICard title="Conversion Rate" value={`${kpis.conversionRate}%`} icon="🎯" />
        <KPICard title="Total Opportunities" value={kpis.totalOpportunities} icon="🚀" />
        <KPICard title="Total Won" value={kpis.totalWon} icon="🏆" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Opportunities by Sales Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <OpportunitiesBySalesStage data={data} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Opportunities by Status and Sales Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <OpportunitiesByStatusAndStage data={data} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Deal Amount by Product Type</CardTitle>
          </CardHeader>
          <CardContent>
            <DealAmountByProductType data={data} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance by Deal Size</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesPerformanceByDealSize data={data} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Opportunity by ID by Year</CardTitle>
          </CardHeader>
          <CardContent>
            <OpportunityByIdByYear data={data} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Won Deals and Deal Amount by Sales Rep</CardTitle>
          </CardHeader>
          <CardContent>
            <WonDealsAndDealAmount data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

