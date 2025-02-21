import React, { useEffect } from 'react'

import { Bar, BarChart, XAxis } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { useCategoryReport } from '@/hooks/usecategory';
import Loading from '../Loading';

const chartConfig = {
    desktop: {
        label: "Budget",
        color: "#2563eb",
    },
    mobile: {
        label: "Expense",
        color: "#60a5fa",
    },
}

const categoryChart = () => {
    const [chartData, setChartDate] = React.useState([]);
    //     const [chartConfig, setChartConfig] = React.useState({});
    const { category, isLoading, error } = useCategoryReport();
    console.log(category);

    useEffect(() => {
        if (category && category.length) {
            setChartDate(category.map((c) => ({
                month: c.name,
                desktop: c.budgetAmount,
                mobile: c.totalSpent.length > 0 ? c.totalSpent[0].total : 0
            })));

        }
    }, [category])
    if (isLoading) {
        return <Loading />
    };
    return (
        <>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
            </ChartContainer>
        </>
    )
}

export default categoryChart