import PageComponent from '../components/base/activity';
import PageLayout from '../components/base/pageLayout';
import HomePage from '../components/contents/home';

export default function Index() {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={HomePage}
    activityUrl="home"
  />
}
