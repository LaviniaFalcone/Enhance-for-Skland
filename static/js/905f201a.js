import{r as e,a as t}from"./63eebe13.js";import{R as o}from"./dfe7ac38.js";import{c as r}from"./18c268dd.js";
/**
 * React Router DOM v6.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const s=t.startTransition;function a(t){let{basename:a,children:n,future:i,window:c}=t,u=e.useRef();null==u.current&&(u.current=r({window:c,v5Compat:!0}));let l=u.current,[m,h]=e.useState({action:l.action,location:l.location}),{v7_startTransition:S}=i||{},f=e.useCallback((e=>{S&&s?s((()=>h(e))):h(e)}),[h,S]);return e.useLayoutEffect((()=>l.listen(f)),[l,f]),e.createElement(o,{basename:a,children:n,location:m.location,navigationType:m.action,navigator:l})}var n,i,c,u;(i=n||(n={})).UseScrollRestoration="useScrollRestoration",i.UseSubmit="useSubmit",i.UseSubmitFetcher="useSubmitFetcher",i.UseFetcher="useFetcher",(u=c||(c={})).UseFetchers="useFetchers",u.UseScrollRestoration="useScrollRestoration";export{a as H};
