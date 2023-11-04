import PasswordReset from '../../../components/contents/dashboard/PasswordReset';
import PageLayout from '../../../components/base/pageLayout';
import PageComponent from '../../../components/base/activity';

export default function CreateNewPasswordPage({ queryParams }) {
  queryParams.isCreateNew = true;

  return <PageComponent
    PageLayout={PageLayout}
    PageContent={PasswordReset}
    queryParams={queryParams}
  />
}

export async function getServerSideProps(context){
  return {
    props: { queryParams: context.query}
  }
}
