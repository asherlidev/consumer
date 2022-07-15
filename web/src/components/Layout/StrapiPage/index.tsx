import React from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import { BodyText } from '../../Elements';
import Footer from '../Footer';
import Header from '../Header';
import PageWrapper from '../PageWrapper';
import * as S from './styles';

interface Props {
  title: string;
  body?: string;
}

const StrapiPage: React.FC<Props> = ({ title, body, children }) => (
  <>
    <Helmet title={title as string} />
    <Header />
    <PageWrapper>
      <S.Content className="container">
        <S.Body>
          {children ||
            (body && (
              <BodyText>
                <ReactMarkdown>{body as string}</ReactMarkdown>
              </BodyText>
            ))}
        </S.Body>
      </S.Content>
    </PageWrapper>
    <Footer />
  </>
);

export default StrapiPage;
