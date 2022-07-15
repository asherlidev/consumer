import React from 'react';
import { AnalyticsProvider } from './analytics';
import { ApolloProvider } from './apollo';
import { AuthProvider } from './auth';
import { ClaimEventProvider } from './claim-event';
import { GiftingProvider } from './gifting';
import { LocationDataProvider } from './location-data';
import { PresignupProvider } from './presignup';
import { ReferralProvider } from './referral';
import { SelectPlanProvider } from './select-plan';
import { ToastProvider } from './toast';
import { UserProvider } from './user';

interface Props {}

const AppContext: React.FC<Props> = ({ children }) => (
  <AuthProvider>
    <AnalyticsProvider>
      <ToastProvider delay={3000}>
        <ApolloProvider>
          <UserProvider>
            <LocationDataProvider>
              <ReferralProvider>
                <PresignupProvider>
                  <GiftingProvider>
                    <ClaimEventProvider>
                      <SelectPlanProvider>{children}</SelectPlanProvider>
                    </ClaimEventProvider>
                  </GiftingProvider>
                </PresignupProvider>
              </ReferralProvider>
            </LocationDataProvider>
          </UserProvider>
        </ApolloProvider>
      </ToastProvider>
    </AnalyticsProvider>
  </AuthProvider>
);

export default AppContext;
