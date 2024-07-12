import './_globals';
import '../../styles/style.scss';
// Slick slider
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { PageDataProvider } from '../context/pageData';
import { ActivityDataProvider } from '../context/activityData';
import { APIProvider } from '../context/4handsAPI';

function MyApp({ Component, pageProps }) {
  return (
    <APIProvider>
      <PageDataProvider>
        <ActivityDataProvider>
            <Component {...pageProps} />

            <footer></footer>
        </ActivityDataProvider>
      </PageDataProvider>
    </APIProvider>
  );
}

export default MyApp
