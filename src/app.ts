import { MatchData } from './interfaces/match-data.interface';
import { ParsedMatchData } from './interfaces/parsed-match-data.interface';
import { isScoreString, extractScoreListFromString, isScoreList } from './utils/score.utils';

class EventParser {
  makeEventName(match: MatchData): string {
    if (match.sport === 'soccer') {
      return match.participant1 + ' - ' + match.participant2;
    } else if (match.sport === 'tennis') {
      return match.participant1 + ' vs ' + match.participant2;
    } else if (match.sport === 'volleyball') {
      return match.participant1 + ' - ' + match.participant2;
    } else if (match.sport === 'handball') {
      return match.participant1 + ' vs ' + match.participant2;
    } else if (match.sport === 'basketball') {
      return match.participant1 + ' - ' + match.participant2;
    } else {
      return 'Exception: invalid sport';
    }
  }

  formatScore(match: MatchData): string {
    if (match.sport === 'soccer') {
      if (!isScoreString(match.score)) return '';
      return match.score;
    } else if (match.sport === 'tennis') {
      if (!isScoreString(match.score)) return '';

      const scores = extractScoreListFromString(match.score);
      if (!scores) return '';

      const set1 = scores[2];
      const set2 = scores[3];
      const set3 = scores[4];

      return 'Main score: ' + scores[1] + ' (' + 'set1 ' + set1 + ', ' + 'set2 ' + set2 + ', ' + 'set3 ' + set3 + ')';
    } else if (match.sport === 'volleyball') {
      if (!isScoreString(match.score)) return '';

      const scores = extractScoreListFromString(match.score);
      if (!scores) return '';

      const set1 = scores[2];
      const set2 = scores[3];
      const set3 = scores[4];

      return 'Main score: ' + scores[1] + ' (' + 'set1 ' + set1 + ', ' + 'set2 ' + set2 + ', ' + 'set3 ' + set3 + ')';
    } else if (match.sport === 'basketball') {
      if (!isScoreList(match.score)) return '';
      return match.score[0][0] + ',' + match.score[0][1] + ',' + match.score[1][0] + ',' + match.score[1][1];
    } else if (match.sport === 'handball') {
      if (!isScoreString(match.score)) return '';
      return match.score;
    } else {
      return 'Exception: invalid sport';
    }
  }
}

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
