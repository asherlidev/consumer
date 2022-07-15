import axios from 'axios';
import { useEffect, useState } from 'react';
import { Room } from '..';

export const useHotelCreditConversion = (price?: string) => {
  const [creditCost, setCreditCost] = useState<string | undefined>(undefined);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (!price) return;
    setLoading(true);
    axios
      .get(
        `${process.env.GATSBY_STRAPI_API_URL}/credits-conversion-multiplier/convert?price=${price}&entity=hotel`
      )
      .then((response) => {
        setLoading(false);
        setCreditCost(response.data.credits_price);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [price]);

  return { creditCost, loading, error };
};
