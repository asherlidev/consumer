import styled from 'styled-components';
import colors from '../../../constants/colors';

export {
  Body,
  Content,
  Description,
  Infoheader,
  SectionHeader,
} from '../EventDetailPage/EventDetailPageContent/styles';

export const InfoIcon = styled.img`
  margin: 5px 8px 5px 5px;
`;

export const WebsiteLink = styled.a`
  color: ${colors.textDefault};
  text-decoration: underline;
  font-size: 16px;
`;
