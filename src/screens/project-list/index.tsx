import { SearchPanel } from "./search-panel";
import { List, Project } from "./list";
import React, { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce, useDocumentTitle } from "utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { Typography } from "antd";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const debouncedParams = useDebounce(params, 200);

  useDocumentTitle("项目列表", false);

  const { isLoading, error, data: list } = useProjects(debouncedParams);

  const { data: users } = useUser(debouncedParams);
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={params} setParams={setParams} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
