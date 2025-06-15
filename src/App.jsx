import React from 'react';
import './App.css'; // Ensure your existing CSS is saved as App.css or import accordingly
import WeatherApp from './WeatherApp';

import { Provider } from 'react-redux';
import { store } from './store.js';

function App() {
    return (
        <Provider store={store}>
    <WeatherApp />
  </Provider>
    );
};

export default App;
