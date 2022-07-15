import styled from 'styled-components';
import zIndex from '../../constants/zIndex';

export const ToastsContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding: 16px;
  z-index: ${zIndex.toast};

  /* from node_modules/bootstrap/scss/_toasts.scss */
  .toast {
    max-width: 350px;
    min-width: 150px;
    overflow: hidden;
    background-color: hsla(0, 0%, 100%, 0.85);
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    opacity: 0;

    &:not(:last-child) {
      margin-bottom: 12px;
    }

    &.showing {
      opacity: 1;
    }

    &.show {
      display: block;
      opacity: 1;
    }

    &.hide {
      display: none;
    }
  }

  .toast-header {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 4px 12px;
    color: #6c757d;
    background-color: hsla(0, 0%, 100%, 0.85);
    background-clip: padding-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    button.close {
      margin-bottom: 0;
    }
  }

  .toast-body {
    padding: 12px;
    text-align: left;
  }
`;

export const ToastHeaderContent = styled.div`
  flex: 1;
  text-align: left;
`;
