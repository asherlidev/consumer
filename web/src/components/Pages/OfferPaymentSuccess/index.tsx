import React from 'react';
import { useQuery } from '@apollo/client';
import { PageProps } from 'gatsby';
import ReactMarkdown from 'react-markdown';
import { navigate } from 'gatsby';
import * as S from './styles';
import { Footer, Header } from '../../Layout';
import { getOfferPaymentSuccessQuery } from '../../../utils/gqlQueries';
import { Loading } from '../../Elements';

const OfferPaymentSuccess: React.FC<PageProps<{}, {}>> = ({ pageContext: {} }) => {
  const { data, loading } = useQuery<{
    offerSuccessPage: {
      title: string;
      content: string;
      bullet1: string;
      bullet2: string;
      bullet3: string;
      primary_btn_url: string;
      primary_btn_label: string;
      secondary_btn_url: string;
      secondary_btn_label: string;
    };
  }>(getOfferPaymentSuccessQuery());

  const pageStrings = data?.offerSuccessPage;

  return (
    <>
      <Header />
      <S.Container>
        <div className="row .no-gutters">
          <S.Left className="col-md-6 col-xs-12">
            <S.Panel className="col-xs-12 col-sm-9">
              {loading && <Loading />}
              {!loading && (
                <div>
                  <S.Title>{pageStrings?.title}</S.Title>
                  <S.CaptionTxt>
                    <ReactMarkdown>{pageStrings?.content!}</ReactMarkdown>
                  </S.CaptionTxt>
                  <S.FpList>
                    <S.FpListItem className="row" style={{ flexDirection: 'row' }}>
                      <img
                        alt=""
                        src="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1564394727/ico-checkmark-purchase_ym4je5.svg"
                        width="25"
                        style={{ margin: 15 }}
                      />
                      <strong>
                        <span>{pageStrings?.bullet1}</span>
                      </strong>
                    </S.FpListItem>
                    <S.FpListItem className="row" style={{ flexDirection: 'row' }}>
                      <img
                        alt=""
                        src="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1564394727/ico-checkmark-purchase_ym4je5.svg"
                        width="25"
                        style={{ margin: 15 }}
                      />
                      <strong>
                        <span>{pageStrings?.bullet2}</span>
                      </strong>
                    </S.FpListItem>
                    <S.FpListItem className="row" style={{ flexDirection: 'row' }}>
                      <img
                        alt=""
                        src="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1564394727/ico-checkmark-purchase_ym4je5.svg"
                        width="25"
                        style={{ margin: 15 }}
                      />
                      <strong>
                        <span>{pageStrings?.bullet3}</span>
                      </strong>
                    </S.FpListItem>
                  </S.FpList>
                  <S.FpBtn
                    onClick={() => navigate(`${pageStrings?.primary_btn_url}`)}
                    type="button"
                    className="animated fadeInUp"
                  >
                    <span>{pageStrings?.primary_btn_label}</span>
                  </S.FpBtn>
                  <S.FpBtnAlt
                    onClick={() => navigate(`${pageStrings?.secondary_btn_url}`)}
                    type="button"
                    className="animated fadeInUp"
                  >
                    <span>{pageStrings?.secondary_btn_label}</span>
                  </S.FpBtnAlt>
                </div>
              )}
            </S.Panel>
          </S.Left>
          <S.Right className="col-md-6 hidden-sm">
            <S.Mask>
              <S.FpFeatureImg src="https://res.cloudinary.com/festivalpass/image/upload/q_auto/v1595952329/fp-content/OfferImage.png" />
            </S.Mask>
          </S.Right>
        </div>
        <Footer />
      </S.Container>
    </>
  );
};

export default OfferPaymentSuccess;
