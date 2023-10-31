import ConfirmationSent from '../../components/contents/dashboard/ConfirmationSent';
import PageLayout from '../../components/base/pageLayout';
import PageComponent from '../../components/base/activity';

export default function ConfirmationSentPage() {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={ConfirmationSent}
  />
}
