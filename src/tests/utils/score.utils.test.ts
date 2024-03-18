import { Score } from '../../interfaces/match-data.interface';
import { extractScoreListFromString, isScoreList, isScoreString } from '../../utils/score.utils';

describe('score utils', (): void => {
  describe('isScoreList', (): void => {
    it('should return true when score is of type ScoreList', (): void => {
      const score: Score = [
        ['9:7', '2:1'],
        ['5:3', '9:9'],
      ];
      expect(isScoreList(score)).toBeTruthy();
    });

    it('should return false when score is a string', (): void => {
      const score: Score = '2:1,7:6,6:3,6:7';
      expect(isScoreList(score)).toBeFalsy();
    });

    it('should return false when score is not available', (): void => {
      expect(isScoreList(undefined)).toBeFalsy();
    });
  });

  describe('isScoreString', (): void => {
    it('should return true when score is a string', (): void => {
      const score: Score = '2:1,7:6,6:3,6:7';
      expect(isScoreString(score)).toBeTruthy();
    });

    it('should return false when score is of type ScoreList', (): void => {
      const score: Score = [
        ['9:7', '2:1'],
        ['5:3', '9:9'],
      ];
      expect(isScoreString(score)).toBeFalsy();
    });

    it('should return false when score is not available', (): void => {
      expect(isScoreString(undefined)).toBeFalsy();
    });
  });

  describe('extractScoreListFromString', (): void => {
    it('should return score array when score is a string', (): void => {
      const scores = extractScoreListFromString('2:1,7:6,6:3,6:7');
      expect(scores?.[0]).toBe('2:1,7:6,6:3,6:7');
      expect(scores?.[1]).toBe('2:1');
      expect(scores?.[2]).toBe('7:6');
      expect(scores?.[3]).toBe('6:3');
      expect(scores?.[4]).toBe('6:7');
    });

    it('should return null when score is an empty string', (): void => {
      const scores = extractScoreListFromString('');
      expect(scores).toBeNull();
    });

    it('should return null when score string has less than 4 scores', (): void => {
      const scores = extractScoreListFromString('2:1,7:6,7:6');
      expect(scores).toBeNull();
    });
  });
});
