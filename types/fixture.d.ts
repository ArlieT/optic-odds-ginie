type Team = {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
};

type Sport = {
  id: string;
  name: string;
};

type League = {
  id: string;
  name: string;
};

type Result = {
  scores: {
    home: {
      total: number;
    };
    away: {
      total: number;
    };
  };
  in_play_data: {
    period: string | null;
    clock: string | null;
    last_play: string | null;
  };
};

type Lineup = {
  home: Team[];
  away: Team[];
};

type SourceIds = Record<string, unknown>;

type Game = {
  id: string;
  game_id: string;
  start_date: string;
  home_competitors: Team[];
  away_competitors: Team[];
  home_team_display: string;
  away_team_display: string;
  status: string;
  is_live: boolean;
  sport: Sport;
  league: League;
  home_starter: string | null;
  home_record: string;
  home_seed: string | null;
  home_rotation_number: string | null;
  away_starter: string | null;
  away_record: string;
  away_seed: string | null;
  away_rotation_number: string | null;
  tournament: string | null;
  tournament_stage: string | null;
  has_odds: boolean;
  venue_name: string;
  venue_location: string;
  venue_neutral: boolean;
  broadcast: string;
  result: Result;
  lineups: Lineup;
  season_type: string;
  season_year: string;
  season_week: string;
  weather: string | null;
  weather_temp: string | null;
  source_ids: SourceIds;
};

export type Fixture = {
  data: Game[];
};
