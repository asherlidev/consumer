import React from 'react';
import ReactMarkdown from 'react-markdown';
import { graphql, Link, PageProps, useStaticQuery } from 'gatsby';
import { useTranslation } from 'react-i18next';

import StrapiPage from '../../Layout/StrapiPage';
import { AboutUsPageQuery } from '../../../../graphql-types';
import { BodyText, Btn, Subtitle, Title } from '../../Elements';
import * as S from './styles';

const AboutUsPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();

  const data = useStaticQuery<AboutUsPageQuery>(aboutUsPageQuery);

  const { title, subtitle, body } = data.allStrapiPage.edges[0].node;

  return (
    <StrapiPage title={title as string}>
      <S.Container>
        <S.CenteredTextSection>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </S.CenteredTextSection>
        <BodyText>
          <ReactMarkdown children={body!} />
        </BodyText>
        <S.CenteredTextSection>
          <Link to="/register">
            <Btn
              label={t('common.join4')}
              type="button"
              className="animated fadeInUp"
              width="auto"
            />
          </Link>
        </S.CenteredTextSection>
      </S.Container>
    </StrapiPage>
  );
};

export default AboutUsPage;

//
// Utils
//

const aboutUsPageQuery = graphql`
  query AboutUsPage {
    allStrapiPage(filter: { name: { eq: "About Us" } }) {
      ...PageFragment
    }
  }
`;
