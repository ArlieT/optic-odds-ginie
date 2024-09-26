import { sport } from "../type";

type GetMarketsParams = {
  sport: sport;
};

type Market = {
  data: {
    id: string;
    name: string;
    sport: any[];
  }[];
};

const getMarkets = async ({
  sport,
}: GetMarketsParams): Promise<Market | string | undefined> => {
  const fetch = require("node-fetch");

  if (!sport) {
    throw new Error("sport is required");
  }

  const url = `https://api.opticodds.com/api/v3/markets?sport=${sport}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-Api-Key": process.env.OPTIC_API_KEY!,
    },
  };

  const response = await fetch(url, options);

  if (!response) {
    return "no response";
  }

  try {
    const data: Market = await response.json();
    return data;
  } catch (e) {
    console.log("error");
  }
};

const getSportsBooks = async () => {
  const fetch = require("node-fetch");

  const url = `https://api.opticodds.com/api/v3/sportsbook`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-Api-Key": process.env.OPTIC_API_KEY!,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error("error:" + err));
};

const getLeauges = async ({ sport }: { sport: sport }) => {
  const fetch = require("node-fetch");

  if (!sport) {
    throw new Error("sport is required");
  }

  const url = `https://api.opticodds.com/api/v3/leagues?sport=${sport}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-Api-Key": process.env.OPTIC_API_KEY!,
    },
  };

  const response = await fetch(url, options);

  if (!response) {
    return "no response";
  }

  try {
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("error");
  }
};

export { getMarkets, getSportsBooks, getLeauges };
