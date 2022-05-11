import { SearchPanel } from "./search-panel";
import { List } from "./list";
import React, { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import * as qs from "qs";
import { useHttp } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const debouncedParams = useDebounce(params, 200);
  const [list, setList] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParams) }).then(setList);
  }, [debouncedParams]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel users={users} param={params} setParams={setParams} />
      <List users={users} list={list} />
    </div>
  );
};
