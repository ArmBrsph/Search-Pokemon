import { Table } from "antd";
import type { TableProps } from "antd";
interface DataType {
  key: number;
  name: string;
  type: string;
  damage: number;
}
const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Damage",
    dataIndex: "damage",
    key: "damage",
  },
];
const AttackTableComponent = ({ rawdata }: any) => {
  const data = rawdata.map((item: any, index: number) => {
    return {
      key: index,
      name: item.name,
      type: item.type,
      damage: item.damage,
    };
  });
  return <Table<DataType> columns={columns} dataSource={data} />;
};
export default AttackTableComponent;
