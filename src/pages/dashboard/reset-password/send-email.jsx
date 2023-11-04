import PasswordReset from '../../../components/contents/dashboard/PasswordReset';
import PageLayout from '../../../components/base/pageLayout';
import PageComponent from '../../../components/base/activity';

export default function SendResetPasswordPage() {
  return <PageComponent
    PageLayout={PageLayout}
    PageContent={PasswordReset}
  />
}
