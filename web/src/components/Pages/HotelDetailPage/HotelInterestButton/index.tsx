import { gql, useMutation } from '@apollo/client';
import { useLocation } from '@reach/router';
import { navigate } from 'gatsby';
import { get, map, without } from 'lodash';
import { stringifyUrl } from 'query-string';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import colors from '../../../../constants/colors';
import { useUser } from '../../../../context/user';
import fragments from '../../../../utils/gqlFragments';
import { Btn } from '../../../Elements';
import filledHeart from './filledHeart.svg';
import outlinedHeart from './outlinedHeart.svg';

interface Props {
  className?: string;
  hotelId: number;
  color?: string;
  fontSize?: string;
}

const EventInterestButton: React.FC<Props> = ({ className, hotelId, color, fontSize }) => {
  const { t } = useTranslation();
  const { user, fetchUser } = useUser();
  const location = useLocation();

  const [interestedHotelIds, setInterestedHotelIds] = useState<number[]>([]);
  const [isInterested, setIsInterested] = useState<Boolean>(false);

  useEffect(() => {
    setInterestedHotelIds(map(get(user, 'interested_hotels', []), 'id'));
  }, [user]);

  useEffect(() => {
    setIsInterested(interestedHotelIds.includes(hotelId));
  }, [interestedHotelIds]);

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

  const toggleInterest = async () => {
    if (user) {
      const newInterestedHotelIds = isInterested
        ? without(interestedHotelIds, hotelId)
        : [...interestedHotelIds, hotelId];

      setIsInterested(!isInterested);

      await updateUser({
        variables: {
          input: {
            where: { id: user.id },
            data: { interested_hotels: newInterestedHotelIds },
          },
        },
      });

      fetchUser();
    } else {
      navigate(stringifyUrl({ url: '/login', query: { from: location.pathname } }));
    }
  };

  if (!hotelId) {
    return null;
  }

  return (
    <Btn
      className={className}
      label="Like"
      type="button"
      background={colors.transparent}
      color={color ? color : colors.primary}
      height="40px"
      fontSize={fontSize ? fontSize : '14px'}
      width="auto"
      onClick={toggleInterest}
      img={isInterested ? filledHeart : outlinedHeart}
    />
  );
};

export default EventInterestButton;
