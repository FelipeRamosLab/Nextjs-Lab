import PageComponent from '../components/pageComponent';
import PageLayout from '../components/pageLayout';
import HomePage from '../components/contents/home';

export default function Index() {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={HomePage}
    activityUrl="/api/activities/home"
  />
}
