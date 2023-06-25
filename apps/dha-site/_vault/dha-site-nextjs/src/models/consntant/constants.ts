export const GIPHY_URL_BASE: string = 'https://api.giphy.com/v1' as string;
export const GIPHY_URL_SUFFIX: string = '/gifs/random' as string;
// TODO: move these to (private) config file?
export const GIPHY_API_KEY: string =
  'yVQGPhzgZVPU8akxqTTWRhGeE1BwU9rx' as string;
export const GIPHY_SEARCH_TERM: string = 'cute animal' as string;

export const PETFINDER_API_KEY: string =
  '607dKyjNRBrIDQw7hgdNvIB5KENeKUBBoCu6Rw9Bg9WyX7hBZa' as string;
export const PETFINDER_SECRET_KEY: string =
  'I9JXkM1iaJk2JeVUnQqyC6pmXmrFOJlWsgQquBbm' as string;
export const PETFINDER_URL_BASE: string = 'http://api.petfinder.com' as string;
export const PETFINDER_URL_SUFFIX: string = '/pet.getRandom' as string;

export const PLACERHOLDER_IMAGE_URL: string =
  "https://via.placeholder.com/400/000000/ffffff/?text=Don't+Hurt+Animals" as string;

export const SEARCH_PROMPT: string = 'Rescue a new friend!' as string;

export const SEARCH_FIND_PET_LABEL: string = 'find pet' as string;
export const SEARCH_FIND_LOCALS_LABEL: string = 'list local groups' as string;

export const SEARCH_LOCATION_TOOLTIP_FRAGMENTS: string[] = [
  '*USA or CANADA only.',
  '*for USA, search by CITY, STATE or ZIP CODE.',
  '  (e.g. denver, co)',
  '  (e.g. 80202)',
  '*for CANADA, search by CITY, PROVINCE or POSTAL CODE.',
  '  (e.g. toronto, on)',
  '  (e.g. m5a 2s1 .....space required!)',
] as string[];

export const SEARCH_LOCATION_DEFAULT_INPUT_TEXT: string =
  'denver, co' as string;

export const SEARCH_GENDER_OPTIONS: string[] = ['male', 'female'] as string[];

export const SEARCH_SIZE_OPTIONS: string[] = [
  'small',
  'medium',
  'large',
  'xlarge',
] as string[];

export const SEARCH_DISTANCE_OPTIONS: string[] = [
  '1',
  '5',
  '10',
  '20',
] as string[];

export const SEARCH_ANY_LABEL: string = 'any' as string;

export const SEARCH_ORG_LIST_QUERY_PAGE_SIZE: number = 20 as number;
export const SEARCH_ORG_LIST_DISPLAY_PAGE_SIZE: number = 10 as number;
