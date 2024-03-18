import { MatchData } from '../interfaces/match-data.interface';
import { isScoreString, extractScoreListFromString, isScoreList } from '../utils/score.utils';

export class EventParser {
  public makeEventName(match: MatchData): string {
    switch (match.sport) {
      case 'soccer':
      case 'volleyball':
      case 'basketball':
        return match.participant1 + ' - ' + match.participant2;
      case 'tennis':
      case 'handball':
        return match.participant1 + ' vs ' + match.participant2;
      default:
        return 'Exception: invalid sport';
    }
  }

  public formatScore(match: MatchData): string {
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
