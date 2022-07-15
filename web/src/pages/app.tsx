import { Redirect, Router } from '@reach/router';
import { PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import React from 'react';
import loadable from '@loadable/component';
import AddEventsPage from '../components/Pages/app/AddEventsPage';
import AddInterestsPage from '../components/Pages/app/AddInterestsPage';
import ClaimEventConfirmationPage from '../components/Pages/app/ClaimEventConfirmationPage';
import ClaimEventPage from '../components/Pages/app/ClaimEventPage';
import ClaimEventVerificationPage from '../components/Pages/app/ClaimEventVerificationPage';
import FreeSignupSuccessfulPage from '../components/Pages/app/FreeSignupSuccessfulPage';
import InvitePage from '../components/Pages/app/InvitePage';
import MyAdventuresPage from '../components/Pages/app/MyAdventuresPage';
import MyWishlistsPage from '../components/Pages/app/MyWishlistsPage';
import PaymentPage from '../components/Pages/app/PaymentPage';
import PaymentSuccessfulPage from '../components/Pages/app/PaymentSuccessfulPage';
import { ConfirmPhonePage, EditPhonePage } from '../components/Pages/app/PhonePage';
import SettingsAccountPage from '../components/Pages/app/SettingsPages/AccountPage';
import SettingsBadgesPage from '../components/Pages/app/SettingsPages/BadgesPage';
import SettingsPasswordPage from '../components/Pages/app/SettingsPages/PasswordPage';
import PaymentsPage from '../components/Pages/app/SettingsPages/PaymentsPage';
import SettingsPreferencesPage from '../components/Pages/app/SettingsPages/PreferencesPage';
import EventCheckoutPage from '../components/Pages/app/EventCheckoutPage';
import HotelCheckoutPage from '../components/Pages/app/HotelCheckoutPage';
import RecommendationsPage from '../components/Pages/app/SettingsPages/RecommendationsPage';
import TicketDetailPage from '../components/Pages/app/TicketDetailPage';
import ReservationDetailPage from '../components/Pages/app/ReservationDetailPage';
import PrivateRoute from '../components/PrivateRoute';
const EventFormPage = loadable(() => import('../components/Pages/app/EventFormPage'));
const ManageEventsPage = loadable(() => import('../components/Pages/app/ManageEventsPage'));

const Page: React.FC<PageProps> = () => (
  <Router basepath="/app">
    <Redirect noThrow from="/settings" to="/app/settings/account" replace />
    <Redirect noThrow from="/tickets" to="/app/adventures" replace />
    <PrivateRoute path="/invite" component={InvitePage} />
    <PrivateRoute path="/adventures" component={MyAdventuresPage} />
    <PrivateRoute path="/wishlists" component={MyWishlistsPage} />
    <PrivateRoute path="/ticket/:ticket_sku" component={TicketDetailPage} />
    <PrivateRoute path="/reservation/:reservation_id" component={ReservationDetailPage} />
    <PrivateRoute path="/manage-events/new" component={EventFormPage} />
    <PrivateRoute path="/manage-events/edit/:slug/:formKey" component={EventFormPage} />
    <PrivateRoute path="/manage-events" component={ManageEventsPage} />
    <PrivateRoute path="/phone/edit" component={EditPhonePage} />
    <PrivateRoute path="/phone/confirm" component={ConfirmPhonePage} />
    <PrivateRoute path="/add-events" component={AddEventsPage} />
    <PrivateRoute path="/add-interests" component={AddInterestsPage} />
    <PrivateRoute path="/free-signup-successful" component={FreeSignupSuccessfulPage} />
    <PrivateRoute path="/payment-successful" component={PaymentSuccessfulPage} />
    <PrivateRoute path="/payment" component={PaymentPage} />
    <PrivateRoute path="/events/:slug/claim" component={ClaimEventPage} />
    <PrivateRoute path="/events/:slug/claim/verify" component={ClaimEventVerificationPage} />
    <PrivateRoute path="/events/:slug/claim/confirmation" component={ClaimEventConfirmationPage} />
    <PrivateRoute path="/events/:slug/checkout" component={EventCheckoutPage} />
    <PrivateRoute path="/hotels/checkout" component={HotelCheckoutPage} />
    <PrivateRoute path="/settings/account" component={SettingsAccountPage} />
    <PrivateRoute path="/settings/badges" component={SettingsBadgesPage} />
    <PrivateRoute path="/settings/preferences" component={SettingsPreferencesPage} />
    <PrivateRoute path="/settings/password" component={SettingsPasswordPage} />
    <PrivateRoute path="/settings/recommendations" component={RecommendationsPage} />
    <PrivateRoute path="/settings/payments" component={PaymentsPage} />
  </Router>
);

export const query = graphql`
  {
    ...LocaleQuery
  }
`;

export default Page;
