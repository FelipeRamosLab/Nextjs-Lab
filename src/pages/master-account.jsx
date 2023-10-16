import PageLayout from '../components/base/pageLayout';
import PageComponent from '../components/base/activity';
import MasterAccount from '../components/contents/master-account';

export default function MasterAccountPage({queryParams}) {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={MasterAccount}
    activityUrl="dashboard/master-account"
    queryParams={queryParams}
  />
}

export async function getServerSideProps(context){
  return {
    props: { queryParams: context.query}
  }
}
