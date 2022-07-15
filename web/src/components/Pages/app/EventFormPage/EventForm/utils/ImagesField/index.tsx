import { FieldInputProps, useField, useFormikContext } from 'formik';
import { filter, head, isArray, map, memoize } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Maybe } from '../../../../../../../../graphql-types';
import { useEventPreview } from '../../EventPreviewProvider';
import { ErrorMessage } from '../styles';
import * as S from './styles';

interface OwnProps {
  className?: string;
  maxFileSizeInMb: number;
  label?: string;
  disabled?: boolean;
}

type Props = OwnProps & FieldInputProps<any>;

const ImagesField: React.FC<Props> = (props) => {
  const { className, disabled, label, maxFileSizeInMb, multiple } = props;
  const { setEventPreview } = useEventPreview();
  const { isSubmitting } = useFormikContext();
  const [field, , helpers] = useField(props);
  const [errorMessage, setErrorMessage] = useState<Maybe<string>>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isSubmitting) {
      setErrorMessage(null);
    }
  }, [isSubmitting]);

  const handleSelectImage = useCallback(
    (event) => {
      event.preventDefault();
      setErrorMessage(null);

      const files = event.target.files;

      const filteredFiles = filter(files, (file) =>
        maxFileSizeInMb ? file.size < maxFileSizeInMb * 1024 * 1024 : true
      );

      const numberOfRemovedFiles = files.length - filteredFiles.length;
      if (numberOfRemovedFiles > 0) {
        setErrorMessage(
          `Removed file${numberOfRemovedFiles > 1 ? 's' : ''}: larger than ${maxFileSizeInMb}mb`
        );
      }

      if (!!multiple) {
        helpers.setValue([...field.value, ...filteredFiles]);
      } else {
        helpers.setValue(filteredFiles[0] || null);
      }
    },
    [multiple, maxFileSizeInMb, helpers, field.value]
  );

  const handleRemoveImage = useCallback(
    (imageIndex) => {
      if (!!multiple) {
        helpers.setValue(field.value.filter((_, i) => i !== imageIndex));
      } else {
        helpers.setValue(null);
      }
    },
    [multiple, helpers, field.value]
  );

  const valueAsArray = useMemo(() => {
    if (field.value) {
      return isArray(field.value) ? field.value : [field.value];
    }
    return [];
  }, [field.value]);

  useEffect(() => {
    const graphqlEquivalentValueAsArray = map(valueAsArray, (image) =>
      image.__typename && image.__typename === 'UploadFile'
        ? image
        : getGraphqlEquivalentForImageFile(image)
    );

    setEventPreview((prevEventPreview) => ({
      ...prevEventPreview,
      [field.name]: multiple ? graphqlEquivalentValueAsArray : head(graphqlEquivalentValueAsArray),
    }));
  }, [field.name, valueAsArray, multiple, setEventPreview]);

  return (
    <S.Container className={className}>
      {label && <S.Label>{label}</S.Label>}
      <S.ImagesGrid>
        {map(valueAsArray, (image) =>
          image.__typename && image.__typename === 'UploadFile'
            ? image
            : getGraphqlEquivalentForImageFile(image)
        ).map(({ id, url }, index) => (
          <S.ImageContainer key={id}>
            <S.ImagesGridElement imageUrl={url} />
            <S.RemoveImageButton
              onClick={() => {
                handleRemoveImage(index);
              }}
            />
          </S.ImageContainer>
        ))}
        {(multiple || !field.value) && (
          <S.AddImageGridElement>
            <S.ImageInput
              type="file"
              name={field.name}
              id="images"
              accept="image/*"
              multiple={!!multiple}
              value=""
              onChange={handleSelectImage}
              disabled={disabled}
            />
            {t('eventForms.general.imagesField.addImage')}
          </S.AddImageGridElement>
        )}
      </S.ImagesGrid>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </S.Container>
  );
};

export default ImagesField;

//
// Utils
//

// Memoization is to prevent that a new ObjectURL gets created every time (see memory management: https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
const getGraphqlEquivalentForImageFile = memoize((file) => ({
  id: Date.now() + Math.random().toString().slice(2), // This random id will be overwritten by the backend when uploading
  url: URL.createObjectURL(file),
}));
