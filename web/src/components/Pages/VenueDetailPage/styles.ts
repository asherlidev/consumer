import styled from 'styled-components';
import colors from '../../../constants/colors';

export {
  Body,
  Content,
  EventLocationMap as VenueLocationMap,
  FpInterestRow,
  Infoheader,
  SectionHeader,
  ChipsContainer,
  TitleContainer,
  FlexInfoSection,
  ShareAndLikeContainer,
  DescriptionTitle,
  FeatureContainer,
} from '../EventDetailPage/EventDetailPageContent/styles';
export { InfoIcon } from '../OrganizationDetailPage/styles';

export const EventInfoRow = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: no-wrap;
  margin-top: 0;

  & > div:nth-child(1) {
    justify-content: flex-start;
    display: flex;
    align-items: flex-end;
    /* margin-bottom: 0; */

    & > span {
      padding: 0 10px 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: nowrap;

      & > img {
        margin: 5px;
      }
    }
  }

  & > div:nth-child(2) {
    justify-content: flex-end;
    display: flex;
    align-items: center;
    margin-top: 0;

    & > div > button {
      padding: 0px 10px 10px 10px;
      color: ${colors.primary};

      & > img {
        margin: 5px;
        padding: 5px;
      }
    }

    & > div > button > img {
      margin: 5px;
    }
  }
`;

export const FavouriteBtn = styled.div<{
  width?: string | undefined;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.error};
  padding: 0 20px;
  height: 40px;
  cursor: pointer;
  border-radius: 8px;
  width: 100%;

  & img {
    margin: 2px 7px 0px 0px;
    width: 16px;
  }

  & a {
    text-decoration: none;
    color: #fff;
    font-family: 'Sofia Pro';
    font-weight: 700;
    font-size: 16px;
    width: ${(props) => (props.width ? props.width : 'auto')};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const DescriptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const DescriptionVanue = styled.div`
  width: 50%;
  white-space: pre-line;
  margin-bottom: 40px;
  font-weight: 400;
  font-family: 'Sofia Pro';
  font-size: 16px;
  color: ${colors.darkGray};

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const featuresVanue = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  width: 50%;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const EventVanueContainer = styled.div`
  background: ${colors.backgroundGray};
`;

export const SimilarVenueContainer = styled.div`
  background: ${colors.white};
`;

export const SimilarTitleContainer = styled.h2`
  font-family: 'Sofia Pro';
  font-weight: 700;
  font-size: 60px;
  color: ${colors.black};
  margin: 40px 0;

  @media (max-width: 600px) {
    font-size: 35px;
  }
`;

export const NotFoundWrapper = styled.div`
  text-align: center;
`;
