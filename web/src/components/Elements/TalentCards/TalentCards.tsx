import { isEmpty, range, toInteger } from 'lodash';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'gatsby';
import TalentCard from '../TalentCard/TalentCard';
import * as S from './styles';
import { Talent } from '../../Pages/TalentDetailPage';

export interface CardsProps {
  className?: string;
  talents: Talent[] | undefined;
  title?: string;
  type?: 'row' | 'grid';
  cardType?: 'link' | 'selectable';
  loading?: boolean;
  withoutSubtitles?: boolean;
  withoutPadding?: boolean;
  loadingItemsCount?: number;
  hitsPerPage?: number;
  htmlId?: string;
  userLocation?: string | '';
  showWhenEmpty?: boolean;
}

const Cards: React.FC<CardsProps> = ({
  className,
  talents,
  type = 'row',
  cardType = 'link',
  title,
  loading,
  withoutSubtitles = false,
  withoutPadding = false,
  loadingItemsCount = 5,
  htmlId,
  userLocation,
  showWhenEmpty = false,
}) => {
  const { t } = useTranslation();
  const Wrapper = type === 'grid' ? S.Grid : S.Row;
  const empty = isEmpty(talents);
  const renderContent = useMemo(() => {
    if (loading) {
      return null;
    }
    if (empty) {
      return t('talentCards.noTalents');
    }
    return talents?.map((talent) => {
      const id = toInteger((talent as Talent).strapiId || (talent as Talent).id);

      return <TalentCard key={id} id={id} talent={talent} />;
    });
  }, [cardType, empty, talents?.map, loading, loadingItemsCount, t, withoutSubtitles]);

  return loading || (talents?.length || 0) > 0 || (talents?.length == 0 && showWhenEmpty) ? (
    <S.Container withoutPadding={withoutPadding} className={className} id={htmlId}>
      <S.InnerContainer>
        {title && <S.Title>{`${title} ${userLocation ? userLocation : ''}`}</S.Title>}
        {userLocation ? <Link to="/app/settings/account">Update Location</Link> : ''}
      </S.InnerContainer>
      <Wrapper isEmpty={empty}>{renderContent}</Wrapper>
    </S.Container>
  ) : null;
};

export default Cards;
