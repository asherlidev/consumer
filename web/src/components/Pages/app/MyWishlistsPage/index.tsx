import React from 'react';
import { isEmpty } from 'lodash';

import { Title } from '../../../Elements';
import { Footer, Header } from '../../../Layout';
import { PrivateRouteProps } from '../../../PrivateRoute';
import WishlistItem from './WishlistItem';
import * as S from './styles';

const MyWishlistsPage: React.FC<PrivateRouteProps> = ({ user }) => {
  const wishlists = user.interested_festivals;

  return (
    <>
      <Header />
      <S.Container>
        <S.Content>
          <Title marginBottom="20px">My Wishlists</Title>
          {isEmpty(wishlists) ? (
            <div>Your wishlists will appear here.</div>
          ) : (
            <S.GridContainer>
              {wishlists.map((event) => (
                <WishlistItem key={event.id} user={user} event={event} />
              ))}
            </S.GridContainer>
          )}
        </S.Content>
      </S.Container>
      <Footer />
    </>
  );
};

export default MyWishlistsPage;
