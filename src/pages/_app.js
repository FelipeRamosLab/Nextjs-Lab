import './_globals';
import '../../styles/style.scss';
// Slick slider
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {PageDataProvider} from '../context/pageData';
import {ActivityDataProvider} from '../context/activityData';

function MyApp({ Component, pageProps }) {
  return (
    <PageDataProvider>
      <ActivityDataProvider>
        <Component {...pageProps} />

        <footer></footer>
      </ActivityDataProvider>
    </PageDataProvider>
  );
}

export default MyApp
