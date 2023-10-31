import EmailConfirmation from '../../components/contents/dashboard/EmailConfirmation';
import PageLayout from '../../components/base/pageLayout';
import PageComponent from '../../components/base/activity';

export default function EmailConfirmationPage({ queryParams }) {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={EmailConfirmation}
    queryParams={queryParams}
  />
}

export async function getServerSideProps(context){
  return {
    props: { queryParams: context.query}
  }
}

