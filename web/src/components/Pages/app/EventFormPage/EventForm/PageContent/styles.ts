import styled from 'styled-components';
import mq from '../../../../../../constants/layout';
import EventDetailPageContentComponent from '../../../../EventDetailPage/EventDetailPageContent';

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  ${mq.smUp} {
    flex-direction: row;
  }
`;

export const StepFormContainer = styled.div`
  flex: 1 1 0;
  box-sizing: border-box;
  padding: 10px 4rem 4rem;
  border-left: 1px solid #e7e7e7;

  ${mq.mdUp} {
    border-right: 1px solid #e7e7e7;
  }
`;

export const EventDetailPageContent = styled(EventDetailPageContentComponent)`
  background-color: #f7f7f7;
  flex: 1 1 50%;
  max-width: 50%;
  box-sizing: border-box;
`;
