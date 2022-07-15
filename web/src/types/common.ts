import { CloudinaryAsset, Maybe } from '../../graphql-types';

export enum FetchStatus {
  Idle,
  Loading,
  Error,
  Success,
}

interface ErrorMessage {
  id: string;
  message: string;
}

interface ErrorMessages {
  messages: ErrorMessage[];
}

export interface StrapiErrorResponse {
  statusCode: number;
  error: string;
  message: ErrorMessages[];
  data: ErrorMessages[];
}

export interface CloudinaryImage {
  childCloudinaryAsset: CloudinaryAsset;
  url?: string;
}

export interface GalleryImage {
  id: number;
  url: string;
}

export interface StrapiImage {
  id: number;
  name: string;
  hash: string;
  sha256: string | null;
  ext: string;
  mime: string;
  size: number;
  url: string;
  provider: 'cloudinary-folderoptions';
  public_id: Maybe<string>;
  created_at: string;
  updated_at: string;
  provider_metadata: {
    public_id: string;
    resource_type: 'image';
  };
  alternativeText: Maybe<string>;
  caption: Maybe<string>;
  width: number;
  height: number;
  formats: Object;
  previewUrl: Maybe<string>;
  related: Object[];
}

export type CouponSku = {
  id: number;
  name: string;
  description: string;
  amount_off: number | null;
  percent_off: number | null;
  isActive: boolean;
  created_at: string;
  updated_at: string;
  price: number;
  product_id: string;
  outboundcampaign: number;
  eligible_product: number | null; // plan id
  price_id: number | null;
  marketing_url: string;
  stripe_charge_id: string | null;
  charge_id: string | null;
  duration: number | null;
};
