import PageLayout from '../components/pageLayout';
import PageComponent from '../components/pageComponent';
import MasterAccount from '../components/contents/master-account';

export default function MasterAccountPage({queryParams}) {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={MasterAccount}
    activityUrl="master-account"
    queryParams={queryParams}
  />
}

export async function getServerSideProps(context){
  return {
    props: { queryParams: context.query}
  }
}
