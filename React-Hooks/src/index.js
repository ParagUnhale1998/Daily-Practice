import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RandomColor from './useEffects/RandomColor';
// import Time from './useEffects/Time';
// import DataFetching from './useEffects/DataFetching';
// import SubscriptionToEvents from './useEffects/SubscriptionToEvents';
// import App from './App';
// import Count from './useEffects/Count';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Count /> */}
    {/* <Time /> */}
    {/* <DataFetching /> */}
    {/* <SubscriptionToEvents /> */}
     <RandomColor />
  </React.StrictMode>
);
