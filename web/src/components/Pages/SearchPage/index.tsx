import { useLocation } from '@reach/router';
import { graphql, navigate, PageProps } from 'gatsby';
import { map, sortBy, toString } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { parse, stringifyUrl } from 'query-string';
import { SearchPageQuery } from '../../../../graphql-types';
import { RestEvent } from '../../../context/user/UserProvider';
import { Footer, Header, PageWrapper } from '../../Layout';
import { Category } from '../EventDetailPage/EventDetailPageContent';
import { searchIndexes } from '../../../utils/algoliaClient';
import EventCards from '../../Elements/EventCards/EventCards';
import VenueCards from '../../Elements/VenueCards/VenueCards';
import TalentCards from '../../Elements/TalentCards/TalentCards';
import { Talent } from '../TalentDetailPage';
import { Venue } from '../../Pages/VenueDetailPage';
import { CategoryTag } from '../../Elements';
import locations from '../../../utils/cities';
import * as S from './styles';

import CardSearch from '../../Elements/CardSearch';
import Tags from '../../Elements/Tags';
import DropDownModal from '../../Elements/DropDownModal';
import DateInputSearch from './../../Elements/DateInputSearch/index';
import CatogoriesSelect from './../../Elements/categoriesSelect';
import CreditsInputRange from './../../Elements/CreditsInputRange';
import LocationSearch from './../../Elements/LocationSearch';

