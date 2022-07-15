import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Maybe } from '../../../graphql-types';
import { Category, Datasource } from '../../components/EventDetailPage/EventDetailPageContent';
import { customFetch, runIfNotAborted } from '../../utils/httpClient';
import { useAuth } from '../auth/AuthProvider';

enum Status {
  Idle,
  Loading,
  Error,
  Success,
}

export interface TicketStub {
  created_at: string;
  days_valid: Maybe<number>;
  debit: Maybe<number>;
  description: string;
  email: Maybe<string>;
  event_end: Maybe<string>;
  event_name: string;
  event_start: Maybe<string>;
  external_barcode: Maybe<string>;
  first_name: Maybe<string>;
  id: number;
  isActive: boolean;
  isPending: boolean;
  last_name: Maybe<string>;
  ticket_id: Maybe<string>;
  ticket_serial_number: Maybe<number>; // TODO: check if number or string
  ticket_series_number: Maybe<number>; // TODO: check if number or string
  ticket_sku: number;
  ticketholder: number;
  updated_at: string;
}

export interface RestImage {
  id: number;
  url: string;
  // More fields are present but those aren't used
}

export interface Partner {
  created_at: string;
  description: Maybe<string>;
  events: any[];
  id: number;
  isActive: boolean;
  logo: Maybe<string>;
  name: string;
  organization: string;
  updated_at: string;
  users: User[];
}

interface FestivalCategories {
  created_at: string;
  datasource: number;
  description: string;
  external_id: string;
  id: number;
  isActive: boolean;
  name: string;
  updated_at: string;
}

export interface RestEvent {
  address: Maybe<string>;
  capacity: Maybe<number>;
  city: Maybe<string>;
  contact_email: Maybe<string>;
  country: Maybe<string>;
  cover_image: Maybe<RestImage>;
  created_at: Maybe<string>;
  credit_cost: number;
  datasource: Maybe<Datasource>;
  days: number;
  description: null;
  ds_retail_price: null;
  ds_wholesale_price: Maybe<string>;
  end: Maybe<string>;
  facebook_url: Maybe<string>;
  featured_order: null;
  featuredfestival: null;
  festivalpartner: null;
  festivalcategories: Array<FestivalCategories>;
  founded_date: null;
  gallery: RestImage[];
  id: number;
  isActive: boolean;
  isClaimed: Maybe<boolean>;
  isConfirmed: Maybe<boolean>;
  isFeatured: Maybe<boolean>;
  isVirtual: Maybe<boolean>;
  external_img_url: string;
  lat: Maybe<number>;
  lng: Maybe<number>;
  location: Maybe<string>;
  name: string;
  order: Maybe<number>;
  organizer_description: Maybe<string>;
  partner: Maybe<Partner>;
  slug_name: string;
  source: Maybe<any>;
  start: Maybe<string>;
  state: Maybe<string>;
  summary: Maybe<string>;
  updated_at: Maybe<string>;
  video_url: Maybe<string>;
  website_url: Maybe<string>;
}

export interface Badge {
  id: number;
  name: string;
  is_public: boolean;
  price: number;
  icon: RestImage;
}

export interface User {
  oauth_providers: Maybe<{ fb_userid: string; ig_userid: string }>;
  address_1: Maybe<string>;
  address_2: Maybe<string>;
  blocked: Maybe<boolean>;
  confirmed: boolean;
  created_at: string;
  credit_balance: number;
  credits: any[];
  debits: any[];
  email: string;
  fbConnected: boolean;
  first_name: string;
  giftcodes: any[];
  id: number;
  igConnected: boolean;
  interested_festivals: RestEvent[];
  interests: Category[];
  isFirstLogin: true;
  isPaidSubscriber: Maybe<boolean>;
  isPrepaidSubscriber: Maybe<boolean>;
  isPresignup: Maybe<boolean>;
  last_name: string;
  membership: string;
  partner: Maybe<Partner>;
  phone: Maybe<string>;
  phone_verified: Maybe<boolean>;
  provider: string;
  referral_code: string;
  referral_url: string;
  referrals: User[];
  referredBy: Maybe<User>;
  signup_bonus: any;
  stripe_id: string;
  subscription: any;
  tickets: any[];
  ticketstubs: TicketStub[];
  reservations: any[];
  updated_at: string;
  username: string;
  zipcode: string;
  profile_img: Maybe<{ url: string }>;
  personalized_newsletter_optIn: Maybe<boolean>;
  geolocation: Maybe<{ lat: number; lng: number }>;
  badges: Badge[];
  primary_badge: Badge;
}

type ContextValue = {
  user: User;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  status: Status;
};

const UserContext = React.createContext<ContextValue | undefined>(undefined);

const UserProvider = (props: PropsWithChildren<any>) => {
  const auth = useAuth();
  const [user, setUser] = useState<User>();
  const [status, setStatus] = useState(Status.Idle);

  const fetchUser = useCallback(async (abortFn: Maybe<Function>) => {
    const { promise, abort } = customFetch<User>(`${process.env.GATSBY_STRAPI_API_URL}/users/me`, {
      method: 'GET',
    });

    if (abortFn != null) {
      abortFn = abort;
    }

    try {
      const user = await promise;

      if (user) {
        setUser(user);
        setStatus(Status.Success);
      } else {
        setStatus(Status.Error);
      }
    } catch (e) {
      runIfNotAborted(e, () => {
        setStatus(Status.Error);
      });
    }
  }, []);

  useEffect(() => {
    let abortFn: Maybe<Function> = null;

    const allowGetUser =
      auth.authData != null && (user == null || user.id !== auth.authData.userId);

    if (allowGetUser) {
      setStatus(Status.Loading);
      fetchUser(abortFn);
    }

    return () => {
      if (abortFn != null) {
        abortFn();
      }
    };
  }, [auth, fetchUser, user]);

  const value = useMemo(() => ({ user, fetchUser, setUser, status }), [status, fetchUser, user]);

  return <UserContext.Provider value={value} {...props} />;
};

const useUser = (): ContextValue => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within an UserProvider');
  }
  return context;
};

export { useUser, UserProvider };
