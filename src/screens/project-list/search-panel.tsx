import { Input, Select } from "antd";
import React from "react";
const { Option } = Select;

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}
interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParams: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({ users, param, setParams }: SearchPanelProps) => {
  return (
    <form action="">
      <div>
        <Input
          type="text"
          value={param.name}
          onChange={(evt) => setParams({ ...param, name: evt.target.value })}
        />
        <Select
          value={param.personId}
          onChange={(value) => setParams({ ...param, personId: value })}
        >
          <Option value="">负责人</Option>
          {users.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </Select>
      </div>
    </form>
  );
};
