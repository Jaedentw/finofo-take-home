import type { Fruit, FruitJarContents } from "../home";
import { Minus, Plus } from "lucide-react";
import cn from "clsx"; // Importing clsx for conditional class names

interface FruitListItemProps {
  fruit: Fruit;
  setJarContents: React.Dispatch<React.SetStateAction<FruitJarContents>>;
  jarContents: FruitJarContents;
  className?: string; // Optional className prop for styling
}

const FruitListItem: React.FC<FruitListItemProps> = ({
  fruit,
  jarContents,
  setJarContents,
  className = "", // Default to an empty string if no className is provided
}) => {
  return (
    <div
      className={cn("flex text-left items-center p-1 select-none", className)}
      key={fruit.id}
    >
      <Plus
        className="mr-1 h-4"
        stroke="grey"
        onClick={() =>
          setJarContents((prev: FruitJarContents) => {
            return {
              ...prev,
              [fruit.name]: (prev[fruit.name] || 0) + 1,
            };
          })
        } // Increment count
      />
      {jarContents[fruit.name] || 0}
      <Minus
        className="ml-1 mr-4 h-4"
        stroke="grey"
        onClick={() =>
          setJarContents((prev: FruitJarContents) => {
            return {
              ...prev,
              [fruit.name]:
                (prev[fruit.name] || 0) > 0 ? prev[fruit.name] - 1 : 0,
            };
          })
        } // Decrement count
      />
      <span className={cn(className.includes("fb") ? "font-semibold" : "")}>
        {fruit.name} &nbsp;
        {/* Display fruit name with semibold font if className includes "fb", for enhancement of styling on main list view*/}
      </span>
      - {fruit.nutritions.calories} calories
    </div>
  );
};

export default FruitListItem;
