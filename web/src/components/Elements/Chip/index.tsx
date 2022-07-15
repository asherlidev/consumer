import React from 'react';
import colors from '../../../constants/colors';
import * as S from './styles';

interface Props {
  className?: string;
  backgroundColor?: string;
  color?: string;
  iconComponent?: any; // TODO: type for react component
  text?: string;
  title?: string;
}

const Chip: React.FC<Props> = ({
  className,
  backgroundColor = colors.gray,
  color,
  iconComponent: IconComponent,
  text,
  title,
  children,
  ...otherProps
}) => (
  <S.Container
    className={className}
    backgroundColor={backgroundColor}
    color={color}
    title={title}
    {...otherProps}
  >
    {IconComponent && <IconComponent style={!!text ? { marginRight: '5px' } : {}} height="12" />}
    {text && <S.Text>{text}</S.Text>}
    {children}
  </S.Container>
);

export default Chip;
