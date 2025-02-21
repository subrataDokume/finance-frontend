"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../ui/chart"
import { useCategory } from "@/hooks/usecategory"
import Loading from "../Loading"
import { generateRandomColor } from "@/lib/utils"
import { Link } from "react-router"
import { Button } from "../ui/button"

function Component() {
    const [chartData, setChartDate] = React.useState([]);
    const [chartConfig, setChartConfig] = React.useState({});
    const [totalAmount, setTotalAmount] = React.useState(0);
    const { category, isLoading, error } = useCategory();



    React.useEffect(() => {
        if (category && category.length > 0) {
            setChartDate(category.map((c) => ({
                browser: c.name,
                visitors: c.amount,
                fill: generateRandomColor(),
            })));

            setChartConfig(category.map((c) => ({
                [c.name]: {
                    label: c.name,
                    color: generateRandomColor(),
                }
            })));
            setTotalAmount(category.reduce((acc, curr) => acc + parseInt(curr.amount), 0));
        }
    }, [category]);


    if (isLoading) {
        return <Loading />
    };

    return (
        <Card className="flex flex-col border-none shadow-none">
            <CardHeader className="items-center pb-0">
                <CardTitle>Budget Chat</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                {category && category.length>0?
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[350px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={90}
                            strokeWidth={15}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalAmount.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Amount
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>:<h1 className="text-muted-foreground text-center my-20">No Budget created</h1>}
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <Button variant="link">
                    <Link to="/budget">Create new budget</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
export default Component