!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports,require("@apollo/client/core")):"function"==typeof define&&define.amd?define(["exports","@apollo/client/core"],r):r((e||self).bididSdk={},e.core)}(this,function(e,r){function t(e,r){e.prototype=Object.create(r.prototype),e.prototype.constructor=e,o(e,r)}function n(e){return n=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},n(e)}function o(e,r){return o=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,r){return e.__proto__=r,e},o(e,r)}function i(e,r,t){return i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}()?Reflect.construct.bind():function(e,r,t){var n=[null];n.push.apply(n,r);var i=new(Function.bind.apply(e,n));return t&&o(i,t.prototype),i},i.apply(null,arguments)}function a(e){var r="function"==typeof Map?new Map:void 0;return a=function(e){if(null===e||-1===Function.toString.call(e).indexOf("[native code]"))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==r){if(r.has(e))return r.get(e);r.set(e,t)}function t(){return i(e,arguments,n(this).constructor)}return t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),o(t,e)},a(e)}function u(e,r){return r||(r=e.slice(0)),e.raw=r,e}var c,s,d={arweave:"",center:"https://graph-api.bi.social/graphql"},f=/*#__PURE__*/function(e){function r(r){var t;return(t=e.call(this,r)||this).name="NetworkError",t}return t(r,e),r}(/*#__PURE__*/a(Error)),l=/*#__PURE__*/function(e){function r(r){var t;return(t=e.call(this,r)||this).name="RateLimitError",t}return t(r,e),r}(/*#__PURE__*/a(Error)),p=/*#__PURE__*/function(e){function r(r){var t;return(t=e.call(this,r)||this).name="BadQueryError",t}return t(r,e),r}(/*#__PURE__*/a(Error)),y=/*#__PURE__*/function(e){function r(r){var t;return(t=e.call(this,r)||this).name="BadAuthError",t}return t(r,e),r}(/*#__PURE__*/a(Error)),h=/*#__PURE__*/function(){function e(e){this.source=void 0,this.graphqlClient=void 0;var t=e.key,n=e.secret;this.source=e.source||"center",this.graphqlClient=new r.ApolloClient({headers:{key:t,secret:n},uri:e.uri||d[this.source],cache:new r.InMemoryCache})}var t=e.prototype;return t.queryDidEntity=function(e){try{var r=this;if(!e.didName&&!e.address)throw new p("Need to specify at least one query parameter: didName, address");return Promise.resolve("center"===r.source?r.queryDidCenterServer(e):r.queryArweave(e))}catch(e){return Promise.reject(e)}},t.queryDidCenterServer=function(e){try{var t=this,n=r.gql(c||(c=u(["\n      query DidEntity($didName: String, $address: String) {\n        didEntity(didName: $didName, address: $address) {\n          didName\n          address\n          avatar\n        }\n      }\n    "])));return Promise.resolve(function(r,o){try{var i=Promise.resolve(t.graphqlClient.query({query:n,variables:e})).then(function(e){var r=e.data.didEntity;return{didName:r.didName,address:r.address,avatar:r.avatar}})}catch(e){return o(e)}return i&&i.then?i.then(void 0,o):i}(0,function(e){throw"fetch failed"===e.message?new f(e):e.message.startsWith("Too many requests, please try again")?new l(e):"BAD_KEY_OR_SECRET"===e.message?new y(e):"INVALID_ARGUMENTS"===e.message?new p(e):e}))}catch(e){return Promise.reject(e)}},t.queryArweave=function(e){try{var t=r.gql(s||(s=u([""])));return Promise.resolve(this.graphqlClient.query({query:t})).then(function(e){var r=e.data.didEntity;return{didName:r.didName,address:r.address,avatar:r.avatar}})}catch(e){return Promise.reject(e)}},e}();e.BadAuthError=y,e.BadQueryError=p,e.DidClient=h,e.NetworkError=f,e.RateLimitError=l});
//# sourceMappingURL=index.umd.js.map