const SearchPage: React.FC<PageProps<SearchPageQuery, { categories: Category[] }>> = ({
  data,
  pageContext,
}) => {
  const { t } = useTranslation();
  const { search } = useLocation();

  const mainCategories = [
    {
      id: 'kgkdgs',
      name: 'All tags',
      isBaseCategory: true,
    },
    ...pageContext.categories,
  ];

  const prevSearch = useRef<{ query?: string }>();

  // const [fetchingResults, setFetchingResults] = useState<boolean>(false);
  // const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const [events, setEvents] = useState<RestEvent[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [talent, setTalent] = useState<Talent[]>([]);
  const [movies, setMovies] = useState<Venue[]>([]);
  const [organizers, setOrganizers] = useState<Venue[]>([]);

  // const [categoriesExpanded, setCategoriesExpanded] = useState(false);

  const [activeTag, setActiveTag] = useState<string>('All tags');
  const [tagsArray, setTagsArray] = useState<string[]>([]);
  const [isShowMoreTagOpen, setIsShowmoreTagOpen] = useState<boolean>(false);

  const [location, setLocation] = useState<string>('');
  const [displyLocation, setDisplyLocation] = useState<string>('');
  const [categorySelect, setCategorySelect] = useState<string>('');

  const [isFilter, setIsFilter] = useState<boolean>(false);

  const [credits, setCredits] = useState([0, 1000]);

  const [creditsValue, setCreditsValue] = useState<number[]>([]);
  const [creditInputVal, setCreditInputVal] = useState('');

  const [dateRange, setDateRange] = useState<
    {
      startDate?: Date;
      endDate?: Date;
      key?: string;
    }[]
  >([
    {
      startDate: undefined,
      endDate: undefined,
      key: 'selection',
    },
  ]);

  const [options, setOption] = useState<
    {
      label?: string;
      value?: string;
    }[]
  >([]);

  const filterLocations = (inputValue: string) => {
    return locations
      .filter((i) => i.name.toLowerCase().includes(inputValue.toLowerCase()))
      .map((loc) => {
        return { label: loc.name, latitude: loc.latitude, longitude: loc.longitude };
      });
  };

  const getOptionValueBuiltin = (option: {
    label: string;
    latitude: number;
    longitude: number;
  }) => {
    const location = toString(option.latitude) + ',' + toString(option.longitude);
    setLocation(location);
    setDisplyLocation(option.label);
  };

  const promiseOptions = (inputValue: string) =>
    new Promise((resolve) => {
      resolve(filterLocations(inputValue));
    });

  const onChangeCredits = (val: number[]) => {
    setCredits(val);
  };

  const onClickSaveHandler = () => {
    setCreditsValue(credits);
  };

  const SelectTagHandler = (tagName: string) => {
    setActiveTag(tagName);
  };

  const returnArrayKey = (key: any) => {
    const typeValueTemp: string[] = [];
    if (key != undefined) {
      Object.keys(key).forEach(function (key, value) {
        typeValueTemp.push(key);
      });
    }
    return typeValueTemp;
  };

  const fatchTagsHandler = async () => {
    try {
      const algolia = await import('../../../utils/algoliaClient');
      const indexes = algolia.searchIndexes;
      // setFetchingResults(true);

      const allSearch = await algolia.client.initIndex(indexes.events);

      const config = {};
      config.facets = ['festivalcategories.name'];

      const searched = await allSearch.search('', config);

      const tags = returnArrayKey(searched.facets?.['festivalcategories.name']);

      setTagsArray(['All tags', ...tags]);
      const catOption = tags.map((c: string) => ({ label: c, value: c }));
      const allCategoriesTag = {
        label: `${t('search.categories.all')}`,
        value: `${t('search.categories.all')}`,
      };
      setOption([allCategoriesTag, ...catOption]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fatchTagsHandler();
  }, []);

  const { q: query } = useMemo(() => parse(search), [search]);

  const { f: filter } = useMemo(() => parse(search), [search]);

  useEffect(() => {
    setIsFilter(filter === 'true' ? true : false);
  }, [filter]);

  const categories = useMemo(
    (): Category[] =>
      sortBy(map(data.categories.edges, 'node'), ['strapiId']).map(({ strapiId, name }) => ({
        id: toString(strapiId),
        name: name as string,
      })),
    [data.categories.edges]
  );

  const onQuerySubmitEvent = (queryInput: string): void => {
    if (!queryInput) return;
    navigate(stringifyUrl({ url: `/events/${queryInput}` }));
  };

  const onQuerySubmitVenue = (queryInput: string): void => {
    if (!queryInput) return;
    navigate(stringifyUrl({ url: `/venues/${queryInput}` }));
  };

  const onQuerySubmitTalent = (queryInput: string): void => {
    if (!queryInput) return;
    navigate(stringifyUrl({ url: `/talents/${queryInput}` }));
  };

  const fetchSearchResults = async () => {
    if (prevSearch.current?.query !== query) {
      try {
        algoliaQuery();
      } catch (error) {
        console.error(error);
      }
      prevSearch.current = {
        query: query as string,
      };
      // setFetchingResults(false);
    }
  };

  const algoliaQuery = async () => {
    const algolia = await import('../../../utils/algoliaClient');
    const indexes = algolia.searchIndexes;
    // setFetchingResults(true);

    let eventParams = {} as {
      facetFilters?: string[];
      aroundLatLng?: string;
      aroundRadius?: number;
      filters?: string;
    };

    let vanueParams = {} as {
      aroundLatLng?: string;
      aroundRadius?: number;
      filters?: string;
    };

    const facetfilters = [];

    if (activeTag !== 'All Tags' && activeTag !== 'All tags') {
      facetfilters.push(`festivalcategories.name: ${activeTag}`);
      // eventParams.facetFilters = [`festivalcategories.name: ${activeTag}`];
    }

    if (categorySelect !== '' && categorySelect !== `${t('search.categories.all')}`) {
      facetfilters.push(`festivalcategories.name: ${categorySelect}`);
    }

    if (facetfilters.length > 0) {
      eventParams.facetFilters = facetfilters;
    }

    if (location !== '' && location !== `${t('search.location.all')}`) {
      eventParams.aroundLatLng = location;
      eventParams.aroundRadius = 60000;
    }

    const filter = [];

    if (creditsValue.length > 0) {
      filter.push(`credit_cost:${creditsValue[0]} TO ${creditsValue[1]}`);
      // eventParams.filters = `credit_cost:${credits[0]} TO ${credits[1]}`;
    }

    if (dateRange.length > 0 && dateRange[0].startDate && dateRange[0].endDate) {
      var endDateFormat = moment(dateRange[0].endDate).format('DD-MM-YYYY');
      const isoendDate = moment(endDateFormat, 'DD-MM-YYYY').toISOString();
      const endDate = Date.parse(isoendDate) / 1000;

      var startDateFormat = moment(dateRange[0].startDate).format('DD-MM-YYYY');
      const isostartDate = moment(startDateFormat, 'DD-MM-YYYY').toISOString();
      const startDate = Date.parse(isostartDate) / 1000;

      filter.push(`start_timestamp:${startDate} TO ${endDate}`);
    }

    //Only show events that are in the future
    var d = new Date();
    var nd = Math.floor(d.getTime() / 1000);
    filter.push(`start_timestamp >= ${nd}`);

    if (filter.length > 0) {
      eventParams.filters = filter.join(' AND ');
    }

    if (location !== '' && location !== `${t('search.location.all')}`) {
      vanueParams.aroundLatLng = location;
      vanueParams.aroundRadius = 60000;
    }

    const multiQuery = algolia.client.multipleQueries([
      {
        indexName: indexes.events,
        query: query as string,
        params: {
          ...eventParams,
          distinct: false,
        },
      },
      {
        indexName: indexes.venues,
        query: query as string,
        params: {
          ...vanueParams,
          distinct: false,
        },
      },
      {
        indexName: indexes.talent,
        query: query as string,
        params: {
          distinct: false,
        },
      },
      {
        indexName: indexes.movies,
        query: query as string,
        params: {
          distinct: false,
        },
      },
      {
        indexName: indexes.organizers,
        query: query as string,
        params: {
          distinct: false,
        },
      },
    ]);

    const resp = (await multiQuery).results;

    for (const indexResp of resp) {
      if (indexResp.index === searchIndexes.events) {
        setEvents(indexResp.hits as any as RestEvent[]);
      } else if (indexResp.index === searchIndexes.venues) {
        setVenues(indexResp.hits as any as Venue[]);
      } else if (indexResp.index === searchIndexes.talent) {
        setTalent(indexResp.hits as any as Talent[]);
      } else if (indexResp.index === searchIndexes.movies) {
        setMovies(indexResp.hits as any as Venue[]);
      } else if (indexResp.index === searchIndexes.organizers) {
        setOrganizers(indexResp.hits as any as Venue[]);
      }
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [query, fetchSearchResults]);

  useEffect(() => {
    algoliaQuery();
  }, [activeTag, dateRange, location, categorySelect, creditsValue]);

  const onSelectCategories = (cat: { value: string; label: string }) => {
    setCategorySelect(cat.value);
  };

  const onClearCreditsRangeInputHandler = () => {
    setCredits([0, 1000]);
  };

  const onClearFilters = () => {
    setLocation('');
    setDisplyLocation('');
    setCategorySelect('');
    setCredits([0, 1000]);
    setCreditsValue([0, 1000]);
    setCreditInputVal('');
    setDateRange([
      {
        startDate: undefined,
        endDate: undefined,
        key: 'selection',
      },
    ]);
  };

  return (
    <>
      <Header />
      <PageWrapper>
        <S.Container>
          {/* <S.Container>
          <S.CategoriesContainer>
          <S.CategoriesList expanded={categoriesExpanded}>
          <CategoryTag
          selected={!selectedCategory}
          onClick={() => {
            setSelectedCategory(undefined);
          }}
          >
          {t('search.allTags')}
          </CategoryTag>
          {categories.map((category) => (
            <CategoryTag
            key={category.id}
            selected={selectedCategory === category.id}
            onClick={() => {
              if (selectedCategory === category.id) {
                setSelectedCategory(undefined);
              } else {
                setSelectedCategory(category.id);
              }
            }}
            >
            {category.name}
            </CategoryTag>
            ))}
            </S.CategoriesList>
            <S.ShowMore onClick={() => setCategoriesExpanded((prev) => !prev)}>
            {categoriesExpanded ? '- ' : '+ '}
            {t(categoriesExpanded ? 'search.showLess' : 'search.showMore')}
            </S.ShowMore>
            </S.CategoriesContainer>
            </S.Container>
            <TalentCards
            title={t('eventDetailPageContent.talent.title')}
            talents={talent}
            loading={fetchingResults}
            />
            <EventCards title={t('header.festivals')} events={events} loading={fetchingResults} />
          <VenueCards title={t('header.venuesLink')} venues={venues} loading={fetchingResults} /> */}

          {isFilter ? (
            <S.FilterInputContainer>
              <S.filterSectionContainer>
                <LocationSearch
                  options={promiseOptions}
                  label={t('search.location.label')}
                  type="text"
                  onchange={getOptionValueBuiltin}
                  value={
                    displyLocation !== '' &&
                    location !== '' &&
                    displyLocation !== `${t('search.location.all')}` &&
                    location !== `${t('search.location.all')}`
                      ? { label: displyLocation, value: location }
                      : null
                  }
                />
              </S.filterSectionContainer>
              <S.filterSectionContainer>
                <DateInputSearch
                  label={t('search.date.label')}
                  placeholder={t('search.date.placeholder')}
                  type="date"
                  ranges={dateRange}
                  setRanges={setDateRange}
                  onInputClear={() =>
                    setDateRange([
                      {
                        startDate: undefined,
                        endDate: undefined,
                        key: 'selection',
                      },
                    ])
                  }
                />
              </S.filterSectionContainer>
              <S.filterSectionContainer>
                <CatogoriesSelect
                  options={options}
                  label={t('search.categories.label')}
                  placeholder={t('search.categories.placeholder')}
                  type="text"
                  onChange={onSelectCategories}
                  value={
                    categorySelect !== '' && categorySelect !== `${t('search.categories.all')}`
                      ? { label: categorySelect, value: categorySelect }
                      : null
                  }
                />
              </S.filterSectionContainer>
              <S.filterSectionContainer>
                <CreditsInputRange
                  label={t('search.credits.label')}
                  placeholder={t('search.credits.placeholder')}
                  type="text"
                  min={0}
                  max={1000}
                  onChange={onChangeCredits}
                  value={credits}
                  minValue={credits[0]}
                  maxValue={credits[1]}
                  clear={() => onClearCreditsRangeInputHandler()}
                  onClickSaveHandler={() => onClickSaveHandler()}
                  inputValue={creditInputVal}
                  setInputValue={setCreditInputVal}
                />
              </S.filterSectionContainer>
              <S.LinkContainer>
                <a onClick={() => onClearFilters()}>{t('search.clearall')}</a>
              </S.LinkContainer>
            </S.FilterInputContainer>
          ) : null}
          <S.TagsContainer>
            {!isShowMoreTagOpen ? (
              <S.FlexDiv>
                {mainCategories &&
                  mainCategories
                    .filter((category: Category) => category.isBaseCategory === true)
                    .map((tag: Category) => (
                      <Tags
                        active={tag.name === activeTag}
                        label={tag.name}
                        key={tag.id}
                        onClick={() => SelectTagHandler(tag.name)}
                      />
                    ))}
              </S.FlexDiv>
            ) : (
              <S.AllTabsDiv>
                {mainCategories &&
                  mainCategories
                    .filter((category: Category) => category.isBaseCategory === true)
                    .map((tag: Category) => (
                      <Tags
                        active={tag.name === activeTag}
                        label={tag.name}
                        key={tag.id}
                        onClick={() => SelectTagHandler(tag.name)}
                      />
                    ))}
              </S.AllTabsDiv>
            )}

            <S.AllTags>
              {mainCategories &&
                mainCategories
                  .filter((category: Category) => category.isBaseCategory === true)
                  .map((tag: Category) => (
                    <Tags
                      active={tag.name === activeTag}
                      label={tag.name}
                      key={tag.id}
                      onClick={() => SelectTagHandler(tag.name)}
                    />
                  ))}
            </S.AllTags>

            {mainCategories &&
            mainCategories.filter((category: Category) => category.isBaseCategory === true).length >
              10 ? (
              <S.ShowMoreTags onClick={() => setIsShowmoreTagOpen(!isShowMoreTagOpen)}>
                {!isShowMoreTagOpen ? `${t('search.showMore')}` : `${t('search.showLess')}`}
              </S.ShowMoreTags>
            ) : null}
            {/* { isShowMoreTagOpen ? ( */}
            {/* <DropDownModal
            isOpen={isShowMoreTagOpen}
            setIsOpen={setIsShowmoreTagOpen}
            modalListArray={tagsArray.slice(10, tagsArray.length)}
          /> */}
            {/* ) : null } */}
          </S.TagsContainer>
          {events.length > 0 ? (
            <S.UpsaleContainer>
              {/* {t('searchedLayout.recommendation')} */}
              <S.TitleContainer>
                <S.Title>
                  {' '}
                  {t('search.liveEvents')}{' '}
                  <span>
                    &#160;
                    {displyLocation && displyLocation !== `${t('search.location.all')}`
                      ? displyLocation
                      : ''}
                  </span>{' '}
                </S.Title>
                {/* <S.ShowmoreButton>
                {t('search.showAll')}
              </S.ShowmoreButton> */}
              </S.TitleContainer>
              <EventCards title="" events={events} loading={false} withoutPadding />
              {/* <S.CardContainer>
              {events.map((e: any) => (
                <CardSearch
                  key={e.id}
                  festivapass={true}
                  catagory={activeTag == 'All tags' ? e.festivalcategories[0]?.name : activeTag}
                  title={e.name}
                  place={
                    e.location !== 'undefined, undefined, undefined'
                      ? e.location
                      : `${t('search.tbd')}`
                  }
                  date={e.start ? `${moment(e.start).format('MMM Do YYYY, h:mm a')}` : null}
                  credit={e.ds_wholesale_price ? e.ds_wholesale_price : null}
                  image={e.cover_image && e.cover_image.url ? e.cover_image.url : undefined}
                  data={data.eventPlaceholderImage?.childCloudinaryAsset?.fixed.src}
                  onClick={() => onQuerySubmitEvent(e.slug_name)}
                />
              ))}
            </S.CardContainer> */}
            </S.UpsaleContainer>
          ) : null}

          {venues.length > 0 ? (
            <S.UpsaleContainer>
              {/* {t('searchedLayout.recommendation')} */}
              <S.TitleContainer>
                <S.Title>
                  {' '}
                  {t('search.venue')}{' '}
                  <span>
                    &#160;{' '}
                    {displyLocation && displyLocation !== `${t('search.location.all')}`
                      ? displyLocation
                      : ''}
                  </span>{' '}
                </S.Title>
                {/* <S.ShowmoreButton>Show all</S.ShowmoreButton> */}
              </S.TitleContainer>
              <VenueCards venues={venues} withoutPadding />
              {/* <S.CardContainer>
              {venues.map((e: any) => (
                <CardSearch
                  key={e.id}
                  festivapass={true}
                  catagory={''}
                  title={e.name}
                  place={
                    e.full_location !== 'undefined, undefined, undefined'
                      ? e.full_location
                      : `${t('search.tbd')}`
                  }
                  credit={''}
                  image={e.cover_image && e.cover_image.url ? e.cover_image.url : undefined}
                  data={data.eventPlaceholderImage?.childCloudinaryAsset?.fixed.src}
                  onClick={() => onQuerySubmitVenue(e.slug_name)}
                />
              ))}
            </S.CardContainer> */}
            </S.UpsaleContainer>
          ) : null}
        </S.Container>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default SearchPage;

//
// Utils
//

export const searchPageQuery = graphql`
  query SearchPage {
    categories: allStrapiInterest(filter: { isActive: { eq: true } }) {
      edges {
        node {
          strapiId
          name
        }
      }
    }
    eventPlaceholderImage: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "event-placeholder.jpg" }
    ) {
      childCloudinaryAsset {
        fixed(height: 269) {
          ...CloudinaryAssetFixed
        }
      }
    }
    ...LocaleQuery
  }
`;

const featuredEventsSliderSettings = {
  infinite: true,
  slidesToScroll: 1,
  variableWidth: true,
  dots: true,
};

interface Coordinates {
  latitude: number;
  longitude: number;
}

let now = moment().unix();

const getAlgoliaSearchConfig = () => ({
  facetFilters: [], //['isActive: true', 'start_timestamp:-0'],
  //   filters: `start_timestamp > ${now}`,
});

const cityCoordinates = {
  losAngeles: { latitude: 34.0203996, longitude: -118.5518133 },
  austin: { latitude: 30.3076863, longitude: -97.8934825 },
  atlanta: { latitude: 33.7676931, longitude: -84.4906431 },
  newYork: { latitude: 40.6974034, longitude: -74.1197613 },
};
