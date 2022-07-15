import styled from 'styled-components';
import {
  FacebookMessengerShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailShareButton,
} from 'react-share';

export const ShareModalHeading = styled.p`
  font-size: 25px;
  font-weight: 500;
`;

export const FacebookButton = styled(FacebookShareButton)`
  margin: 10px;
  margin-left: 0;
`;

export const MessengerButton = styled(FacebookMessengerShareButton)`
  margin: 10px;
`;

export const TwitterButton = styled(TwitterShareButton)`
  margin: 10px;
`;

export const RedditButton = styled(RedditShareButton)`
  margin: 10px;
`;

export const EmailButton = styled(EmailShareButton)`
  margin: 10px;
  margin-left: 0;
`;

export const WhatsappButton = styled(WhatsappShareButton)`
  margin: 10px;
`;

export const IMessageButton = styled.div`
  display: inline-block;
  margin: 10px;
`;

export const IMessageIcon = styled.img`
  height: 48px;
  width: 48px;
  margin-bottom: 6px;
`;

export const LinkContainer = styled.div`
  background-color: #f2f2f2;
  padding: 5px 10px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 16px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
`;

export const Link = styled.code`
  color: #091d2c;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: transparent;
`;

export const CopyButton = styled.button`
  background-color: #fa2069;
  color: #ffffff;
  font-weight: 400;
  border-radius: 8px;
  margin-left: 10px;
  margin-bottom: 0;
  min-width: 0;
`;
