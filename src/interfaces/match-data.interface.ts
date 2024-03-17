export interface MatchData {
  sport: string;
  participant1?: string;
  participant2?: string;
  score?: Score;
}

type Score = string | ScoreList;

type ScoreList = string[][];
