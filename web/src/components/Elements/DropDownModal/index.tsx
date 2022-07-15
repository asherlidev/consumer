import React, { useEffect, useRef } from 'react';
import * as S from './styles';

interface Props extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  margin?: string | number;
  position?: { top?: string; bottom?: string; right?: string; left?: string };
  modalListArray?: string[];
  isOpen: boolean;
  setIsOpen: any;
}

const CardSearch: React.FC<Props> = ({
  margin,
  position,
  modalListArray,
  isOpen,
  setIsOpen,
  children,
  ...otherProps
}) => {
  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  if (isOpen) {
    return (
      <S.ShowmoreModal ref={wrapperRef} position={position}>
        {children || (
          <S.ShowmoreModalUl>
            {modalListArray?.map((tag: string) => (
              <S.ShowmoreModalList key={tag}>
                <a>{tag}</a>
              </S.ShowmoreModalList>
            ))}
          </S.ShowmoreModalUl>
        )}
      </S.ShowmoreModal>
    );
  } else {
    return null;
  }
};

export default CardSearch;
