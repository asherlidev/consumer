import { gql, useMutation } from '@apollo/client';
import { get, map, without } from 'lodash';
import moment from 'moment';
import { parse } from 'query-string';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../context/user';
import fragments from '../../../../utils/gqlFragments';
import { Input } from '../../../Elements';
import { SideCaptionImagePage } from '../../../Layout';
import { PrivateRouteProps } from '../../../PrivateRoute';
import * as S from './styles';

const AddEventsPage: React.FC<PrivateRouteProps> = ({ user, location, navigate }) => {
  const { t } = useTranslation();
  const { fetchUser } = useUser();
  const [selectedEventIds, setSelectedEventIds] = useState<number[]>(
    map(get(user, 'interested_festivals', []), 'id')
  );
  const [searchInput, setSearchInput] = useState<string>('');
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>('');

  // We debounce the user's text search input so that the event requests follow debounced instead of on every key stroke
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchInput);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

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

  const { from }: { from?: string } = useMemo(() => parse((location as Location).search), [
    location,
  ]);

  const handleSubmit = useCallback(
    async (event: React.MouseEvent<any, MouseEvent>) => {
      event.preventDefault();

      await updateUser({
        variables: {
          input: {
            where: { id: user.id },
            data: { interested_festivals: selectedEventIds },
          },
        },
      });

      await fetchUser();

      if (from) {
        navigate(from);
      } else if (user.isPaidSubscriber) {
        navigate('/app/invite', { replace: true });
      } else {
        navigate('/select-plan', { replace: true });
      }
    },
    [fetchUser, from, navigate, selectedEventIds, updateUser, user.id, user.isPaidSubscriber]
  );

  return (
    <SideCaptionImagePage
      imageUrl="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1568380342/fp-content/onboarding-3_mwnxuk.png"
      captionText={t('addEventsPage.illustrationCaption')}
    >
      <S.Container className="col-md-6">
        <S.SearchHeader>
          <S.Title>{t('addEventsPage.title')}</S.Title>
          <S.Subtitle>{t('addEventsPage.subtitle')}</S.Subtitle>
          <Input
            type="text"
            name="search"
            id="search-festivals"
            placeholder={t('eventsPage.searchEventsPlaceholder')}
            value={searchInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setSearchInput(e.target.value);
            }}
          />
        </S.SearchHeader>
        <S.EventCards
          type="grid"
          cardType="selectable"
          selectedIds={selectedEventIds}
          toggleCardSelection={(id: number) => {
            setSelectedEventIds((prevSelection) =>
              prevSelection.includes(id) ? without(prevSelection, id) : [...prevSelection, id]
            );
          }}
          withoutSubtitles
          loadingItemsCount={12}
          apolloQueryArgs={{
            query: gql`
              query FilteredEventsQuery($where: JSON) {
                events: festivals(sort: "start:asc", limit: 50, where: $where) {
                  ...EventCard
                }
              }
              ${fragments.eventCard}
            `,
            variables: {
              where: {
                isActive: true,
                isConfirmed: true,
                name_contains: debouncedSearchText,
                start_gte: fiveWeeksAgo,
              },
            },
          }}
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

export default AddEventsPage;

//
// Utils
//

const fiveWeeksAgo = moment().utc().subtract(5, 'w').format();
