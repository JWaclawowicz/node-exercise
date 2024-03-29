import { Exception } from '../enums/exception.enum';
import { MatchData } from '../interfaces/match-data.interface';
import { isScoreString, extractScoreListFromString, isScoreList } from '../utils/score.utils';

export class EventParser {
  public makeEventName(match: MatchData): string {
    const participant1 = match.participant1 ?? '';
    const participant2 = match.participant2 ?? '';

    switch (match.sport) {
      case 'soccer':
      case 'volleyball':
      case 'basketball':
        return participant1 + ' - ' + participant2;
      case 'tennis':
      case 'handball':
        return participant1 + ' vs ' + participant2;
      default:
        return Exception.INVALID_SPORT;
    }
  }

  public formatScore(match: MatchData): string {
    switch (match.sport) {
      case 'soccer':
      case 'handball': {
        if (!isScoreString(match.score)) return '';
        return match.score;
      }
      case 'tennis':
      case 'volleyball': {
        if (!isScoreString(match.score)) return '';

        const scores = extractScoreListFromString(match.score);

        if (!scores) return '';

        return (
          'Main score: ' +
          scores[1] +
          ' (' +
          'set1 ' +
          scores[2] +
          ', ' +
          'set2 ' +
          scores[3] +
          ', ' +
          'set3 ' +
          scores[4] +
          ')'
        );
      }
      case 'basketball': {
        if (!isScoreList(match.score)) return '';

        return (
          (match.score[0][0] ?? '') +
          ',' +
          (match.score[0][1] ?? '') +
          ',' +
          (match.score[1][0] ?? '') +
          ',' +
          (match.score[1][1] ?? '')
        );
      }
      default:
        return Exception.INVALID_SPORT;
    }
  }
}
