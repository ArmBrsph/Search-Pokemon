import { GRAPHQL_SINGLE_QUERY } from "../constant/graphql.constant";

export const GetDetailPokemon = async (name: string) => {
  try {
    const response = await fetch("https://graphql-pokemon2.vercel.app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GRAPHQL_SINGLE_QUERY,
        variables: { name },
      }),
    });
    const data = await response.json();
    return data.data.pokemon;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
};
