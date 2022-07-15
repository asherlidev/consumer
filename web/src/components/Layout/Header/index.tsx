import React, { useEffect, useMemo, useRef, useState } from 'react';
import useScrollPosition from '@react-hook/window-scroll';
import { useLocation } from '@reach/router';
import { navigate } from 'gatsby';
import { parse, stringifyUrl } from 'query-string';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../../context/auth';
import fpHeaderLogoBlack from '../fpHeaderLogoBlack.svg';
import fpHeaderLogoWhite from '../fpHeaderLogoWhite.svg';
import fpLogoPassBlack from '../fpLogoPassBlack.svg';
import fpLogoPassWhite from '../fpLogoPassWhite.svg';
import AuthenticatedUserMenu from './AuthenticatedUserMenu';
import CrowdfundingBanner from './CrowdfundingBanner';
import HeaderLinks from './HeaderLinks';
import * as S from './styles';
import UnauthenticatedUserMenu from './UnauthenticatedUserMenu';
import SearchIcon from '../../Icons/SearchIcon';
import ArrowDownIcon from '../../Icons/ArrowDownIcon';
import CloseIcon from '../../Icons/CloseIcon';
import FilterIcon from '../../Icons/FilterIcon';
import Suggestions from './Suggestions';
import DateInputSearch from './../../Elements/DateInputSearch/index';
import CatogoriesSelect from './../../Elements/categoriesSelect';
import CreditsInputRange from './../../Elements/CreditsInputRange';
import LocationSearch from './../../Elements/LocationSearch';
import CardSearch from '../../Elements/CardSearch';
import Tags from '../../Elements/Tags';
import DropDownModal from '../../Elements/DropDownModal';
import { addDays } from 'date-fns';
import useIsClient from '../../../utils/useIsClient';

interface Props {
  className?: string;
  isTransparent?: boolean;
  withoutBottomBorder?: boolean;
}

