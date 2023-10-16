import PageLayout from '../components/base/pageLayout';
import PageComponent from '../components/base/activity';
import SlotDetails from '../components/contents/slot-details';

export default function SlotDetailsPage({queryParams}) {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={SlotDetails}
    activityUrl="dashboard/slot-details"
    queryParams={queryParams}
  />
}

export async function getServerSideProps(context){
  return {
    props: { queryParams: context.query}
  }
}
