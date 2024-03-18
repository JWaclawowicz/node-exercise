import { getParsedMatches } from './app';
import { MATCHES } from './constants/matches-data.const';

const parsedMatches = getParsedMatches(MATCHES);

console.log(parsedMatches);
