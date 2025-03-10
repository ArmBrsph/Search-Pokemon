import { Suspense } from "react";
import SearchPokemon from "./search-pokemon";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPokemon />
    </Suspense>
  );
}
