import styled from 'styled-components';
import colors from '../../../../../../constants/colors';
import mq from '../../../../../../constants/layout';
import * as SelectPlanS from '../../../../SelectPlanPage/styles';

export const ArtBox = styled(SelectPlanS.ArtBox)`
  border-color: #fee8ef;
  display: flex;
  flex-direction: column;
  margin: 0 0 20px 0;

  ${mq.smUp} {
    flex-direction: row;
  }
`;

export const ArtBoxBigTitle = styled(SelectPlanS.ArtBoxBigTitle)`
  flex: 1;
`;

export const ArtBoxDescriptionContainer = styled(SelectPlanS.ArtBoxDescriptionContainer)`
  flex: 1;
`;

export const WarningText = styled.div`
  color: ${colors.error};
`;
