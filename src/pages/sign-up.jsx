import PageLayout from '../components/base/pageLayout';
import PageComponent from '../components/base/activity';
import SignUp from '../components/contents/sign-up';

export default function SignUpPage({ queryParams }) {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={SignUp}
    activityUrl="sign-up"
    queryParams={queryParams}
  />
}

export async function getServerSideProps(context){
  return {
    props: { queryParams: context.query}
  }
}
