import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <App />
);

registerServiceWorker();

if ((module as any).hot) {
  (module as any).hot.accept();
}