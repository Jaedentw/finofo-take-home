import type { ColumnDef } from "@tanstack/react-table";
import type { Fruit } from "../home";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

// Define the columns for the fruit table
export const columns: ColumnDef<Fruit>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "family",
    header: ({ column }) => {
      return (
        <Button
          className="text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Family
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "order",
    header: ({ column }) => {
      return (
        <Button
          className="text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "genus",
    header: ({ column }) => {
      return (
        <Button
          className="text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Genus
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "nutritions.calories",
    header: ({ column }) => {
      return (
        <Button
          className="text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Calories
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
  },
];
