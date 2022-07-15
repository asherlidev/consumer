import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { without } from 'lodash';

import { RestEvent, User } from '../../../../../context/user/UserProvider';
import { useUser } from '../../../../../context/user';
import fragments from '../../../../../utils/gqlFragments';
import * as S from '../styles';

interface Props {
  user: User;
  event: RestEvent;
}

const WishlistItem: React.FC<Props> = ({ user, event }) => {
  const { fetchUser } = useUser();

  const { data } = useQuery(
    gql`
      {
        festival(id: ${event.id}) {
          id
          name
          description
          venue {
            name
          }
          festivalcategories {
              cover_image {
                  url
              }
          }
        }
      }
    `
  );

  const [updateUser, { loading }] = useMutation(gql`
    mutation UpdateUserMutation($input: updateUserInput) {
      updateUser(input: $input) {
        user {
          ...UserDetails
        }
      }
    }
    ${fragments.userDetails}
  `);

  const removeInterest = async () => {
    const newInterestEventIds = without([...user.interested_festivals.map((w) => w.id)], event.id);
    await updateUser({
      variables: {
        input: {
          where: { id: user.id },
          data: { interested_festivals: newInterestEventIds },
        },
      },
    });
    fetchUser();
  };

  const festival = data ? data.festival : null;

  return (
    <S.WishlistItem>
      <S.WishlistImage
        src={
          festival && festival.festivalcategories[0]
            ? festival.festivalcategories[0].cover_image?.url
            : 'https://res.cloudinary.com/festivalpass/image/upload/v1569456634/fp-content/default-share-image-5_3x_viqmie.jpg'
        }
      />
      <S.WishlistContent>
        <S.Name>{event.name}</S.Name>
        <S.Description>{event.location}</S.Description>
        <S.HorizontalLine />
        <S.CtaRow>
          <S.CtaLink to={`/events/${event.slug_name}`}>
            <S.CtaButton text>Redeem</S.CtaButton>
          </S.CtaLink>
          <S.CtaButton text onClick={removeInterest} loading={loading}>
            Remove
          </S.CtaButton>
        </S.CtaRow>
      </S.WishlistContent>
    </S.WishlistItem>
  );
};

export default WishlistItem;
