import { Link } from 'gatsby';
import { toString } from 'lodash';
import { parse, stringifyUrl } from 'query-string';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../../../../context/toast';
import { useUser } from '../../../../../context/user';
import { User } from '../../../../../context/user/UserProvider';
import { StrapiImage } from '../../../../../types/common';
import * as http from '../../../../../utils/httpClient';
import { useSessionStorage } from '../../../../../utils/storage';
import { BodyText, Button, Chip, ProfileImage } from '../../../../Elements';
import EventCards from '../../../../Elements/EventCards';
import { PrivateRouteProps } from '../../../../PrivateRoute';
import Layout from '../SettingsLayout';
import { Section, SectionTitle, SettingControlRow } from '../styles';
import FacebookButton from './FacebookButton';
import InstagramButton from './InstagramButton';
import * as S from './styles';

type SocialLoginProviders = 'facebook' | 'instagram';

const PreferencesPage: React.FC<PrivateRouteProps> = ({ user, location, navigate }) => {
  const [connectingFb, setConnectingFb] = useSessionStorage('fp__PreferencesPage_connectingFb');
  const [connectingIg, setConnectingIg] = useSessionStorage('fp__PreferencesPage_connectingIg');
  const [disconnectingFb, setDisconnectingFb] = useSessionStorage(
    'fp__PreferencesPage_disconnectingFb'
  );
  const [disconnectingIg, setDisconnectingIg] = useState(false);
  const { setUser } = useUser();
  const { addToast } = useToast();
  const { t } = useTranslation();

  const accessToken = useMemo(() => {
    if (location?.search) {
      const { access_token }: { access_token?: string } = parse(location.search);
      return access_token;
    }
    return;
  }, [location?.search]);

  const fetchFbUserData = useCallback(async (accessToken: string): Promise<{
    userId: string;
    profilePictureUrl: string | undefined;
  }> => {
    const { promise: fbPicturePromise } = http.customFetch<{
      id: string;
      picture: {
        data: {
          height: number;
          is_silhouette: boolean;
          url: string;
          width: number;
        };
      };
    }>(
      stringifyUrl({
        url: 'https://graph.facebook.com/me',
        query: { fields: 'picture.type(large)', access_token: accessToken },
      })
    );
    const { id, picture } = await fbPicturePromise;

    return { userId: id, profilePictureUrl: picture?.data.url };
  }, []);

  const fetchIgUserData = useCallback(async (accessToken: string): Promise<{
    userId: string;
    username: string;
  }> => {
    const { promise: igUserPromise } = http.customFetch<{
      id: string;
      username: string;
    }>(
      stringifyUrl({
        url: 'https://graph.instagram.com/me',
        query: { fields: 'username', access_token: accessToken },
      })
    );
    const { id, username } = await igUserPromise;

    return { userId: id, username };
  }, []);

  const saveUserData = useCallback(
    async (userId: string, provider: SocialLoginProviders) => {
      try {
        const { promise: updateUserPromise } = http.customFetch<User>(
          `${process.env.GATSBY_STRAPI_API_URL}/users/${user.id}`,
          {
            method: 'PUT',
            body: http.json({
              oauth_providers: {
                ...(user.oauth_providers || {}),
                [`${provider === 'facebook' ? 'fb_userid' : 'ig_userid'}`]: userId,
              },
            }),
          }
        );
        const updateUserResponse = await updateUserPromise;

        setUser(updateUserResponse);
      } catch (err) {
        console.error(err);
        addToast(t('errorMessages.generic'), { type: 'error' });
      }
    },
    [addToast, t, user.id, setUser]
  );

  const saveProfilePicture = useCallback(
    async (profilePictureUrl: string) => {
      try {
        const res = await fetch(profilePictureUrl);
        const data = await res.blob();
        const file = new File([data], 'profile.jpg');

        const uploadData = new FormData();
        uploadData.append('files', file);
        uploadData.append('refId', toString(user.id));
        uploadData.append('ref', 'user');
        uploadData.append('source', 'users-permissions');
        uploadData.append('field', 'profile_img');

        http.clearDefaultHeader('Content-Type');

        const { promise: uploadProfileImagePromise } = http.customFetch<StrapiImage[]>(
          `${process.env.GATSBY_STRAPI_API_URL}/upload`,
          {
            method: 'POST',
            body: uploadData,
          }
        );
        await uploadProfileImagePromise;

        http.setDefaultHeader('Content-Type', http.defaultContentType);
      } catch (err) {
        console.error(err);
        addToast(t('errorMessages.generic'), { type: 'error' });
      }
    },
    [addToast, t, user.id]
  );

  const connectSocialLoginProvider = useCallback(
    (provider: SocialLoginProviders) => () => {
      switch (provider) {
        case 'facebook':
          setConnectingFb(true);
          break;
        case 'instagram':
          setConnectingIg(true);
          break;
        default:
          return;
      }

      window.location.href = `${process.env.GATSBY_STRAPI_API_URL}/connect/${provider}`;
    },
    []
  );

  const connectFb = useCallback(
    async (accessToken: string) => {
      try {
        const { userId, profilePictureUrl } = await fetchFbUserData(accessToken);

        if (!user.profile_img && profilePictureUrl) {
          await saveProfilePicture(profilePictureUrl);
        }

        await saveUserData(userId, 'facebook');
      } catch (err) {
        console.error(err);
        addToast(t('errorMessages.generic'), { type: 'error' });
      }

      setConnectingFb(null);
    },
    [fetchFbUserData, addToast, t, user.profile_img, setConnectingFb]
  );

  const connectIg = useCallback(
    async (accessToken: string) => {
      try {
        const { userId, username } = await fetchIgUserData(accessToken);

        const { promise: igUserPromise } = http.customFetch<{
          profile_pic_url_hd: string;
        }>(
          stringifyUrl({
            url: 'https://instagram-data1.p.rapidapi.com/user/info',
            query: { username },
          }),
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': 'f5d7bc5ce8msh69c96ffbfa35bffp1ff576jsn3abb4d7b7bc7',
              'x-rapidapi-host': 'instagram-data1.p.rapidapi.com',
            },
          }
        );

        const result = await igUserPromise;

        const { profile_pic_url_hd } = result;

        if (!user.profile_img && profile_pic_url_hd) {
          await saveProfilePicture(profile_pic_url_hd);
        }

        await saveUserData(userId, 'instagram');
      } catch (err) {
        console.error(err);
        addToast(t('errorMessages.generic'), { type: 'error' });
      }

      setConnectingIg(null);
    },
    [fetchIgUserData, addToast, t, user.profile_img, setConnectingIg]
  );

  const disconnectFb = useCallback(
    async (accessToken: string) => {
      try {
        const { promise: fbPermissionPromise } = http.customFetch<{ success: true }>(
          stringifyUrl({
            url: `https://graph.facebook.com/v9.0/${user.oauth_providers?.fb_userid}/permissions`,
            query: { access_token: accessToken },
          }),
          {
            method: 'DELETE',
          }
        );
        const fbPermissionResponse = await fbPermissionPromise;

        if (fbPermissionResponse.success) {
          const { promise: updateUserPromise } = http.customFetch<User>(
            `${process.env.GATSBY_STRAPI_API_URL}/users/${user.id}`,
            {
              method: 'PUT',
              body: http.json({
                oauth_providers: {
                  ...(user.oauth_providers || {}),
                  fb_userid: null,
                },
              }),
            }
          );
          const updateUserResponse = await updateUserPromise;

          setUser(updateUserResponse);
        }
      } catch (err) {
        console.error(err);
        addToast(t('errorMessages.generic'), { type: 'error' });
      }

      setDisconnectingFb(null);
    },
    [
      addToast,
      location,
      navigate,
      t,
      user.id,
      user.oauth_providers?.fb_userid,
      setUser,
      setDisconnectingFb,
    ]
  );

  const disconnectIg = useCallback(async () => {
    try {
      const { promise: updateUserPromise } = http.customFetch<User>(
        `${process.env.GATSBY_STRAPI_API_URL}/users/${user.id}`,
        {
          method: 'PUT',
          body: http.json({
            oauth_providers: {
              ...(user.oauth_providers || {}),
              ig_userid: null,
            },
          }),
        }
      );
      const updateUserResponse = await updateUserPromise;

      setUser(updateUserResponse);
    } catch (err) {
      console.error(err);
      addToast(t('errorMessages.generic'), { type: 'error' });
    }

    setDisconnectingIg(false);
  }, [addToast, t, user.id, user.oauth_providers?.ig_userid, setUser]);

  const clearAccessToken = useCallback(() => {
    // Clear the access_token from the url
    navigate((location as Location).pathname, { replace: true });
  }, [navigate, location]);

  useEffect(() => {
    if (accessToken) {
      if (connectingFb) {
        if (user.oauth_providers?.fb_userid) {
          setConnectingFb(null);
          clearAccessToken();
        } else {
          connectFb(accessToken);
        }
      } else if (disconnectingFb) {
        if (user.oauth_providers?.fb_userid) {
          disconnectFb(accessToken);
        } else {
          setDisconnectingFb(null);
          clearAccessToken();
        }
      } else {
        clearAccessToken();
      }
    } else {
      connectingFb && setConnectingFb(null);
      disconnectingFb && setDisconnectingFb(null);
    }
  }, [
    accessToken,
    clearAccessToken,
    setConnectingFb,
    setDisconnectingFb,
    saveProfilePicture,
    saveUserData,
    connectFb,
    disconnectFb,
    user.oauth_providers?.fb_userid,
  ]);

  useEffect(() => {
    if (accessToken) {
      if (connectingIg) {
        if (user.oauth_providers?.ig_userid) {
          setConnectingIg(null);
          clearAccessToken();
        } else {
          connectIg(accessToken);
        }
      }
    } else {
      connectingIg && setConnectingIg(null);
    }
  }, [accessToken, clearAccessToken, setConnectingIg, connectIg, user.oauth_providers?.ig_userid]);

  const renderUserInformation = useCallback(
    (provider) => (
      <S.UserInformation>
        <strong>
          <span>{`${user.first_name} ${user.last_name}`}</span>
        </strong>
        <S.MembershipDetails>
          <S.DisconnectLink
            onClick={() => {
              if (provider === 'instagram') {
                if (connectingIg || disconnectingIg) return;
                setDisconnectingIg(true);
                disconnectIg();
              } else {
                if (connectingFb || disconnectingFb) return;
                setDisconnectingFb(true);
                window.location.href = `${process.env.GATSBY_STRAPI_API_URL}/connect/facebook`;
              }
            }}
          >
            {provider === 'facebook' &&
              (connectingFb
                ? t('settingsPage.preferences.connecting')
                : disconnectingFb
                ? t('settingsPage.preferences.disconnecting')
                : t('settingsPage.preferences.disconnect'))}
            {provider === 'instagram' &&
              (connectingIg
                ? t('settingsPage.preferences.connecting')
                : disconnectingIg
                ? t('settingsPage.preferences.disconnecting')
                : t('settingsPage.preferences.disconnect'))}
          </S.DisconnectLink>
        </S.MembershipDetails>
      </S.UserInformation>
    ),
    [
      connectingFb,
      disconnectingFb,
      connectingIg,
      disconnectingIg,
      t,
      user.first_name,
      user.last_name,
    ]
  );

  return (
    <Layout title={t('settingsPage.title')}>
      <Section>
        <SettingControlRow>
          <div>
            <SectionTitle>{t('settingsPage.preferences.referral.subtitle')}</SectionTitle>
            <BodyText>
              {t('settingsPage.preferences.referral.p1')}{' '}
              <Link to="/app/invite">{t('settingsPage.preferences.referral.link')}</Link>{' '}
              {t('settingsPage.preferences.referral.p2')}
            </BodyText>
          </div>
          <div>
            <S.CodeContainer>{user.referral_code}</S.CodeContainer>
          </div>
        </SettingControlRow>
      </Section>

      <Section>
        <SettingControlRow>
          <div>
            <SectionTitle>
              {t(
                `settingsPage.preferences.facebook.subtitle${
                  user.oauth_providers?.fb_userid ? 'Connected' : ''
                }`
              )}
            </SectionTitle>
            <BodyText>
              {t(
                `settingsPage.preferences.facebook.p${
                  user.oauth_providers?.fb_userid ? 'Connected' : ''
                }`
              )}
            </BodyText>
          </div>
          {connectingFb || user.oauth_providers?.fb_userid ? (
            <S.UserContainer>
              {renderUserInformation('facebook')}
              <ProfileImage loading={!!(connectingFb || disconnectingFb)} />
            </S.UserContainer>
          ) : (
            <FacebookButton onClick={connectSocialLoginProvider('facebook')}>
              {t('settingsPage.preferences.facebook.buttonLabel')}
            </FacebookButton>
          )}
        </SettingControlRow>
      </Section>

      <Section>
        <SettingControlRow>
          <div>
            <SectionTitle>
              {t(
                `settingsPage.preferences.instagram.subtitle${
                  user.oauth_providers?.ig_userid ? 'Connected' : ''
                }`
              )}
            </SectionTitle>
            <BodyText>
              {t(
                `settingsPage.preferences.instagram.p${
                  user.oauth_providers?.ig_userid ? 'Connected' : ''
                }`
              )}
            </BodyText>
          </div>
          {connectingIg || user.oauth_providers?.ig_userid ? (
            <S.UserContainer>
              {renderUserInformation('instagram')}
              <ProfileImage loading={!!(connectingIg || disconnectingIg)} />
            </S.UserContainer>
          ) : (
            <InstagramButton onClick={connectSocialLoginProvider('instagram')}>
              {t('settingsPage.preferences.instagram.buttonLabel')}
            </InstagramButton>
          )}
        </SettingControlRow>
      </Section>

      <Section>
        <SettingControlRow>
          <div>
            <SectionTitle>{t('settingsPage.preferences.followedCategories.subtitle')}</SectionTitle>
            <BodyText>{t('settingsPage.preferences.followedCategories.p')}</BodyText>
            <S.ChipRow>
              {user.interests.map(({ id, name }) => (
                <Chip key={id} text={name} />
              ))}
            </S.ChipRow>
          </div>
          <Button
            outlined
            onClick={() => {
              navigate(
                stringifyUrl({ url: '/app/add-interests', query: { from: location?.pathname } })
              );
            }}
          >
            {t('settingsPage.preferences.followedCategories.buttonLabel')}
          </Button>
        </SettingControlRow>
      </Section>

      <Section>
        <SettingControlRow>
          <div>
            <SectionTitle>{t('settingsPage.preferences.followedEvents.subtitle')}</SectionTitle>
            <BodyText>{t('settingsPage.preferences.followedEvents.p')}</BodyText>
          </div>
          <Button
            outlined
            onClick={() => {
              navigate(
                stringifyUrl({ url: '/app/add-events', query: { from: location?.pathname } })
              );
            }}
          >
            {t('settingsPage.preferences.followedEvents.buttonLabel')}
          </Button>
        </SettingControlRow>
        <EventCards withoutPadding events={user.interested_festivals} />
      </Section>
    </Layout>
  );
};

export default PreferencesPage;
