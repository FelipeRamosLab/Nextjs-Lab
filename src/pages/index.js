import SignUp from '../components/contents/sign-up';
import PageLayout from '../components/base/pageLayout';
import PageComponent from '../components/base/activity';

export default function Index() {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={SignUp}
    activityUrl="sign-up"
  />
}
