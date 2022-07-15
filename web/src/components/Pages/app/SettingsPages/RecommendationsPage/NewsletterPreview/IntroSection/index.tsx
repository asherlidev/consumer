import { graphql, Link, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { IntroSectionQuery } from '../../../../../../../../graphql-types';
import Button from '../../../../../../Elements/Button';
import HighlightedText from '../../../../../../Elements/HighlightedText';
import * as CommonS from '../../common/styles';
import * as S from './styles';

interface Props {
  className?: string;
}

const IntroSection: React.FC<Props> = ({ className }) => {
  const data = useStaticQuery<IntroSectionQuery>(query);
  const headerPromo = data.allStrapiNewsletterPromotion.edges[0].node.header_promo;

  if (!headerPromo?.hero_image?.url) return null;

  return (
    <CommonS.Hero className={className} backgroundUrl={headerPromo.hero_image.url as string}>
      <S.Center>
        <CommonS.CopyGrid>
          <div>
            <HighlightedText as="h1">{headerPromo?.title}</HighlightedText>
          </div>
          <div>
            {headerPromo?.content && (
              <HighlightedText as="h5">{headerPromo?.content}</HighlightedText>
            )}
          </div>
          {headerPromo?.cta_url && (
            <div>
              <Link to={`${headerPromo?.cta_url}`}>
                <Button color="primary" size="large" className="text-uppercase" loading={false}>
                  {headerPromo?.cta_btn_label}
                </Button>
              </Link>
            </div>
          )}
        </CommonS.CopyGrid>
      </S.Center>
    </CommonS.Hero>
  );
};

export default IntroSection;

//
// Utils
//

const query = graphql`
  query IntroSection {
    allStrapiNewsletterPromotion(limit: 1, filter: { isActive: { eq: true } }) {
      edges {
        node {
          header_promo {
            title
            content
            cta_btn_label
            cta_url
            hero_image {
              url
            }
          }
        }
      }
    }
  }
`;
