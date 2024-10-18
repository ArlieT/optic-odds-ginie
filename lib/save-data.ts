import xlsx from "xlsx";
import fs from "fs";
import { Market } from "../type";
import { Fixture } from "../types/fixture";

type ExcelData = {
  Market: string;
  Sport: string;
  League: string;
  SportsBook: string;
};

async function saveMarketsToExcel({ markets }: { markets: Market }) {
  // Prepare an array to store flattened data for each league

  const excelData: ExcelData[] = [];

  // Flatten the data structure
  for (const market of markets.data) {
    for (const sport of market.sports) {
      for (const league of sport.leagues) {
        for (const sportsBook of league.sportsbooks) {
          excelData.push({
            Sport: sport.id,
            Market: market.id,
            League: league.id,
            SportsBook: sportsBook.id,
          });
        }
      }
    }
  }

  // Create a new worksheet
  const worksheet = xlsx.utils.json_to_sheet(excelData);

  // Create a new workbook
  const workbook = xlsx.utils.book_new();

  // Append the worksheet to the workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, "Markets Data");

  // Write the workbook to a file
  xlsx.writeFile(workbook, "./data/markets_data.xlsx");

  console.log("Data saved to markets_data.xlsx");
}

async function saveFixturesToExcel({ fixtures }: { fixtures: Fixture }) {
  const excelData: any = [];
  fixtures.data.forEach((fixture) => {
    excelData.push({
      id: fixture.id,
      home: fixture.home_team_display,
      away: fixture.away_team_display,
      is_live: fixture.is_live,
      status: fixture.status,
      sport: fixture.sport.id,
    });
  });

  fs.writeFileSync("fixtures.json", JSON.stringify(excelData, null, 2));

  const worksheet = xlsx.utils.json_to_sheet(excelData);

  const workbook = xlsx.utils.book_new();

  xlsx.utils.book_append_sheet(workbook, worksheet, "Fixtures Data");

  xlsx.writeFile(workbook, "./data/fixtures_data.xlsx");
}

export { saveMarketsToExcel, saveFixturesToExcel };
