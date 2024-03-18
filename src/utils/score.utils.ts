import { Score, ScoreList } from '../interfaces/match-data.interface';

export function isScoreList(score: Score | undefined): score is ScoreList {
  return !!score && typeof score !== 'string';
}

export function isScoreString(score: Score | undefined): score is string {
  return !!score && typeof score === 'string';
}

export function extractScoreListFromString(score: string): RegExpExecArray | null {
  return /([0-9]+:[0-9]+),([0-9]+:[0-9]+),([0-9]+:[0-9]+),([0-9]+:[0-9]+)/.exec(score);
}
