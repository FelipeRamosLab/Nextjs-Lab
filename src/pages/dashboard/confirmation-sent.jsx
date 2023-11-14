import ConfirmationSent from '../../components/contents/dashboard/ConfirmationSent';
import PageLayout from '../../components/base/pageLayout';
import PageComponent from '../../components/base/activity';

export default function ConfirmationSentPage({ queryParams }) {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={ConfirmationSent}
    queryParams={queryParams}
  />
}

export async function getServerSideProps(context){
  return {
    props: { queryParams: context.query}
  }
}
