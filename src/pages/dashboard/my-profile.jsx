import MyProfile from '../../components/contents/dashboard/MyProfile';
import PageLayout from '../../components/base/pageLayout';
import PageComponent from '../../components/base/activity';

export default function Index() {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={MyProfile}
    pageID="my-profile"
    activityUrl="dashboard/my-profile"
  />
}
