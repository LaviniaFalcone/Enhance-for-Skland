import React from 'react';
import {RouteObject} from 'react-router-dom';
import StatusView from '../views/arknights/StatusView';
import SklandBindingView from '../views/SklandBindingView';
import SklandCredLoginView from '../views/SklandCredLoginView';

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
    route('', <SklandCredLoginView/>)
];