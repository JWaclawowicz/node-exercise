import { MatchData } from './interfaces/match-data.interface';
import { ParsedMatchData } from './interfaces/parsed-match-data.interface';
import { EventParser } from './parsers/event-parser';

export function getParsedMatches(matches: MatchData[]): ParsedMatchData[] {
  const matchesParsed = [];

  for (let i = 0; i < matches.length; i++) {
    const parser = new EventParser();
    const name = parser.makeEventName(matches[i]);
    const score = parser.formatScore(matches[i]);

    if (name !== 'Exception: invalid sport' && score !== 'Exception: invalid sport') {
      matchesParsed.push({
        name,
        score,
      });
    }
  }

  return matchesParsed;
}
