import React from "react";
import { Input, Space } from "antd";
import type { GetProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

interface RegxInputSearchProp {
  placeholder: string;
  size: SizeType;
  onSearch?: (
    value: string,
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>,
    info?: any
  ) => void;
}

const { Search } = Input;

const RegxInputSearch = ({
  placeholder,
  size,
  onSearch,
}: RegxInputSearchProp) => (
  <Space direction="vertical">
    <Search
      placeholder={placeholder}
      allowClear
      enterButton="Search"
      size={size}
      onSearch={onSearch}
    />
  </Space>
);

export default RegxInputSearch;
