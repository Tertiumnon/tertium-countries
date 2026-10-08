import {
  getCountryByName,
  getCountryByAlpha2,
  getCountryByAlpha3,
  getCountryByNumeric,
  getCountries,
  getLanguages,
  getPopularLanguages,
} from '../src/index';

test('find by name', () => {
  expect(getCountryByName('Afghanistan')).toEqual({
    name: 'Afghanistan',
    numeric: '004',
    alpha2: 'AF',
    alpha3: 'AFG',
    dial: ['+93'],
    image: './images/AF.svg',
  });
});

test('find by localized name', () => {
  expect(getCountryByName('Россия', 'ru')).toEqual({
    name: 'Россия',
    numeric: '643',
    alpha2: 'RU',
    alpha3: 'RUS',
    dial: ['+7'],
    image: './images/RU.svg',
  });
});

test('find by localized name in all popular locales', () => {
  const cases: Array<[string, string]> = [
    ['中国', 'zh'],
    ['भारत', 'hi'],
    ['España', 'es'],
    ['France', 'fr'],
    ['مصر', 'ar'],
    ['বাংলাদেশ', 'bn'],
    ['Brasil', 'pt'],
    ['پاکستان', 'ur'],
    ['Indonesia', 'id'],
    ['Deutschland', 'de'],
    ['日本', 'ja'],
    ['भारत', 'mr'],
    ['భారతదేశం', 'te'],
    ['Türkiye', 'tr'],
    ['일본', 'ko'],
    ['Việt Nam', 'vi'],
    ['Italia', 'it'],
    ['ایران', 'fa'],
  ];
  for (const [name, locale] of cases) {
    expect(getCountryByName(name, locale).name).toBe(name);
  }
});

test('does not mutate the shared data', () => {
  const before = getCountries()[0];
  getCountryByName('Афганистан', 'ru');
  expect(getCountries()[0]).toEqual(before);
});

test('throws on unknown country', () => {
  expect(() => getCountryByName('Atlantis')).toThrow('Unknown country: Atlantis');
});

test('find by alpha2', () => {
  expect(getCountryByAlpha2('AF').name).toBe('Afghanistan');
});

test('find by alpha3', () => {
  expect(getCountryByAlpha3('AFG').name).toBe('Afghanistan');
});

test('find by numeric', () => {
  expect(getCountryByNumeric('004').name).toBe('Afghanistan');
});

test('getCountries', () => {
  const countries = getCountries();
  expect(countries).toHaveLength(249);
  expect(countries[0]).toEqual({
    name: 'Afghanistan',
    numeric: '004',
    alpha2: 'AF',
    alpha3: 'AFG',
    dial: ['+93'],
  });
});

test('getLanguages', () => {
  const languages = getLanguages();
  expect(languages).toHaveLength(183);
  expect(languages[0]).toEqual({
    name: 'Abkhazian',
    code: 'ab',
  });
});

test('getPopularLanguages', () => {
  const popular = getPopularLanguages();
  expect(popular).toHaveLength(20);
  expect(popular[0]).toEqual({
    name: 'English',
    code: 'en',
  });
  expect(popular.every((l) => getLanguages().some((x) => x.code === l.code))).toBe(true);
});
