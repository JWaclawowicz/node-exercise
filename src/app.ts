import { MATCHES } from './constants/matches-data.const';

const matches = MATCHES;

class EventParser {
  makeEventName(match) {
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

  formatScore(match) {
    if (match.sport === 'soccer') {
      return match.score;
    } else if (match.sport === 'tennis') {
      var scores = /([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+)/.exec(match.score);
      var set1 = scores[2];
      var set2 = scores[3];
      var set3 = scores[4];

      return 'Main score: ' + scores[1] + ' (' + 'set1 ' + set1 + ', ' + 'set2 ' + set2 + ', ' + 'set3 ' + set3 + ')';
    } else if (match.sport === 'volleyball') {
      var scores = /([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+)/.exec(match.score);
      var set1 = scores[2];
      var set2 = scores[3];
      var set3 = scores[4];

      return 'Main score: ' + scores[1] + ' (' + 'set1 ' + set1 + ', ' + 'set2 ' + set2 + ', ' + 'set3 ' + set3 + ')';
    } else if (match.sport === 'basketball') {
      return match.score[0][0] + ',' + match.score[0][1] + ',' + match.score[1][0] + ',' + match.score[1][1];
    } else if (match.sport === 'handball') {
      return match.score;
    } else {
      return 'Exception: invalid sport';
    }
  }
}

let matchesParsed = [];

for (var i = 0; i < matches.length; i++) {
  let parser = new EventParser();
  let name = parser.makeEventName(matches[i]);
  let score = parser.formatScore(matches[i]);

  if (name !== 'Exception: invalid sport' && score !== 'Exception: invalid sport') {
    matchesParsed.push({
      name,
      score,
    });
  }
}

console.log(matchesParsed);
