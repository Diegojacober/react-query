import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import api from "../../services/api";

const initialUrl = "https://swapi.dev/api/species/";

const { data } = api.get<SpecieProps>("/species/");

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  return <InfiniteScroll />;
}
