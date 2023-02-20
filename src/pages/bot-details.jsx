import PageLayout from '../components/base/pageLayout';
import PageComponent from '../components/base/activity';
import BotDetails from '../components/contents/bot-details';

export default function SlotDetailsPage({queryParams}) {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={BotDetails}
    activityUrl="bot-details"
    queryParams={queryParams}
  />
}

export async function getServerSideProps(context){
  return {
    props: { queryParams: context.query}
  }
}
