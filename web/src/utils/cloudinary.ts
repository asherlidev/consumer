import { compact, head, isEmpty, map, reduce, toInteger } from 'lodash';

export const generateCloudinaryUrl = (
  image:
    | {
        version: number;
        public_id: string;
        format: string | undefined;
        type: 'upload' | 'fetch';
        resource_type: 'image' | 'video' | 'raw';
      }
    | undefined,
  transformations: CloudinaryTransformation[]
): string | undefined => {
  if (!image) return;

  const { version, public_id, format, type, resource_type } = image;

  let url = `https://res.cloudinary.com/${
    process.env.GATSBY_CLOUDINARY_CLOUD_NAME
  }/${resource_type}/${type}${getCloudinaryConfigParams(transformations)}/v${version}/${public_id}`;

  if (format) {
    url += `.${format}`;
  }

  return url;
};

export const resizeCloudinaryImage = (
  imageUrl: string | undefined,
  sizeTransformation: CloudinaryTransformation
): string | undefined => {
  const imageInfo = expandCloudinaryUrl(imageUrl);

  if (!imageInfo) return imageUrl;

  const {
    version,
    publicId: public_id,
    format,
    type,
    resourceType: resource_type,
    firstTransformation,
  } = imageInfo;

  const transformations = compact([firstTransformation, sizeTransformation]);

  const resizedImageUrl = generateCloudinaryUrl(
    { version, public_id, format, type, resource_type },
    transformations
  );

  return resizedImageUrl || imageUrl;
};

const getCloudinaryConfigParams = (transformations: CloudinaryTransformation[]): string => {
  let concatParams = '';
  for (let transformation of transformations) {
    const configParams: string[] = map(transformation, (value: any, key: string) =>
      [key, value].join('_')
    );
    concatParams += isEmpty(configParams) ? '' : '/' + configParams.join(',');
  }
  return concatParams;
};

const CLOUDINARY_REGEX = /^.+\.cloudinary\.com\/(?:[^\/]+\/)(?:(image|video|raw)\/)?(?:(upload|fetch)\/)?(?:((?:[^_/]+_[^,/]+[,\/]?)*)\/)*(?:v(\d+|\w{1,2})\/)?([^\.^\s]+)(?:\.(.+))?$/;

export const expandCloudinaryUrl = (
  url: string | undefined
):
  | {
      resourceType: 'image' | 'video' | 'raw';
      type: 'upload' | 'fetch';
      firstTransformation: CloudinaryTransformation | null;
      version: number;
      publicId: string;
      format: string | undefined;
    }
  | undefined => {
  if (!url) return;

  const matchedValues = CLOUDINARY_REGEX.exec(url);
  if (!matchedValues) return;

  const [, resource_type, type, transformationsString, version, public_id, format] = matchedValues;

  const firstTransformationString = head((transformationsString || '').split('/'));

  return {
    resourceType: resource_type as 'image' | 'video' | 'raw',
    type: type as 'upload' | 'fetch',
    firstTransformation: firstTransformationString
      ? reduce(
          (firstTransformationString as string).split(','),
          (transformation: CloudinaryTransformation, transformationString: string) => {
            if (!transformationString) return transformation;

            const [key, value] = transformationString.split('_');
            const transformedValue = ['x', 'y', 'w', 'h'].includes(key) ? toInteger(value) : value;
            return { ...transformation, [key]: transformedValue };
          },
          {}
        )
      : null,
    version: toInteger(version),
    publicId: public_id,
    format,
  };
};

export const getTransformedImageUrl = (
  url: string | undefined,
  width?: number,
  height?: number,
  format = 'auto',
  quality = 'auto'
) => {
  if (!url) return;

  const expandedCloudinaryValues = expandCloudinaryUrl(url);

  if (!expandedCloudinaryValues || expandedCloudinaryValues.resourceType === 'raw') {
    return;
  }

  const transform = { f: format, q: quality } as any;
  if (width) {
    transform.w = width;
  }
  if (height) {
    transform.h = height;
  }
  return resizeCloudinaryImage(url, transform);
};

export interface CloudinaryTransformation {
  w?: number; // width: https://cloudinary.com/documentation/image_transformation_reference#width_parameter
  h?: number; // height: https://cloudinary.com/documentation/image_transformation_reference#height_parameter
  c?: Crop; // crop: https://cloudinary.com/documentation/image_transformation_reference#crop_parameter
  g?: Gravity; // gravity: https://cloudinary.com/documentation/image_transformation_reference#gravity_parameter
  x?: number;
  y?: number;
  f?: string; // format: https://cloudinary.com/documentation/transformation_reference#f_format
  q?: string; // quality: https://cloudinary.com/documentation/transformation_reference#q_quality
}

export type Crop =
  | 'scale' // default by cloudinary
  | 'fit'
  | 'limit'
  | 'mfit'
  | 'fill'
  | 'lfill'
  | 'pad'
  | 'lpad'
  | 'mpad'
  | 'fill_pad'
  | 'crop'
  | 'thumb'
  | 'imagga_crop'
  | 'imagga_scale';

export type Gravity =
  | 'north_west'
  | 'north'
  | 'north_east'
  | 'west'
  | 'center' // default
  | 'east'
  | 'south_west'
  | 'south'
  | 'south_east'
  | 'xy_center'
  | 'face'
  | 'face:center'
  | 'face:auto'
  | 'faces'
  | 'faces:center'
  | 'faces:auto'
  | 'body'
  | 'body:face'
  | 'liquid'
  | 'ocr_text'
  | 'adv_face'
  | 'adv_faces'
  | 'adv_eyes'
  | 'custom'
  | 'custom:face'
  | 'custom:faces'
  | 'custom:adv_face'
  | 'custom:adv_faces'
  | 'auto:subject'
  | 'auto:classic'
  | 'auto:[object]' // Enter supported object key from https://cloudinary.com/documentation/cloudinary_object_aware_cropping_addon#supported_categories_and_objects
  | 'auto:adv_face'
  | 'auto:adv_faces'
  | 'auto:adv_eyes'
  | 'auto:body'
  | 'auto:face'
  | 'auto:faces'
  | 'auto:no_faces'
  | 'auto:custom_no_override'
  | 'auto:none';

export interface CloudinaryImage {
  access_control: any | null;
  access_mode: string;
  aspect_ratio: number;
  backup_bytes: number;
  bytes: number;
  created_at: string;
  created_by: any | null;
  etag: string;
  filename: string;
  folder: string;
  format: string | undefined;
  height: number;
  metadata: { [external_id: string]: any };
  pixels: number;
  public_id: string;
  resource_type: 'image' | 'video';
  secure_url: string;
  status: string;
  tags: string[];
  type: 'upload' | 'fetch';
  uploaded_at: string;
  uploaded_by: null;
  url: string;
  version: number;
  width: number;
}
