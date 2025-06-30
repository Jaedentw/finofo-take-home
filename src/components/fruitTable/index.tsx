import { columns } from "./columns";
import { DataTable } from "./data-table";
import type { Fruit, FruitJarContents } from "../home";

interface FruitTableProps {
  allFruits: Fruit[];
  jarContents: FruitJarContents;
  setJarContents: React.Dispatch<React.SetStateAction<FruitJarContents>>;
}

const FruitTable: React.FC<FruitTableProps> = ({
  allFruits,
  jarContents,
  setJarContents,
}) => {
  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={allFruits}
        jarContents={jarContents}
        setJarContents={setJarContents}
      />
    </div>
  );
};

export default FruitTable;
