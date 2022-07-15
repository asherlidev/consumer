import { Category } from '../components/Pages/EventDetailPage/EventDetailPageContent';

const getAlgoliaUserInterestFacetFilters = (userInterests: Category[]): string[][] => {
  return [userInterests.map((x) => `festivalcategories.name: ${x.name}`)];
};

export default getAlgoliaUserInterestFacetFilters;
