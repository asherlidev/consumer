import * as http from '../../../../utils/httpClient';

interface SendVerificationCodeResponse {
  // TODO: add types
}

export const sendVerificationCode = async (phone: string): Promise<boolean> => {
  try {
    const { promise } = http.customFetch<SendVerificationCodeResponse>(
      `${process.env.GATSBY_STRAPI_API_URL}/phone/update`,
      {
        method: 'POST',
        body: http.json({ phone }),
      }
    );

    const response = await promise;

    console.log(response);

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
