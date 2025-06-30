import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import FruitList from "./fruitList"; // Assuming this is a component that lists fruits

export interface Fruit {
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

export interface FruitJarContents {
  [key: string]: number;
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

  const [jarContents, setJarContents] = useState<FruitJarContents>({});

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (isFetched) {
    console.log(data);
    return (
      <>
        <FruitList
          allFruits={data}
          jarContents={jarContents}
          setJarContents={setJarContents}
        />
      </>
    );
  }
};

export default Home;
