import HomePage from '../components/contents/home';
import PageLayout from '../components/base/pageLayout';
import PageComponent from '../components/base/activity';

export default function Index() {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={HomePage}
    activityUrl="home"
  />
}
