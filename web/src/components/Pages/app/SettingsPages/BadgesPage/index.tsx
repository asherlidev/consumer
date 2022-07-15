import { gql, useMutation } from '@apollo/client';
import { toString } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Maybe } from '../../../../../../graphql-types';
import { useUser } from '../../../../../context/user';
import { Badge } from '../../../../../context/user/UserProvider';
import { FetchStatus } from '../../../../../types/common';
import fragments from '../../../../../utils/gqlFragments';
import * as http from '../../../../../utils/httpClient';
import { CenteredLoading, Loading, ProfileImage } from '../../../../Elements';
import { PrivateRouteProps } from '../../../../PrivateRoute';
import Layout from '../SettingsLayout';
import * as S from './styles';

const SettingsBadgesPage: React.FC<PrivateRouteProps> = ({ user }) => {
  const { t } = useTranslation();
  const { fetchUser } = useUser();
  const [updateUser, { loading }] = useMutation(gql`
    mutation UpdateUserMutation($input: updateUserInput) {
      updateUser(input: $input) {
        user {
          primary_badge {
            id
            name
            icon {
              url
            }
          }
        }
      }
    }
  `);
  const unmounted = useRef(false);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.Idle);

  // use the useEffect cleanup function to know if the component (page) was unmounted
  // so we don't update the state afterwards and thereby introduce a memory leak
  useEffect(
    () => () => {
      unmounted.current = true;
    },
    []
  );

  const updatePrimaryBadge = useCallback(
    async (primaryBadgeId: number) => {
      try {
        setFetchStatus(FetchStatus.Loading);
        await updateUser({
          variables: {
            input: {
              where: { id: user.id },
              data: {
                primary_badge: primaryBadgeId,
              },
            },
          },
        });

        await fetchUser();

        if (!unmounted.current) {
          setFetchStatus(FetchStatus.Success);
        }
      } catch (err) {
        if (!unmounted.current) {
          setFetchStatus(FetchStatus.Error);
        }
        console.error(err);
      }
    },
    [fetchUser, updateUser, user.id]
  );

  if (fetchStatus === FetchStatus.Loading)
    return (
      <Layout title={t('settingsPage.title')}>
        <S.LoadingWrapper>
          <Loading />
        </S.LoadingWrapper>
      </Layout>
    );

  return (
    <Layout title={t('settingsPage.title')}>
      {user.badges && user.badges.length > 0 ? (
        <div>
          <S.BadgeWrapper>
            <S.BadgeIcon
              src={(user.primary_badge || user.badges[0]).icon.url}
              alt="primary-badge-icon"
            />
            <S.BadgeDetails>
              <S.BadgeName>{(user.primary_badge || user.badges[0]).name}</S.BadgeName>
              <S.PrimaryTag>{t('settingsPage.badges.primary')}</S.PrimaryTag>
            </S.BadgeDetails>
          </S.BadgeWrapper>
          <div>
            {user.badges.map((badge, index) => {
              if (user.primary_badge ? badge.id === user.primary_badge.id : index === 0)
                return <div />;

              return (
                <S.BadgeWrapper key={badge.id}>
                  <S.BadgeIcon src={badge.icon.url} alt="primary-badge-icon" />
                  <S.BadgeDetails>
                    <S.BadgeName>{badge.name}</S.BadgeName>
                    {(user.primary_badge ? badge.id === user.primary_badge.id : index === 0) ? (
                      <S.PrimaryTag>{t('settingsPage.badges.primary')}</S.PrimaryTag>
                    ) : (
                      <S.BadgeButton onClick={() => updatePrimaryBadge(badge.id)}>
                        Make primary
                      </S.BadgeButton>
                    )}
                  </S.BadgeDetails>
                </S.BadgeWrapper>
              );
            })}
          </div>
        </div>
      ) : (
        <S.EmptyContainer>
          <S.EmptyHeader>{t('settingsPage.badges.emptyHeader')}</S.EmptyHeader>
          <S.EmptyHelpText>{t('settingsPage.badges.emptyHelp')}</S.EmptyHelpText>
        </S.EmptyContainer>
      )}
    </Layout>
  );
};

export default SettingsBadgesPage;
