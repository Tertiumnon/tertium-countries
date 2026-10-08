import { COUNTRIES, Country } from './data/countries';
import { AR } from './data/countries.ar';
import { BN } from './data/countries.bn';
import { DE } from './data/countries.de';
import { ES } from './data/countries.es';
import { FA } from './data/countries.fa';
import { FR } from './data/countries.fr';
import { HI } from './data/countries.hi';
import { ID } from './data/countries.id';
import { IT } from './data/countries.it';
import { JA } from './data/countries.ja';
import { KO } from './data/countries.ko';
import { MR } from './data/countries.mr';
import { PT } from './data/countries.pt';
import { RU } from './data/countries.ru';
import { TE } from './data/countries.te';
import { TR } from './data/countries.tr';
import { UR } from './data/countries.ur';
import { VI } from './data/countries.vi';
import { ZH } from './data/countries.zh';
import { LANGUAGES, Language } from './data/languages';
import { POPULAR_LANGUAGES } from './data/popular-languages';

export type { Country, Language };

export const getCountries = (): Country[] => COUNTRIES;

export const getLanguages = (): Language[] => LANGUAGES;

export const getPopularLanguages = (): Language[] => POPULAR_LANGUAGES;

const getFlagImage = (alpha2: string): string => `./images/${alpha2}.svg`;

const toLocalizedCountry = (country: Country, name: string): Country => ({
  ...country,
  name,
  image: getFlagImage(country.alpha2),
});

const LOCALIZED: Record<string, Country[]> = {
  ar: AR,
  bn: BN,
  de: DE,
  es: ES,
  fa: FA,
  fr: FR,
  hi: HI,
  id: ID,
  it: IT,
  ja: JA,
  ko: KO,
  mr: MR,
  pt: PT,
  ru: RU,
  te: TE,
  tr: TR,
  ur: UR,
  vi: VI,
  zh: ZH,
};

export const getCountryByName = (name: string, locale = 'en'): Country => {
  const localized = (LOCALIZED[locale] ?? COUNTRIES).find(
    (c) => c.name === name,
  );
  if (!localized) {
    throw new Error(`Unknown country: ${name}`);
  }
  const country = COUNTRIES.find((c) => c.alpha2 === localized.alpha2);
  if (!country) {
    throw new Error(`Unknown country: ${name}`);
  }
  return toLocalizedCountry(country, localized.name);
};

export const getCountryByAlpha2 = (alpha2: string): Country => {
  const country = COUNTRIES.find((c) => c.alpha2 === alpha2);
  if (!country) {
    throw new Error(`Unknown country: ${alpha2}`);
  }
  return toLocalizedCountry(country, country.name);
};

export const getCountryByAlpha3 = (alpha3: string): Country => {
  const country = COUNTRIES.find((c) => c.alpha3 === alpha3);
  if (!country) {
    throw new Error(`Unknown country: ${alpha3}`);
  }
  return toLocalizedCountry(country, country.name);
};

export const getCountryByNumeric = (numeric: string): Country => {
  const country = COUNTRIES.find((c) => c.numeric === numeric);
  if (!country) {
    throw new Error(`Unknown country: ${numeric}`);
  }
  return toLocalizedCountry(country, country.name);
};
