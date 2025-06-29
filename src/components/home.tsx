import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Fruit {
  id: number;
  name: string;
  family: string;
  genus: string;
  order: string;
  nutritions: {
    calories: number;
    fat: number;
    sugar: number;
    carbohydrates: number;
    protein: number;
  };
}

interface FruitInJar {
  name: string;
  id: number;
  quantity: number;
  calories: number;
}

const Home = () => {
  const { isPending, error, isFetched, data } = useQuery({
    queryKey: ["allFruits"],
    queryFn: async () => {
      const response = await fetch(
        "https://fruity-proxy.vercel.app/api/fruits",
        {
          headers: {
            "x-api-key": "fruit-api-challenge-2025",
          },
        }
      );
      return (await response.json()) as Fruit[];
    },
  });

  const [jarContents, setJarContents] = useState<FruitInJar[]>([]);

  const alphatbeticalFruits = data?.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (isFetched) {
    console.log(data);
    return (
      <>
        {alphatbeticalFruits?.map((fruit) => (
          <div className="flex text-left" key={fruit.id}>
            {fruit.name} - {fruit.nutritions.calories} calories
          </div>
        ))}
      </>
    );
  }
};

export default Home;
