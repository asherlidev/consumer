import UserInterests from '../../../test/factories/UserInterests';
import getAlgoliaUserInterestFacetFilters from '../getAlgoliaUserInterestFacetFilters';

describe('getAlgoliaUserInterestFacetFilters', () => {
  it('returns a list of a list of interests prefixed with festivalcategories.name', () => {
    const interestCount = 5;
    const interests = UserInterests.buildList(interestCount);
    const facetFilters = getAlgoliaUserInterestFacetFilters(interests);
    expect(facetFilters).toHaveLength(1);
    expect(facetFilters[0]).toHaveLength(interestCount);
    expect(facetFilters[0].every((i) => i.includes('festivalcategories.name: '))).toBe(true);
  });
});
