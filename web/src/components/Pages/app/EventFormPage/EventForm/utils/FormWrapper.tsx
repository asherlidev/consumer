import { Form, Formik, FormikConfig } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollToTop, Subtitle, Title } from '../../../../../Elements';
import { useEventForm } from '../FormProvider';
import FormControlButtons from './FormButtons';
import { ErrorMessage } from './styles';
import { DefaultFormProps } from './types';

// TODO: FormikConfig<Values>; where Values can be passed as a generic

interface Props extends DefaultFormProps {
  error?: string;
  formikProps: FormikConfig<any>;
  disabled?: boolean;
}

const FormWrapper: React.FC<Props> = ({
  className,
  formKey,
  error,
  formikProps,
  disabled = false,
  children,
}) => {
  const { t } = useTranslation();
  const { saveEventValuesError } = useEventForm();

  return (
    <div className={className}>
      <ScrollToTop />
      <Title>{t(`eventForms.${formKey}.title`)}</Title>
      <Subtitle>{t(`eventForms.${formKey}.subtitle`)}</Subtitle>
      <Formik enableReinitialize {...formikProps}>
        {(formProps) => (
          <Form>
            {children instanceof Function ? children(formProps) : children}
            {formProps.dirty && saveEventValuesError && (
              <ErrorMessage>{t('eventForms.general.somethingWentWrong')}</ErrorMessage>
            )}
            {formProps.dirty && error && <ErrorMessage>{error}</ErrorMessage>}
            <FormControlButtons
              disabled={disabled}
              valuesChanged={formProps.dirty}
              saving={formProps.isSubmitting}
              undoChanges={formProps.handleReset}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormWrapper;
