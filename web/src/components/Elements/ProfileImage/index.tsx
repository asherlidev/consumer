import React, { useMemo } from 'react';
import { Maybe } from '../../../../graphql-types';
import { useUser } from '../../../context/user/UserProvider';
import defaultLoadingSpinner from '../Btn/defaultLoadingSpinner.svg';
import * as S from './styles';

interface Props {
  customImageSrc?: Maybe<string>;
  loading?: boolean;
  overlayIconSrc?: string;
}

const ProfileImage: React.FC<Props> = ({
  children,
  customImageSrc,
  loading,
  overlayIconSrc,
  ...otherProps
}) => {
  const { user } = useUser();

  const profileImageSrc = useMemo(() => {
    if (customImageSrc) {
      return customImageSrc;
    } else if (user?.profile_img) {
      return user?.profile_img.url.replace(
        '/upload/v',
        '/upload/w_56,c_fill,ar_1:1,g_auto,r_max/v'
      );
    }
    return 'https://res.cloudinary.com/festivalpass/image/upload/w_56,c_fill,ar_1:1,g_auto,r_max/v1567516338/fp-content/no-avatar_1x_nqgtz9.jpg';
  }, [customImageSrc, user?.profile_img]);

  return (
    <S.Container {...otherProps}>
      <S.ContentWrapper>
        {children}
        <S.Circle src={profileImageSrc} />
        {(loading || overlayIconSrc) && <S.Overlay />}
        {loading ? (
          <S.Icon isBrighter src={defaultLoadingSpinner} width="18" />
        ) : (
          overlayIconSrc && <S.Icon src={overlayIconSrc} />
        )}
      </S.ContentWrapper>
      {user?.membership === 'Founding' ? (
        <S.FoundingMemberBadge />
      ) : (
        user?.badges.length > 0 &&
        (user?.primary_badge || user?.badges[0]).icon?.url && (
          <S.Badge src={(user?.primary_badge || user?.badges[0]).icon.url} alt="badge-icon" />
        )
      )}
    </S.Container>
  );
};

export default ProfileImage;
