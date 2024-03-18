export interface MatchData {
  sport: string;
  participant1?: string;
  participant2?: string;
  score?: Score;
}

export type Score = string | ScoreList;

export type ScoreList = string[][];
