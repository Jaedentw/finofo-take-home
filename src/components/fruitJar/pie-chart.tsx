import type { FruitJarContents } from "../home";
import { PieChart, Pie, Tooltip } from "recharts";

type CustomPieChartProps = {
  jarContents: FruitJarContents;
  getFruitCalories: (fruitName: string) => number;
  totalCalories: number; // Optional prop for total calories, not used in this chart
};

export function CustomPieChart({
  jarContents,
  getFruitCalories,
  totalCalories,
}: CustomPieChartProps) {
  const randomColorGenerator = () => {
    return "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
  };

  const chartData = Object.keys(jarContents).map((fruitName) => {
    const totalCalories = getFruitCalories(fruitName);
    return {
      name: fruitName,
      totalCalories,
      fill: randomColorGenerator(),
      //random color generator since the fruits don't have associated colors in their data
      //if this was a proper app with a color pallette a different method would be used
    };
  });

  return (
    <div className="flex flex-col items-center p-4 bg-white border rounded-lg shadow-lg">
      <b className="text-base lg:text-lg">Your Fruit Pie</b>
      <div className="flex flex-col items-center">
        <PieChart width={300} height={300} className="2xl:hidden">
          <Pie
            dataKey="totalCalories"
            isAnimationActive={false}
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={110}
            label
          />
          <Tooltip />
        </PieChart>

        {/* Larger sized pie chart visible only at the largest screen size */}
        <PieChart width={500} height={500} className="hidden 2xl:flex">
          <Pie
            dataKey="totalCalories"
            isAnimationActive={false}
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={150}
            label
          />
          <Tooltip />
        </PieChart>
      </div>
      <b className="text-base lg:text-lg">Total Calories: {totalCalories}</b>
    </div>
  );
}