const Header: React.FC<Props> = ({
  className,
  isTransparent = false,
  withoutBottomBorder = false,
}) => {
  const { t } = useTranslation();
  const { search, pathname } = useLocation();
  const scrollY = useScrollPosition();
  const { isAuthenticated } = useAuth();
  const { isClient, key } = useIsClient();

  const { q: query } = useMemo(() => parse(search), [search]);

  const [searchActive, setSearchActive] = useState(!!query);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchInput, setSearchInput] = useState<string>((query as string) || '');

  const scrolled = useMemo(() => scrollY > 100, [scrollY]);

  const solidAppearance = useMemo(() => !isTransparent || scrolled, [isTransparent, scrolled]);

  const UserMenu = useMemo(
    () => (isAuthenticated ? AuthenticatedUserMenu : UnauthenticatedUserMenu),
    [isAuthenticated]
  );

  useEffect(() => {
    if (pathname === '/search') {
      setSearchActive(true);
      if (searchInput === '') {
        setIsFilterOpen(true);
      }
    }
  }, [pathname]);

  const onQuerySubmit = (queryInput: string, filter: boolean): void => {
    // if (!queryInput) return;
    setSearchInput(queryInput);
    if (pathname !== '/search') {
      navigate(stringifyUrl({ url: '/search', query: { q: queryInput, f: filter } }));
    } else {
      navigate(stringifyUrl({ url: '/search', query: { q: queryInput, f: filter } }), {
        replace: true,
      });
    }
  };

  const [inputFocus, setInputFocus] = useState<boolean>(false);

  const [emptySuggestion, setEmptySuggestion] = useState<boolean>(true);

  const [isShowMoreTagOpen, setIsShowmoreTagOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     console.log({
  //       searchInput,
  //       prev: prevQuery.current,
  //     });
  //     if (
  //       (searchInput && prevQuery.current !== searchInput) ||
  //       (prevQuery.current && !searchInput)
  //     ) {
  //       navigate(stringifyUrl({ url: '/search', query: { q: searchInput } }));
  //       prevQuery.current = query as string;
  //     }
  //   }, 500);

  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [query, searchInput]);

  const handleBlur = () => {
    setTimeout(() => {
      setInputFocus(false);
    }, 300);
  };

  const handleKeyUp = (e: any) => {
    switch (e.keyCode) {
      case 13:
        onQuerySubmit(searchInput, isFilterOpen);
        break;
      case 27:
        setInputFocus(false);
        break;
      default:
        setInputFocus(true);
    }
  };

  const filterOpenCloseHandler = () => {
    setIsFilterOpen((prev) => {
      onQuerySubmit(searchInput, !prev);
      return !prev;
    });
  };

  const activeSearchHandler = () => {
    setSearchActive((prev) => {
      if (pathname === '/search' && prev)
        setIsFilterOpen((_prev) => {
          onQuerySubmit(searchInput, false);
          navigate(-1);
          return false;
        });
      return !prev;
    });
  };

  if (!isClient) return null;

  return (
    <S.NavContainer
      className={className}
      solid={solidAppearance}
      withoutBottomBorder={withoutBottomBorder}
      role="navigation"
      key={key}
    >
      <CrowdfundingBanner />
      <S.Content solid={solidAppearance} searchActive={searchActive}>
        <S.HeaderLogoLink to={isAuthenticated ? '/events' : '/'}>
          <S.HeaderLogo
            src={solidAppearance ? fpHeaderLogoBlack : fpHeaderLogoWhite}
            alt="Festival Pass logo"
          />
        </S.HeaderLogoLink>
        <S.HeaderMobileLogo
          onClick={() => navigate('/')}
          src={solidAppearance ? fpLogoPassBlack : fpLogoPassWhite}
          alt="Festival Pass logo"
        />
        {!searchActive && <HeaderLinks solid={solidAppearance} />}
        {searchActive && (
          <S.SearchSection>
            <S.SearchContainer>
              <S.SearchInput
                // autoFocus
                type="text"
                name="search"
                id="search"
                autoComplete="off"
                placeholder={t('search.searchPlaceholder')}
                value={searchInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  setSearchInput(e.target.value);
                }}
                onKeyUp={(e) => handleKeyUp(e)}
                onFocus={() => setInputFocus(true)}
                onBlur={handleBlur}
                hasRoundBorder={searchInput.length === 0 || !inputFocus || emptySuggestion}
              />
              {searchInput.length > 0 && inputFocus && (
                <Suggestions query={searchInput} setEmptySuggestion={setEmptySuggestion} />
              )}
              <S.SearchIconContainer onClick={() => onQuerySubmit(searchInput, isFilterOpen)}>
                <SearchIcon style={{ width: '25px', height: '25px' }} />
              </S.SearchIconContainer>
            </S.SearchContainer>
            <S.FilterIconButton aria-label="filter" onClick={() => filterOpenCloseHandler()}>
              {isFilterOpen ? (
                <ArrowDownIcon style={{ width: '14px', height: '14px' }} />
              ) : (
                <FilterIcon style={{ width: '20px', height: '20px' }} />
              )}
            </S.FilterIconButton>
          </S.SearchSection>
        )}
        <S.RightNavigation>
          <S.SearchButton aria-label="Search" onClick={() => activeSearchHandler()}>
            {searchActive ? <CloseIcon /> : <SearchIcon />}
          </S.SearchButton>
          <UserMenu solid={solidAppearance} />
        </S.RightNavigation>
      </S.Content>

      {searchActive && (
        <S.FilterContainer>
          {/* {isFilterOpen && (
            <S.FilterInputContainer>
              <S.filterSectionContainer>
                <LocationSearch
                  options={promiseOptions}
                  label="Location"
                  placeholder="Add Location"
                  type="text"
                />
              </S.filterSectionContainer>
              <S.filterSectionContainer>
                <DateInputSearch
                  label="Dates"
                  placeholder="Add Dates"
                  type="date"
                  ranges={dateRange}
                  setRanges={setDateRange}
                />
              </S.filterSectionContainer>
              <S.filterSectionContainer>
                <CatogoriesSelect
                  options={options}
                  label="Categories"
                  placeholder="Add Category"
                  type="text"
                />
              </S.filterSectionContainer>
              <S.filterSectionContainer>
                <CreditsInputRange
                  label="Credits"
                  placeholder="Add Credit range"
                  type="text"
                  min={10}
                  max={1000}
                  onChange={onChangeCredits}
                  value={credits}
                  minValue={credits[0]}
                  maxValue={credits[1]}
                  clear={() => setCredits([10, 1000])}
                />
              </S.filterSectionContainer>
              <S.LinkContainer>
                <a href="">Clear All</a>
              </S.LinkContainer>
            </S.FilterInputContainer>
          )} */}

          {/* <S.TagsContainer>
            <S.FlexDiv>
              {tagsArray && tagsArray.slice(0,10).map((tag:string) =>
                <Tags active={tag === activeTag} label={tag} key={tag} onClick={() => SelectTagHandler(tag)} />
              )}
            </S.FlexDiv>
            <S.AllTags>
              {tagsArray && tagsArray.map((tag:string) =>
                <Tags active={tag === activeTag} label={tag} key={tag} onClick={() => SelectTagHandler(tag)} />
              )}
            </S.AllTags>
            {tagsArray && tagsArray.length > 10 ? (
              <S.ShowMoreTags onClick={() => setIsShowmoreTagOpen(!isShowMoreTagOpen)}>Show&#160;more</S.ShowMoreTags>
            ): null}
              <DropDownModal isOpen={isShowMoreTagOpen} setIsOpen={setIsShowmoreTagOpen} modalListArray={tagsArray.slice(10,tagsArray.length )} />

          </S.TagsContainer> */}

          {/* <S.UpsaleContainer>
            <S.TitleContainer>
              <S.Title> Recommendation <span> in San Francisco, CA</span> </S.Title>
              <S.ShowmoreButton>Show all</S.ShowmoreButton>
            </S.TitleContainer>
            <S.CardContainer>
                    <CardSearch
                      festivapass={true}
                      catagory="movie"
                      title="San Francisco Film Society Doc Stories"
                      place="San Francisco, CA, United States"
                      date="Sat, Sep 19"
                      credit="15 - 45 credits"
                      />
                    <CardSearch
                      festivapass={true}
                      catagory="movie"
                      title="San Francisco Film Society Doc Stories"
                      place="San Francisco, CA, United States"
                      date="Sat, Sep 19"
                      credit="15 - 45 credits"
                      />
                    <CardSearch
                      festivapass={true}
                      catagory="movie"
                      title="San Francisco Film Society Doc Stories"
                      place="San Francisco, CA, United States"
                      date="Sat, Sep 19"
                      credit="15 - 45 credits"
                      />
            </S.CardContainer>
          </S.UpsaleContainer> */}
        </S.FilterContainer>
      )}
    </S.NavContainer>
  );
};

export default Header;
