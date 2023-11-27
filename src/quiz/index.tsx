import './index.css';

import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <App />
);

registerServiceWorker();
