import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import Loading from './Loading';

const App = lazy(() => import ('./App'));

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>
  , document.getElementById('root')
);

registerServiceWorker();
