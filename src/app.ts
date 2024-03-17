import { MatchData } from './interfaces/match-data.interface';

class EventParser {
  makeEventName(match: MatchData) {
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

  formatScore(match: MatchData) {
    if (match.sport === 'soccer') {
      return match.score;
      // TODO: uncomment after solving problems
      // } else if (match.sport === 'tennis') {
      //   var scores = /([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+)/.exec(match.score);
      //   var set1 = scores[2];
      //   var set2 = scores[3];
      //   var set3 = scores[4];

      //   return 'Main score: ' + scores[1] + ' (' + 'set1 ' + set1 + ', ' + 'set2 ' + set2 + ', ' + 'set3 ' + set3 + ')';
      // } else if (match.sport === 'volleyball') {
      //   var scores = /([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+)/.exec(match.score);
      //   var set1 = scores[2];
      //   var set2 = scores[3];
      //   var set3 = scores[4];

      //   return 'Main score: ' + scores[1] + ' (' + 'set1 ' + set1 + ', ' + 'set2 ' + set2 + ', ' + 'set3 ' + set3 + ')';
      // } else if (match.sport === 'basketball') {
      //   return match.score[0][0] + ',' + match.score[0][1] + ',' + match.score[1][0] + ',' + match.score[1][1];
    } else if (match.sport === 'handball') {
      return match.score;
    } else {
      return 'Exception: invalid sport';
    }
  }
}

// TODO: add correct return type: ParsedMatchData[]
export function getParsedMatches(matches: MatchData[]): unknown {
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
