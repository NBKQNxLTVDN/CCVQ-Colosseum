"use strict";(self.webpackChunkccvq_client=self.webpackChunkccvq_client||[]).push([[244],{53637:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(87462),o=n(43066);function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;return(0,o.Z)(e)?t:(0,r.Z)({},t,{ownerState:(0,r.Z)({},t.ownerState,n)})}},30183:function(e,t,n){var r=n(54750),o=n(46417);t.Z=(0,r.Z)((0,o.jsx)("path",{d:"M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"}),"Check")},8586:function(e,t,n){var r=n(54750),o=n(46417);t.Z=(0,r.Z)((0,o.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close")},34597:function(e,t,n){var r=n(54750),o=n(46417);t.Z=(0,r.Z)((0,o.jsx)("path",{d:"M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"}),"Sync")},53540:function(e,t,n){n.d(t,{Z:function(){return Ce}});var r=n(87462),o=n(29439),i=n(63366),a=n(47472),s=n(2678),c=n(49081);function p(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function u(e){return e instanceof p(e).Element||e instanceof Element}function l(e){return e instanceof p(e).HTMLElement||e instanceof HTMLElement}function f(e){return"undefined"!==typeof ShadowRoot&&(e instanceof p(e).ShadowRoot||e instanceof ShadowRoot)}var d=Math.max,m=Math.min,h=Math.round;function v(e,t){void 0===t&&(t=!1);var n=e.getBoundingClientRect(),r=1,o=1;if(l(e)&&t){var i=e.offsetHeight,a=e.offsetWidth;a>0&&(r=h(n.width)/a||1),i>0&&(o=h(n.height)/i||1)}return{width:n.width/r,height:n.height/o,top:n.top/o,right:n.right/r,bottom:n.bottom/o,left:n.left/r,x:n.left/r,y:n.top/o}}function g(e){var t=p(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function y(e){return e?(e.nodeName||"").toLowerCase():null}function b(e){return((u(e)?e.ownerDocument:e.document)||window.document).documentElement}function w(e){return v(b(e)).left+g(e).scrollLeft}function x(e){return p(e).getComputedStyle(e)}function Z(e){var t=x(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function O(e,t,n){void 0===n&&(n=!1);var r=l(t),o=l(t)&&function(e){var t=e.getBoundingClientRect(),n=h(t.width)/e.offsetWidth||1,r=h(t.height)/e.offsetHeight||1;return 1!==n||1!==r}(t),i=b(t),a=v(e,o),s={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(r||!r&&!n)&&(("body"!==y(t)||Z(i))&&(s=function(e){return e!==p(e)&&l(e)?{scrollLeft:(t=e).scrollLeft,scrollTop:t.scrollTop}:g(e);var t}(t)),l(t)?((c=v(t,!0)).x+=t.clientLeft,c.y+=t.clientTop):i&&(c.x=w(i))),{x:a.left+s.scrollLeft-c.x,y:a.top+s.scrollTop-c.y,width:a.width,height:a.height}}function T(e){var t=v(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function R(e){return"html"===y(e)?e:e.assignedSlot||e.parentNode||(f(e)?e.host:null)||b(e)}function P(e){return["html","body","#document"].indexOf(y(e))>=0?e.ownerDocument.body:l(e)&&Z(e)?e:P(R(e))}function E(e,t){var n;void 0===t&&(t=[]);var r=P(e),o=r===(null==(n=e.ownerDocument)?void 0:n.body),i=p(r),a=o?[i].concat(i.visualViewport||[],Z(r)?r:[]):r,s=t.concat(a);return o?s:s.concat(E(R(a)))}function j(e){return["table","td","th"].indexOf(y(e))>=0}function M(e){return l(e)&&"fixed"!==x(e).position?e.offsetParent:null}function k(e){for(var t=p(e),n=M(e);n&&j(n)&&"static"===x(n).position;)n=M(n);return n&&("html"===y(n)||"body"===y(n)&&"static"===x(n).position)?t:n||function(e){var t=-1!==navigator.userAgent.toLowerCase().indexOf("firefox");if(-1!==navigator.userAgent.indexOf("Trident")&&l(e)&&"fixed"===x(e).position)return null;var n=R(e);for(f(n)&&(n=n.host);l(n)&&["html","body"].indexOf(y(n))<0;){var r=x(n);if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n;n=n.parentNode}return null}(e)||t}var L="top",D="bottom",C="right",A="left",S="auto",W=[L,D,C,A],B="start",H="end",N="viewport",I="popper",F=W.reduce((function(e,t){return e.concat([t+"-"+B,t+"-"+H])}),[]),q=[].concat(W,[S]).reduce((function(e,t){return e.concat([t,t+"-"+B,t+"-"+H])}),[]),V=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function z(e){var t=new Map,n=new Set,r=[];function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e);r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}function U(e){var t;return function(){return t||(t=new Promise((function(n){Promise.resolve().then((function(){t=void 0,n(e())}))}))),t}}var _={placement:"bottom",modifiers:[],strategy:"absolute"};function X(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"===typeof e.getBoundingClientRect)}))}function Y(e){void 0===e&&(e={});var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,o=t.defaultOptions,i=void 0===o?_:o;return function(e,t,n){void 0===n&&(n=i);var o={placement:"bottom",orderedModifiers:[],options:Object.assign({},_,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},a=[],s=!1,c={state:o,setOptions:function(n){var s="function"===typeof n?n(o.options):n;p(),o.options=Object.assign({},i,o.options,s),o.scrollParents={reference:u(e)?E(e):e.contextElement?E(e.contextElement):[],popper:E(t)};var l=function(e){var t=z(e);return V.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}(function(e){var t=e.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{});return Object.keys(t).map((function(e){return t[e]}))}([].concat(r,o.options.modifiers)));return o.orderedModifiers=l.filter((function(e){return e.enabled})),o.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,i=e.effect;if("function"===typeof i){var s=i({state:o,name:t,instance:c,options:r}),p=function(){};a.push(s||p)}})),c.update()},forceUpdate:function(){if(!s){var e=o.elements,t=e.reference,n=e.popper;if(X(t,n)){o.rects={reference:O(t,k(n),"fixed"===o.options.strategy),popper:T(n)},o.reset=!1,o.placement=o.options.placement,o.orderedModifiers.forEach((function(e){return o.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<o.orderedModifiers.length;r++)if(!0!==o.reset){var i=o.orderedModifiers[r],a=i.fn,p=i.options,u=void 0===p?{}:p,l=i.name;"function"===typeof a&&(o=a({state:o,options:u,name:l,instance:c})||o)}else o.reset=!1,r=-1}}},update:U((function(){return new Promise((function(e){c.forceUpdate(),e(o)}))})),destroy:function(){p(),s=!0}};if(!X(e,t))return c;function p(){a.forEach((function(e){return e()})),a=[]}return c.setOptions(n).then((function(e){!s&&n.onFirstUpdate&&n.onFirstUpdate(e)})),c}}var Q={passive:!0};function G(e){return e.split("-")[0]}function J(e){return e.split("-")[1]}function K(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function $(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?G(o):null,a=o?J(o):null,s=n.x+n.width/2-r.width/2,c=n.y+n.height/2-r.height/2;switch(i){case L:t={x:s,y:n.y-r.height};break;case D:t={x:s,y:n.y+n.height};break;case C:t={x:n.x+n.width,y:c};break;case A:t={x:n.x-r.width,y:c};break;default:t={x:n.x,y:n.y}}var p=i?K(i):null;if(null!=p){var u="y"===p?"height":"width";switch(a){case B:t[p]=t[p]-(n[u]/2-r[u]/2);break;case H:t[p]=t[p]+(n[u]/2-r[u]/2)}}return t}var ee={top:"auto",right:"auto",bottom:"auto",left:"auto"};function te(e){var t,n=e.popper,r=e.popperRect,o=e.placement,i=e.variation,a=e.offsets,s=e.position,c=e.gpuAcceleration,u=e.adaptive,l=e.roundOffsets,f=e.isFixed,d=a.x,m=void 0===d?0:d,v=a.y,g=void 0===v?0:v,y="function"===typeof l?l({x:m,y:g}):{x:m,y:g};m=y.x,g=y.y;var w=a.hasOwnProperty("x"),Z=a.hasOwnProperty("y"),O=A,T=L,R=window;if(u){var P=k(n),E="clientHeight",j="clientWidth";if(P===p(n)&&"static"!==x(P=b(n)).position&&"absolute"===s&&(E="scrollHeight",j="scrollWidth"),o===L||(o===A||o===C)&&i===H)T=D,g-=(f&&P===R&&R.visualViewport?R.visualViewport.height:P[E])-r.height,g*=c?1:-1;if(o===A||(o===L||o===D)&&i===H)O=C,m-=(f&&P===R&&R.visualViewport?R.visualViewport.width:P[j])-r.width,m*=c?1:-1}var M,S=Object.assign({position:s},u&&ee),W=!0===l?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1;return{x:h(t*r)/r||0,y:h(n*r)/r||0}}({x:m,y:g}):{x:m,y:g};return m=W.x,g=W.y,c?Object.assign({},S,((M={})[T]=Z?"0":"",M[O]=w?"0":"",M.transform=(R.devicePixelRatio||1)<=1?"translate("+m+"px, "+g+"px)":"translate3d("+m+"px, "+g+"px, 0)",M)):Object.assign({},S,((t={})[T]=Z?g+"px":"",t[O]=w?m+"px":"",t.transform="",t))}var ne={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,a=q.reduce((function(e,n){return e[n]=function(e,t,n){var r=G(e),o=[A,L].indexOf(r)>=0?-1:1,i="function"===typeof n?n(Object.assign({},t,{placement:e})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*o,[A,C].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,i),e}),{}),s=a[t.placement],c=s.x,p=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=c,t.modifiersData.popperOffsets.y+=p),t.modifiersData[r]=a}},re={left:"right",right:"left",bottom:"top",top:"bottom"};function oe(e){return e.replace(/left|right|bottom|top/g,(function(e){return re[e]}))}var ie={start:"end",end:"start"};function ae(e){return e.replace(/start|end/g,(function(e){return ie[e]}))}function se(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&f(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function ce(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function pe(e,t){return t===N?ce(function(e){var t=p(e),n=b(e),r=t.visualViewport,o=n.clientWidth,i=n.clientHeight,a=0,s=0;return r&&(o=r.width,i=r.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(a=r.offsetLeft,s=r.offsetTop)),{width:o,height:i,x:a+w(e),y:s}}(e)):u(t)?function(e){var t=v(e);return t.top=t.top+e.clientTop,t.left=t.left+e.clientLeft,t.bottom=t.top+e.clientHeight,t.right=t.left+e.clientWidth,t.width=e.clientWidth,t.height=e.clientHeight,t.x=t.left,t.y=t.top,t}(t):ce(function(e){var t,n=b(e),r=g(e),o=null==(t=e.ownerDocument)?void 0:t.body,i=d(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=d(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),s=-r.scrollLeft+w(e),c=-r.scrollTop;return"rtl"===x(o||n).direction&&(s+=d(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:s,y:c}}(b(e)))}function ue(e,t,n){var r="clippingParents"===t?function(e){var t=E(R(e)),n=["absolute","fixed"].indexOf(x(e).position)>=0&&l(e)?k(e):e;return u(n)?t.filter((function(e){return u(e)&&se(e,n)&&"body"!==y(e)})):[]}(e):[].concat(t),o=[].concat(r,[n]),i=o[0],a=o.reduce((function(t,n){var r=pe(e,n);return t.top=d(r.top,t.top),t.right=m(r.right,t.right),t.bottom=m(r.bottom,t.bottom),t.left=d(r.left,t.left),t}),pe(e,i));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function le(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function fe(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function de(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=void 0===r?e.placement:r,i=n.boundary,a=void 0===i?"clippingParents":i,s=n.rootBoundary,c=void 0===s?N:s,p=n.elementContext,l=void 0===p?I:p,f=n.altBoundary,d=void 0!==f&&f,m=n.padding,h=void 0===m?0:m,g=le("number"!==typeof h?h:fe(h,W)),y=l===I?"reference":I,w=e.rects.popper,x=e.elements[d?y:l],Z=ue(u(x)?x:x.contextElement||b(e.elements.popper),a,c),O=v(e.elements.reference),T=$({reference:O,element:w,strategy:"absolute",placement:o}),R=ce(Object.assign({},w,T)),P=l===I?R:O,E={top:Z.top-P.top+g.top,bottom:P.bottom-Z.bottom+g.bottom,left:Z.left-P.left+g.left,right:P.right-Z.right+g.right},j=e.modifiersData.offset;if(l===I&&j){var M=j[o];Object.keys(E).forEach((function(e){var t=[C,D].indexOf(e)>=0?1:-1,n=[L,D].indexOf(e)>=0?"y":"x";E[e]+=M[n]*t}))}return E}function me(e,t,n){return d(e,m(t,n))}var he={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0!==a&&a,c=n.boundary,p=n.rootBoundary,u=n.altBoundary,l=n.padding,f=n.tether,h=void 0===f||f,v=n.tetherOffset,g=void 0===v?0:v,y=de(t,{boundary:c,rootBoundary:p,padding:l,altBoundary:u}),b=G(t.placement),w=J(t.placement),x=!w,Z=K(b),O="x"===Z?"y":"x",R=t.modifiersData.popperOffsets,P=t.rects.reference,E=t.rects.popper,j="function"===typeof g?g(Object.assign({},t.rects,{placement:t.placement})):g,M="number"===typeof j?{mainAxis:j,altAxis:j}:Object.assign({mainAxis:0,altAxis:0},j),S=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,W={x:0,y:0};if(R){if(i){var H,N="y"===Z?L:A,I="y"===Z?D:C,F="y"===Z?"height":"width",q=R[Z],V=q+y[N],z=q-y[I],U=h?-E[F]/2:0,_=w===B?P[F]:E[F],X=w===B?-E[F]:-P[F],Y=t.elements.arrow,Q=h&&Y?T(Y):{width:0,height:0},$=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},ee=$[N],te=$[I],ne=me(0,P[F],Q[F]),re=x?P[F]/2-U-ne-ee-M.mainAxis:_-ne-ee-M.mainAxis,oe=x?-P[F]/2+U+ne+te+M.mainAxis:X+ne+te+M.mainAxis,ie=t.elements.arrow&&k(t.elements.arrow),ae=ie?"y"===Z?ie.clientTop||0:ie.clientLeft||0:0,se=null!=(H=null==S?void 0:S[Z])?H:0,ce=q+oe-se,pe=me(h?m(V,q+re-se-ae):V,q,h?d(z,ce):z);R[Z]=pe,W[Z]=pe-q}if(s){var ue,le="x"===Z?L:A,fe="x"===Z?D:C,he=R[O],ve="y"===O?"height":"width",ge=he+y[le],ye=he-y[fe],be=-1!==[L,A].indexOf(b),we=null!=(ue=null==S?void 0:S[O])?ue:0,xe=be?ge:he-P[ve]-E[ve]-we+M.altAxis,Ze=be?he+P[ve]+E[ve]-we-M.altAxis:ye,Oe=h&&be?function(e,t,n){var r=me(e,t,n);return r>n?n:r}(xe,he,Ze):me(h?xe:ge,he,h?Ze:ye);R[O]=Oe,W[O]=Oe-he}t.modifiersData[r]=W}},requiresIfExists:["offset"]};var ve={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,s=G(n.placement),c=K(s),p=[A,C].indexOf(s)>=0?"height":"width";if(i&&a){var u=function(e,t){return le("number"!==typeof(e="function"===typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:fe(e,W))}(o.padding,n),l=T(i),f="y"===c?L:A,d="y"===c?D:C,m=n.rects.reference[p]+n.rects.reference[c]-a[c]-n.rects.popper[p],h=a[c]-n.rects.reference[c],v=k(i),g=v?"y"===c?v.clientHeight||0:v.clientWidth||0:0,y=m/2-h/2,b=u[f],w=g-l[p]-u[d],x=g/2-l[p]/2+y,Z=me(b,x,w),O=c;n.modifiersData[r]=((t={})[O]=Z,t.centerOffset=Z-x,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!==typeof r||(r=t.elements.popper.querySelector(r)))&&se(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ge(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ye(e){return[L,C,D,A].some((function(t){return e[t]>=0}))}var be=Y({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=void 0===o||o,a=r.resize,s=void 0===a||a,c=p(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&u.forEach((function(e){e.addEventListener("scroll",n.update,Q)})),s&&c.addEventListener("resize",n.update,Q),function(){i&&u.forEach((function(e){e.removeEventListener("scroll",n.update,Q)})),s&&c.removeEventListener("resize",n.update,Q)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=$({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,c=void 0===s||s,p={placement:G(t.placement),variation:J(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,te(Object.assign({},p,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:c})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,te(Object.assign({},p,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e];l(o)&&y(o)&&(Object.assign(o.style,n),Object.keys(r).forEach((function(e){var t=r[e];!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],o=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});l(r)&&y(r)&&(Object.assign(r.style,i),Object.keys(o).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]},ne,{name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,c=n.fallbackPlacements,p=n.padding,u=n.boundary,l=n.rootBoundary,f=n.altBoundary,d=n.flipVariations,m=void 0===d||d,h=n.allowedAutoPlacements,v=t.options.placement,g=G(v),y=c||(g===v||!m?[oe(v)]:function(e){if(G(e)===S)return[];var t=oe(e);return[ae(e),t,ae(t)]}(v)),b=[v].concat(y).reduce((function(e,n){return e.concat(G(n)===S?function(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,c=n.allowedAutoPlacements,p=void 0===c?q:c,u=J(r),l=u?s?F:F.filter((function(e){return J(e)===u})):W,f=l.filter((function(e){return p.indexOf(e)>=0}));0===f.length&&(f=l);var d=f.reduce((function(t,n){return t[n]=de(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[G(n)],t}),{});return Object.keys(d).sort((function(e,t){return d[e]-d[t]}))}(t,{placement:n,boundary:u,rootBoundary:l,padding:p,flipVariations:m,allowedAutoPlacements:h}):n)}),[]),w=t.rects.reference,x=t.rects.popper,Z=new Map,O=!0,T=b[0],R=0;R<b.length;R++){var P=b[R],E=G(P),j=J(P)===B,M=[L,D].indexOf(E)>=0,k=M?"width":"height",H=de(t,{placement:P,boundary:u,rootBoundary:l,altBoundary:f,padding:p}),N=M?j?C:A:j?D:L;w[k]>x[k]&&(N=oe(N));var I=oe(N),V=[];if(i&&V.push(H[E]<=0),s&&V.push(H[N]<=0,H[I]<=0),V.every((function(e){return e}))){T=P,O=!1;break}Z.set(P,V)}if(O)for(var z=function(e){var t=b.find((function(t){var n=Z.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return T=t,"break"},U=m?3:1;U>0;U--){if("break"===z(U))break}t.placement!==T&&(t.modifiersData[r]._skip=!0,t.placement=T,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},he,ve,{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=de(t,{elementContext:"reference"}),s=de(t,{altBoundary:!0}),c=ge(a,r),p=ge(s,o,i),u=ye(c),l=ye(p);t.modifiersData[n]={referenceClippingOffsets:c,popperEscapeOffsets:p,isReferenceHidden:u,hasPopperEscaped:l},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":l})}}]}),we=n(47313),xe=n(12871),Ze=n(46417),Oe=["anchorEl","children","direction","disablePortal","modifiers","open","ownerState","placement","popperOptions","popperRef","TransitionProps"],Te=["anchorEl","children","container","direction","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition"];function Re(e){return"function"===typeof e?e():e}var Pe={},Ee=we.forwardRef((function(e,t){var n=e.anchorEl,c=e.children,p=e.direction,u=e.disablePortal,l=e.modifiers,f=e.open,d=e.placement,m=e.popperOptions,h=e.popperRef,v=e.TransitionProps,g=(0,i.Z)(e,Oe),y=we.useRef(null),b=(0,a.Z)(y,t),w=we.useRef(null),x=(0,a.Z)(w,h),Z=we.useRef(x);(0,s.Z)((function(){Z.current=x}),[x]),we.useImperativeHandle(h,(function(){return w.current}),[]);var O=function(e,t){if("ltr"===t)return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}(d,p),T=we.useState(O),R=(0,o.Z)(T,2),P=R[0],E=R[1];we.useEffect((function(){w.current&&w.current.forceUpdate()})),(0,s.Z)((function(){if(n&&f){Re(n);var e=[{name:"preventOverflow",options:{altBoundary:u}},{name:"flip",options:{altBoundary:u}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:function(e){var t=e.state;E(t.placement)}}];null!=l&&(e=e.concat(l)),m&&null!=m.modifiers&&(e=e.concat(m.modifiers));var t=be(Re(n),y.current,(0,r.Z)({placement:O},m,{modifiers:e}));return Z.current(t),function(){t.destroy(),Z.current(null)}}}),[n,u,l,f,m,O]);var j={placement:P};return null!==v&&(j.TransitionProps=v),(0,Ze.jsx)("div",(0,r.Z)({ref:b,role:"tooltip"},g,{children:"function"===typeof c?c(j):c}))})),je=we.forwardRef((function(e,t){var n=e.anchorEl,a=e.children,s=e.container,p=e.direction,u=void 0===p?"ltr":p,l=e.disablePortal,f=void 0!==l&&l,d=e.keepMounted,m=void 0!==d&&d,h=e.modifiers,v=e.open,g=e.placement,y=void 0===g?"bottom":g,b=e.popperOptions,w=void 0===b?Pe:b,x=e.popperRef,Z=e.style,O=e.transition,T=void 0!==O&&O,R=(0,i.Z)(e,Te),P=we.useState(!0),E=(0,o.Z)(P,2),j=E[0],M=E[1];if(!m&&!v&&(!T||j))return null;var k=s||(n?(0,c.Z)(Re(n)).body:void 0);return(0,Ze.jsx)(xe.Z,{disablePortal:f,container:k,children:(0,Ze.jsx)(Ee,(0,r.Z)({anchorEl:n,direction:u,disablePortal:f,modifiers:h,ref:t,open:T?!j:v,placement:y,popperOptions:w,popperRef:x},R,{style:(0,r.Z)({position:"fixed",top:0,left:0,display:v||!m||T&&!j?null:"none"},Z),TransitionProps:T?{in:v,onEnter:function(){M(!1)},onExited:function(){M(!0)}}:null,children:a}))})})),Me=n(14976),ke=n(17592),Le=n(77342),De=(0,ke.ZP)(je,{name:"MuiPopper",slot:"Root",overridesResolver:function(e,t){return t.root}})({}),Ce=we.forwardRef((function(e,t){var n=(0,Me.Z)(),o=(0,Le.Z)({props:e,name:"MuiPopper"});return(0,Ze.jsx)(De,(0,r.Z)({direction:null==n?void 0:n.direction},o,{ref:t}))}))},49709:function(e,t,n){var r=n(29439),o=n(4942),i=n(63366),a=n(87462),s=n(47313),c=n(83061),p=n(21921),u=n(53637),l=n(17551),f=n(17592),d=n(19860),m=n(77342),h=n(91615),v=n(73365),g=n(53540),y=n(73236),b=n(86983),w=n(17677),x=n(47037),Z=n(53800),O=n(78041),T=n(46417),R=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","title","TransitionComponent","TransitionProps"];var P=(0,f.ZP)(g.Z,{name:"MuiTooltip",slot:"Popper",overridesResolver:function(e,t){var n=e.ownerState;return[t.popper,!n.disableInteractive&&t.popperInteractive,n.arrow&&t.popperArrow,!n.open&&t.popperClose]}})((function(e){var t,n=e.theme,r=e.ownerState,i=e.open;return(0,a.Z)({zIndex:(n.vars||n).zIndex.tooltip,pointerEvents:"none"},!r.disableInteractive&&{pointerEvents:"auto"},!i&&{pointerEvents:"none"},r.arrow&&(t={},(0,o.Z)(t,'&[data-popper-placement*="bottom"] .'.concat(O.Z.arrow),{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}}),(0,o.Z)(t,'&[data-popper-placement*="top"] .'.concat(O.Z.arrow),{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}}),(0,o.Z)(t,'&[data-popper-placement*="right"] .'.concat(O.Z.arrow),(0,a.Z)({},r.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}})),(0,o.Z)(t,'&[data-popper-placement*="left"] .'.concat(O.Z.arrow),(0,a.Z)({},r.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})),t))})),E=(0,f.ZP)("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:function(e,t){var n=e.ownerState;return[t.tooltip,n.touch&&t.touch,n.arrow&&t.tooltipArrow,t["tooltipPlacement".concat((0,h.Z)(n.placement.split("-")[0]))]]}})((function(e){var t,n,r=e.theme,i=e.ownerState;return(0,a.Z)({backgroundColor:r.vars?"rgba(".concat(r.vars.palette.grey.darkChannel," / 0.92)"):(0,l.Fq)(r.palette.grey[700],.92),borderRadius:(r.vars||r).shape.borderRadius,color:(r.vars||r).palette.common.white,fontFamily:r.typography.fontFamily,padding:"4px 8px",fontSize:r.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:r.typography.fontWeightMedium},i.arrow&&{position:"relative",margin:0},i.touch&&{padding:"8px 16px",fontSize:r.typography.pxToRem(14),lineHeight:"".concat((n=16/14,Math.round(1e5*n)/1e5),"em"),fontWeight:r.typography.fontWeightRegular},(t={},(0,o.Z)(t,".".concat(O.Z.popper,'[data-popper-placement*="left"] &'),(0,a.Z)({transformOrigin:"right center"},i.isRtl?(0,a.Z)({marginLeft:"14px"},i.touch&&{marginLeft:"24px"}):(0,a.Z)({marginRight:"14px"},i.touch&&{marginRight:"24px"}))),(0,o.Z)(t,".".concat(O.Z.popper,'[data-popper-placement*="right"] &'),(0,a.Z)({transformOrigin:"left center"},i.isRtl?(0,a.Z)({marginRight:"14px"},i.touch&&{marginRight:"24px"}):(0,a.Z)({marginLeft:"14px"},i.touch&&{marginLeft:"24px"}))),(0,o.Z)(t,".".concat(O.Z.popper,'[data-popper-placement*="top"] &'),(0,a.Z)({transformOrigin:"center bottom",marginBottom:"14px"},i.touch&&{marginBottom:"24px"})),(0,o.Z)(t,".".concat(O.Z.popper,'[data-popper-placement*="bottom"] &'),(0,a.Z)({transformOrigin:"center top",marginTop:"14px"},i.touch&&{marginTop:"24px"})),t))})),j=(0,f.ZP)("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:function(e,t){return t.arrow}})((function(e){var t=e.theme;return{overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:t.vars?"rgba(".concat(t.vars.palette.grey.darkChannel," / 0.9)"):(0,l.Fq)(t.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}})),M=!1,k=null;function L(e,t){return function(n){t&&t(n),e(n)}}var D=s.forwardRef((function(e,t){var n,o,l,f,D,C,A=(0,m.Z)({props:e,name:"MuiTooltip"}),S=A.arrow,W=void 0!==S&&S,B=A.children,H=A.components,N=void 0===H?{}:H,I=A.componentsProps,F=void 0===I?{}:I,q=A.describeChild,V=void 0!==q&&q,z=A.disableFocusListener,U=void 0!==z&&z,_=A.disableHoverListener,X=void 0!==_&&_,Y=A.disableInteractive,Q=void 0!==Y&&Y,G=A.disableTouchListener,J=void 0!==G&&G,K=A.enterDelay,$=void 0===K?100:K,ee=A.enterNextDelay,te=void 0===ee?0:ee,ne=A.enterTouchDelay,re=void 0===ne?700:ne,oe=A.followCursor,ie=void 0!==oe&&oe,ae=A.id,se=A.leaveDelay,ce=void 0===se?0:se,pe=A.leaveTouchDelay,ue=void 0===pe?1500:pe,le=A.onClose,fe=A.onOpen,de=A.open,me=A.placement,he=void 0===me?"bottom":me,ve=A.PopperComponent,ge=A.PopperProps,ye=void 0===ge?{}:ge,be=A.title,we=A.TransitionComponent,xe=void 0===we?v.Z:we,Ze=A.TransitionProps,Oe=(0,i.Z)(A,R),Te=(0,d.Z)(),Re="rtl"===Te.direction,Pe=s.useState(),Ee=(0,r.Z)(Pe,2),je=Ee[0],Me=Ee[1],ke=s.useState(null),Le=(0,r.Z)(ke,2),De=Le[0],Ce=Le[1],Ae=s.useRef(!1),Se=Q||ie,We=s.useRef(),Be=s.useRef(),He=s.useRef(),Ne=s.useRef(),Ie=(0,Z.Z)({controlled:de,default:!1,name:"Tooltip",state:"open"}),Fe=(0,r.Z)(Ie,2),qe=Fe[0],Ve=Fe[1],ze=qe,Ue=(0,w.Z)(ae),_e=s.useRef(),Xe=s.useCallback((function(){void 0!==_e.current&&(document.body.style.WebkitUserSelect=_e.current,_e.current=void 0),clearTimeout(Ne.current)}),[]);s.useEffect((function(){return function(){clearTimeout(We.current),clearTimeout(Be.current),clearTimeout(He.current),Xe()}}),[Xe]);var Ye=function(e){clearTimeout(k),M=!0,Ve(!0),fe&&!ze&&fe(e)},Qe=(0,y.Z)((function(e){clearTimeout(k),k=setTimeout((function(){M=!1}),800+ce),Ve(!1),le&&ze&&le(e),clearTimeout(We.current),We.current=setTimeout((function(){Ae.current=!1}),Te.transitions.duration.shortest)})),Ge=function(e){Ae.current&&"touchstart"!==e.type||(je&&je.removeAttribute("title"),clearTimeout(Be.current),clearTimeout(He.current),$||M&&te?Be.current=setTimeout((function(){Ye(e)}),M?te:$):Ye(e))},Je=function(e){clearTimeout(Be.current),clearTimeout(He.current),He.current=setTimeout((function(){Qe(e)}),ce)},Ke=(0,x.Z)(),$e=Ke.isFocusVisibleRef,et=Ke.onBlur,tt=Ke.onFocus,nt=Ke.ref,rt=s.useState(!1),ot=(0,r.Z)(rt,2)[1],it=function(e){et(e),!1===$e.current&&(ot(!1),Je(e))},at=function(e){je||Me(e.currentTarget),tt(e),!0===$e.current&&(ot(!0),Ge(e))},st=function(e){Ae.current=!0;var t=B.props;t.onTouchStart&&t.onTouchStart(e)},ct=Ge,pt=Je;s.useEffect((function(){if(ze)return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)};function e(e){"Escape"!==e.key&&"Esc"!==e.key||Qe(e)}}),[Qe,ze]);var ut=(0,b.Z)(Me,t),lt=(0,b.Z)(nt,ut),ft=(0,b.Z)(B.ref,lt);""===be&&(ze=!1);var dt=s.useRef({x:0,y:0}),mt=s.useRef(),ht={},vt="string"===typeof be;V?(ht.title=ze||!vt||X?null:be,ht["aria-describedby"]=ze?Ue:null):(ht["aria-label"]=vt?be:null,ht["aria-labelledby"]=ze&&!vt?Ue:null);var gt=(0,a.Z)({},ht,Oe,B.props,{className:(0,c.Z)(Oe.className,B.props.className),onTouchStart:st,ref:ft},ie?{onMouseMove:function(e){var t=B.props;t.onMouseMove&&t.onMouseMove(e),dt.current={x:e.clientX,y:e.clientY},mt.current&&mt.current.update()}}:{});var yt={};J||(gt.onTouchStart=function(e){st(e),clearTimeout(He.current),clearTimeout(We.current),Xe(),_e.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Ne.current=setTimeout((function(){document.body.style.WebkitUserSelect=_e.current,Ge(e)}),re)},gt.onTouchEnd=function(e){B.props.onTouchEnd&&B.props.onTouchEnd(e),Xe(),clearTimeout(He.current),He.current=setTimeout((function(){Qe(e)}),ue)}),X||(gt.onMouseOver=L(ct,gt.onMouseOver),gt.onMouseLeave=L(pt,gt.onMouseLeave),Se||(yt.onMouseOver=ct,yt.onMouseLeave=pt)),U||(gt.onFocus=L(at,gt.onFocus),gt.onBlur=L(it,gt.onBlur),Se||(yt.onFocus=at,yt.onBlur=it));var bt=s.useMemo((function(){var e,t=[{name:"arrow",enabled:Boolean(De),options:{element:De,padding:4}}];return null!=(e=ye.popperOptions)&&e.modifiers&&(t=t.concat(ye.popperOptions.modifiers)),(0,a.Z)({},ye.popperOptions,{modifiers:t})}),[De,ye]),wt=(0,a.Z)({},A,{isRtl:Re,arrow:W,disableInteractive:Se,placement:he,PopperComponentProp:ve,touch:Ae.current}),xt=function(e){var t=e.classes,n=e.disableInteractive,r=e.arrow,o=e.touch,i=e.placement,a={popper:["popper",!n&&"popperInteractive",r&&"popperArrow"],tooltip:["tooltip",r&&"tooltipArrow",o&&"touch","tooltipPlacement".concat((0,h.Z)(i.split("-")[0]))],arrow:["arrow"]};return(0,p.Z)(a,O.Q,t)}(wt),Zt=null!=(n=N.Popper)?n:P,Ot=null!=(o=null!=(l=N.Transition)?l:xe)?o:v.Z,Tt=null!=(f=N.Tooltip)?f:E,Rt=null!=(D=N.Arrow)?D:j,Pt=(0,u.Z)(Zt,(0,a.Z)({},ye,F.popper),wt),Et=(0,u.Z)(Ot,(0,a.Z)({},Ze,F.transition),wt),jt=(0,u.Z)(Tt,(0,a.Z)({},F.tooltip),wt),Mt=(0,u.Z)(Rt,(0,a.Z)({},F.arrow),wt);return(0,T.jsxs)(s.Fragment,{children:[s.cloneElement(B,gt),(0,T.jsx)(Zt,(0,a.Z)({as:null!=ve?ve:g.Z,placement:he,anchorEl:ie?{getBoundingClientRect:function(){return{top:dt.current.y,left:dt.current.x,right:dt.current.x,bottom:dt.current.y,width:0,height:0}}}:je,popperRef:mt,open:!!je&&ze,id:Ue,transition:!0},yt,Pt,{className:(0,c.Z)(xt.popper,null==ye?void 0:ye.className,null==(C=F.popper)?void 0:C.className),popperOptions:bt,children:function(e){var t,n,r=e.TransitionProps;return(0,T.jsx)(Ot,(0,a.Z)({timeout:Te.transitions.duration.shorter},r,Et,{children:(0,T.jsxs)(Tt,(0,a.Z)({},jt,{className:(0,c.Z)(xt.tooltip,null==(t=F.tooltip)?void 0:t.className),children:[be,W?(0,T.jsx)(Rt,(0,a.Z)({},Mt,{className:(0,c.Z)(xt.arrow,null==(n=F.arrow)?void 0:n.className),ref:Ce})):null]}))}))}}))]})}));t.Z=D},78041:function(e,t,n){n.d(t,{Q:function(){return o}});var r=n(32298);function o(e){return(0,r.Z)("MuiTooltip",e)}var i=(0,n(77430).Z)("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]);t.Z=i}}]);