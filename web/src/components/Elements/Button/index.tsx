import React, { useEffect, useRef, useState } from 'react';
import { CircularProgress } from '../Loading';
import * as S from './styles';

interface Props extends React.ButtonHTMLAttributes<any> {
  className?: string;
  icon?: any;
  bg?: 'white' | 'black' | 'transparent';
  color?: 'default' | 'primary' | 'black';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  outlined?: boolean;
  text?: boolean;
  as?: string | React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  className,
  icon,
  text,
  bg,
  color = 'default',
  size = 'medium',
  loading = false,
  disabled = false,
  outlined,
  children,
  ...otherProps
}) => {
  const [rootWidth, setRootWidth] = useState(0);
  const rootEl = useRef<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  >(null);

  const Component = !text && !outlined ? S.ContainedButton : text ? S.TextButton : S.OutlinedButton;

  useEffect(() => {
    if (rootEl.current) {
      setRootWidth(rootEl.current.clientWidth);
    }
  }, []);

  return (
    <Component
      size={size}
      loading={loading}
      bg={bg}
      color={color}
      className={className}
      disabled={disabled || loading}
      {...otherProps}
    >
      {loading ? (
        <S.Container style={{ width: rootWidth || 'auto' }}>
          <CircularProgress />
        </S.Container>
      ) : (
        <S.Container ref={rootEl}>
          {!!icon && <S.IconWrap>{icon}</S.IconWrap>}
          {children}
        </S.Container>
      )}
    </Component>
  );
};

export default Button;
