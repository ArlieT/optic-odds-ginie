import EventSource from "eventsource";
import { getLeagues, getMarkets, getFixtures } from "./fetch";

import { saveFixturesToExcel, saveMarketsToExcel } from "./lib/save-data";
import { Market } from "./type";

const sports = process.argv[2];

const url = `https://api.opticodds.com/api/v3/stream/${sports}/odds`;

async function connectToStream() {
  const markets = (await getMarkets({ sport: "soccer" })) as Market;
  const leagues = await getLeagues({ sport: "soccer" });
  const fixtures = await getFixtures({ sport: "soccer" });

  // saveMarketsToExcel({ markets });
  saveFixturesToExcel({ fixtures });

  const params = {
    key: process.env.OPTIC_API_KEY!,
    sportsbook: ["pinnacle"],
    market: ["team_total"],
    // league: ["saudi_arabia_-_saudi_league"],
    fixture: ["07D8948730ED"],
  };

  // Construct the query string with repeated parameters
  const queryString = new URLSearchParams();
  queryString.append("key", params.key);
  params.sportsbook.forEach((sportsbook) =>
    queryString.append("sportsbook", sportsbook)
  );
  params.market.forEach((market) => queryString.append("market", market));
  // params.league.forEach((league) => queryString.append("league", league));
  params.fixture.forEach((fixture) =>
    queryString.append("fixture_id ", fixture)
  );

  console.log(`${url}?${queryString.toString()}`);

  const eventSource = new EventSource(`${url}?${queryString.toString()}`);

  eventSource.onmessage = function (event) {
    console.log({ event });
    try {
      const data = JSON.parse(event.data);
      console.log("message data:", data);
    } catch (e) {
      console.log("Error parsing message data:", e);
    }
  };

  eventSource.addEventListener("odds", function (event) {
    const data = JSON.parse(event.data);
    console.log("odds data:", data);
  });

  eventSource.addEventListener("locked-odds", function (event) {
    const data = JSON.parse(event.data);
    console.log("locked-odds data:", data);
  });

  eventSource.onerror = function (event) {
    console.error("EventSource failed:", event);
    eventSource.close();
    setTimeout(connectToStream, 1000); // Attempt to reconnect after 1 second
  };
}

connectToStream();
