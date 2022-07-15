export interface ISeatics {
  config: any;
  mapData: any;
  MapComponent: any;
}

export interface ISeaticMapComponent {
  create: () => void;
  addTicketData: (tickets: ISeaticsTicket[]) => void;
}

export interface IPoseliteListing {
  id: string;
  name: string;
  canonicalName: string;
  index: number;
  levelId: string;
  levelName: string;
  img: any;
  tickets: IPoseliteTicket[];
}

export interface IPoseliteTicket {
  id: string;
  price: number;
  quantity: number;
  splits: number[];
  section: string;
  row: string;
  lowSeat: string;
  highSeat: string;
  priceCredits: number;
  internal_id?: string;
}

/**
 * This interface is manually created from Adding Ticket Data section of the Seatics API Doc
 */
export interface ISeaticsTicket {
  /** The section the tickets are located in */
  tgUserSec: string;
  /** The row the tickets are located in, if applicable. Notes: You can pass an empty string, but the property needs to be there. */
  tgUserRow: string;
  /** The seat number range of inventory (e.g. 101- 105). Notes: Seat numbers are used for section matching for some venues, but do not display */
  tgUserSeats?: string;
  /** The number of tickets available in the ticket group */
  tgQty: number;
  /** The price per ticket */
  tgPrice: number;
  /** A unique ID for the ticket group */
  tgID?: number | string;
  /** Notes to be displayed with the ticket group (e.g. "Obstructed View") */
  tgNotes?: string;
  /** Use 1 to mark tickets as a featured offer */
  tgMark?: number;
  /** Optional but recommended. The ticket group type ID. Notes: See additional notes about ticket types like parking and packages */
  tgType?: number;
  /** Special shipping options notation. Use "EM" for e-ticket, "ID" for instant download, "MD" for mobile delivery, and "LP" for local pickup. Values can be combined (e.g. EMID) */
  tgDeliveryOptions?: string;
  /** A "slashed" price to show next to the current price */
  tgPriceSlash?: number;
  /** Rule id for valid ticket splits */
  tgSplitRuleId?: number;
  /** Extra data you'd like passed with the ticket group */
  tgClientData?: any;
  /** Relevant only if using TicketNetwork ticket data with zones enabled */
  tgCType?: string;
  /** Legal disclosures to show in a pop-up for the ticket group */
  tgDisclaimers?: string[];
}
