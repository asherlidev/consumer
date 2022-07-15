import { IPoseliteListing, ISeaticsTicket } from './seatics-types';

export const ticketsMapper = (listings: IPoseliteListing[]) => {
  return listings
    .map((listing): ISeaticsTicket[] => {
      return listing.tickets.map((ticket) => ({
        tgUserSec: listing.name,
        tgUserRow: ticket.row,
        tgQty: ticket.quantity,
        tgPrice: ticket.price,
        tgUserSeats: `${ticket.lowSeat} - ${ticket.highSeat}`,
        tgID: ticket.id,
        tgClientData: {
          credits: ticket.priceCredits,
          external_id: ticket.id,
          internal_id: ticket.internal_id,
        },
      }));
    })
    .flat();
};
