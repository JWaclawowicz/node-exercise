import { Exception } from './enums/exception.enum';
import { MatchData } from './interfaces/match-data.interface';
import { ParsedMatchData } from './interfaces/parsed-match-data.interface';
import { EventParser } from './parsers/event-parser';

export function getParsedMatches(matches: MatchData[]): ParsedMatchData[] {
  if (!matches) return [];

  const matchesParsed = [];

  for (let i = 0; i < matches.length; i++) {
    const parser = new EventParser();
    const name = parser.makeEventName(matches[i]);
    const score = parser.formatScore(matches[i]);

    if (name !== Exception.INVALID_SPORT && score !== Exception.INVALID_SPORT) {
      matchesParsed.push({
        name,
        score,
      });
    }
  }

  return matchesParsed;
}
