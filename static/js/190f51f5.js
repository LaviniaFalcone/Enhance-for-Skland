import{r as t}from"./63eebe13.js";var e={exports:{}},n={},r=t;var o="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},u=r.useState,s=r.useEffect,a=r.useLayoutEffect,i=r.useDebugValue;function c(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!o(t,n)}catch(r){return!0}}var f="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(t,e){return e()}:function(t,e){var n=e(),r=u({inst:{value:n,getSnapshot:e}}),o=r[0].inst,f=r[1];return a((function(){o.value=n,o.getSnapshot=e,c(o)&&f({inst:o})}),[t,n,e]),s((function(){return c(o)&&f({inst:o}),t((function(){c(o)&&f({inst:o})}))}),[t]),i(n),n};n.useSyncExternalStore=void 0!==r.useSyncExternalStore?r.useSyncExternalStore:f,e.exports=n;var v=e.exports;export{v as s};