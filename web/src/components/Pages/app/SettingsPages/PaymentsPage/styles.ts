import styled from 'styled-components';
import colors from '../../../../../constants/colors';
import mq from '../../../../../constants/layout';

// TODO: review this page

export const SettingRow = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid #d8d8d8;
  padding-bottom: 30px;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
`;

export const ProfileSummary = styled.div`
  color: #454f57;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

export const ProfilePictureInput = styled.input`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  width: 100%;
  z-index: 1;
  cursor: pointer;
`;

export const AccountSummary = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  color: #454f57;
  font-size: 12px;
  text-align: left;

  ${mq.smUp} {
    display: flex;
    flex-direction: column;
    margin: 10px;
    color: #454f57;
    font-size: 12px;
    text-align: left;
  }
`;

export const Name = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

export const Membership = styled.span`
  opacity: 0.7;
`;

export const Email = Membership;

export const FormContainer = styled.div`
  padding: 1.5rem;
`;

// TODO: reconcile

export const CardBrandName = styled.span`
  text-transform: capitalize;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  margin: 37px 0;
`;

export const ListItemIcon = styled.div`
  margin-right: 10px;
`;

export const ListItemTextPrimary = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  margin-bottom: 2px;
`;

export const ListItemTextSecondary = styled.div`
  color: ${colors.textSecondary};
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const getIconUrl = (imageId: string) =>
  `url(https://res.cloudinary.com/festivalpass/image/upload/c_scale,h_31,w_31/v1614263187/icons/${imageId}.png)`;

export const PaymentProviderLogo = styled.div<{
  brand:
    | 'Visa'
    | 'UnionPay'
    | 'JCB'
    | 'Diners Club'
    | 'Discover'
    | 'American Express'
    | 'MasterCard';
}>`
  width: 31px;
  height: 31px;
  background-image: ${({ brand }) => {
    switch (brand) {
      case 'Visa':
        return getIconUrl('visa_rgqldv');
      case 'JCB':
        return getIconUrl('jcb_sr6wqv');
      case 'Diners Club':
        return getIconUrl('diners_aiayfa');
      case 'Discover':
        return getIconUrl('discover_axauem');
      case 'American Express':
        return getIconUrl('amex_hgqlhk');
      case 'MasterCard':
        return getIconUrl('mastercard_o3yqb3');
      default:
        return getIconUrl('default-payment-method_qx3mmp');
    }
  }};
`;

export const LoadingContainer = styled.div`
  width: 100%;
  padding: 50px 0;
  text-align: center;
`;
