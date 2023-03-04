import PageLayout from '../components/base/pageLayout';
import PageComponent from '../components/base/activity';
import Logs from '../components/contents/logs';

export default function MasterAccountPage({queryParams}) {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={Logs}
    activityUrl="logs"
    queryParams={queryParams}
  />
}

export async function getServerSideProps(context){
  return {
    props: { queryParams: context.query}
  }
}
