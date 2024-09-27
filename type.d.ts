export type sport =
  | "soccer"
  | "basketball"
  | "hockey"
  | "volleyball"
  | "baseball";

export type Sports = {
  id: string;
  name: string;
  leagues: {
    id: string;
    name: string;
    sportsbooks: {
      id: string;
      name: string;
    }[];
  }[];
};

export type Market = {
  data: {
    id: string;
    name: string;
    sports: Sports[];
  }[];
};
