import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from '../shared/App';
import { createClientStore } from '../shared/store';

const store = createClientStore();

ReactDom.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
