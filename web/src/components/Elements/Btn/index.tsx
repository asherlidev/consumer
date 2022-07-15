import React from 'react';
import colors from '../../../constants/colors';
import defaultLoadingSpinner from './defaultLoadingSpinner.svg';
import pinkLoadingSpinner from './pinkLoadingSpinner.gif';
import * as S from './styles';

interface Props extends React.ButtonHTMLAttributes<any> {
  className?: string;
  label?: string;
  animated?: boolean;
  isLoading?: boolean;
  pinkLoader?: boolean;
  color?: string;
  background?: string;
  hoverBackground?: string;
  width?: string | number;
  height?: string | number;
  fontSize?: string;
  fontWeight?: number;
  borderRadius?: string | number;
  borderColor?: string;
  img?: string;
  disabled?: boolean;
  onClick?: () => void;
  noMR?: boolean;
  noFullWidth?: boolean;
}

const Btn: React.FC<Props> = ({
  className,
  label,
  animated = true,
  isLoading = false,
  pinkLoader = false,
  disabled = false,
  color,
  background,
  width,
  height,
  fontSize,
  img,
  children,
  fontWeight,
  borderRadius,
  borderColor,
  noMR,
  noFullWidth,
  ...otherProps
}) => (
  <S.Button
    className={`${animated && 'animated fadeInUp'} ${className || ''}`}
    width={width}
    height={height}
    color={color}
    background={background}
    fontSize={fontSize}
    disabled={disabled || isLoading}
    fontWeight={fontWeight}
    borderRadius={borderRadius}
    borderColor={borderColor}
    noMR={noMR}
    noFullWidth={noFullWidth}
    {...otherProps}
  >
    {isLoading ? (
      <img
        src={
          pinkLoader || (background && [colors.white, colors.transparent].includes(background))
            ? pinkLoadingSpinner
            : defaultLoadingSpinner
        }
        width="18"
        alt="Loading spinner"
      />
    ) : (
      img && <img src={img} alt="Button icon" />
    )}
    {(isLoading || img) && label && <span>&nbsp;</span>}
    {label || children}
  </S.Button>
);

export default Btn;
