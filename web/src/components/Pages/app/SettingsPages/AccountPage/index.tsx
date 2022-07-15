import { toString } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';

import { Maybe } from '../../../../../../graphql-types';
import { useAuth } from '../../../../../context/auth';
import { useUser } from '../../../../../context/user';
import { FetchStatus } from '../../../../../types/common';
import * as http from '../../../../../utils/httpClient';
import { ProfileImage, Btn } from '../../../../Elements';
import { PrivateRouteProps } from '../../../../PrivateRoute';
import Layout from '../SettingsLayout';
import AccountForm from './AccountForm';
import uploadPhotoIcon from './icons/uploadPhotoIcon.svg';
import * as S from './styles';

const SettingsAccountPage: React.FC<PrivateRouteProps> = ({ user }) => {
  const breakpoints = useBreakpoint();
  const { fetchUser } = useUser();
  const { logout } = useAuth();
  const { t } = useTranslation();

  const unmounted = useRef(false);
  const [profileImage, setProfileImage] = useState<Maybe<File>>(null);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(FetchStatus.Idle);

  // use the useEffect cleanup function to know if the component (page) was unmounted
  // so we don't update the state afterwards and thereby introduce a memory leak
  useEffect(
    () => () => {
      unmounted.current = true;
    },
    []
  );

  const handleUpload = useCallback(
    async (event) => {
      event.preventDefault();

      const file = event.target.files[0];

      setFetchStatus(FetchStatus.Loading);
      setProfileImage(file);

      const uploadData = new FormData();
      uploadData.append('files', file);
      uploadData.append('refId', toString(user.id));
      uploadData.append('ref', 'user');
      uploadData.append('source', 'users-permissions');
      uploadData.append('field', 'profile_img');

      try {
        http.clearDefaultHeader('Content-Type');

        const { promise } = http.customFetch<any>(`${process.env.GATSBY_STRAPI_API_URL}/upload`, {
          method: 'POST',
          body: uploadData,
        });

        await promise;

        http.setDefaultHeader('Content-Type', http.defaultContentType);

        await fetchUser();

        if (!unmounted.current) {
          setFetchStatus(FetchStatus.Success);
        }
      } catch (e) {
        if (!unmounted.current) {
          setFetchStatus(FetchStatus.Error);
        }
      }
    },
    [fetchUser, user.id]
  );

  return (
    <Layout title={t('settingsPage.title')}>
      <S.SettingRow className="row no-gutter">
        <S.ProfileSummary>
          <ProfileImage
            customImageSrc={profileImage && URL.createObjectURL(profileImage)}
            loading={fetchStatus === FetchStatus.Loading}
            overlayIconSrc={uploadPhotoIcon}
          >
            <form>
              <S.ProfilePictureInput
                type="file"
                name="file"
                id="file"
                accept="image/*"
                onChange={handleUpload}
              />
            </form>
          </ProfileImage>

          <S.AccountSummary>
            <S.Name>{`${user?.first_name} ${user?.last_name}`}</S.Name>
            <S.Membership>
              {user?.subscription?.display_name || ''} &#183; {user.credit_balance || 0}{' '}
              {t('common.credits')}
            </S.Membership>
            <S.Email>{user?.email}</S.Email>
          </S.AccountSummary>
        </S.ProfileSummary>
      </S.SettingRow>

      <S.FormContainer>
        <AccountForm user={user} />
        {breakpoints.smDown && (
          <Btn label={t('header.logoutLink')} background="#f2f2f2" color="black" onClick={logout} />
        )}
      </S.FormContainer>
    </Layout>
  );
};

export default SettingsAccountPage;
