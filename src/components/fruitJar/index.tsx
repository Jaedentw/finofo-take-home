import { Ban, XCircle } from "lucide-react";
import type { Fruit, FruitJarContents } from "../home";
import React, { useMemo, useState } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { ChartPieLabelCustom } from "./pie-chart";

interface FruitJarProps {
  allFruits: Fruit[];
  jarContents: FruitJarContents;
  setJarContents: React.Dispatch<React.SetStateAction<FruitJarContents>>;
}

const FruitJar: React.FC<FruitJarProps> = ({
  allFruits,
  jarContents,
  setJarContents,
}) => {
  const getFruitCalories = (fruitName: string): number => {
    const fruit = allFruits.find((f) => f.name === fruitName);
    const CaloriesPer = fruit?.nutritions.calories || 0;
    return (jarContents[fruitName] || 0) * CaloriesPer;
  };

  const [totalCalories, setTotalCalories] = useState(0);

  useMemo(() => {
    // This useMemo is used to recalculate the total calories whenever jarContents changes
    setTotalCalories(
      Object.keys(jarContents).reduce((total, fruit) => {
        return total + getFruitCalories(fruit);
      }, 0)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jarContents]);

  return (
    <div className="flex flex-col items-center bg-[url(/src/assets/glass-jar.png)] bg-contain bg-center bg-no-repeat relative w-full h-[90vh]">
      <Tooltip>
        <TooltipTrigger className="absolute right-0 top-6">
          <Ban
            onClick={() => {
              setJarContents({});
            }}
          />
        </TooltipTrigger>
        <TooltipContent>Clear jar of all fruits</TooltipContent>
      </Tooltip>

      <Tabs
        defaultValue="contents"
        className="relative top-[30%] left-0 w-[80%] h-full max-h-[65%] md:w-[60%] md:max-h-[55%] lg:max-h-[65%]"
      >
        <TabsList className="mb-1 border shadow-lg">
          <TabsTrigger value="contents">Jar Contents</TabsTrigger>
          <TabsTrigger value="chart">Pie Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="contents" className="h-full">
          <div className="flex flex-col w-full h-full bg-white border rounded-lg shadow-lg max-h-[600px] p-4 text-sm lg:p-8 lg:pt-4 lg:pb-4 lg:text-base">
            <b className="text-base lg:text-lg mb-2">Your Fruits</b>
            <div className="flex flex-col h-full overflow-y-auto">
              {Object.keys(jarContents).map((fruit) =>
                jarContents[fruit] > 0 ? (
                  <div
                    key={`${fruit}-inJar`}
                    className="text-left flex flex-row flex-wrap items-center justify-between mb-1"
                  >
                    {fruit} x {jarContents[fruit]}
                    <span className="flex flex-row items-center w-[130px] justify-between">
                      Calories: {getFruitCalories(fruit)}
                      <Tooltip>
                        <TooltipTrigger>
                          <XCircle
                            className="h-4"
                            onClick={() => {
                              setJarContents((prev: FruitJarContents) => {
                                const newContents = { ...prev };
                                delete newContents[fruit];
                                return newContents;
                              });
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>Remove {fruit} from jar</TooltipContent>
                      </Tooltip>
                    </span>
                  </div>
                ) : null
              )}
            </div>

            {totalCalories > 0 ? (
              <div className="mt-4 font-bold text-base lg:text-lg">
                Total Calories: {totalCalories}
              </div>
            ) : null}
          </div>
        </TabsContent>
        <TabsContent value="chart">
          <div className="flex flex-col w-full h-full p-4 bg-white border rounded-lg shadow-lg max-h-[640px]">
            <ChartPieLabelCustom
              jarContents={jarContents}
              getFruitCalories={getFruitCalories}
              totalCalories={totalCalories}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FruitJar;
