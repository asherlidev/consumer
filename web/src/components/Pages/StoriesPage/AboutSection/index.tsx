import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { StoriesAboutSectionQuery } from '../../../../../graphql-types';
import { Title } from '../../../Elements';
import * as S from './styles';

interface Props {}

const AboutSection: React.FC<Props> = () => {
  const data = useStaticQuery<StoriesAboutSectionQuery>(storiesAboutSectionQuery);

  const { title, body } = data.allStrapiPage.edges[0].node;

  return (
    <S.Root id="about">
      <S.Container>
        <S.TitleWrap>
          <Title>{title}</Title>
        </S.TitleWrap>
        <S.TextWrap>
          <ReactMarkdown>{body as string}</ReactMarkdown>
        </S.TextWrap>
      </S.Container>
    </S.Root>
  );
};

export default AboutSection;

//
// Utils
//

const storiesAboutSectionQuery = graphql`
  query StoriesAboutSection {
    allStrapiPage(filter: { name: { eq: "/Stories - About the podcast section" } }) {
      ...PageFragment
    }
  }
`;
