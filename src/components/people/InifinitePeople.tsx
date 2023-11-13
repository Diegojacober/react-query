import InfiniteScroll from 'react-infinite-scroller';
import { Person } from "./Person";
import api from '../../services/api';

const { data } = api.get<PersonProps>("/people/")

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  return <InfiniteScroll />;
}
