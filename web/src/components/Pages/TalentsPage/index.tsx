import { gql, useQuery } from '@apollo/client';
import { graphql, Link, PageProps, navigate } from 'gatsby';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { stringifyUrl } from 'query-string';
import { TalentsPageQuery } from '../../../../graphql-types';
import { useUser } from '../../../context/user';
import TalentCards from '../../Elements/TalentCards/TalentCards';
import Subtitle from '../../Elements/Subtitle';
import Title from '../../Elements/Title';
import { Footer, Header, PageWrapper } from '../../Layout';
import * as S from './styles';
import SearchInput from '../../Elements/SearchInput';
import Suggestions from '../../Layout/Header/Suggestions';

const TalentsPage: React.FC<PageProps<TalentsPageQuery, { now: string }>> = ({
  data,
  pageContext: { now },
}) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [searchInput, setSearchInput] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [talents, setTalents] = useState([]);

  const onQuerySubmit = (queryInput: string, filter: boolean): void => {
    setSearchInput(queryInput);

    navigate(stringifyUrl({ url: '/search', query: { q: queryInput, f: filter } }), {
      replace: true,
    });
  };

  const [inputFocus, setInputFocus] = useState<boolean>(false);

  const [emptySuggestion, setEmptySuggestion] = useState<boolean>(true);

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

  useEffect(() => {
    if (data?.talents?.edges) {
      setTalents(data?.talents?.edges?.map((item: any) => ({ ...item.node })));
    }
  }, [data]);

  return (
    <>
      <Header />
      <PageWrapper>
        <S.ContentContainer>
          {/* <FeaturedEvents cardDetails={cardDetails} /> */}

          <S.FestivalWrapperFp>
            <S.TitleContainer className="col-sm-5 col-xs-12">
              <Title>{t('talentsPage.title')}</Title>
              <Subtitle>{t('talentsPage.subtitle')}</Subtitle>
            </S.TitleContainer>
            <S.SearchContainer className="col-sm-5 col-xs-12">
              <SearchInput
                autoFocus
                type="text"
                name="search"
                id="search"
                placeholder={t('talentsPage.searchPlaceholder')}
                value={searchInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  setSearchInput(e.target.value);
                }}
                autoComplete="off"
                onKeyUp={(e) => handleKeyUp(e)}
                onFocus={() => setInputFocus(true)}
                onBlur={handleBlur}
              />
              {searchInput.length > 0 && inputFocus && (
                <Suggestions
                  query={searchInput}
                  setEmptySuggestion={setEmptySuggestion}
                  type={['talents']}
                />
              )}
            </S.SearchContainer>
          </S.FestivalWrapperFp>
          <>
            <TalentCards title={t('talentsPage.talents.music')} talents={talents} />
            <TalentCards title={t('talentsPage.talents.sports')} talents={talents} />
            <TalentCards title={t('talentsPage.talents.film')} talents={talents} />
            <TalentCards title={t('talentsPage.talents.food')} talents={talents} />
            <TalentCards title={t('talentsPage.talents.comedy')} talents={talents} />
            <TalentCards title={t('talentsPage.talents.theater')} talents={talents} />
            <TalentCards title={t('talentsPage.talents.other')} talents={talents} />
          </>
        </S.ContentContainer>
      </PageWrapper>

      <Footer />
    </>
  );
};

export default TalentsPage;

//
// Utils
//

export const talentsPageQuery = graphql`
  query TalentsPage {
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
    talents: allStrapiTalent(filter: {}, limit: 6) {
      edges {
        node {
          strapiId
          name
          slug_name
          image {
            childCloudinaryAsset {
              fixed(height: 269) {
                ...CloudinaryAssetFixed
              }
            }
            url
          }
        }
      }
    }
    ...LocaleQuery
  }
`;
