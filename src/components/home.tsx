import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import FruitList from "./fruitList";
import { DataTable } from "./fruitTable/data-table";
import { columns } from "./fruitTable/columns";
import FruitJar from "./fruitJar";

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
  }); //tanstack react-query for data fetching, makes it easy to handle loading, error, and fetched states

  const [jarContents, setJarContents] = useState<FruitJarContents>({});

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (isFetched) {
    console.log(data);

    // Sorts the fruits alphabetically by name for both table and list display
    data?.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );
    // Trims whitespace from family, genus, and order fields for sorting purposes
    // Japanese Persimmon has trailing space in it's data
    data?.forEach((fruit) => {
      fruit.name = fruit.name.trim();
      fruit.family = fruit.family.trim();
      fruit.genus = fruit.genus.trim();
      fruit.order = fruit.order.trim();
    });

    return (
      <div className="flex w-full flex-col-reverse lg:flex-row gap-10 ">
        <Tabs
          defaultValue="list"
          className="w-full min-w-[400px] 2xl:min-w-[860px]"
        >
          <TabsList className="mb-1">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>

          <TabsContent
            value="list"
            className="flex flex-col h-full max-h-[85vh] overflow-y-auto"
          >
            <FruitList
              allFruits={data}
              jarContents={jarContents}
              setJarContents={setJarContents}
            />
          </TabsContent>

          <TabsContent value="table">
            <DataTable
              columns={columns}
              data={data}
              jarContents={jarContents}
              setJarContents={setJarContents}
            />
          </TabsContent>
        </Tabs>
        <div className="min-w-[415px] 2xl:w-full">
          <FruitJar
            jarContents={jarContents}
            setJarContents={setJarContents}
            allFruits={data}
          />
        </div>
      </div>
    );
  }
};

export default Home;
