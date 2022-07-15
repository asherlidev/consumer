import { navigate, Link } from 'gatsby';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import moment from 'moment';
import React, { useCallback, useState, useRef, useEffect, RefObject } from 'react';
import { Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../../context/user';
import { useAuth } from '../../../../context/auth';
import * as http from '../../../../utils/httpClient';
import { Btn, Button, Title } from '../../../Elements';
import CardDatePiker from '../../../Elements/CardDatePiker';
import { Event, Ticket } from '../EventDetailPageContent';
import PurchaseButton from '../PurchaseButton';
import celebrationIcon from './celebrationIcon.svg';
import { CallMissedIcon } from '../../../Icons';
import colors from '../../../../constants/colors';
import { ArrowDownIcon } from '../../../Icons';
import * as S from './styles';
import creditsIcon from '../EventDetailPageContent/icons/creditsIcon.svg';

interface Props {
  event: Event;
  ticket: any;
  seats: number;
  setSeats: (state: number) => void;
  calculatedCreditPrice?: number;
  disabled: boolean;
  mapRef: React.RefObject<HTMLDivElement>;
  noTickets: boolean;
}

const TicketsContent: React.FC<Props> = ({
  event: { name, slug_name, start, credit_cost, city, state },
  ticket,
  seats,
  setSeats,
  calculatedCreditPrice,
  disabled,
  mapRef,
  noTickets,
}) => {
  const { t } = useTranslation();
  const breakpoints = useBreakpoint();
  const { user, fetchUser } = useUser();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // const [ticketCounter, setTicketCounter] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showStickyDropdown, setShowStickyDropdown] = useState(false);
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const ticketBoxRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [dates, setDates] = useState('');
  const [sticky, setSticky] = useState('');

  const openDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const openStickyDropdown = () => {
    setShowStickyDropdown((prev) => !prev);
  };

  const disableClick = (event) => {
    event.stopPropagation();
  };

  const completePurchase = () => {
    if (ticket) {
      window.open(
        `/app/events/${slug_name}/checkout?id=${ticket.tgClientData.external_id}&price=${
          ticket.tgClientData.credits
        }&quantity=${seats}&event_name=${name}&event_date=${start}&event_location=${`${city}, ${state}`}&seats_id=Section ${
          ticket.tgUserSec
        }, Row ${ticket.tgUserRow}`
      );
    }
  };

  const checkSticky = () => {
    if (!ticketBoxRef || !ticketBoxRef.current) return;
    if (ticketBoxRef?.current.getBoundingClientRect().top < (breakpoints.smDown ? 164 : 110)) {
      setSticky('sticky');
    } else {
      setSticky('');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkSticky);
    return () => {
      return window.removeEventListener('scroll', checkSticky);
    };
  }, []);

  useEffect(() => {
    checkSticky();
  }, [ticketBoxRef.current]);

  const confirmTicket = useCallback(async () => {
    // Prevents users from double-clicking for multiple tickets
    if (selectedTicket && !isLoading) {
      setIsLoading(true);
      setErrorMessage('');
      try {
        // TODO: get type right
        const { promise } = http.customFetch<any>(
          `${process.env.GATSBY_STRAPI_API_URL}/tickets/${selectedTicket?.id}/redeem`,
          {
            method: 'POST',
            body: http.json({ attendees: [user?.id] }),
          }
        );

        const response = await promise;

        if (response.message) {
          setErrorMessage(response.message);
        } else {
          setIsSuccess(true);
          fetchUser();
        }
      } catch (e) {
        if (e.errorData) {
          setErrorMessage(e.errorData.message);
        } else {
          console.error(e);
        }
      }
      setIsLoading(false);
    }
  }, [fetchUser, isLoading, selectedTicket, user?.id]);

  const viewMyTickets = useCallback(() => {
    navigate('/app/adventures');
  }, []);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    ref?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const goMap = () => {
    scrollToRef(mapRef);
  };

  if (!isSuccess) {
    return (
      <>
        <S.Container ref={ticketBoxRef}>
          <div className="header">
            <span className="credit-value">{calculatedCreditPrice || credit_cost || 0}</span>
            <span className="credit">Credits</span>
            <span className="person">/ person</span>
          </div>
          <div className="ticket-box">
            <div className="ticket-counter-container">
              <span className="ticket-label"># of Tickets</span>
              <div className="ticket-dropdown" onClick={openDropdown}>
                <span className="count">
                  {seats} {seats > 1 ? 'Tickets' : 'Ticket'}
                </span>
                <span className="count-icon" onClick={openDropdown}>
                  <ArrowDownIcon />
                </span>
                {showDropdown && (
                  <S.DropDownMenu>
                    <S.MenuItem
                      onClick={() => {
                        setSeats(1);
                        openDropdown();
                      }}
                    >
                      1 Ticket
                    </S.MenuItem>
                    <S.MenuItem
                      onClick={() => {
                        setSeats(2);
                        openDropdown();
                      }}
                    >
                      2 Tickets
                    </S.MenuItem>
                  </S.DropDownMenu>
                )}
              </div>
            </div>
            <div className="seat-info">
              <span className="ticket-label">Seats</span>
              {ticket ? (
                <span className="seat-value">
                  Section {ticket.tgUserSec}, Row {ticket.tgUserRow}
                </span>
              ) : (
                !noTickets && (
                  <span className="select-seats" onClick={goMap}>
                    {t('eventDetailPageContent.tickets.selectSeats')}
                  </span>
                )
              )}
            </div>
          </div>

          <Btn
            label={t('eventDetailPageContent.tickets.getTickets')}
            height="54px"
            width="100%"
            fontSize="16px"
            fontWeight={600}
            color={colors.white}
            background={colors.error}
            hoverBackground={colors.error}
            onClick={completePurchase}
            disabled={disabled}
          />
        </S.Container>
        {sticky && breakpoints.mdUp && (
          <S.Container className="sticky">
            <div className="header">
              <div className="credit-wrapper">
                <span className="credit-value">{calculatedCreditPrice || credit_cost || 0}</span>
                <span className="credit">Credits</span>
              </div>
              <div className="person">/ person</div>
            </div>
            <div className="ticket-box">
              <div className="ticket-counter-container">
                <span className="ticket-label"># of Tickets</span>
                <div className="ticket-dropdown">
                  <span className="count" onClick={openStickyDropdown}>
                    {seats} {seats > 1 ? 'Tickets' : 'Ticket'}
                  </span>
                  <span className="count-icon" onClick={openStickyDropdown}>
                    <ArrowDownIcon />
                  </span>
                  {showStickyDropdown && (
                    <S.DropDownMenu>
                      <S.MenuItem
                        onClick={() => {
                          setSeats(1);
                          openDropdown();
                        }}
                      >
                        1 Ticket
                      </S.MenuItem>
                      <S.MenuItem
                        onClick={() => {
                          setSeats(2);
                          openDropdown();
                        }}
                      >
                        2 Tickets
                      </S.MenuItem>
                    </S.DropDownMenu>
                  )}
                </div>
              </div>
              <div className="seat-info">
                <span className="ticket-label">Seats</span>
                {ticket ? (
                  <span className="seat-value">
                    Section {ticket.tgUserSec}, Row {ticket.tgUserRow}
                  </span>
                ) : (
                  !noTickets && (
                    <span className="select-seats" onClick={goMap}>
                      {t('eventDetailPageContent.tickets.selectSeats')}
                    </span>
                  )
                )}
              </div>
            </div>

            <Btn
              label={t('eventDetailPageContent.tickets.getTickets')}
              height="54px"
              width="100%"
              fontSize="16px"
              fontWeight={600}
              color={colors.white}
              background={colors.error}
              hoverBackground={colors.error}
              onClick={completePurchase}
              disabled={disabled}
            />
          </S.Container>
        )}

        {/* {!breakpoints.mdUp && !noTickets && <S.SelectTicket onClick={goMap}>
          <CallMissedIcon/>
          <span>Select Ticket</span>
        </S.SelectTicket>} */}
      </>
    );
  }

  return (
    <S.Container>
      <S.Header center={true} className="row">
        <div className="col-xs-12 col-sm-12">
          <img src={celebrationIcon} alt="Celebration icon" />
          <Title>{t('eventDetailPageContent.tickets.successTitle')}</Title>
          <p>
            {t('eventDetailPageContent.tickets.successSubtitle', {
              name,
            })}
          </p>
          <br />
        </div>
      </S.Header>

      <S.CenteredButtonContainer className="row">
        <Btn
          width={breakpoints.smDown ? '100%' : '300px'}
          label={t('eventDetailPageContent.tickets.myTicketsButton')}
          onClick={viewMyTickets}
          isLoading={isLoading}
        />
      </S.CenteredButtonContainer>
    </S.Container>
  );
};

export default TicketsContent;
