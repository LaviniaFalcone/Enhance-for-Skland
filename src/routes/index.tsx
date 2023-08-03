import {RouteObject} from 'react-router-dom';
import React from 'react';
import SklandBindingView from '../views/SklandBindingView';
import StatusView from '../views/arknights/StatusView';
import SklandCredLoginView from '../views/SklandCredLoginView';
import SettingView from '../views/SettingView';

const route = (path: string, element: React.ReactNode, children?: RouteObject[]): RouteObject => ({
    path,
    element,
    children
});

export default [
    route('binding', <SklandBindingView/>),
    route('arknights', undefined, [
        route('info', <StatusView/>)
    ]),
    route('setting', <SettingView/>),
    route('', <SklandCredLoginView/>)
];