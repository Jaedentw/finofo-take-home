import type { Fruit, FruitJarContents } from "../home";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import FruitListItem from "./fruitListItem";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";

interface FruitListProps {
  allFruits: Fruit[];
  jarContents: FruitJarContents;
  setJarContents: React.Dispatch<React.SetStateAction<FruitJarContents>>;
}

export type SortValueType = "name" | "family" | "order" | "genus";

const FruitList: React.FC<FruitListProps> = ({
  allFruits,
  jarContents,
  setJarContents,
}) => {
  const [sortValue, setSortValue] = useState<SortValueType>("name");

  // Sorts the fruits alphabetically by name for basic list display
  const alphatbeticalFruits = allFruits?.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );

  // Creates a list of accordion headers based on the selected sortValue
  const sortingArray = [
    ...new Set(allFruits.map((fruit: Fruit) => fruit[sortValue].trim())),
    //.trim() to avoid leading/trailing spaces, you have one family: " Ebenaceae" in your database that was causing issues
  ];
  // Sort the sortingArray alphabetically
  sortingArray.sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );

  const [accordionValue, setAccordionValue] = useState<string[]>([]); // State to manage which accordions are expanded
  useEffect(() => {
    setAccordionValue([...sortingArray]);
  }, [sortValue]); //Expands all accordions when sortValue changes

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <RadioGroup
          defaultValue="name"
          className="flex"
          onValueChange={(value: SortValueType) => setSortValue(value)}
        >
          <span className="font-bold">Sort by:</span>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="name" id="none" />
            <Label htmlFor="name">None</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="family" id="family" />
            <Label htmlFor="family">Family</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="order" id="order" />
            <Label htmlFor="order">Order</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="genus" id="genus" />
            <Label htmlFor="genus">Genus</Label>
          </div>
        </RadioGroup>

        {sortValue !== "name" && (
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => {
                setAccordionValue([...sortingArray]);
              }}
            >
              Expand All
            </Button>
            <Button
              onClick={() => {
                setAccordionValue([]);
              }}
            >
              Collapse All
            </Button>
          </div>
        )}
      </div>

      {/* Display the list of fruits alphabetically if sortValue is "name"(none) */}
      {sortValue === "name" &&
        alphatbeticalFruits?.map((fruit) => (
          <FruitListItem
            className="border-b p-2 fb"
            fruit={fruit}
            jarContents={jarContents}
            setJarContents={setJarContents}
            key={fruit.id}
          />
        ))}

      {/* Display the list of fruits in accordion style if anything is selected but name/none */}
      <Accordion
        type="multiple"
        onValueChange={(e) => {
          setAccordionValue(e);
        }}
        value={accordionValue}
      >
        {sortValue !== "name" &&
          sortingArray.map(
            (
              sorter // Map through the sortingArray to create accordion items
            ) => (
              <AccordionItem value={sorter} className="mb-2">
                <AccordionTrigger className="text-left font-bold">
                  {/* Display the sorter name as the accordion header and display group add button with tooltip*/}
                  <span className="flex items-center gap-2 text-base">
                    {sorter}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <PlusCircle
                          className="h-5"
                          stroke="grey"
                          onClick={(e) => {
                            if (accordionValue.includes(sorter)) {
                              //If statement prevents adding fruits when the accordion is closed
                              e.stopPropagation(); // Prevents the accordion from toggling
                              alphatbeticalFruits
                                .filter((fruit) => fruit[sortValue] === sorter)
                                .forEach((fruit) => {
                                  console.log(fruit);
                                  setJarContents((prev: FruitJarContents) => {
                                    return {
                                      ...prev,
                                      [fruit.name]: (prev[fruit.name] || 0) + 1,
                                    };
                                  });
                                });
                            }
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        Add 1 of each {sorter} fruit to the jar
                      </TooltipContent>
                    </Tooltip>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {alphatbeticalFruits
                    .filter((fruit) => fruit[sortValue] === sorter)
                    .map((fruit) => (
                      <FruitListItem
                        fruit={fruit}
                        jarContents={jarContents}
                        setJarContents={setJarContents}
                      />
                    ))}
                </AccordionContent>
              </AccordionItem>
            )
          )}
      </Accordion>
    </>
  );
};

export default FruitList;
