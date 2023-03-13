import{ApolloClient as e,InMemoryCache as r,gql as t}from"@apollo/client/core";let a,s,i=e=>e;const d={arweave:"",center:"https://graph-api.staging.bi.social/graphql"};class n extends Error{constructor(e){super(e),this.name="NetworkError"}}class o extends Error{constructor(e){super(e),this.name="RateLimitError"}}class c extends Error{constructor(e){super(e),this.name="BadQueryError"}}class u extends Error{constructor(e){super(e),this.name="BadAuthError"}}class h{constructor(t){this.source=void 0,this.graphqlClient=void 0;const{key:a,secret:s}=t;this.source=t.source||"center",this.graphqlClient=new e({headers:{key:a,secret:s},uri:t.uri||d[this.source],cache:new r})}async queryDidEntity(e){if(!e.didName&&!e.address)throw new c("Need to specify at least one query parameter: didName, address");return"center"===this.source?await this.queryDidCenterServer(e):await this.queryArweave(e)}async queryDidCenterServer(e){let r;const s=t(a||(a=i`
      query DidEntity($didName: String, $address: String) {
        didEntity(didName: $didName, address: $address) {
          didName
          address
          avatar
        }
      }
    `));try{r=await this.graphqlClient.query({query:s,variables:e});const{didName:t,address:a,avatar:i}=r.data.didEntity;return{didName:t,address:a,avatar:i}}catch(e){throw"fetch failed"===e.message?new n(e):e.message.startsWith("Too many requests, please try again")?new o(e):"BAD_KEY_OR_SECRET"===e.message?new u(e):"INVALID_ARGUMENTS"===e.message?new c(e):e}}async queryArweave(e){const r=t(s||(s=i``)),a=await this.graphqlClient.query({query:r}),{didName:d,address:n,avatar:o}=a.data.didEntity;return{didName:d,address:n,avatar:o}}}export{u as BadAuthError,c as BadQueryError,h as DidClient,n as NetworkError,o as RateLimitError};
//# sourceMappingURL=index.modern.mjs.map
