import React from 'react';
import { useTranslation } from 'react-i18next';
import { forms, useEventForm } from '../FormProvider';
import * as S from './styles';

interface Props {
  className?: string;
}

const EventFormMenu: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const { getFormUrl, isFormDisabled } = useEventForm();

  return (
    <S.Container className={className}>
      {forms.map(({ formKey }) => {
        const disabled = isFormDisabled(formKey);
        return (
          <S.MenuItem
            key={formKey}
            disabled={disabled}
            to={getFormUrl(formKey)}
            onClick={(e) => {
              if (disabled) {
                e.preventDefault();
              }
            }}
          >
            {t(`eventForms.${formKey}.menuTitle`)}
          </S.MenuItem>
        );
      })}
    </S.Container>
  );
};

export default EventFormMenu;
