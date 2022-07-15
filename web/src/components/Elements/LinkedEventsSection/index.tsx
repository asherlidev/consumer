import { graphql, navigate, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LinkedEventsSectionQuery, Maybe } from '../../../../graphql-types';
import { CloudinaryImage } from '../../../types/common';
import { getTransformedImageUrl } from '../../../utils/cloudinary';
import Button from '../Button';
import Title from '../Title';
import creditsIcon from './icons/creditsIcon.svg';
import * as S from './styles';

export interface LinkedEvent {
  id: number;
  name: string;
  slug_name: string;
  start: Maybe<string>;
  summary: Maybe<string>;
  credit_cost: number;
  cover_image: Maybe<CloudinaryImage>;
}

interface Props {
  className?: string;
  events: LinkedEvent[];
}

const LinkedEventsSection: React.FC<Props> = ({ className = '', events }) => {
  const { t } = useTranslation();
  const [selectedEventDate, setSelectedEventDate] = useState<string>('');

  const data = useStaticQuery<LinkedEventsSectionQuery>(linkedEventsSectionQuery);

  const filteredEvents = useMemo(
    () =>
      events &&
      events.length > 0 &&
      events.filter(({ start }) => (selectedEventDate ? start === selectedEventDate : true)),
    [events, selectedEventDate]
  );

  return (
    <S.Container className={` ${className}`}>
      <S.Body className="row">
        <S.SectionHeader className="col-xs-12">
          <Title>{t('linkedEventsSection.title')}</Title>
          {!isEmpty(events) && (
            <S.SelectEventDate
              placeholder={t('linkedEventsSection.selectDateFilter.placeholder')}
              onChange={(e) => {
                setSelectedEventDate(e.target.value);
              }}
              value={selectedEventDate}
            >
              {events.map(({ slug_name, start }) => (
                <option key={slug_name} value={start}>
                  {moment(start).format('MMMM Do YYYY')}
                </option>
              ))}
            </S.SelectEventDate>
          )}
        </S.SectionHeader>
      </S.Body>

      <S.Body>
        {isEmpty(filteredEvents) ? (
          <strong>{t('linkedEventsSection.noEvents')}</strong>
        ) : (
          filteredEvents.map(({ slug_name, start, credit_cost, name, summary, cover_image }) => (
            <S.EventContainer key={slug_name}>
              <S.EventDateContainer>
                <span>{moment(start).format('ddd')}</span>
                <S.EventDate>{moment(start).format('D')}</S.EventDate>
                <span>{moment(start).format('MMM')}</span>
              </S.EventDateContainer>
              {cover_image?.url ? (
                <S.NonGatsCoverImage
                  backgroundUrl={getTransformedImageUrl(cover_image?.url, 170) || ''}
                />
              ) : (
                <S.CoverImage
                  fluid={
                    (cover_image?.childCloudinaryAsset?.fluid ||
                      data.eventPlaceholderImage?.childCloudinaryAsset?.fluid) as FluidObject
                  }
                />
              )}

              <S.EventContent>
                <span>
                  <img src={creditsIcon} alt="Credits icon" />
                  &nbsp;
                  {t('linkedEventsSection.amountInCredits', {
                    amount: credit_cost,
                  })}
                </span>
                <strong>{name}</strong>
                <small>{`${summary ? summary.substring(0, 50).trim() : ''}...`}</small>
              </S.EventContent>
              <S.EventButtonContainer>
                <Button bg="transparent" outlined onClick={() => navigate(`/events/${slug_name}`)}>
                  {t('linkedEventsSection.viewDetails')}
                </Button>
              </S.EventButtonContainer>
            </S.EventContainer>
          ))
        )}
      </S.Body>
    </S.Container>
  );
};

export default LinkedEventsSection;

//
// Utils
//

const linkedEventsSectionQuery = graphql`
  query LinkedEventsSection {
    eventPlaceholderImage: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "event-placeholder.jpg" }
    ) {
      childCloudinaryAsset {
        fluid {
          ...CloudinaryAssetFluid
        }
      }
    }
  }
`;
