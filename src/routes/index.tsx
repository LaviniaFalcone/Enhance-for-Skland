import {RouteObject} from 'react-router-dom';
import React from 'react';
import SklandBindingQueryView from '../views/SklandBindingQueryView';
import ArknightsPlayerView from '../views/ArknightsPlayerView';
import SklandCredListView from '../views/SklandCredListView';

const route = (path: string, element: React.ReactNode, children?: RouteObject[]): RouteObject => ({
    path,
    element,
    children
});

export default [
    route('binding', <SklandBindingQueryView/>),
    route('arknights', undefined, [
        route('info', <ArknightsPlayerView/>)
    ]),
    route('', <SklandCredListView/>)
];