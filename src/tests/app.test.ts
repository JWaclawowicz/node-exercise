import { getParsedMatches } from '../app';
import { MatchData } from '../interfaces/match-data.interface';
import { ParsedMatchData } from '../interfaces/parsed-match-data.interface';
import { MOCKS_MATCHES } from './mock-data/matches.const';

describe('app.ts', (): void => {
  let matches: MatchData[];

  beforeEach((): void => {
    matches = MOCKS_MATCHES;
  });

  describe('getParsedMatches', (): void => {
    it('should return correctly parsed matches for a given match list', (): void => {
      const result: ParsedMatchData[] = [
        {
          name: 'Chelsea - Arsenal',
          score: '2:1',
        },
        {
          name: 'Germany - France',
          score: 'Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)',
        },
        {
          name: 'Pogoń Szczeciń vs Azoty Puławy',
          score: '34:26',
        },
        {
          name: 'GKS Tychy - GKS Katowice',
          score: '9:7,2:1,5:3,9:9',
        },
        {
          name: 'Maria Sharapova vs Serena Williams',
          score: 'Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)',
        },
      ];
      expect(getParsedMatches(matches)).toEqual(result);
    });

    it('should return empty parsed matches for empty match list', (): void => {
      expect(getParsedMatches([])).toEqual([]);
    });
  });
});
