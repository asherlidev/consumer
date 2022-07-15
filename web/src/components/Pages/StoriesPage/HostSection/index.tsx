import { graphql, useStaticQuery } from 'gatsby';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { StoriesHostSectionQuery } from '../../../../../graphql-types';
import { resizeCloudinaryImage } from '../../../../utils/cloudinary';
import { PlayCircleIcon } from '../../../Icons';
import StoriesLogo from '../StoriesLogo';
import HostImgElement from './HostImageElement';
import * as S from './styles';

interface Props {}

const HostSection: React.FC<Props> = (props) => {
  const breakpoints = useBreakpoint();
  const { t } = useTranslation();

  const data = useStaticQuery<StoriesHostSectionQuery>(storiesHostSectionQuery);

  const { title, body, image } = data.allStrapiPage.edges[0].node;

  return (
    <S.Root {...props}>
      <S.Container>
        {!breakpoints.mdDown && image?.url && (
          <HostImgElement
            hostImageSrc={
              resizeCloudinaryImage(image?.url as string, {
                w: 300,
                f: 'auto',
                q: 'auto',
              }) as string
            }
          />
        )}
        <S.LogoWrap>
          <StoriesLogo />
        </S.LogoWrap>
        <S.HostTitle color="primary">{t('storiesPage.hostSection.title')}</S.HostTitle>
        <S.HostName>{title}</S.HostName>
        <S.HostContentBody>
          <ReactMarkdown>{body as string}</ReactMarkdown>
        </S.HostContentBody>
        {breakpoints.mdDown && image?.url && (
          <HostImgElement
            hostImageSrc={
              resizeCloudinaryImage(image?.url as string, {
                w: 550,
                f: 'auto',
                q: 'auto',
              }) as string
            }
          />
        )}
        <S.CtaButton bg="white" color="primary" icon={<PlayCircleIcon />}>
          {t('storiesPage.hostSection.knowMoreButton')}
        </S.CtaButton>
      </S.Container>
    </S.Root>
  );
};

export default HostSection;

//
// Utils
//

const storiesHostSectionQuery = graphql`
  query StoriesHostSection {
    allStrapiPage(filter: { name: { eq: "/Stories - Your Host Section" } }) {
      edges {
        node {
          title
          body
          image {
            url
          }
        }
      }
    }
  }
`;
