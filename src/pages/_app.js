import './_globals';
import '../../styles/style.scss';
// Slick slider
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { PageDataProvider } from '../context/pageData';
import { ActivityDataProvider } from '../context/activityData';
import { SubscribeChangesProvider } from '../context/subscribeChanges';

function MyApp({ Component, pageProps }) {
  return (
    <PageDataProvider>
      <ActivityDataProvider>
        <SubscribeChangesProvider>
          <Component {...pageProps} />

          <footer></footer>
        </SubscribeChangesProvider>
      </ActivityDataProvider>
    </PageDataProvider>
  );
}

export default MyApp
