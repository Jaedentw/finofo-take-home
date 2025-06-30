"use client";
import type { FruitJarContents } from "../home";
import { Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

type ChartPieDonutTextProps = {
  jarContents: FruitJarContents;
  getFruitCalories: (fruitName: string) => number;
  totalCalories: number; // Optional prop for total calories, not used in this chart
};

export function ChartPieLabelCustom({
  jarContents,
  getFruitCalories,
  totalCalories,
}: ChartPieDonutTextProps) {
  const randomColorGenerator = () => {
    return "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
  };

  const chartData = Object.keys(jarContents).map((fruitName) => {
    console.log("Processing fruit:", fruitName);
    const totalCalories = getFruitCalories(fruitName);

    return {
      name: fruitName,
      totalCalories,
      fill: randomColorGenerator(), // You can customize the fill color based on the fruit or any other logic
    };
  });

  console.log("Chart data:", chartData);

  return (
    <div className="flex flex-col items-center h-full">
      <b className="h-full">Your Fruit Pie</b>

      <ChartContainer
        config={chartConfig}
        className="absolute aspect-square top-23 md:top-26 w-full overflow-visible h-full max-h-[250px]"
      >
        <PieChart className="w-[100px]">
          <ChartTooltip
            content={<ChartTooltipContent nameKey="totalCalories" hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="totalCalories"
            labelLine={false}
            label={({ payload, ...props }) => {
              return (
                <text
                  className="flex flex-col overflow-visible x-10 font-semibold w-[5px] text-wrap "
                  cx={props.cx}
                  cy={props.cy}
                  x={props.x}
                  y={props.y}
                  textAnchor={props.textAnchor}
                  dominantBaseline={props.dominantBaseline}
                  fill="hsla(var(--foreground))"
                >
                  {payload.totalCalories}
                </text>
              );
            }}
            nameKey="name"
          />
        </PieChart>
      </ChartContainer>

      <b>Total Calories: {totalCalories}</b>
    </div>
  );
}
