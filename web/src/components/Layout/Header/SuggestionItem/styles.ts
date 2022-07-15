import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;
export const ImageWrapper = styled.div<{ type: 'movie' | 'event' | 'venue' }>`
  width: 24px;
  height: ${(props) => (props.type === 'movie' ? '35px' : '24px')};
  overflow: hidden;
  border-radius: ${(props) => (props.type === 'movie' ? '5px' : '50%')};
  background-color: #e2eaf1;
  margin-right: 1rem;
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
`;
export const TitleWrapper = styled.div`
  max-width: 70%;
`;

export const Title = styled.h3`
  font-size: 12px;
  margin: 0;
  font-weight: 500;
  color: #091d2c;
  text-align: left;
  padding-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Subtitle = styled.p`
  font-size: 10px;
  text-align: left;
  margin: 0;
  color: #475765;
`;

export const SuggestionType = styled.span`
  color: #475765;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  display: block;
  margin-left: auto;
`;
