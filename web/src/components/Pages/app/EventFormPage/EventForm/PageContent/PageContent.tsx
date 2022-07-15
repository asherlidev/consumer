import { graphql, useStaticQuery } from 'gatsby';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { find, toString } from 'lodash';
import React, { useMemo } from 'react';
import { EventFormPageContentQuery } from '../../../../../../../graphql-types';
import { CenteredLoading } from '../../../../../Elements/Loading';
import { Category } from '../../../../../EventDetailPage/EventDetailPageContent';
import { useEventPreview } from '../EventPreviewProvider';
import EventFormMenu from '../FormMenu';
import { forms, useEventForm } from '../FormProvider';
import * as S from './styles';

interface Props {}

const EventFormPageContent: React.FC<Props> = (props) => {
  const { fetchingEvent, formKey } = useEventForm();
  const { eventPreview } = useEventPreview();
  const breakpoints = useBreakpoint();

  const data = useStaticQuery<EventFormPageContentQuery>(eventFormPageContentQuery);

  const categories = useMemo(
    (): Category[] =>
      data.categories.edges.map(({ node: { strapiId, name } }) => ({
        id: toString(strapiId),
        name: name as string,
      })),
    [data.categories.edges]
  );

  const FormComponent = useMemo(() => find(forms, { formKey })?.component, [formKey]);

  if (fetchingEvent) {
    return (
      <S.Container>
        <CenteredLoading />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <EventFormMenu />
      <S.StepFormContainer>
        {formKey && FormComponent && <FormComponent {...props} formKey={formKey} />}
      </S.StepFormContainer>
      {breakpoints.mdUp && (
        <S.EventDetailPageContent event={eventPreview} categories={categories} isPreview />
      )}
    </S.Container>
  );
};

export default EventFormPageContent;

//
// Utils
//

const eventFormPageContentQuery = graphql`
  query EventFormPageContent {
    categories: allStrapiInterest(filter: { isActive: { eq: true } }) {
      edges {
        node {
          strapiId
          name
        }
      }
    }
  }
`;
