import { Market, sport } from "../type";
import fetch from "node-fetch";

type GetMarketsParams = {
  sport: sport;
};

const fetchFromApi = async (url: string): Promise<any> => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-Api-Key": process.env.OPTIC_API_KEY!,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Fetch failed: ${error}`);
    return null;
  }
};

const getMarkets = async ({
  sport,
}: GetMarketsParams): Promise<Market | string> => {
  if (!sport) {
    throw new Error("sport is required");
  }

  const url = `https://api.opticodds.com/api/v3/markets?sport=${sport}`;
  const data = await fetchFromApi(url);
  return data || "error";
};

const getSportsBooks = async (): Promise<void> => {
  const url = `https://api.opticodds.com/api/v3/sportsbook`;
  const data = await fetchFromApi(url);
  return data || "error";
};

const getLeagues = async ({ sport }: { sport: sport }): Promise<any> => {
  if (!sport) {
    throw new Error("sport is required");
  }

  const url = `https://api.opticodds.com/api/v3/leagues?sport=${sport}`;
  const data = await fetchFromApi(url);

  return data || "error";
};

const getFixtures = async ({ sport }: { sport: sport }): Promise<any> => {
  if (!sport) {
    throw new Error("sport is required");
  }

  const url = `https://api.opticodds.com/api/v3/fixtures?sport=${sport}`;
  const data = await fetchFromApi(url);
  return data || "error";
};

export { getMarkets, getSportsBooks, getLeagues, getFixtures };
