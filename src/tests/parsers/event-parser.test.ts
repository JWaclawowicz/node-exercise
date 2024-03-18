import { Exception } from '../../enums/exception.enum';
import { MatchData } from '../../interfaces/match-data.interface';
import { EventParser } from '../../parsers/event-parser';

describe('EventParser', (): void => {
  let parser: EventParser;

  beforeEach((): void => {
    parser = new EventParser();
  });

  describe('makeEventName', (): void => {
    describe('when sport is soccer', (): void => {
      it('should return the event name with a dash', (): void => {
        const match: MatchData = {
          sport: 'soccer',
          participant1: 'Chelsea',
          participant2: 'Arsenal',
          score: '2:1',
        };
        expect(parser.makeEventName(match)).toBe('Chelsea - Arsenal');
      });

      it('should return a dash when participants are not available', (): void => {
        const match: MatchData = {
          sport: 'soccer',
        };
        expect(parser.makeEventName(match)).toBe(' - ');
      });
    });

    describe('when sport is volleyball', (): void => {
      it('should return the event name with a dash', (): void => {
        const match: MatchData = {
          sport: 'volleyball',
          participant1: 'Germany',
          participant2: 'France',
          score: '3:0,25:23,25:19,25:21',
        };
        expect(parser.makeEventName(match)).toBe('Germany - France');
      });
    });

    describe('when sport is handball', (): void => {
      it('should return the event name with the string vs', (): void => {
        const match: MatchData = {
          sport: 'handball',
          participant1: 'Pogoń Szczeciń',
          participant2: 'Azoty Puławy',
          score: '34:26',
        };
        expect(parser.makeEventName(match)).toBe('Pogoń Szczeciń vs Azoty Puławy');
      });

      it('should return the string vs when participants are not available', (): void => {
        const match: MatchData = {
          sport: 'handball',
        };
        expect(parser.makeEventName(match)).toBe(' vs ');
      });
    });

    describe('when sport is basketball', (): void => {
      it('should return the event name with a dash', (): void => {
        const match: MatchData = {
          sport: 'basketball',
          participant1: 'GKS Tychy',
          participant2: 'GKS Katowice',
          score: [
            ['9:7', '2:1'],
            ['5:3', '9:9'],
          ],
        };
        expect(parser.makeEventName(match)).toBe('GKS Tychy - GKS Katowice');
      });
    });

    describe('when sport is tennis', (): void => {
      it('should return the event name with the string vs', (): void => {
        const match: MatchData = {
          sport: 'tennis',
          participant1: 'Maria Sharapova',
          participant2: 'Serena Williams',
          score: '2:1,7:6,6:3,6:7',
        };
        expect(parser.makeEventName(match)).toBe('Maria Sharapova vs Serena Williams');
      });
    });

    describe('when sport is ski jumping', (): void => {
      it('should return an exception message', (): void => {
        const match: MatchData = {
          sport: 'ski jumping',
        };
        expect(parser.makeEventName(match)).toBe(Exception.INVALID_SPORT);
      });
    });

    describe('when sport is not available', (): void => {
      it('should return an exception message', (): void => {
        const match: MatchData = {
          sport: '',
        };
        expect(parser.makeEventName(match)).toBe(Exception.INVALID_SPORT);
      });
    });
  });

  describe('formatScore', (): void => {
    describe('when sport is soccer', (): void => {
      it('should return a single score', (): void => {
        const match: MatchData = {
          sport: 'soccer',
          participant1: 'Chelsea',
          participant2: 'Arsenal',
          score: '2:1',
        };
        expect(parser.formatScore(match)).toBe('2:1');
      });

      it('should return an empty string when score is not available', (): void => {
        const match: MatchData = {
          sport: 'soccer',
        };
        expect(parser.formatScore(match)).toBe('');
      });
    });

    describe('when sport is volleyball', (): void => {
      it('should return a main score and scores of individual sets', (): void => {
        const match: MatchData = {
          sport: 'volleyball',
          participant1: 'Germany',
          participant2: 'France',
          score: '3:0,25:23,25:19,25:21',
        };
        expect(parser.formatScore(match)).toBe('Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)');
      });

      it('should return an empty string when score is not available', (): void => {
        const match: MatchData = {
          sport: 'volleyball',
        };
        expect(parser.formatScore(match)).toBe('');
      });
    });

    describe('when sport is handball', (): void => {
      it('should return a single score', (): void => {
        const match: MatchData = {
          sport: 'handball',
          participant1: 'Pogoń Szczeciń',
          participant2: 'Azoty Puławy',
          score: '34:26',
        };
        expect(parser.formatScore(match)).toBe('34:26');
      });
    });

    describe('when sport is basketball', (): void => {
      it('should return multiple scores', (): void => {
        const match: MatchData = {
          sport: 'basketball',
          participant1: 'GKS Tychy',
          participant2: 'GKS Katowice',
          score: [
            ['9:7', '2:1'],
            ['5:3', '9:9'],
          ],
        };
        expect(parser.formatScore(match)).toBe('9:7,2:1,5:3,9:9');
      });

      it('should return an empty string when score is not available', (): void => {
        const match: MatchData = {
          sport: 'basketball',
        };
        expect(parser.formatScore(match)).toBe('');
      });
    });

    describe('when sport is tennis', (): void => {
      it('should return a main score and scores of individual sets', (): void => {
        const match: MatchData = {
          sport: 'tennis',
          participant1: 'Maria Sharapova',
          participant2: 'Serena Williams',
          score: '2:1,7:6,6:3,6:7',
        };
        expect(parser.formatScore(match)).toBe('Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)');
      });
    });

    describe('when sport is ski jumping', (): void => {
      it('should return an exception message', (): void => {
        const match: MatchData = {
          sport: 'ski jumping',
        };
        expect(parser.formatScore(match)).toBe(Exception.INVALID_SPORT);
      });
    });

    describe('when sport is not available', (): void => {
      it('should return an exception message', (): void => {
        const match: MatchData = {
          sport: '',
        };
        expect(parser.formatScore(match)).toBe(Exception.INVALID_SPORT);
      });
    });
  });
});
