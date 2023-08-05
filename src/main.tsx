import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import axios from 'axios';
import {HashRouter} from 'react-router-dom';

import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '@icon-park/react/styles/index.css';

axios.defaults.baseURL = 'https://zonai.skland.com';
axios.defaults.headers.platform = 1;
axios.defaults.headers.os = 32;
axios.defaults.headers.language = 'zh-cn';
axios.defaults.headers.vName = '0.1.4';
axios.defaults.headers.manufacturer = 'Samsung';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <HashRouter>
        <App/>
    </HashRouter>
);
