import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import colors from '../../../../../../../constants/colors';
import { Btn } from '../../../../../../Elements';
import { useEventForm } from '../../FormProvider';
import * as S from './styles';

interface Props {
  className?: string;
  valuesChanged: boolean;
  saving: boolean;
  disabled: boolean;
  undoChanges: () => void;
}

const FormButtons: React.FC<Props> = ({
  className,
  valuesChanged,
  saving,
  disabled,
  undoChanges,
}) => {
  const { t } = useTranslation();
  const { isNew, isCurrentFormSavedBefore, goToNextForm, isLastForm } = useEventForm();

  const buttonsJsx = useMemo(() => {
    if (isNew || !isCurrentFormSavedBefore) {
      return (
        <Btn
          label={t('eventForms.general.formButtons.saveAndContinue')}
          type="submit"
          width="170px"
          isLoading={saving}
          disabled={disabled}
        />
      );
    }

    if (valuesChanged) {
      return (
        <>
          {!saving && (
            <S.UndoButton
              label={t('eventForms.general.formButtons.undo')}
              onClick={undoChanges}
              width="90px"
              background={colors.white}
              disabled={disabled}
              animated={false}
            />
          )}
          <Btn
            label={t('eventForms.general.formButtons.save')}
            type="submit"
            width="90px"
            isLoading={saving}
            disabled={disabled}
            animated={false}
          />
        </>
      );
    }

    if (!isLastForm) {
      return (
        <Btn
          label={t('eventForms.general.formButtons.next')}
          width="90px"
          onClick={goToNextForm}
          disabled={disabled}
          animated={false}
        />
      );
    }

    return null;
  }, [
    isNew,
    isCurrentFormSavedBefore,
    saving,
    disabled,
    valuesChanged,
    undoChanges,
    t,
    isLastForm,
    goToNextForm,
  ]);

  return <S.Container className={className}>{buttonsJsx}</S.Container>;
};

export default FormButtons;
