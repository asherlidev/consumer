import { graphql, navigate, useStaticQuery } from 'gatsby';

import { FluidObject } from 'gatsby-image';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LinkedEventsSectionQuery, Maybe } from '../../../../graphql-types';
import { CloudinaryImage } from '../../../types/common';
import { getTransformedImageUrl } from '../../../utils/cloudinary';
import { Category } from '../../Pages/EventDetailPage/EventDetailPageContent';
import Btn from '../Btn';
import Button from '../Button';
import CardDatePiker from '../CardDatePiker';
import Title from '../Title';
import creditsIcon from './icons/creditsIcon.svg';
import * as S from './styles';

export interface LinkedEvent {
  id: number;
  name: string;
  slug_name: string;
  start: Maybe<string>;
  description: Maybe<string>;
  credit_cost: number;
  cover_image: Maybe<CloudinaryImage>;
  address: string;
  city: string;
  state: string;
  festivalcategories: Category[];
}

interface Props {
  className?: string;
  events: LinkedEvent[];
}

const VanueEvents: React.FC<Props> = ({ className = '', events }) => {
  const { t } = useTranslation();
  // const [selectedEventDate, setSelectedEventDate] = useState<string>('');
  const [dates, setDates] = useState('');
  const [numberToShow, setNumberToShow] = useState(5);

  const data = useStaticQuery<LinkedEventsSectionQuery>(linkedEventsSectionQuery);

  const filteredEvents = useMemo(
    () =>
      events &&
      events.length > 0 &&
      events.filter(({ start }: LinkedEvent) =>
        dates ? moment(start).format('YYYY-MM-DD') === moment(dates).format('YYYY-MM-DD') : true
      ),
    [events, dates]
  );

  const sorter = (a: LinkedEvent, b: LinkedEvent) => {
    if (!a.start) return -1;
    if (!b.start) return 1;
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  };

  return (
    <S.Container className={` ${className}`}>
      {/* <S.Body className="row">
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
      </S.Body> */}

      <S.Body>
        <S.Header>
          <S.TitleContainer>{t('linkedEventsSection.title')}</S.TitleContainer>
          {/* <Title>{t('linkedEventsSection.title')}</Title> */}
          <S.DatePikerContainer>
            <CardDatePiker
              border="none"
              label="Date"
              placeholder={t('linkedEventsSection.selectDateFilter.placeholder')}
              value={dates}
              setValue={setDates}
            />
          </S.DatePikerContainer>
        </S.Header>
      </S.Body>

      <S.Body>
        {isEmpty(filteredEvents) ? (
          <strong>{t('linkedEventsSection.noEvents')}</strong>
        ) : (
          filteredEvents &&
          filteredEvents
            .sort(sorter)
            .map(
              (
                {
                  slug_name,
                  start,
                  credit_cost,
                  name,
                  description,
                  cover_image,
                  festivalcategories,
                  address,
                  city,
                  state,
                }: LinkedEvent,
                index: number
              ) => {
                if (index >= numberToShow) return;

                const category = festivalcategories?.find((item: any) => item.cover_image?.url);

                const cloudinaryUrl =
                  getTransformedImageUrl(
                    (cover_image as any)?.url,
                    225 // @ts-ignore
                  ) || category?.cover_image?.url;

                return (
                  <S.EventContainer key={index}>
                    <S.EventDateContainer>
                      <span>{moment(start).format('ddd')}</span>
                      <S.EventDate>{moment(start).format('D')}</S.EventDate>
                      <span>{moment(start).format('MMM')}</span>
                    </S.EventDateContainer>

                    <S.EventDateContainerSmall>
                      <span>{moment(start).format('ddd')}</span>
                      <S.EventDate>{moment(start).format('D')}</S.EventDate>
                      <span>{moment(start).format('MMM')}</span>
                    </S.EventDateContainerSmall>

                    {cover_image && cover_image.url ? (
                      <S.NonGatsCoverImage
                        backgroundUrl={getTransformedImageUrl(cover_image.url, 170) || ''}
                      />
                    ) : (
                      <S.NonGatsCoverImage
                        backgroundUrl={
                          cloudinaryUrl ||
                          data.eventPlaceholderImage?.childCloudinaryAsset?.fluid.src
                        }
                      />
                    )}

                    <S.EventContent>
                      <S.CreditsContainer>
                        <img src={creditsIcon} alt="Credits icon" />
                        <p>
                          {t('linkedEventsSection.amountInCredits', {
                            amount: credit_cost,
                          })}
                        </p>
                      </S.CreditsContainer>
                      <S.CreditsTitle>{name}</S.CreditsTitle>
                      <S.CreditsSummery>
                        {address || city || state ? `${address}, ${city}, ${state}` : ''}
                      </S.CreditsSummery>
                      <S.DateSubtitle>
                        {start ? moment(start).format('dddd, MMM D, yyyy @ h:mma') : ''}
                      </S.DateSubtitle>
                    </S.EventContent>

                    <S.EventButtonContainer>
                      {/* <Button bg="transparent" outlined onClick={() => navigate(`/events/${slug_name}`)}>
                  {t('linkedEventsSection.viewDetails')}
                </Button> */}
                      <S.ViewDetailBtn onClick={() => navigate(`/events/${slug_name}`)}>
                        {t('linkedEventsSection.viewDetails')}
                      </S.ViewDetailBtn>
                    </S.EventButtonContainer>
                  </S.EventContainer>
                );
              }
            )
        )}

        {filteredEvents && (
          <S.ViewMorebtnContainer>
            <S.ViewDetailBtn onClick={() => setNumberToShow(numberToShow + 5)}>
              {t('linkedEventsSection.viewmore')} ({filteredEvents.length} total)
            </S.ViewDetailBtn>
          </S.ViewMorebtnContainer>
        )}
      </S.Body>
    </S.Container>
  );
};

export default VanueEvents;

//
// Utils
//

const linkedEventsSectionQuery = graphql`
  query VanueEvents {
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
