import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import axios from 'axios';
import {HashRouter} from 'react-router-dom';

import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@icon-park/react/styles/index.css';

axios.defaults.baseURL = 'https://zonai.skland.com';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <HashRouter>
        <App/>
    </HashRouter>
);
