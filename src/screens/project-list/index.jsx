import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { React, useEffect,useState } from "react"
import { cleanObject, useMount, useDebounce } from "utils"
import * as qs from 'qs'

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [params, setParams] = useState({
    name:'',
    personId: ''
  })
  const debouncedParams = useDebounce(params, 2000)
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParams))}`).then(async response => {
      if(response.ok) {
        setList(await response.json())
      }
    })
  }, [debouncedParams])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if(response.ok) {
        setUsers(await response.json())
      }
    })
  })
  return <div>
    <SearchPanel users={users} params={params} setParams={setParams}/>
    <List users={users} list={list}/>
  </div>
}