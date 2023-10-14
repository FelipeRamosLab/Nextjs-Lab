import SignUp from '../components/contents/sign-up';
import Login from '../components/contents/login';
import PageLayout from '../components/base/pageLayout';
import PageComponent from '../components/base/activity';

export default function Index({ queryParams }) {
  const { formType } = Object(queryParams);
  
  switch (formType) {
    case 'sign-up': {
      return <PageComponent
        PageLayout={PageLayout}
        PageContent={SignUp}
      />
    }

    case 'login':
    default: {
      return <PageComponent
        PageLayout={PageLayout}
        PageContent={Login}
      />
    }
  }
}


export async function getServerSideProps(context){
  return {
    props: { queryParams: context.query}
  }
}
