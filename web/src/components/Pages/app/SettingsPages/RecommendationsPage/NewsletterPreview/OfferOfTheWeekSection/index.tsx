import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { OfferOfTheWeekSectionQuery } from '../../../../../../../../graphql-types';
import Button from '../../../../../../Elements/Button';
import HighlightedText from '../../../../../../Elements/HighlightedText';
import * as CommonS from '../../common/styles';
import * as S from './styles';

interface Props {
  className?: string;
}

const OfferOfTheWeekSection: React.FC<Props> = ({ className }) => {
  const data = useStaticQuery<OfferOfTheWeekSectionQuery>(query);
  const footerPromo = data.allStrapiNewsletterPromotion.edges[0].node.footer_promo;

  if (!footerPromo?.hero_image?.url) return null;

  return (
    <CommonS.Hero className={className} backgroundUrl={footerPromo.hero_image.url as string}>
      <S.Center>
        <CommonS.CopyGrid>
          <div>
            <HighlightedText as="h1">{footerPromo?.title}</HighlightedText>
          </div>
          <div>
            {footerPromo?.content && (
              <HighlightedText as="h1">{footerPromo?.content}</HighlightedText>
            )}

            {footerPromo?.cta_url && footerPromo?.cta_btn_label && (
              <Link to={`${footerPromo?.cta_url}`}>
                <Button color="primary" size="large" className="text-uppercase">
                  {footerPromo?.cta_btn_label}
                </Button>
              </Link>
            )}
          </div>
        </CommonS.CopyGrid>
      </S.Center>
    </CommonS.Hero>
  );
};

export default OfferOfTheWeekSection;

//
// Utils
//

const query = graphql`
  query OfferOfTheWeekSection {
    allStrapiNewsletterPromotion(limit: 1, filter: { isActive: { eq: true } }) {
      edges {
        node {
          footer_promo {
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
