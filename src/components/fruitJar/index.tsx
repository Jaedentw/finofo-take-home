import { XCircle } from "lucide-react";
import type { Fruit, FruitJarContents } from "../home";
import { ScrollArea } from "../ui/scroll-area";
import React, { useMemo, useState } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

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
      <div className="absolute m-auto mt-[45%] w-full h-[30%] bg-white/50"></div>
      <Tabs
        defaultValue="contents"
        className="relative top-[30%] left-0 w-[50%] h-full max-h-[640px]"
      >
        <TabsList className="mb-1 border shadow-lg">
          <TabsTrigger value="contents">Jar Contents</TabsTrigger>
          <TabsTrigger value="chart">Pie Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="contents" className="h-full">
          <div className="flex flex-col w-full h-full p-8 pt-6 bg-white border rounded-lg shadow-lg">
            <b className="text-lg mb-2">Your Fruits</b>
            <div className="flex flex-col h-full overflow-y-auto">
              {Object.keys(jarContents).map((fruit) =>
                jarContents[fruit] > 0 ? (
                  <div
                    key={`${fruit}-inJar`}
                    className="text-left flex flex-row items-center justify-between p-1"
                  >
                    {fruit} x {jarContents[fruit]}
                    <span className="flex flex-row items-center ml-15 w-[150px] justify-between">
                      Calories: {getFruitCalories(fruit)}
                      <Tooltip>
                        <TooltipTrigger>
                          <XCircle
                            className="h-4 ml-4"
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
              <div className="mt-2 font-bold">
                Total Calories: {totalCalories}
              </div>
            ) : null}
          </div>
        </TabsContent>
        <TabsContent value="chart">
          <div className="flex flex-col w-full h-full p-8 pt-6 bg-white border rounded-lg shadow-lg"></div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FruitJar;
