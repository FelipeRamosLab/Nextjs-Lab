import Dashboard from '../components/contents/dashboard';
import PageLayout from '../components/base/pageLayout';
import PageComponent from '../components/base/activity';

export default function Index() {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={Dashboard}
    activityUrl="dashboard"
  />
}
