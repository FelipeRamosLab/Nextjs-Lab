import PageLayout from '../components/pageLayout';
import PageComponent from '../components/pageComponent';
import SlotDetails from '../components/contents/slot-details';

export default function SlotDetailsPage({queryParams}) {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={SlotDetails}
    activityUrl="slot-details"
    queryParams={queryParams}
  />
}

export async function getServerSideProps(context){
  return {
    props: { queryParams: context.query}
  }
}
