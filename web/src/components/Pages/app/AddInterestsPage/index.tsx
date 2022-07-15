import { gql, useMutation } from '@apollo/client';
import { graphql, useStaticQuery } from 'gatsby';
import { get, map, toLower, without } from 'lodash';
import { parse } from 'query-string';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddInterestsPageQuery, Maybe, StrapiInterest } from '../../../../../graphql-types';
import { useUser } from '../../../../context/user';
import fragments from '../../../../utils/gqlFragments';
import { Input } from '../../../Elements';
import { SideCaptionImagePage } from '../../../Layout';
import { PrivateRouteProps } from '../../../PrivateRoute';
import * as S from './styles';

const AddInterestsPage: React.FC<PrivateRouteProps> = ({ user, location, navigate }) => {
  const { t } = useTranslation();
  const { fetchUser } = useUser();
  const [selectedInterestIds, setSelectedInterestIds] = useState<number[]>(
    map(get(user, 'interests', []), 'id')
  );
  const [searchInput, setSearchInput] = useState<string>('');

  const data = useStaticQuery<AddInterestsPageQuery>(addInterestsPageQuery); // TODO: use it in the SideCaptionImagePage

  const [updateUser, updateUserMutation] = useMutation(gql`
    mutation UpdateUserMutation($input: updateUserInput) {
      updateUser(input: $input) {
        user {
          ...UserDetails
        }
      }
    }
    ${fragments.userDetails}
  `);

  const { from }: { from?: string } = useMemo(
    () => parse((location as Location).search),
    [location]
  );

  const handleSubmit = useCallback(
    async (event: React.MouseEvent<any, MouseEvent>) => {
      event.preventDefault();

      await updateUser({
        variables: {
          input: {
            where: { id: user.id },
            data: { interests: selectedInterestIds },
          },
        },
      });

      await fetchUser();

      if (from) {
        navigate(from);
      } else {
        navigate('/select-plan', { replace: true });
      }
    },
    [fetchUser, from, navigate, selectedInterestIds, updateUser, user.id]
  );

  const filteredInterests = useMemo(
    () =>
      map(data.interests.edges, 'node').filter(
        ({ name }) => toLower(name as string).indexOf(toLower(searchInput)) >= 0
      ),
    [data.interests.edges, searchInput]
  );

  return (
    <SideCaptionImagePage
      imageUrl="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1568379036/fp-content/onboarding-2_bbkzwy.png"
      captionText={t('addInterestsPage.illustrationCaption')}
    >
      <S.Container className="col-md-6">
        <S.Header>
          <S.Title>{t('addInterestsPage.title')}</S.Title>
          <S.Subtitle>{t('addInterestsPage.subtitle')}</S.Subtitle>
        </S.Header>
        <S.EventCards
          type="grid"
          cardType="selectable"
          selectedIds={selectedInterestIds}
          toggleCardSelection={(id: number) => {
            setSelectedInterestIds((prevSelection) =>
              prevSelection.includes(id) ? without(prevSelection, id) : [...prevSelection, id]
            );
          }}
          withoutSubtitles
          events={filteredInterests}
        />
        <S.ContinueButtonContainer>
          <S.ContinueButton
            type="button"
            onClick={handleSubmit}
            className="animated fadeInUp"
            label={from ? t('common.save') : t('common.continue')}
            width="75%"
            isLoading={updateUserMutation.loading}
          />
        </S.ContinueButtonContainer>
      </S.Container>
    </SideCaptionImagePage>
  );
};

export default AddInterestsPage;

//
// Utils
//

export type GatsbyInterest = { __typename: 'StrapiInterest' } & Pick<
  StrapiInterest,
  'strapiId' | 'name'
> & {
    cover_image: Maybe<{ url: string }>;
  };

const addInterestsPageQuery = graphql`
  query AddInterestsPage {
    interests: allStrapiInterest(filter: { isActive: { eq: true }, isBaseCategory: { eq: true } }) {
      edges {
        node {
          __typename
          strapiId
          name
          cover_image {
            url
          }
        }
      }
    }
  }
`;
