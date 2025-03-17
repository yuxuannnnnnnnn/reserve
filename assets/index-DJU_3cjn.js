(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const Vr=()=>{};var us={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oi={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(n,e){if(!n)throw Be(e)},Be=function(n){return new Error("Firebase Database ("+oi.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ai=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Gr=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const i=n[t++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=n[t++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Tn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<n.length;i+=3){const r=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,c=l?n[i+2]:0,d=r>>2,u=(r&3)<<4|a>>4;let _=(a&15)<<2|c>>6,v=c&63;l||(v=64,o||(_=64)),s.push(t[d],t[u],t[_],t[v])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(ai(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Gr(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<n.length;){const r=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const c=i<n.length?t[n.charAt(i)]:64;++i;const u=i<n.length?t[n.charAt(i)]:64;if(++i,r==null||a==null||c==null||u==null)throw new zr;const _=r<<2|a>>4;if(s.push(_),c!==64){const v=a<<4&240|c>>2;if(s.push(v),u!==64){const C=c<<6&192|u;s.push(C)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class zr extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const li=function(n){const e=ai(n);return Tn.encodeByteArray(e,!0)},yt=function(n){return li(n).replace(/\./g,"")},sn=function(n){try{return Tn.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qr(n){return ci(void 0,n)}function ci(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!jr(t)||(n[t]=ci(n[t],e[t]));return n}function jr(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yr(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kr=()=>Yr().__FIREBASE_DEFAULTS__,Qr=()=>{if(typeof process>"u"||typeof us>"u")return;const n=us.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Xr=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&sn(n[1]);return e&&JSON.parse(e)},hi=()=>{try{return Vr()||Kr()||Qr()||Xr()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Jr=n=>{var e,t;return(t=(e=hi())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Zr=n=>{const e=Jr(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},ui=()=>{var n;return(n=hi())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eo(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",i=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[yt(JSON.stringify(t)),yt(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function di(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(to())}function no(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function so(){return oi.NODE_ADMIN===!0}function io(){try{return typeof indexedDB=="object"}catch{return!1}}function ro(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var r;e(((r=i.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oo="FirebaseError";class lt extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=oo,Object.setPrototypeOf(this,lt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,fi.prototype.create)}}class fi{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?ao(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new lt(i,a,s)}}function ao(n,e){return n.replace(lo,(t,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const lo=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(n){return JSON.parse(n)}function H(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _i=function(n){let e={},t={},s={},i="";try{const r=n.split(".");e=Je(sn(r[0])||""),t=Je(sn(r[1])||""),i=r[2],s=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:s,signature:i}},co=function(n){const e=_i(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},ho=function(n){const e=_i(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Pe(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function ds(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function vt(n,e,t){const s={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(s[i]=e.call(t,n[i],i,n));return s}function Ct(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const i of t){if(!s.includes(i))return!1;const r=n[i],o=e[i];if(fs(r)&&fs(o)){if(!Ct(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!t.includes(i))return!1;return!0}function fs(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uo(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const s=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)s[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)s[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const _=s[u-3]^s[u-8]^s[u-14]^s[u-16];s[u]=(_<<1|_>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):u<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const _=(i<<5|i>>>27)+c+l+d+s[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=_}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const s=t-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<t;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function bn(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _o=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,g(s<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Ft=function(n){let e=0;for(let t=0;t<n.length;t++){const s=n.charCodeAt(t);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bt(n){return n&&n._delegate?n._delegate:n}class Ze{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ge="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class po{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Lt;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(go(e))try{this.getOrInitializeService({instanceIdentifier:ge})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=ge){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ge){return this.instances.has(e)}getOptions(e=ge){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,t){var s;const i=this.normalizeInstanceIdentifier(t),r=(s=this.onInitCallbacks.get(i))!==null&&s!==void 0?s:new Set;r.add(e),this.onInitCallbacks.set(i,r);const o=this.instances.get(i);return o&&e(o,i),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const i of s)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:mo(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=ge){return this.component?this.component.multipleInstances?e:ge:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function mo(n){return n===ge?void 0:n}function go(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new po(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var k;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(k||(k={}));const vo={debug:k.DEBUG,verbose:k.VERBOSE,info:k.INFO,warn:k.WARN,error:k.ERROR,silent:k.SILENT},Co=k.INFO,Eo={[k.DEBUG]:"log",[k.VERBOSE]:"log",[k.INFO]:"info",[k.WARN]:"warn",[k.ERROR]:"error"},Io=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),i=Eo[e];if(i)console[i](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class pi{constructor(e){this.name=e,this._logLevel=Co,this._logHandler=Io,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in k))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?vo[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,k.DEBUG,...e),this._logHandler(this,k.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,k.VERBOSE,...e),this._logHandler(this,k.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,k.INFO,...e),this._logHandler(this,k.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,k.WARN,...e),this._logHandler(this,k.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,k.ERROR,...e),this._logHandler(this,k.ERROR,...e)}}const wo=(n,e)=>e.some(t=>n instanceof t);let _s,ps;function To(){return _s||(_s=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function bo(){return ps||(ps=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const mi=new WeakMap,rn=new WeakMap,gi=new WeakMap,qt=new WeakMap,Sn=new WeakMap;function So(n){const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(ue(n.result)),i()},o=()=>{s(n.error),i()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&mi.set(t,n)}).catch(()=>{}),Sn.set(e,n),e}function No(n){if(rn.has(n))return;const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),i()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});rn.set(n,e)}let on={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return rn.get(n);if(e==="objectStoreNames")return n.objectStoreNames||gi.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ue(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Ro(n){on=n(on)}function Ao(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(jt(this),e,...t);return gi.set(s,e.sort?e.sort():[e]),ue(s)}:bo().includes(n)?function(...e){return n.apply(jt(this),e),ue(mi.get(this))}:function(...e){return ue(n.apply(jt(this),e))}}function Do(n){return typeof n=="function"?Ao(n):(n instanceof IDBTransaction&&No(n),wo(n,To())?new Proxy(n,on):n)}function ue(n){if(n instanceof IDBRequest)return So(n);if(qt.has(n))return qt.get(n);const e=Do(n);return e!==n&&(qt.set(n,e),Sn.set(e,n)),e}const jt=n=>Sn.get(n);function ko(n,e,{blocked:t,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(n,e),a=ue(o);return s&&o.addEventListener("upgradeneeded",l=>{s(ue(o.result),l.oldVersion,l.newVersion,ue(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const xo=["get","getKey","getAll","getAllKeys","count"],Po=["put","add","delete","clear"],Yt=new Map;function ms(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Yt.get(e))return Yt.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,i=Po.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(i||xo.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return Yt.set(e,r),r}Ro(n=>({...n,get:(e,t,s)=>ms(e,t)||n.get(e,t,s),has:(e,t)=>!!ms(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Mo(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function Mo(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const an="@firebase/app",gs="0.11.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ie=new pi("@firebase/app"),Lo="@firebase/app-compat",Fo="@firebase/analytics-compat",Bo="@firebase/analytics",Wo="@firebase/app-check-compat",Uo="@firebase/app-check",Ho="@firebase/auth",$o="@firebase/auth-compat",Vo="@firebase/database",Go="@firebase/data-connect",zo="@firebase/database-compat",qo="@firebase/functions",jo="@firebase/functions-compat",Yo="@firebase/installations",Ko="@firebase/installations-compat",Qo="@firebase/messaging",Xo="@firebase/messaging-compat",Jo="@firebase/performance",Zo="@firebase/performance-compat",ea="@firebase/remote-config",ta="@firebase/remote-config-compat",na="@firebase/storage",sa="@firebase/storage-compat",ia="@firebase/firestore",ra="@firebase/vertexai",oa="@firebase/firestore-compat",aa="firebase",la="11.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln="[DEFAULT]",ca={[an]:"fire-core",[Lo]:"fire-core-compat",[Bo]:"fire-analytics",[Fo]:"fire-analytics-compat",[Uo]:"fire-app-check",[Wo]:"fire-app-check-compat",[Ho]:"fire-auth",[$o]:"fire-auth-compat",[Vo]:"fire-rtdb",[Go]:"fire-data-connect",[zo]:"fire-rtdb-compat",[qo]:"fire-fn",[jo]:"fire-fn-compat",[Yo]:"fire-iid",[Ko]:"fire-iid-compat",[Qo]:"fire-fcm",[Xo]:"fire-fcm-compat",[Jo]:"fire-perf",[Zo]:"fire-perf-compat",[ea]:"fire-rc",[ta]:"fire-rc-compat",[na]:"fire-gcs",[sa]:"fire-gcs-compat",[ia]:"fire-fst",[oa]:"fire-fst-compat",[ra]:"fire-vertex","fire-js":"fire-js",[aa]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Et=new Map,ha=new Map,cn=new Map;function ys(n,e){try{n.container.addComponent(e)}catch(t){ie.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function It(n){const e=n.name;if(cn.has(e))return ie.debug(`There were multiple attempts to register component ${e}.`),!1;cn.set(e,n);for(const t of Et.values())ys(t,n);for(const t of ha.values())ys(t,n);return!0}function ua(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function da(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fa={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},de=new fi("app","Firebase",fa);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a{constructor(e,t,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Ze("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw de.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pa=la;function yi(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s=Object.assign({name:ln,automaticDataCollectionEnabled:!1},e),i=s.name;if(typeof i!="string"||!i)throw de.create("bad-app-name",{appName:String(i)});if(t||(t=ui()),!t)throw de.create("no-options");const r=Et.get(i);if(r){if(Ct(t,r.options)&&Ct(s,r.config))return r;throw de.create("duplicate-app",{appName:i})}const o=new yo(i);for(const l of cn.values())o.addComponent(l);const a=new _a(t,s,o);return Et.set(i,a),a}function ma(n=ln){const e=Et.get(n);if(!e&&n===ln&&ui())return yi();if(!e)throw de.create("no-app",{appName:n});return e}function Ae(n,e,t){var s;let i=(s=ca[n])!==null&&s!==void 0?s:n;t&&(i+=`-${t}`);const r=i.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${i}" with version "${e}":`];r&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ie.warn(a.join(" "));return}It(new Ze(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ga="firebase-heartbeat-database",ya=1,et="firebase-heartbeat-store";let Kt=null;function vi(){return Kt||(Kt=ko(ga,ya,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(et)}catch(t){console.warn(t)}}}}).catch(n=>{throw de.create("idb-open",{originalErrorMessage:n.message})})),Kt}async function va(n){try{const t=(await vi()).transaction(et),s=await t.objectStore(et).get(Ci(n));return await t.done,s}catch(e){if(e instanceof lt)ie.warn(e.message);else{const t=de.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ie.warn(t.message)}}}async function vs(n,e){try{const s=(await vi()).transaction(et,"readwrite");await s.objectStore(et).put(e,Ci(n)),await s.done}catch(t){if(t instanceof lt)ie.warn(t.message);else{const s=de.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});ie.warn(s.message)}}}function Ci(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ca=1024,Ea=30;class Ia{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ta(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Cs();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats.length>Ea){const o=ba(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){ie.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Cs(),{heartbeatsToSend:s,unsentEntries:i}=wa(this._heartbeatsCache.heartbeats),r=yt(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return ie.warn(t),""}}}function Cs(){return new Date().toISOString().substring(0,10)}function wa(n,e=Ca){const t=[];let s=n.slice();for(const i of n){const r=t.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),Es(t)>e){r.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Es(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class Ta{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return io()?ro().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await va(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return vs(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return vs(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Es(n){return yt(JSON.stringify({version:2,heartbeats:n})).length}function ba(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sa(n){It(new Ze("platform-logger",e=>new Oo(e),"PRIVATE")),It(new Ze("heartbeat",e=>new Ia(e),"PRIVATE")),Ae(an,gs,n),Ae(an,gs,"esm2017"),Ae("fire-js","")}Sa("");var Na="firebase",Ra="11.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ae(Na,Ra,"app");var Is={};const ws="@firebase/database",Ts="1.0.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ei="";function Aa(n){Ei=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),H(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Je(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return te(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ii=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Da(e)}}catch{}return new ka},ve=Ii("localStorage"),xa=Ii("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const De=new pi("@firebase/database"),Pa=function(){let n=1;return function(){return n++}}(),wi=function(n){const e=_o(n),t=new fo;t.update(e);const s=t.digest();return Tn.encodeByteArray(s)},ct=function(...n){let e="";for(let t=0;t<n.length;t++){const s=n[t];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=ct.apply(null,s):typeof s=="object"?e+=H(s):e+=s,e+=" "}return e};let je=null,bs=!0;const Oa=function(n,e){g(!0,"Can't turn on custom loggers persistently."),De.logLevel=k.VERBOSE,je=De.log.bind(De)},$=function(...n){if(bs===!0&&(bs=!1,je===null&&xa.get("logging_enabled")===!0&&Oa()),je){const e=ct.apply(null,n);je(e)}},ht=function(n){return function(...e){$(n,...e)}},hn=function(...n){const e="FIREBASE INTERNAL ERROR: "+ct(...n);De.error(e)},re=function(...n){const e=`FIREBASE FATAL ERROR: ${ct(...n)}`;throw De.error(e),new Error(e)},Y=function(...n){const e="FIREBASE WARNING: "+ct(...n);De.warn(e)},Ma=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Y("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Nn=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},La=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Oe="[MIN_NAME]",Ee="[MAX_NAME]",be=function(n,e){if(n===e)return 0;if(n===Oe||e===Ee)return-1;if(e===Oe||n===Ee)return 1;{const t=Ss(n),s=Ss(e);return t!==null?s!==null?t-s===0?n.length-e.length:t-s:-1:s!==null?1:n<e?-1:1}},Fa=function(n,e){return n===e?0:n<e?-1:1},Ve=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+H(e))},Rn=function(n){if(typeof n!="object"||n===null)return H(n);const e=[];for(const s in n)e.push(s);e.sort();let t="{";for(let s=0;s<e.length;s++)s!==0&&(t+=","),t+=H(e[s]),t+=":",t+=Rn(n[e[s]]);return t+="}",t},Ti=function(n,e){const t=n.length;if(t<=e)return[n];const s=[];for(let i=0;i<t;i+=e)i+e>t?s.push(n.substring(i,t)):s.push(n.substring(i,i+e));return s};function G(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const bi=function(n){g(!Nn(n),"Invalid JSON number");const e=11,t=52,s=(1<<e-1)-1;let i,r,o,a,l;n===0?(r=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),s),r=a+s,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-s-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let _=parseInt(d.substr(l,8),2).toString(16);_.length===1&&(_="0"+_),u=u+_}return u.toLowerCase()},Ba=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Wa=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Ua(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const s=new Error(n+" at "+e._path.toString()+": "+t);return s.code=n.toUpperCase(),s}const Ha=new RegExp("^-?(0*)\\d{1,10}$"),$a=-2147483648,Va=2147483647,Ss=function(n){if(Ha.test(n)){const e=Number(n);if(e>=$a&&e<=Va)return e}return null},We=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw Y("Exception was thrown by user callback.",t),e},Math.floor(0))}},Ga=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ye=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,da(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){Y(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qa{constructor(e,t,s){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?($("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Y(e)}}class gt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}gt.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const An="5",Si="v",Ni="s",Ri="r",Ai="f",Di=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,ki="ls",xi="p",un="ac",Pi="websocket",Oi="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(e,t,s,i,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=ve.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&ve.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function ja(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Li(n,e,t){g(typeof e=="string","typeof type must == string"),g(typeof t=="object","typeof params must == object");let s;if(e===Pi)s=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Oi)s=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);ja(n)&&(t.ns=n.namespace);const i=[];return G(t,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ya{constructor(){this.counters_={}}incrementCounter(e,t=1){te(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return qr(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qt={},Xt={};function Dn(n){const e=n.toString();return Qt[e]||(Qt[e]=new Ya),Qt[e]}function Ka(n,e){const t=n.toString();return Xt[t]||(Xt[t]=e()),Xt[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&We(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ns="start",Xa="close",Ja="pLPCommand",Za="pRTLPCB",Fi="id",Bi="pw",Wi="ser",el="cb",tl="seg",nl="ts",sl="d",il="dframe",Ui=1870,Hi=30,rl=Ui-Hi,ol=25e3,al=3e4;class Re{constructor(e,t,s,i,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ht(e),this.stats_=Dn(t),this.urlFn=l=>(this.appCheckToken&&(l[un]=this.appCheckToken),Li(t,Oi,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Qa(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(al)),La(()=>{if(this.isClosed_)return;this.scriptTagHolder=new kn((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ns)this.id=a,this.password=l;else if(o===Xa)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[Ns]="t",s[Wi]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[el]=this.scriptTagHolder.uniqueCallbackIdentifier),s[Si]=An,this.transportSessionId&&(s[Ni]=this.transportSessionId),this.lastSessionId&&(s[ki]=this.lastSessionId),this.applicationId&&(s[xi]=this.applicationId),this.appCheckToken&&(s[un]=this.appCheckToken),typeof location<"u"&&location.hostname&&Di.test(location.hostname)&&(s[Ri]=Ai);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Re.forceAllow_=!0}static forceDisallow(){Re.forceDisallow_=!0}static isAvailable(){return Re.forceAllow_?!0:!Re.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Ba()&&!Wa()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=H(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=li(t),i=Ti(s,rl);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const s={};s[il]="t",s[Fi]=e,s[Bi]=t,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=H(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class kn{constructor(e,t,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Pa(),window[Ja+this.uniqueCallbackIdentifier]=e,window[Za+this.uniqueCallbackIdentifier]=t,this.myIFrame=kn.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){$("frame writing exception"),a.stack&&$(a.stack),$(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||$("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Fi]=this.myID,e[Bi]=this.myPW,e[Wi]=this.currentSerial;let t=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Hi+s.length<=Ui;){const o=this.pendingSegs.shift();s=s+"&"+tl+i+"="+o.seg+"&"+nl+i+"="+o.ts+"&"+sl+i+"="+o.d,i++}return t=t+s,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,s){this.pendingSegs.push({seg:e,ts:t,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const s=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(s,Math.floor(ol)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),t())},s.onerror=()=>{$("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ll=16384,cl=45e3;let wt=null;typeof MozWebSocket<"u"?wt=MozWebSocket:typeof WebSocket<"u"&&(wt=WebSocket);class X{constructor(e,t,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ht(this.connId),this.stats_=Dn(t),this.connURL=X.connectionURL_(t,o,a,i,s),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,s,i,r){const o={};return o[Si]=An,typeof location<"u"&&location.hostname&&Di.test(location.hostname)&&(o[Ri]=Ai),t&&(o[Ni]=t),s&&(o[ki]=s),i&&(o[un]=i),r&&(o[xi]=r),Li(e,Pi,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,ve.set("previous_websocket_failure",!0);try{let s;so(),this.mySock=new wt(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){X.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(t);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&wt!==null&&!X.forceDisallow_}static previouslyFailed(){return ve.isInMemoryStorage||ve.get("previous_websocket_failure")===!0}markConnectionHealthy(){ve.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const s=Je(t);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const s=this.extractFrameCount_(t);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const t=H(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=Ti(t,ll);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(cl))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}X.responsesRequiredToBeHealthy=2;X.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{static get ALL_TRANSPORTS(){return[Re,X]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=X&&X.isAvailable();let s=t&&!X.previouslyFailed();if(e.webSocketOnly&&(t||Y("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[X];else{const i=this.transports_=[];for(const r of tt.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);tt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}tt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hl=6e4,ul=5e3,dl=10*1024,fl=100*1024,Jt="t",Rs="d",_l="s",As="r",pl="e",Ds="o",ks="a",xs="n",Ps="p",ml="h";class gl{constructor(e,t,s,i,r,o,a,l,c,d){this.id=e,this.repoInfo_=t,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ht("c:"+this.id+":"),this.transportManager_=new tt(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Ye(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>fl?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>dl?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Jt in e){const t=e[Jt];t===ks?this.upgradeIfSecondaryHealthy_():t===As?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Ds&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Ve("t",e),s=Ve("d",e);if(t==="c")this.onSecondaryControl_(s);else if(t==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Ps,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:ks,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:xs,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Ve("t",e),s=Ve("d",e);t==="c"?this.onControl_(s):t==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Ve(Jt,e);if(Rs in e){const s=e[Rs];if(t===ml){const i=Object.assign({},s);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===xs){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===_l?this.onConnectionShutdown_(s):t===As?this.onReset_(s):t===pl?hn("Server Error: "+s):t===Ds?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):hn("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),An!==s&&Y("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,s),Ye(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(hl))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ye(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(ul))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Ps,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(ve.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{put(e,t,s,i){}merge(e,t,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,s){}onDisconnectMerge(e,t,s){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const i=this.getInitialEvent(e);i&&t.apply(s,i)}off(e,t,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){g(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt extends Vi{static getInstance(){return new Tt}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!di()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Os=32,Ms=768;class A{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function N(){return new A("")}function b(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function _e(n){return n.pieces_.length-n.pieceNum_}function x(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new A(n.pieces_,e)}function xn(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function yl(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function nt(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Gi(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new A(e,0)}function L(n,e){const t=[];for(let s=n.pieceNum_;s<n.pieces_.length;s++)t.push(n.pieces_[s]);if(e instanceof A)for(let s=e.pieceNum_;s<e.pieces_.length;s++)t.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&t.push(s[i])}return new A(t,0)}function S(n){return n.pieceNum_>=n.pieces_.length}function q(n,e){const t=b(n),s=b(e);if(t===null)return e;if(t===s)return q(x(n),x(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function vl(n,e){const t=nt(n,0),s=nt(e,0);for(let i=0;i<t.length&&i<s.length;i++){const r=be(t[i],s[i]);if(r!==0)return r}return t.length===s.length?0:t.length<s.length?-1:1}function Pn(n,e){if(_e(n)!==_e(e))return!1;for(let t=n.pieceNum_,s=e.pieceNum_;t<=n.pieces_.length;t++,s++)if(n.pieces_[t]!==e.pieces_[s])return!1;return!0}function K(n,e){let t=n.pieceNum_,s=e.pieceNum_;if(_e(n)>_e(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[s])return!1;++t,++s}return!0}class Cl{constructor(e,t){this.errorPrefix_=t,this.parts_=nt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Ft(this.parts_[s]);zi(this)}}function El(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Ft(e),zi(n)}function Il(n){const e=n.parts_.pop();n.byteLength_-=Ft(e),n.parts_.length>0&&(n.byteLength_-=1)}function zi(n){if(n.byteLength_>Ms)throw new Error(n.errorPrefix_+"has a key path longer than "+Ms+" bytes ("+n.byteLength_+").");if(n.parts_.length>Os)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Os+") or object contains a cycle "+ye(n))}function ye(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On extends Vi{static getInstance(){return new On}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ge=1e3,wl=60*5*1e3,Ls=30*1e3,Tl=1.3,bl=3e4,Sl="server_kill",Fs=3;class se extends $i{constructor(e,t,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=se.nextPersistentConnectionId_++,this.log_=ht("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ge,this.maxReconnectDelay_=wl,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");On.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Tt.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,s){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(H(r)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const t=new Lt,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(s)})}sendListen_(e){const t=e.query,s=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;se.warnOnListenWarnings_(l,t),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&te(e,"w")){const s=Pe(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();Y(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||ho(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Ls)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=co(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(t,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,s=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,s)})}unlisten(e,t){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,t)}sendUnlisten_(e,t,s,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:s})}onDisconnectMerge(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:s})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,s,i){const r={p:t,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,s,i){this.putInternal("p",e,t,s,i)}merge(e,t,s,i){this.putInternal("m",e,t,s,i)}putInternal(e,t,s,i,r){this.initConnection_();const o={p:t,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,s,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+H(e));const t=e.r,s=this.requestCBHash_[t];s&&(delete this.requestCBHash_[t],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):hn("Unrecognized action received from server: "+H(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ge,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Ge,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>bl&&(this.reconnectDelay_=Ge),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Tl)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+se.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(u){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,_]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?$("getToken() completed but was canceled"):($("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=_&&_.token,a=new gl(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,s,v=>{Y(v+" ("+this.repoInfo_.toString()+")"),this.interrupt(Sl)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&Y(u),l())}}}interrupt(e){$("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){$("Resuming connection for reason: "+e),delete this.interruptReasons_[e],ds(this.interruptReasons_)&&(this.reconnectDelay_=Ge,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let s;t?s=t.map(r=>Rn(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const s=new A(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,t){$("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Fs&&(this.reconnectDelay_=Ls,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){$("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Fs&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Ei.replace(/\./g,"-")]=1,di()?e["framework.cordova"]=1:no()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Tt.getInstance().currentlyOnline();return ds(this.interruptReasons_)&&e}}se.nextPersistentConnectionId_=0;se.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new T(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const s=new T(Oe,e),i=new T(Oe,t);return this.compare(s,i)!==0}minPost(){return T.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ft;class qi extends Wt{static get __EMPTY_NODE(){return ft}static set __EMPTY_NODE(e){ft=e}compare(e,t){return be(e.name,t.name)}isDefinedOn(e){throw Be("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return T.MIN}maxPost(){return new T(Ee,ft)}makePost(e,t){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new T(e,ft)}toString(){return".key"}}const ke=new qi;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e,t,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?s(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class U{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s??U.RED,this.left=i??j.EMPTY_NODE,this.right=r??j.EMPTY_NODE}copy(e,t,s,i,r){return new U(e??this.key,t??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return j.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let s,i;if(s=this,t(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),t(e,s.key)===0){if(s.right.isEmpty())return j.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,U.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,U.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}U.RED=!0;U.BLACK=!1;class Nl{copy(e,t,s,i,r){return this}insert(e,t,s){return new U(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class j{constructor(e,t=j.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new j(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,U.BLACK,null,null))}remove(e){return new j(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,U.BLACK,null,null))}get(e){let t,s=this.root_;for(;!s.isEmpty();){if(t=this.comparator_(e,s.key),t===0)return s.value;t<0?s=s.left:t>0&&(s=s.right)}return null}getPredecessorKey(e){let t,s=this.root_,i=null;for(;!s.isEmpty();)if(t=this.comparator_(e,s.key),t===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else t<0?s=s.left:t>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new _t(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new _t(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new _t(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new _t(this.root_,null,this.comparator_,!0,e)}}j.EMPTY_NODE=new Nl;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rl(n,e){return be(n.name,e.name)}function Mn(n,e){return be(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dn;function Al(n){dn=n}const ji=function(n){return typeof n=="number"?"number:"+bi(n):"string:"+n},Yi=function(n){if(n.isLeafNode()){const e=n.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&te(e,".sv"),"Priority must be a string or number.")}else g(n===dn||n.isEmpty(),"priority of unexpected type.");g(n===dn||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bs;class W{static set __childrenNodeConstructor(e){Bs=e}static get __childrenNodeConstructor(){return Bs}constructor(e,t=W.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Yi(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new W(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:W.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return S(e)?this:b(e)===".priority"?this.priorityNode_:W.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:W.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const s=b(e);return s===null?t:t.isEmpty()&&s!==".priority"?this:(g(s!==".priority"||_e(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,W.__childrenNodeConstructor.EMPTY_NODE.updateChild(x(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+ji(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=bi(this.value_):e+=this.value_,this.lazyHash_=wi(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===W.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof W.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,s=typeof this.value_,i=W.VALUE_TYPE_ORDER.indexOf(t),r=W.VALUE_TYPE_ORDER.indexOf(s);return g(i>=0,"Unknown leaf type: "+t),g(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}W.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ki,Qi;function Dl(n){Ki=n}function kl(n){Qi=n}class xl extends Wt{compare(e,t){const s=e.node.getPriority(),i=t.node.getPriority(),r=s.compareTo(i);return r===0?be(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return T.MIN}maxPost(){return new T(Ee,new W("[PRIORITY-POST]",Qi))}makePost(e,t){const s=Ki(e);return new T(t,new W("[PRIORITY-POST]",s))}toString(){return".priority"}}const F=new xl;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pl=Math.log(2);class Ol{constructor(e){const t=r=>parseInt(Math.log(r)/Pl,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const bt=function(n,e,t,s){n.sort(e);const i=function(l,c){const d=c-l;let u,_;if(d===0)return null;if(d===1)return u=n[l],_=t?t(u):u,new U(_,u.node,U.BLACK,null,null);{const v=parseInt(d/2,10)+l,C=i(l,v),I=i(v+1,c);return u=n[v],_=t?t(u):u,new U(_,u.node,U.BLACK,C,I)}},r=function(l){let c=null,d=null,u=n.length;const _=function(C,I){const B=u-C,ae=u;u-=C;const le=i(B+1,ae),$e=n[B],z=t?t($e):$e;v(new U(z,$e.node,I,null,le))},v=function(C){c?(c.left=C,c=C):(d=C,c=C)};for(let C=0;C<l.count;++C){const I=l.nextBitIsOne(),B=Math.pow(2,l.count-(C+1));I?_(B,U.BLACK):(_(B,U.BLACK),_(B,U.RED))}return d},o=new Ol(n.length),a=r(o);return new j(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zt;const Ne={};class ne{static get Default(){return g(Ne&&F,"ChildrenNode.ts has not been loaded"),Zt=Zt||new ne({".priority":Ne},{".priority":F}),Zt}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Pe(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof j?t:null}hasIndex(e){return te(this.indexSet_,e.toString())}addIndex(e,t){g(e!==ke,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=t.getIterator(T.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=bt(s,e.getCompare()):a=Ne;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const d=Object.assign({},this.indexes_);return d[l]=a,new ne(d,c)}addToIndexes(e,t){const s=vt(this.indexes_,(i,r)=>{const o=Pe(this.indexSet_,r);if(g(o,"Missing index implementation for "+r),i===Ne)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(T.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),bt(a,o.getCompare())}else return Ne;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new T(e.name,a))),l.insert(e,e.node)}});return new ne(s,this.indexSet_)}removeFromIndexes(e,t){const s=vt(this.indexes_,i=>{if(i===Ne)return i;{const r=t.get(e.name);return r?i.remove(new T(e.name,r)):i}});return new ne(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ze;class E{static get EMPTY_NODE(){return ze||(ze=new E(new j(Mn),null,ne.Default))}constructor(e,t,s){this.children_=e,this.priorityNode_=t,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Yi(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||ze}updatePriority(e){return this.children_.isEmpty()?this:new E(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?ze:t}}getChild(e){const t=b(e);return t===null?this:this.getImmediateChild(t).getChild(x(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(g(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const s=new T(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?ze:this.priorityNode_;return new E(i,o,r)}}updateChild(e,t){const s=b(e);if(s===null)return t;{g(b(e)!==".priority"||_e(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(x(e),t);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let s=0,i=0,r=!0;if(this.forEachChild(F,(o,a)=>{t[o]=a.val(e),s++,r&&E.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+ji(this.getPriority().val())+":"),this.forEachChild(F,(t,s)=>{const i=s.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":wi(e)}return this.lazyHash_}getPredecessorChildName(e,t,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new T(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new T(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new T(t,this.children_.get(t)):null}forEachChild(e,t){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,T.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,T.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===ut?-1:0}withIndex(e){if(e===ke||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new E(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===ke||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const s=this.getIterator(F),i=t.getIterator(F);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===ke?null:this.indexMap_.get(e.toString())}}E.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Ml extends E{constructor(){super(new j(Mn),E.EMPTY_NODE,ne.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return E.EMPTY_NODE}isEmpty(){return!1}}const ut=new Ml;Object.defineProperties(T,{MIN:{value:new T(Oe,E.EMPTY_NODE)},MAX:{value:new T(Ee,ut)}});qi.__EMPTY_NODE=E.EMPTY_NODE;W.__childrenNodeConstructor=E;Al(ut);kl(ut);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ll=!0;function V(n,e=null){if(n===null)return E.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new W(t,V(e))}if(!(n instanceof Array)&&Ll){const t=[];let s=!1;if(G(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=V(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),t.push(new T(o,l)))}}),t.length===0)return E.EMPTY_NODE;const r=bt(t,Rl,o=>o.name,Mn);if(s){const o=bt(t,F.getCompare());return new E(r,V(e),new ne({".priority":o},{".priority":F}))}else return new E(r,V(e),ne.Default)}else{let t=E.EMPTY_NODE;return G(n,(s,i)=>{if(te(n,s)&&s.substring(0,1)!=="."){const r=V(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(s,r))}}),t.updatePriority(V(e))}}Dl(V);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fl extends Wt{constructor(e){super(),this.indexPath_=e,g(!S(e)&&b(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const s=this.extractChild(e.node),i=this.extractChild(t.node),r=s.compareTo(i);return r===0?be(e.name,t.name):r}makePost(e,t){const s=V(e),i=E.EMPTY_NODE.updateChild(this.indexPath_,s);return new T(t,i)}maxPost(){const e=E.EMPTY_NODE.updateChild(this.indexPath_,ut);return new T(Ee,e)}toString(){return nt(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl extends Wt{compare(e,t){const s=e.node.compareTo(t.node);return s===0?be(e.name,t.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return T.MIN}maxPost(){return T.MAX}makePost(e,t){const s=V(e);return new T(t,s)}toString(){return".value"}}const Wl=new Bl;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xi(n){return{type:"value",snapshotNode:n}}function Me(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function st(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function it(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Ul(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(e){this.index_=e}updateChild(e,t,s,i,r,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(t)?o.trackChildChange(st(t,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Me(t,s)):o.trackChildChange(it(t,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(t,s).withIndex(this.index_)}updateFullNode(e,t,s){return s!=null&&(e.isLeafNode()||e.forEachChild(F,(i,r)=>{t.hasChild(i)||s.trackChildChange(st(i,r))}),t.isLeafNode()||t.forEachChild(F,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(it(i,r,o))}else s.trackChildChange(Me(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?E.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e){this.indexedFilter_=new Ln(e.getIndex()),this.index_=e.getIndex(),this.startPost_=rt.getStartPost_(e),this.endPost_=rt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&s}updateChild(e,t,s,i,r,o){return this.matches(new T(t,s))||(s=E.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,s,i,r,o)}updateFullNode(e,t,s){t.isLeafNode()&&(t=E.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(E.EMPTY_NODE);const r=this;return t.forEachChild(F,(o,a)=>{r.matches(new T(o,a))||(i=i.updateImmediateChild(o,E.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hl{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=t=>{const s=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new rt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,s,i,r,o){return this.rangedFilter_.matches(new T(t,s))||(s=E.EMPTY_NODE),e.getImmediateChild(t).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,s,i,r,o):this.fullLimitUpdateChild_(e,t,s,r,o)}updateFullNode(e,t,s){let i;if(t.isLeafNode()||t.isEmpty())i=E.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=E.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(E.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,E.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,s,i,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(_,v)=>u(v,_)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const l=new T(t,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let _=i.getChildAfterChild(this.index_,c,this.reverse_);for(;_!=null&&(_.name===t||a.hasChild(_.name));)_=i.getChildAfterChild(this.index_,_,this.reverse_);const v=_==null?1:o(_,l);if(d&&!s.isEmpty()&&v>=0)return r!=null&&r.trackChildChange(it(t,s,u)),a.updateImmediateChild(t,s);{r!=null&&r.trackChildChange(st(t,u));const I=a.updateImmediateChild(t,E.EMPTY_NODE);return _!=null&&this.rangedFilter_.matches(_)?(r!=null&&r.trackChildChange(Me(_.name,_.node)),I.updateImmediateChild(_.name,_.node)):I}}else return s.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(st(c.name,c.node)),r.trackChildChange(Me(t,s))),a.updateImmediateChild(t,s).updateImmediateChild(c.name,E.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=F}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Oe}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ee}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===F}copy(){const e=new Fn;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function $l(n){return n.loadsAllData()?new Ln(n.getIndex()):n.hasLimit()?new Hl(n):new rt(n)}function Ws(n){const e={};if(n.isDefault())return e;let t;if(n.index_===F?t="$priority":n.index_===Wl?t="$value":n.index_===ke?t="$key":(g(n.index_ instanceof Fl,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=H(t),n.startSet_){const s=n.startAfterSet_?"startAfter":"startAt";e[s]=H(n.indexStartValue_),n.startNameSet_&&(e[s]+=","+H(n.indexStartName_))}if(n.endSet_){const s=n.endBeforeSet_?"endBefore":"endAt";e[s]=H(n.indexEndValue_),n.endNameSet_&&(e[s]+=","+H(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Us(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==F&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St extends $i{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=ht("p:rest:"),this.listens_={}}listen(e,t,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=St.getListenId_(e,s),a={};this.listens_[o]=a;const l=Ws(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,s),Pe(this.listens_,o)===a){let _;c?c===401?_="permission_denied":_="rest_error:"+c:_="ok",i(_,null)}})}unlisten(e,t){const s=St.getListenId_(e,t);delete this.listens_[s]}get(e){const t=Ws(e._queryParams),s=e._path.toString(),i=new Lt;return this.restRequest_(s+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},s){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+uo(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Je(a.responseText)}catch{Y("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&Y("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{constructor(){this.rootNode_=E.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(){return{value:null,children:new Map}}function Ji(n,e,t){if(S(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const s=b(e);n.children.has(s)||n.children.set(s,Nt());const i=n.children.get(s);e=x(e),Ji(i,e,t)}}function fn(n,e,t){n.value!==null?t(e,n.value):Gl(n,(s,i)=>{const r=new A(e.toString()+"/"+s);fn(i,r,t)})}function Gl(n,e){n.children.forEach((t,s)=>{e(s,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&G(this.last_,(s,i)=>{t[s]=t[s]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hs=10*1e3,ql=30*1e3,jl=5*60*1e3;class Yl{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new zl(e);const s=Hs+(ql-Hs)*Math.random();Ye(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),t={};let s=!1;G(e,(i,r)=>{r>0&&te(this.statsToReport_,i)&&(t[i]=r,s=!0)}),s&&this.server_.reportStats(t),Ye(this.reportStats_.bind(this),Math.floor(Math.random()*2*jl))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var J;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(J||(J={}));function Bn(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Wn(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Un(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e,t,s){this.path=e,this.affectedTree=t,this.revert=s,this.type=J.ACK_USER_WRITE,this.source=Bn()}operationForChild(e){if(S(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new A(e));return new Rt(N(),t,this.revert)}}else return g(b(this.path)===e,"operationForChild called for unrelated child."),new Rt(x(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e,t){this.source=e,this.path=t,this.type=J.LISTEN_COMPLETE}operationForChild(e){return S(this.path)?new ot(this.source,N()):new ot(this.source,x(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(e,t,s){this.source=e,this.path=t,this.snap=s,this.type=J.OVERWRITE}operationForChild(e){return S(this.path)?new Ie(this.source,N(),this.snap.getImmediateChild(e)):new Ie(this.source,x(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e,t,s){this.source=e,this.path=t,this.children=s,this.type=J.MERGE}operationForChild(e){if(S(this.path)){const t=this.children.subtree(new A(e));return t.isEmpty()?null:t.value?new Ie(this.source,N(),t.value):new Le(this.source,N(),t)}else return g(b(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Le(this.source,x(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e,t,s){this.node_=e,this.fullyInitialized_=t,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(S(e))return this.isFullyInitialized()&&!this.filtered_;const t=b(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Ql(n,e,t,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Ul(o.childName,o.snapshotNode))}),qe(n,i,"child_removed",e,s,t),qe(n,i,"child_added",e,s,t),qe(n,i,"child_moved",r,s,t),qe(n,i,"child_changed",e,s,t),qe(n,i,"value",e,s,t),i}function qe(n,e,t,s,i,r){const o=s.filter(a=>a.type===t);o.sort((a,l)=>Jl(n,a,l)),o.forEach(a=>{const l=Xl(n,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function Xl(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Jl(n,e,t){if(e.childName==null||t.childName==null)throw Be("Should only compare child_ events.");const s=new T(e.childName,e.snapshotNode),i=new T(t.childName,t.snapshotNode);return n.index_.compare(s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ut(n,e){return{eventCache:n,serverCache:e}}function Ke(n,e,t,s){return Ut(new we(e,t,s),n.serverCache)}function Zi(n,e,t,s){return Ut(n.eventCache,new we(e,t,s))}function _n(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Te(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let en;const Zl=()=>(en||(en=new j(Fa)),en);class D{static fromObject(e){let t=new D(null);return G(e,(s,i)=>{t=t.set(new A(s),i)}),t}constructor(e,t=Zl()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:N(),value:this.value};if(S(e))return null;{const s=b(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(x(e),t);return r!=null?{path:L(new A(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(S(e))return this;{const t=b(e),s=this.children.get(t);return s!==null?s.subtree(x(e)):new D(null)}}set(e,t){if(S(e))return new D(t,this.children);{const s=b(e),r=(this.children.get(s)||new D(null)).set(x(e),t),o=this.children.insert(s,r);return new D(this.value,o)}}remove(e){if(S(e))return this.children.isEmpty()?new D(null):new D(null,this.children);{const t=b(e),s=this.children.get(t);if(s){const i=s.remove(x(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new D(null):new D(this.value,r)}else return this}}get(e){if(S(e))return this.value;{const t=b(e),s=this.children.get(t);return s?s.get(x(e)):null}}setTree(e,t){if(S(e))return t;{const s=b(e),r=(this.children.get(s)||new D(null)).setTree(x(e),t);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new D(this.value,o)}}fold(e){return this.fold_(N(),e)}fold_(e,t){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(L(e,i),t)}),t(e,this.value,s)}findOnPath(e,t){return this.findOnPath_(e,N(),t)}findOnPath_(e,t,s){const i=this.value?s(t,this.value):!1;if(i)return i;if(S(e))return null;{const r=b(e),o=this.children.get(r);return o?o.findOnPath_(x(e),L(t,r),s):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,N(),t)}foreachOnPath_(e,t,s){if(S(e))return this;{this.value&&s(t,this.value);const i=b(e),r=this.children.get(i);return r?r.foreachOnPath_(x(e),L(t,i),s):new D(null)}}foreach(e){this.foreach_(N(),e)}foreach_(e,t){this.children.inorderTraversal((s,i)=>{i.foreach_(L(e,s),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,s)=>{s.value&&e(t,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e){this.writeTree_=e}static empty(){return new Z(new D(null))}}function Qe(n,e,t){if(S(e))return new Z(new D(t));{const s=n.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=q(i,e);return r=r.updateChild(o,t),new Z(n.writeTree_.set(i,r))}else{const i=new D(t),r=n.writeTree_.setTree(e,i);return new Z(r)}}}function pn(n,e,t){let s=n;return G(t,(i,r)=>{s=Qe(s,L(e,i),r)}),s}function $s(n,e){if(S(e))return Z.empty();{const t=n.writeTree_.setTree(e,new D(null));return new Z(t)}}function mn(n,e){return Se(n,e)!=null}function Se(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(q(t.path,e)):null}function Vs(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(F,(s,i)=>{e.push(new T(s,i))}):n.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new T(s,i.value))}),e}function fe(n,e){if(S(e))return n;{const t=Se(n,e);return t!=null?new Z(new D(t)):new Z(n.writeTree_.subtree(e))}}function gn(n){return n.writeTree_.isEmpty()}function Fe(n,e){return er(N(),n.writeTree_,e)}function er(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(g(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):t=er(L(n,i),r,t)}),!t.getChild(n).isEmpty()&&s!==null&&(t=t.updateChild(L(n,".priority"),s)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hn(n,e){return ir(e,n)}function ec(n,e,t,s,i){g(s>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:s,visible:i}),i&&(n.visibleWrites=Qe(n.visibleWrites,e,t)),n.lastWriteId=s}function tc(n,e,t,s){g(s>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:s,visible:!0}),n.visibleWrites=pn(n.visibleWrites,e,t),n.lastWriteId=s}function nc(n,e){for(let t=0;t<n.allWrites.length;t++){const s=n.allWrites[t];if(s.writeId===e)return s}return null}function sc(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);g(t>=0,"removeWrite called with nonexistent writeId.");const s=n.allWrites[t];n.allWrites.splice(t,1);let i=s.visible,r=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&ic(a,s.path)?i=!1:K(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return rc(n),!0;if(s.snap)n.visibleWrites=$s(n.visibleWrites,s.path);else{const a=s.children;G(a,l=>{n.visibleWrites=$s(n.visibleWrites,L(s.path,l))})}return!0}else return!1}function ic(n,e){if(n.snap)return K(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&K(L(n.path,t),e))return!0;return!1}function rc(n){n.visibleWrites=tr(n.allWrites,oc,N()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function oc(n){return n.visible}function tr(n,e,t){let s=Z.empty();for(let i=0;i<n.length;++i){const r=n[i];if(e(r)){const o=r.path;let a;if(r.snap)K(t,o)?(a=q(t,o),s=Qe(s,a,r.snap)):K(o,t)&&(a=q(o,t),s=Qe(s,N(),r.snap.getChild(a)));else if(r.children){if(K(t,o))a=q(t,o),s=pn(s,a,r.children);else if(K(o,t))if(a=q(o,t),S(a))s=pn(s,N(),r.children);else{const l=Pe(r.children,b(a));if(l){const c=l.getChild(x(a));s=Qe(s,N(),c)}}}else throw Be("WriteRecord should have .snap or .children")}}return s}function nr(n,e,t,s,i){if(!s&&!i){const r=Se(n.visibleWrites,e);if(r!=null)return r;{const o=fe(n.visibleWrites,e);if(gn(o))return t;if(t==null&&!mn(o,N()))return null;{const a=t||E.EMPTY_NODE;return Fe(o,a)}}}else{const r=fe(n.visibleWrites,e);if(!i&&gn(r))return t;if(!i&&t==null&&!mn(r,N()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(K(c.path,e)||K(e,c.path))},a=tr(n.allWrites,o,e),l=t||E.EMPTY_NODE;return Fe(a,l)}}}function ac(n,e,t){let s=E.EMPTY_NODE;const i=Se(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(F,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(t){const r=fe(n.visibleWrites,e);return t.forEachChild(F,(o,a)=>{const l=Fe(fe(r,new A(o)),a);s=s.updateImmediateChild(o,l)}),Vs(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=fe(n.visibleWrites,e);return Vs(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function lc(n,e,t,s,i){g(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=L(e,t);if(mn(n.visibleWrites,r))return null;{const o=fe(n.visibleWrites,r);return gn(o)?i.getChild(t):Fe(o,i.getChild(t))}}function cc(n,e,t,s){const i=L(e,t),r=Se(n.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(t)){const o=fe(n.visibleWrites,i);return Fe(o,s.getNode().getImmediateChild(t))}else return null}function hc(n,e){return Se(n.visibleWrites,e)}function uc(n,e,t,s,i,r,o){let a;const l=fe(n.visibleWrites,e),c=Se(l,N());if(c!=null)a=c;else if(t!=null)a=Fe(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),_=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let v=_.getNext();for(;v&&d.length<i;)u(v,s)!==0&&d.push(v),v=_.getNext();return d}else return[]}function dc(){return{visibleWrites:Z.empty(),allWrites:[],lastWriteId:-1}}function At(n,e,t,s){return nr(n.writeTree,n.treePath,e,t,s)}function $n(n,e){return ac(n.writeTree,n.treePath,e)}function Gs(n,e,t,s){return lc(n.writeTree,n.treePath,e,t,s)}function Dt(n,e){return hc(n.writeTree,L(n.treePath,e))}function fc(n,e,t,s,i,r){return uc(n.writeTree,n.treePath,e,t,s,i,r)}function Vn(n,e,t){return cc(n.writeTree,n.treePath,e,t)}function sr(n,e){return ir(L(n.treePath,e),n.writeTree)}function ir(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _c{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,s=e.childName;g(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),g(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(s,it(s,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(s,st(s,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(s,Me(s,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(s,it(s,e.snapshotNode,i.oldSnap));else throw Be("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{getCompleteChild(e){return null}getChildAfterChild(e,t,s){return null}}const rr=new pc;class Gn{constructor(e,t,s=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=s}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new we(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Vn(this.writes_,e,s)}}getChildAfterChild(e,t,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Te(this.viewCache_),r=fc(this.writes_,i,t,1,s,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mc(n){return{filter:n}}function gc(n,e){g(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function yc(n,e,t,s,i){const r=new _c;let o,a;if(t.type===J.OVERWRITE){const c=t;c.source.fromUser?o=yn(n,e,c.path,c.snap,s,i,r):(g(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!S(c.path),o=kt(n,e,c.path,c.snap,s,i,a,r))}else if(t.type===J.MERGE){const c=t;c.source.fromUser?o=Cc(n,e,c.path,c.children,s,i,r):(g(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=vn(n,e,c.path,c.children,s,i,a,r))}else if(t.type===J.ACK_USER_WRITE){const c=t;c.revert?o=wc(n,e,c.path,s,i,r):o=Ec(n,e,c.path,c.affectedTree,s,i,r)}else if(t.type===J.LISTEN_COMPLETE)o=Ic(n,e,t.path,s,r);else throw Be("Unknown operation type: "+t.type);const l=r.getChanges();return vc(e,o,l),{viewCache:o,changes:l}}function vc(n,e,t){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=_n(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&t.push(Xi(_n(e)))}}function or(n,e,t,s,i,r){const o=e.eventCache;if(Dt(s,t)!=null)return e;{let a,l;if(S(t))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Te(e),d=c instanceof E?c:E.EMPTY_NODE,u=$n(s,d);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=At(s,Te(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=b(t);if(c===".priority"){g(_e(t)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=Gs(s,t,d,l);u!=null?a=n.filter.updatePriority(d,u):a=o.getNode()}else{const d=x(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const _=Gs(s,t,o.getNode(),l);_!=null?u=o.getNode().getImmediateChild(c).updateChild(d,_):u=o.getNode().getImmediateChild(c)}else u=Vn(s,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,d,i,r):a=o.getNode()}}return Ke(e,a,o.isFullyInitialized()||S(t),n.filter.filtersNodes())}}function kt(n,e,t,s,i,r,o,a){const l=e.serverCache;let c;const d=o?n.filter:n.filter.getIndexedFilter();if(S(t))c=d.updateFullNode(l.getNode(),s,null);else if(d.filtersNodes()&&!l.isFiltered()){const v=l.getNode().updateChild(t,s);c=d.updateFullNode(l.getNode(),v,null)}else{const v=b(t);if(!l.isCompleteForPath(t)&&_e(t)>1)return e;const C=x(t),B=l.getNode().getImmediateChild(v).updateChild(C,s);v===".priority"?c=d.updatePriority(l.getNode(),B):c=d.updateChild(l.getNode(),v,B,C,rr,null)}const u=Zi(e,c,l.isFullyInitialized()||S(t),d.filtersNodes()),_=new Gn(i,u,r);return or(n,u,t,i,_,a)}function yn(n,e,t,s,i,r,o){const a=e.eventCache;let l,c;const d=new Gn(i,e,r);if(S(t))c=n.filter.updateFullNode(e.eventCache.getNode(),s,o),l=Ke(e,c,!0,n.filter.filtersNodes());else{const u=b(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),s),l=Ke(e,c,a.isFullyInitialized(),a.isFiltered());else{const _=x(t),v=a.getNode().getImmediateChild(u);let C;if(S(_))C=s;else{const I=d.getCompleteChild(u);I!=null?xn(_)===".priority"&&I.getChild(Gi(_)).isEmpty()?C=I:C=I.updateChild(_,s):C=E.EMPTY_NODE}if(v.equals(C))l=e;else{const I=n.filter.updateChild(a.getNode(),u,C,_,d,o);l=Ke(e,I,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function zs(n,e){return n.eventCache.isCompleteForChild(e)}function Cc(n,e,t,s,i,r,o){let a=e;return s.foreach((l,c)=>{const d=L(t,l);zs(e,b(d))&&(a=yn(n,a,d,c,i,r,o))}),s.foreach((l,c)=>{const d=L(t,l);zs(e,b(d))||(a=yn(n,a,d,c,i,r,o))}),a}function qs(n,e,t){return t.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function vn(n,e,t,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;S(t)?c=s:c=new D(null).setTree(t,s);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,_)=>{if(d.hasChild(u)){const v=e.serverCache.getNode().getImmediateChild(u),C=qs(n,v,_);l=kt(n,l,new A(u),C,i,r,o,a)}}),c.children.inorderTraversal((u,_)=>{const v=!e.serverCache.isCompleteForChild(u)&&_.value===null;if(!d.hasChild(u)&&!v){const C=e.serverCache.getNode().getImmediateChild(u),I=qs(n,C,_);l=kt(n,l,new A(u),I,i,r,o,a)}}),l}function Ec(n,e,t,s,i,r,o){if(Dt(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(S(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return kt(n,e,t,l.getNode().getChild(t),i,r,a,o);if(S(t)){let c=new D(null);return l.getNode().forEachChild(ke,(d,u)=>{c=c.set(new A(d),u)}),vn(n,e,t,c,i,r,a,o)}else return e}else{let c=new D(null);return s.foreach((d,u)=>{const _=L(t,d);l.isCompleteForPath(_)&&(c=c.set(d,l.getNode().getChild(_)))}),vn(n,e,t,c,i,r,a,o)}}function Ic(n,e,t,s,i){const r=e.serverCache,o=Zi(e,r.getNode(),r.isFullyInitialized()||S(t),r.isFiltered());return or(n,o,t,s,rr,i)}function wc(n,e,t,s,i,r){let o;if(Dt(s,t)!=null)return e;{const a=new Gn(s,e,i),l=e.eventCache.getNode();let c;if(S(t)||b(t)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=At(s,Te(e));else{const u=e.serverCache.getNode();g(u instanceof E,"serverChildren would be complete if leaf node"),d=$n(s,u)}d=d,c=n.filter.updateFullNode(l,d,r)}else{const d=b(t);let u=Vn(s,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=n.filter.updateChild(l,d,u,x(t),a,r):e.eventCache.getNode().hasChild(d)?c=n.filter.updateChild(l,d,E.EMPTY_NODE,x(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=At(s,Te(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Dt(s,N())!=null,Ke(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tc{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new Ln(s.getIndex()),r=$l(s);this.processor_=mc(r);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(E.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(E.EMPTY_NODE,a.getNode(),null),d=new we(l,o.isFullyInitialized(),i.filtersNodes()),u=new we(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Ut(u,d),this.eventGenerator_=new Kl(this.query_)}get query(){return this.query_}}function bc(n){return n.viewCache_.serverCache.getNode()}function Sc(n,e){const t=Te(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!S(e)&&!t.getImmediateChild(b(e)).isEmpty())?t.getChild(e):null}function js(n){return n.eventRegistrations_.length===0}function Nc(n,e){n.eventRegistrations_.push(e)}function Ys(n,e,t){const s=[];if(t){g(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return s}function Ks(n,e,t,s){e.type===J.MERGE&&e.source.queryId!==null&&(g(Te(n.viewCache_),"We should always have a full cache before handling merges"),g(_n(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,r=yc(n.processor_,i,e,t,s);return gc(n.processor_,r.viewCache),g(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,ar(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Rc(n,e){const t=n.viewCache_.eventCache,s=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(F,(r,o)=>{s.push(Me(r,o))}),t.isFullyInitialized()&&s.push(Xi(t.getNode())),ar(n,s,t.getNode(),e)}function ar(n,e,t,s){const i=s?[s]:n.eventRegistrations_;return Ql(n.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xt;class Ac{constructor(){this.views=new Map}}function Dc(n){g(!xt,"__referenceConstructor has already been defined"),xt=n}function kc(){return g(xt,"Reference.ts has not been loaded"),xt}function xc(n){return n.views.size===0}function zn(n,e,t,s){const i=e.source.queryId;if(i!==null){const r=n.views.get(i);return g(r!=null,"SyncTree gave us an op for an invalid query."),Ks(r,e,t,s)}else{let r=[];for(const o of n.views.values())r=r.concat(Ks(o,e,t,s));return r}}function Pc(n,e,t,s,i){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=At(t,i?s:null),l=!1;a?l=!0:s instanceof E?(a=$n(t,s),l=!1):(a=E.EMPTY_NODE,l=!1);const c=Ut(new we(a,l,!1),new we(s,i,!1));return new Tc(e,c)}return o}function Oc(n,e,t,s,i,r){const o=Pc(n,e,s,i,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),Nc(o,t),Rc(o,t)}function Mc(n,e,t,s){const i=e._queryIdentifier,r=[];let o=[];const a=pe(n);if(i==="default")for(const[l,c]of n.views.entries())o=o.concat(Ys(c,t,s)),js(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(i);l&&(o=o.concat(Ys(l,t,s)),js(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!pe(n)&&r.push(new(kc())(e._repo,e._path)),{removed:r,events:o}}function lr(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function xe(n,e){let t=null;for(const s of n.views.values())t=t||Sc(s,e);return t}function cr(n,e){if(e._queryParams.loadsAllData())return Ht(n);{const s=e._queryIdentifier;return n.views.get(s)}}function hr(n,e){return cr(n,e)!=null}function pe(n){return Ht(n)!=null}function Ht(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pt;function Lc(n){g(!Pt,"__referenceConstructor has already been defined"),Pt=n}function Fc(){return g(Pt,"Reference.ts has not been loaded"),Pt}let Bc=1;class Qs{constructor(e){this.listenProvider_=e,this.syncPointTree_=new D(null),this.pendingWriteTree_=dc(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Wc(n,e,t,s,i){return ec(n.pendingWriteTree_,e,t,s,i),i?Ue(n,new Ie(Bn(),e,t)):[]}function Uc(n,e,t,s){tc(n.pendingWriteTree_,e,t,s);const i=D.fromObject(t);return Ue(n,new Le(Bn(),e,i))}function Ce(n,e,t=!1){const s=nc(n.pendingWriteTree_,e);if(sc(n.pendingWriteTree_,e)){let r=new D(null);return s.snap!=null?r=r.set(N(),!0):G(s.children,o=>{r=r.set(new A(o),!0)}),Ue(n,new Rt(s.path,r,t))}else return[]}function $t(n,e,t){return Ue(n,new Ie(Wn(),e,t))}function Hc(n,e,t){const s=D.fromObject(t);return Ue(n,new Le(Wn(),e,s))}function $c(n,e){return Ue(n,new ot(Wn(),e))}function Vc(n,e,t){const s=qn(n,t);if(s){const i=jn(s),r=i.path,o=i.queryId,a=q(r,e),l=new ot(Un(o),a);return Yn(n,r,l)}else return[]}function Cn(n,e,t,s,i=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||hr(o,e))){const l=Mc(o,e,t,s);xc(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const d=c.findIndex(_=>_._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(_,v)=>pe(v));if(d&&!u){const _=n.syncPointTree_.subtree(r);if(!_.isEmpty()){const v=qc(_);for(let C=0;C<v.length;++C){const I=v[C],B=I.query,ae=_r(n,I);n.listenProvider_.startListening(Xe(B),Ot(n,B),ae.hashFn,ae.onComplete)}}}!u&&c.length>0&&!s&&(d?n.listenProvider_.stopListening(Xe(e),null):c.forEach(_=>{const v=n.queryToTagMap.get(Vt(_));n.listenProvider_.stopListening(Xe(_),v)}))}jc(n,c)}return a}function Gc(n,e,t,s){const i=qn(n,s);if(i!=null){const r=jn(i),o=r.path,a=r.queryId,l=q(o,e),c=new Ie(Un(a),l,t);return Yn(n,o,c)}else return[]}function zc(n,e,t,s){const i=qn(n,s);if(i){const r=jn(i),o=r.path,a=r.queryId,l=q(o,e),c=D.fromObject(t),d=new Le(Un(a),l,c);return Yn(n,o,d)}else return[]}function Xs(n,e,t,s=!1){const i=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(i,(_,v)=>{const C=q(_,i);r=r||xe(v,C),o=o||pe(v)});let a=n.syncPointTree_.get(i);a?(o=o||pe(a),r=r||xe(a,N())):(a=new Ac,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=E.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((v,C)=>{const I=xe(C,N());I&&(r=r.updateImmediateChild(v,I))}));const c=hr(a,e);if(!c&&!e._queryParams.loadsAllData()){const _=Vt(e);g(!n.queryToTagMap.has(_),"View does not exist, but we have a tag");const v=Yc();n.queryToTagMap.set(_,v),n.tagToQueryMap.set(v,_)}const d=Hn(n.pendingWriteTree_,i);let u=Oc(a,e,t,d,r,l);if(!c&&!o&&!s){const _=cr(a,e);u=u.concat(Kc(n,e,_))}return u}function ur(n,e,t){const i=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=q(o,e),c=xe(a,l);if(c)return c});return nr(i,e,r,t,!0)}function Ue(n,e){return dr(e,n.syncPointTree_,null,Hn(n.pendingWriteTree_,N()))}function dr(n,e,t,s){if(S(n.path))return fr(n,e,t,s);{const i=e.get(N());t==null&&i!=null&&(t=xe(i,N()));let r=[];const o=b(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,d=sr(s,o);r=r.concat(dr(a,l,c,d))}return i&&(r=r.concat(zn(i,n,s,t))),r}}function fr(n,e,t,s){const i=e.get(N());t==null&&i!=null&&(t=xe(i,N()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=sr(s,o),d=n.operationForChild(o);d&&(r=r.concat(fr(d,a,l,c)))}),i&&(r=r.concat(zn(i,n,s,t))),r}function _r(n,e){const t=e.query,s=Ot(n,t);return{hashFn:()=>(bc(e)||E.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?Vc(n,t._path,s):$c(n,t._path);{const r=Ua(i,t);return Cn(n,t,null,r)}}}}function Ot(n,e){const t=Vt(e);return n.queryToTagMap.get(t)}function Vt(n){return n._path.toString()+"$"+n._queryIdentifier}function qn(n,e){return n.tagToQueryMap.get(e)}function jn(n){const e=n.indexOf("$");return g(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new A(n.substr(0,e))}}function Yn(n,e,t){const s=n.syncPointTree_.get(e);g(s,"Missing sync point for query tag that we're tracking");const i=Hn(n.pendingWriteTree_,e);return zn(s,t,i,null)}function qc(n){return n.fold((e,t,s)=>{if(t&&pe(t))return[Ht(t)];{let i=[];return t&&(i=lr(t)),G(s,(r,o)=>{i=i.concat(o)}),i}})}function Xe(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Fc())(n._repo,n._path):n}function jc(n,e){for(let t=0;t<e.length;++t){const s=e[t];if(!s._queryParams.loadsAllData()){const i=Vt(s),r=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(r)}}}function Yc(){return Bc++}function Kc(n,e,t){const s=e._path,i=Ot(n,e),r=_r(n,t),o=n.listenProvider_.startListening(Xe(e),i,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(s);if(i)g(!pe(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!S(c)&&d&&pe(d))return[Ht(d).query];{let _=[];return d&&(_=_.concat(lr(d).map(v=>v.query))),G(u,(v,C)=>{_=_.concat(C)}),_}});for(let c=0;c<l.length;++c){const d=l[c];n.listenProvider_.stopListening(Xe(d),Ot(n,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Kn(t)}node(){return this.node_}}class Qn{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=L(this.path_,e);return new Qn(this.syncTree_,t)}node(){return ur(this.syncTree_,this.path_)}}const Qc=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Js=function(n,e,t){if(!n||typeof n!="object")return n;if(g(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Xc(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Jc(n[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Xc=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:g(!1,"Unexpected server value: "+n)}},Jc=function(n,e,t){n.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const s=n.increment;typeof s!="number"&&g(!1,"Unexpected increment value: "+s);const i=e.node();if(g(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},pr=function(n,e,t,s){return Xn(e,new Qn(t,n),s)},Zc=function(n,e,t){return Xn(n,new Kn(e),t)};function Xn(n,e,t){const s=n.getPriority().val(),i=Js(s,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Js(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new W(a,V(i)):n}else{const o=n;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new W(i))),o.forEachChild(F,(a,l)=>{const c=Xn(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(e="",t=null,s={children:{},childCount:0}){this.name=e,this.parent=t,this.node=s}}function Zn(n,e){let t=e instanceof A?e:new A(e),s=n,i=b(t);for(;i!==null;){const r=Pe(s.node.children,i)||{children:{},childCount:0};s=new Jn(i,s,r),t=x(t),i=b(t)}return s}function He(n){return n.node.value}function mr(n,e){n.node.value=e,En(n)}function gr(n){return n.node.childCount>0}function eh(n){return He(n)===void 0&&!gr(n)}function Gt(n,e){G(n.node.children,(t,s)=>{e(new Jn(t,n,s))})}function yr(n,e,t,s){t&&e(n),Gt(n,i=>{yr(i,e,!0)})}function th(n,e,t){let s=n.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function dt(n){return new A(n.parent===null?n.name:dt(n.parent)+"/"+n.name)}function En(n){n.parent!==null&&nh(n.parent,n.name,n)}function nh(n,e,t){const s=eh(t),i=te(n.node.children,e);s&&i?(delete n.node.children[e],n.node.childCount--,En(n)):!s&&!i&&(n.node.children[e]=t.node,n.node.childCount++,En(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sh=/[\[\].#$\/\u0000-\u001F\u007F]/,ih=/[\[\].#$\u0000-\u001F\u007F]/,tn=10*1024*1024,es=function(n){return typeof n=="string"&&n.length!==0&&!sh.test(n)},vr=function(n){return typeof n=="string"&&n.length!==0&&!ih.test(n)},rh=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),vr(n)},oh=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!Nn(n)||n&&typeof n=="object"&&te(n,".sv")},ts=function(n,e,t){const s=t instanceof A?new Cl(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+ye(s));if(typeof e=="function")throw new Error(n+"contains a function "+ye(s)+" with contents = "+e.toString());if(Nn(e))throw new Error(n+"contains "+e.toString()+" "+ye(s));if(typeof e=="string"&&e.length>tn/3&&Ft(e)>tn)throw new Error(n+"contains a string greater than "+tn+" utf8 bytes "+ye(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(G(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!es(o)))throw new Error(n+" contains an invalid key ("+o+") "+ye(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);El(s,o),ts(n,a,s),Il(s)}),i&&r)throw new Error(n+' contains ".value" child '+ye(s)+" in addition to actual children.")}},ah=function(n,e){let t,s;for(t=0;t<e.length;t++){s=e[t];const r=nt(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!es(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(vl);let i=null;for(t=0;t<e.length;t++){if(s=e[t],i!==null&&K(i,s))throw new Error(n+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},lh=function(n,e,t,s){const i=bn(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];G(e,(o,a)=>{const l=new A(o);if(ts(i,a,L(t,l)),xn(l)===".priority"&&!oh(a))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),ah(i,r)},Cr=function(n,e,t,s){if(!vr(t))throw new Error(bn(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},ch=function(n,e,t,s){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Cr(n,e,t)},hh=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!es(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!rh(t))throw new Error(bn(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function ns(n,e){let t=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();t!==null&&!Pn(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&n.eventLists_.push(t)}function Er(n,e,t){ns(n,t),Ir(n,s=>Pn(s,e))}function oe(n,e,t){ns(n,t),Ir(n,s=>K(s,e)||K(e,s))}function Ir(n,e){n.recursionDepth_++;let t=!0;for(let s=0;s<n.eventLists_.length;s++){const i=n.eventLists_[s];if(i){const r=i.path;e(r)?(dh(n.eventLists_[s]),n.eventLists_[s]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function dh(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const s=t.getEventRunner();je&&$("event: "+t.toString()),We(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fh="repo_interrupt",_h=25;class ph{constructor(e,t,s,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new uh,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Nt(),this.transactionQueueTree_=new Jn,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function mh(n,e,t){if(n.stats_=Dn(n.repoInfo_),n.forceRestClient_||Ga())n.server_=new St(n.repoInfo_,(s,i,r,o)=>{Zs(n,s,i,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>ei(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{H(t)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}n.persistentConnection_=new se(n.repoInfo_,e,(s,i,r,o)=>{Zs(n,s,i,r,o)},s=>{ei(n,s)},s=>{yh(n,s)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(s=>{n.server_.refreshAuthToken(s)}),n.appCheckProvider_.addTokenChangeListener(s=>{n.server_.refreshAppCheckToken(s.token)}),n.statsReporter_=Ka(n.repoInfo_,()=>new Yl(n.stats_,n.server_)),n.infoData_=new Vl,n.infoSyncTree_=new Qs({startListening:(s,i,r,o)=>{let a=[];const l=n.infoData_.getNode(s._path);return l.isEmpty()||(a=$t(n.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),is(n,"connected",!1),n.serverSyncTree_=new Qs({startListening:(s,i,r,o)=>(n.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);oe(n.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{n.server_.unlisten(s,i)}})}function gh(n){const t=n.infoData_.getNode(new A(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function ss(n){return Qc({timestamp:gh(n)})}function Zs(n,e,t,s,i){n.dataUpdateCount++;const r=new A(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(s){const l=vt(t,c=>V(c));o=zc(n.serverSyncTree_,r,l,i)}else{const l=V(t);o=Gc(n.serverSyncTree_,r,l,i)}else if(s){const l=vt(t,c=>V(c));o=Hc(n.serverSyncTree_,r,l)}else{const l=V(t);o=$t(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=at(n,r)),oe(n.eventQueue_,a,o)}function ei(n,e){is(n,"connected",e),e===!1&&Ch(n)}function yh(n,e){G(e,(t,s)=>{is(n,t,s)})}function is(n,e,t){const s=new A("/.info/"+e),i=V(t);n.infoData_.updateSnapshot(s,i);const r=$t(n.infoSyncTree_,s,i);oe(n.eventQueue_,s,r)}function wr(n){return n.nextWriteId_++}function vh(n,e,t,s){rs(n,"update",{path:e.toString(),value:t});let i=!0;const r=ss(n),o={};if(G(t,(a,l)=>{i=!1,o[a]=pr(L(e,a),V(l),n.serverSyncTree_,r)}),i)$("update() called with empty data.  Don't do anything."),ni(n,s,"ok",void 0);else{const a=wr(n),l=Uc(n.serverSyncTree_,e,o,a);ns(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,d)=>{const u=c==="ok";u||Y("update at "+e+" failed: "+c);const _=Ce(n.serverSyncTree_,a,!u),v=_.length>0?at(n,e):e;oe(n.eventQueue_,v,_),ni(n,s,c,d)}),G(t,c=>{const d=Rr(n,L(e,c));at(n,d)}),oe(n.eventQueue_,e,[])}}function Ch(n){rs(n,"onDisconnectEvents");const e=ss(n),t=Nt();fn(n.onDisconnect_,N(),(i,r)=>{const o=pr(i,r,n.serverSyncTree_,e);Ji(t,i,o)});let s=[];fn(t,N(),(i,r)=>{s=s.concat($t(n.serverSyncTree_,i,r));const o=Rr(n,i);at(n,o)}),n.onDisconnect_=Nt(),oe(n.eventQueue_,N(),s)}function Eh(n,e,t){let s;b(e._path)===".info"?s=Xs(n.infoSyncTree_,e,t):s=Xs(n.serverSyncTree_,e,t),Er(n.eventQueue_,e._path,s)}function ti(n,e,t){let s;b(e._path)===".info"?s=Cn(n.infoSyncTree_,e,t):s=Cn(n.serverSyncTree_,e,t),Er(n.eventQueue_,e._path,s)}function Ih(n){n.persistentConnection_&&n.persistentConnection_.interrupt(fh)}function rs(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),$(t,...e)}function ni(n,e,t,s){e&&We(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function Tr(n,e,t){return ur(n.serverSyncTree_,e,t)||E.EMPTY_NODE}function os(n,e=n.transactionQueueTree_){if(e||zt(n,e),He(e)){const t=Sr(n,e);g(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&wh(n,dt(e),t)}else gr(e)&&Gt(e,t=>{os(n,t)})}function wh(n,e,t){const s=t.map(c=>c.currentWriteId),i=Tr(n,e,s);let r=i;const o=i.hash();for(let c=0;c<t.length;c++){const d=t[c];g(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=q(e,d.path);r=r.updateChild(u,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{rs(n,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let _=0;_<t.length;_++)t[_].status=2,d=d.concat(Ce(n.serverSyncTree_,t[_].currentWriteId)),t[_].onComplete&&u.push(()=>t[_].onComplete(null,!0,t[_].currentOutputSnapshotResolved)),t[_].unwatcher();zt(n,Zn(n.transactionQueueTree_,e)),os(n,n.transactionQueueTree_),oe(n.eventQueue_,e,d);for(let _=0;_<u.length;_++)We(u[_])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{Y("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}at(n,e)}},o)}function at(n,e){const t=br(n,e),s=dt(t),i=Sr(n,t);return Th(n,i,s),s}function Th(n,e,t){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=q(t,l.path);let d=!1,u;if(g(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,i=i.concat(Ce(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=_h)d=!0,u="maxretry",i=i.concat(Ce(n.serverSyncTree_,l.currentWriteId,!0));else{const _=Tr(n,l.path,o);l.currentInputSnapshot=_;const v=e[a].update(_.val());if(v!==void 0){ts("transaction failed: Data returned ",v,l.path);let C=V(v);typeof v=="object"&&v!=null&&te(v,".priority")||(C=C.updatePriority(_.getPriority()));const B=l.currentWriteId,ae=ss(n),le=Zc(C,_,ae);l.currentOutputSnapshotRaw=C,l.currentOutputSnapshotResolved=le,l.currentWriteId=wr(n),o.splice(o.indexOf(B),1),i=i.concat(Wc(n.serverSyncTree_,l.path,le,l.currentWriteId,l.applyLocally)),i=i.concat(Ce(n.serverSyncTree_,B,!0))}else d=!0,u="nodata",i=i.concat(Ce(n.serverSyncTree_,l.currentWriteId,!0))}oe(n.eventQueue_,t,i),i=[],d&&(e[a].status=2,function(_){setTimeout(_,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(u),!1,null))))}zt(n,n.transactionQueueTree_);for(let a=0;a<s.length;a++)We(s[a]);os(n,n.transactionQueueTree_)}function br(n,e){let t,s=n.transactionQueueTree_;for(t=b(e);t!==null&&He(s)===void 0;)s=Zn(s,t),e=x(e),t=b(e);return s}function Sr(n,e){const t=[];return Nr(n,e,t),t.sort((s,i)=>s.order-i.order),t}function Nr(n,e,t){const s=He(e);if(s)for(let i=0;i<s.length;i++)t.push(s[i]);Gt(e,i=>{Nr(n,i,t)})}function zt(n,e){const t=He(e);if(t){let s=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[s]=t[i],s++);t.length=s,mr(e,t.length>0?t:void 0)}Gt(e,s=>{zt(n,s)})}function Rr(n,e){const t=dt(br(n,e)),s=Zn(n.transactionQueueTree_,e);return th(s,i=>{nn(n,i)}),nn(n,s),yr(s,i=>{nn(n,i)}),t}function nn(n,e){const t=He(e);if(t){const s=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(g(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(g(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(Ce(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&s.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?mr(e,void 0):t.length=r+1,oe(n.eventQueue_,dt(e),i);for(let o=0;o<s.length;o++)We(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bh(n){let e="";const t=n.split("/");for(let s=0;s<t.length;s++)if(t[s].length>0){let i=t[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function Sh(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const s=t.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):Y(`Invalid query segment '${t}' in query '${n}'`)}return e}const si=function(n,e){const t=Nh(n),s=t.namespace;t.domain==="firebase.com"&&re(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&t.domain!=="localhost"&&re("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Ma();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Mi(t.host,t.secure,s,i,e,"",s!==t.subdomain),path:new A(t.pathString)}},Nh=function(n){let e="",t="",s="",i="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let d=n.indexOf("/");d===-1&&(d=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(d,u)),d<u&&(i=bh(n.substring(d,u)));const _=Sh(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const v=e.slice(0,c);if(v.toLowerCase()==="localhost")t="localhost";else if(v.split(".").length<=2)t=v;else{const C=e.indexOf(".");s=e.substring(0,C).toLowerCase(),t=e.substring(C+1),r=s}"ns"in _&&(r=_.ns)}return{host:e,port:l,domain:t,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rh{constructor(e,t,s,i){this.eventType=e,this.eventRegistration=t,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+H(this.snapshot.exportVal())}}class Ah{constructor(e,t,s){this.eventRegistration=e,this.error=t,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{constructor(e,t,s,i){this._repo=e,this._path=t,this._queryParams=s,this._orderByCalled=i}get key(){return S(this._path)?null:xn(this._path)}get ref(){return new me(this._repo,this._path)}get _queryIdentifier(){const e=Us(this._queryParams),t=Rn(e);return t==="{}"?"default":t}get _queryObject(){return Us(this._queryParams)}isEqual(e){if(e=Bt(e),!(e instanceof as))return!1;const t=this._repo===e._repo,s=Pn(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+yl(this._path)}}class me extends as{constructor(e,t){super(e,t,new Fn,!1)}get parent(){const e=Gi(this._path);return e===null?null:new me(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Mt{constructor(e,t,s){this._node=e,this.ref=t,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new A(e),s=In(this.ref,e);return new Mt(this._node.getChild(t),s,F)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new Mt(i,In(this.ref,s),F)))}hasChild(e){const t=new A(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function pt(n,e){return n=Bt(n),n._checkNotDeleted("ref"),e!==void 0?In(n._root,e):n._root}function In(n,e){return n=Bt(n),b(n._path)===null?ch("child","path",e):Cr("child","path",e),new me(n._repo,L(n._path,e))}function ii(n,e){lh("update",e,n._path);const t=new Lt;return vh(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}class ls{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const s=t._queryParams.getIndex();return new Rh("value",this,new Mt(e.snapshotNode,new me(t._repo,t._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Ah(this,e,t):null}matches(e){return e instanceof ls?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function kh(n,e,t,s,i){let r;if(typeof s=="object"&&(r=void 0,i=s),typeof s=="function"&&(r=s),i&&i.onlyOnce){const l=t,c=(d,u)=>{ti(n._repo,n,a),l(d,u)};c.userCallback=t.userCallback,c.context=t.context,t=c}const o=new Dh(t,r||void 0),a=new ls(o);return Eh(n._repo,n,a),()=>ti(n._repo,n,a)}function ri(n,e,t,s){return kh(n,"value",e,t,s)}Dc(me);Lc(me);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xh="FIREBASE_DATABASE_EMULATOR_HOST",wn={};let Ph=!1;function Oh(n,e,t,s){n.repoInfo_=new Mi(e,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),s&&(n.authTokenProvider_=s)}function Mh(n,e,t,s,i){let r=s||n.options.databaseURL;r===void 0&&(n.options.projectId||re("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),$("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=si(r,i),a=o.repoInfo,l;typeof process<"u"&&Is&&(l=Is[xh]),l?(r=`http://${l}?ns=${a.namespace}`,o=si(r,i),a=o.repoInfo):o.repoInfo.secure;const c=new qa(n.name,n.options,e);hh("Invalid Firebase Database URL",o),S(o.path)||re("Database URL must point to the root of a Firebase Database (not including a child path).");const d=Fh(a,n,c,new za(n,t));return new Bh(d,n)}function Lh(n,e){const t=wn[e];(!t||t[n.key]!==n)&&re(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Ih(n),delete t[n.key]}function Fh(n,e,t,s){let i=wn[e.name];i||(i={},wn[e.name]=i);let r=i[n.toURLString()];return r&&re("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new ph(n,Ph,t,s),i[n.toURLString()]=r,r}class Bh{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(mh(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new me(this._repo,N())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Lh(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&re("Cannot call "+e+" on a deleted database.")}}function Wh(n=ma(),e){const t=ua(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const s=Zr("database");s&&Uh(t,...s)}return t}function Uh(n,e,t,s={}){n=Bt(n),n._checkNotDeleted("useEmulator");const i=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(i===n._repoInternal.repoInfo_.host&&Ct(s,r.repoInfo_.emulatorOptions))return;re("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&re('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new gt(gt.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:eo(s.mockUserToken,n.app.options.projectId);o=new gt(a)}Oh(r,i,s,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hh(n){Aa(pa),It(new Ze("database",(e,{instanceIdentifier:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Mh(s,i,r,t)},"PUBLIC").setMultipleInstances(!0)),Ae(ws,Ts,n),Ae(ws,Ts,"esm2017")}se.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};se.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Hh();const $h={apiKey:"AIzaSyCp8_-QPKaR6Q6ECK9np3OPqW6dO967wpk",authDomain:"reserve-a3e41.firebaseapp.com",databaseURL:"https://reserve-a3e41-default-rtdb.firebaseio.com",projectId:"reserve-a3e41",storageBucket:"reserve-a3e41.firebasestorage.app",messagingSenderId:"25864343238",appId:"1:25864343238:web:7d31cb753ae557b49391c7",measurementId:"G-EX5CQE079X"},Vh=yi($h),mt=Wh(Vh);document.addEventListener("DOMContentLoaded",function(){function n(p,h){const f=document.getElementById("syncStatus");f.textContent=h,f.className="sync-status "+p,f.style.display="block",p!=="syncing"&&setTimeout(()=>{f.style.opacity="0",setTimeout(()=>{f.style.display="none",f.style.opacity="1"},300)},3e3)}const e=[1,2,4,5,6,7,8,10];let t={},s=[],i=[],r=1,o=1,a="先生",l="先生",c=!1,d=!1;function u(){const p=pt(mt,".info/connected");ri(p,f=>{f.val()===!0?(console.log("已連接到 Firebase"),n("synced","已連接到伺服器"),c&&B()):(console.log("未連接到 Firebase"),n("sync-error","伺服器連接斷開"))});function h(f,m,y){let w=0;const P=5;function R(){const M=pt(mt,f);ri(M,m,O=>{if(console.error(`${f} 監聽錯誤:`,O),y&&y(O),w<P){w++;const Q=Math.min(1e3*Math.pow(2,w),3e4);console.log(`嘗試重新監聽 ${f}，${w}/${P}，等待 ${Q}ms`),setTimeout(()=>{R()},Q)}else n("sync-error",`監聽 ${f} 失敗，請重新整理頁面`)})}R()}h("tableStatus",f=>{if(!d){const m=f.val();m&&(t={},Object.keys(m).forEach(y=>{t[y]=v(m[y])}),z(),n("synced","已同步桌位狀態"))}},f=>{n("sync-error","同步錯誤：桌位狀態")}),h("reservedList",f=>{if(!d){const m=f.val();m&&(s=[],Object.values(m).forEach(y=>{s.push(y)}),s.length>0&&(r=Math.max(...s.map(y=>y.id))+1),ce(),n("synced","已同步訂位清單"))}},f=>{n("sync-error","同步錯誤：訂位清單")}),h("waitingList",f=>{if(!d){const m=f.val();m&&(i=[],Object.values(m).forEach(y=>{i.push(y)}),i.length>0&&(o=Math.max(...i.map(y=>y.id))+1),he(),n("synced","已同步候位清單"))}},f=>{n("sync-error","同步錯誤：候位清單")}),h("counters",f=>{if(!d){const m=f.val();m&&(m.reservation&&m.reservation>r&&(r=m.reservation),m.waiting&&m.waiting>o&&(o=m.waiting),n("synced","已同步計數器"))}},f=>{n("sync-error","同步錯誤：計數器")})}function _(p){if(!p)return p;const h={};return Object.keys(p).forEach(f=>{p[f]instanceof Date?h[f]={__isDate:!0,timestamp:p[f].getTime()}:typeof p[f]=="object"&&p[f]!==null?h[f]=_(p[f]):h[f]=p[f]}),h}function v(p){if(!p)return p;const h={};return Object.keys(p).forEach(f=>{p[f]&&p[f].__isDate&&p[f].timestamp?h[f]=new Date(p[f].timestamp):typeof p[f]=="object"&&p[f]!==null?h[f]=v(p[f]):h[f]=p[f]}),h}let C=null;function I(){c=!0,C&&clearTimeout(C),ae(),C=setTimeout(()=>{B()},500)}function B(){if(!d){d=!0,n("syncing","資料同步中...");try{const p={};Object.keys(t).forEach(f=>{p[f]=_(t[f])});const h={};h.tableStatus=p,h.reservedList=s.reduce((f,m,y)=>(f[y]=m,f),{}),h.waitingList=i.reduce((f,m,y)=>(f[y]=m,f),{}),h.counters={reservation:r,waiting:o},ii(pt(mt),h).then(()=>{d=!1,c=!1,n("synced","資料已同步"),console.log("同步成功，時間：",new Date().toLocaleTimeString())}).catch(f=>{console.error("Firebase同步錯誤:",f),d=!1,n("sync-error","同步失敗："+f.message),setTimeout(()=>{c&&(console.log("嘗試重新同步..."),B())},3e3)})}catch(p){console.error("同步數據處理錯誤:",p),d=!1,n("sync-error","處理數據錯誤："+p.message)}}}function ae(){try{localStorage.setItem("tableStatus",JSON.stringify(t)),localStorage.setItem("reservedList",JSON.stringify(s)),localStorage.setItem("waitingList",JSON.stringify(i)),localStorage.setItem("reservationCounter",r),localStorage.setItem("waitingCounter",o),localStorage.setItem("backupTime",new Date().toISOString()),console.log("已備份到本地儲存")}catch(p){console.error("備份到本地儲存失敗:",p)}}function le(){n("syncing","正在清除預約資料...");try{const p={};Object.keys(t).forEach(f=>{p[f]={status:"empty",name:"",phone:"",people:0,time:null,notes:""}});const h={};return h.tableStatus=p,h.reservedList={},h.waitingList={},h.counters={reservation:1,waiting:1},ii(pt(mt),h).then(()=>(console.log("預約資料已重置，時間：",new Date().toLocaleTimeString()),n("synced","預約資料已重置"),t=p,s=[],i=[],r=1,o=1,z(),ce(),he(),localStorage.setItem("lastResetDate",new Date().toDateString()),!0)).catch(f=>(console.error("重置錯誤:",f),n("sync-error","重置失敗："+f.message),!1))}catch(p){return console.error("重置數據處理錯誤:",p),n("sync-error","處理數據錯誤："+p.message),!1}}function $e(){function p(){const m=new Date,y=new Date(m);y.setDate(y.getDate()+1),y.setHours(0,0,0,0);const w=y-m;console.log(`下次預約重置將在 ${new Date(y).toLocaleString()} 執行，剩餘 ${Math.floor(w/6e4)} 分鐘`),setTimeout(()=>{console.log("執行每日預約重置..."),le().then(()=>{p()})},w)}p();const h=localStorage.getItem("lastResetDate"),f=new Date().toDateString();if(h!==f){const m=new Date,y=new Date(m);y.setHours(0,0,0,0),m.getTime()-y.getTime()<60*60*1e3&&(console.log("頁面載入檢測到今日尚未重置預約，執行重置..."),le())}}window.addEventListener("load",function(){$e();const p=document.getElementById("manualResetBtn");p&&p.addEventListener("click",function(){confirm("確定要清除所有預約資料嗎？此操作無法復原！")&&le()})}),window.openTab=function(p){const h=document.getElementsByClassName("tab-content");for(let y=0;y<h.length;y++)h[y].classList.remove("active");const f=document.getElementsByClassName("tab-button");for(let y=0;y<f.length;y++)f[y].classList.remove("active");document.getElementById(p).classList.add("active");const m=document.getElementsByClassName("tab-button");for(let y=0;y<m.length;y++)m[y].getAttribute("onclick").includes(p)&&m[y].classList.add("active")};function z(){const p=document.getElementById("tables");p.innerHTML="",e.forEach(h=>{var w,P,R,M;const f=((w=t[h])==null?void 0:w.status)||"empty",m=document.createElement("div");if(m.className=`table ${f}`,(P=t[h])!=null&&P.reservationId){const O=document.createElement("div");O.className="reservation-id",O.textContent=`訂${t[h].reservationId}`,m.appendChild(O)}if((R=t[h])!=null&&R.secondaryReservationId){const O=document.createElement("div");O.className="reservation-id-secondary",O.textContent=`訂${t[h].secondaryReservationId}`,m.appendChild(O)}const y=document.createElement("div");if(y.textContent=`A${h}`,m.appendChild(y),f==="occupied"&&t[h].startTime){const O=t[h].startTime,Q=new Date(O.getTime()+90*6e4),ee=document.createElement("div");ee.className="time-info",ee.innerHTML=`<div style="color: #005435;">${cs(O)} 入座<br>
                <div style="color: #FFFFFF;">${cs(Q)} 結束`,m.appendChild(ee)}if(f==="reserved"&&((M=t[h])!=null&&M.reservedTime)){const O=document.createElement("div");O.className="time-info";const Q=t[h].reservedTime,ee=kr(Q),$r=xr(Q);O.innerHTML=`<div class="before-time">${ee} 前可接</div>
                <div>${Q}</div>
                <div class="after-time">${$r} 後可接</div>`,m.appendChild(O)}if(m.onclick=()=>Dr(h),f==="occupied"){let O;const Q=()=>{O=setTimeout(()=>{Ar(h)},500)},ee=()=>{clearTimeout(O)};m.addEventListener("touchstart",Q),m.addEventListener("touchend",ee),m.addEventListener("touchmove",ee),m.addEventListener("mousedown",Q),m.addEventListener("mouseup",ee),m.addEventListener("mouseleave",ee)}p.appendChild(m)})}function Ar(p){const h=document.createElement("div");h.style.position="fixed",h.style.top="0",h.style.left="0",h.style.width="100%",h.style.height="100%",h.style.backgroundColor="rgba(0, 0, 0, 0.5)",h.style.display="flex",h.style.justifyContent="center",h.style.alignItems="center",h.style.zIndex="1000";const f=document.createElement("div");f.style.backgroundColor="#fff",f.style.padding="20px",f.style.borderRadius="10px",f.style.boxShadow="0 0 10px rgba(0, 0, 0, 0.1)",f.style.width="90%",f.style.maxWidth="280px";const m=document.createElement("input");m.type="text",m.inputMode="numeric",m.placeholder="輸入 4 位數字（11:30=1130）",m.style.width="100%",m.style.padding="10px",m.style.fontSize="16px",m.style.marginBottom="10px",m.style.boxSizing="border-box",m.style.setProperty("--placeholder-color","#999999"),m.style.setProperty("--placeholder-opacity","1"),m.addEventListener("input",()=>{m.style.setProperty("--placeholder-color",m.value?"transparent":"#999999")});const y=document.createElement("style");y.textContent=`
    input::placeholder {
        color: var(--placeholder-color, #999999);
        opacity: var(--placeholder-opacity, 1);
    }
`,document.head.appendChild(y);const w=document.createElement("button");w.textContent="確認",w.style.padding="10px 20px",w.style.fontSize="16px",w.style.backgroundColor="#000000",w.style.color="#fff",w.style.border="none",w.style.borderRadius="5px",w.style.cursor="pointer",w.onclick=()=>{const P=m.value;if(P&&/^\d{4}$/.test(P)){const R=parseInt(P.slice(0,2),10),M=parseInt(P.slice(2,4),10);if(R>=0&&R<24&&M>=0&&M<60){const O=new Date;O.setHours(R,M,0,0),t[p].startTime=O,z()}else alert("輸入時間無效！請輸入有效的 4 位數字（例如 0930 表示 09:30）。")}else alert("輸入格式錯誤！請輸入 4 位數字（例如 0930 表示 09:30）。");document.body.removeChild(h)},h.onclick=P=>{P.target===h&&document.body.removeChild(h)},f.appendChild(m),f.appendChild(w),h.appendChild(f),document.body.appendChild(h)}function Dr(p){const h=t[p];if(!h||h.status==="empty"){t[p]={status:"occupied",startTime:new Date},I(),z();return}if(!((h==null?void 0:h.status)==="reserved"&&!(h!=null&&h.secondaryReservationId))){if((h==null?void 0:h.status)==="reserved"&&(h!=null&&h.secondaryReservationId)){const f=h.reservationId,m=h.reservedTime;t[p].reservationId=h.secondaryReservationId,t[p].reservedTime=h.secondaryReservedTime,t[p].secondaryReservationId=f,t[p].secondaryReservedTime=m,I(),z();return}if((h==null?void 0:h.status)==="occupied"&&(h!=null&&h.secondaryReservationId)){t[p]={status:"finished",secondaryReservationId:h.secondaryReservationId,secondaryReservedTime:h.secondaryReservedTime},I(),z();return}if((h==null?void 0:h.status)==="finished"&&(h!=null&&h.secondaryReservationId)){t[p]={status:"reserved",reservationId:h.secondaryReservationId,reservedTime:h.secondaryReservedTime,secondaryReservationId:null,secondaryReservedTime:null},I(),z();return}h.status==="occupied"?t[p]={status:"finished"}:h.status==="finished"&&(t[p]={status:"empty"}),I(),z(),ce(),he()}}function cs(p){return p.toLocaleTimeString("zh-TW",{hour:"2-digit",minute:"2-digit",hour12:!1})}function kr(p){const[h,f]=p.split(":").map(Number),m=new Date;return m.setHours(h),m.setMinutes(f-90),`${String(m.getHours()).padStart(2,"0")}:${String(m.getMinutes()).padStart(2,"0")}`}function xr(p){const[h,f]=p.split(":").map(Number),m=new Date;return m.setHours(h),m.setMinutes(f+90),`${String(m.getHours()).padStart(2,"0")}:${String(m.getMinutes()).padStart(2,"0")}`}function hs(p,h){const[f,m]=p.split(":").map(Number),[y,w]=h.split(":").map(Number),P=f*60+m,R=y*60+w;return Math.abs(P-R)>=90}window.selectTitleReserved=function(p){a=p,document.getElementById("mrButtonReserved").classList.toggle("active",p==="先生"),document.getElementById("msButtonReserved").classList.toggle("active",p==="小姐")},window.selectTitleWaiting=function(p){l=p,document.getElementById("mrButtonWaiting").classList.toggle("active",p==="先生"),document.getElementById("msButtonWaiting").classList.toggle("active",p==="小姐")},window.addToReservedList=function(){const p=document.getElementById("reservedCount").value,h=document.getElementById("reservedName").value,f=document.getElementById("reservedPhone").value,m=document.getElementById("reservedTime").value;if(!p||!h||!f||!m)return;const y={id:r++,count:p,name:h,title:a,phone:f,reservedTime:m,assignedTable:null};s.push(y),I(),Ur(),ce()},window.addToWaitingList=function(){const p=document.getElementById("waitingCount").value,h=document.getElementById("waitingName").value,f=document.getElementById("waitingPhone").value;if(!p||!h||!f)return;const m={id:o++,count:p,name:h,title:l,phone:f,assignedTable:null};i.push(m),I(),Hr(),he()};function ce(){const p=document.getElementById("reservedList");p.innerHTML="",s.forEach((h,f)=>{const m=document.createElement("div");m.className="waitlist-container";const y=document.createElement("li");y.className="waitlist-item",y.innerHTML=`
    <span class="guest-info">
        <span class="guest-id-corner">訂${h.id}</span>
        <span class="guest-details">${h.count}位 - ${h.name} ${h.title}  - ${h.phone} - 訂位時間 ${h.reservedTime}</span>
    </span>
`;const w=document.createElement("div");if(w.className="button-container",!h.assignedTable)e.forEach(R=>{const M=document.createElement("button");M.className="table-button",M.textContent=`A${R}`,Pr(R,h.reservedTime)?(M.disabled=!0,M.style.backgroundColor="#cccccc",M.style.cursor="not-allowed",M.title="此桌已有時間相近的預訂"):M.onclick=()=>Or(h.id,R,h.reservedTime,f),w.appendChild(M)});else{const R=document.createElement("button");R.className="confirm-button",R.textContent=`確認入座 A${h.assignedTable}`,R.onclick=()=>Mr(h.assignedTable,f),w.appendChild(R)}const P=document.createElement("button");P.className="cancel-button",P.textContent="取消訂位",P.onclick=()=>Fr(f),w.appendChild(P),y.appendChild(w),m.appendChild(y),p.appendChild(m)})}function he(){const p=document.getElementById("waitingList");p.innerHTML="",i.forEach((h,f)=>{const m=document.createElement("div");m.className="waitlist-container";const y=document.createElement("li");y.className="waitlist-item",y.innerHTML=`
    <span class="guest-info waiting-guest-info">
        <span class="guest-id-corner">候${h.id}</span>
        <span class="guest-details">
            ${h.count}位 - ${h.name} ${h.title} - ${h.phone}-
            ${h.assignedTable?`<span class="assigned-table">A${h.assignedTable}</span>`:""}
        </span>
    </span>
`;const w=document.createElement("div");if(w.className="button-container",!h.assignedTable)e.forEach(R=>{const M=document.createElement("button");M.className="table-button",M.textContent=`A${R}`,M.onclick=()=>Br(R,f),w.appendChild(M)});else{const R=document.createElement("button");R.className="confirm-button",R.textContent=`確認入座 A${h.assignedTable}`,R.onclick=()=>Lr(h.assignedTable,f),w.appendChild(R)}const P=document.createElement("button");P.className="cancel-button",P.textContent="取消候位",P.onclick=()=>Wr(f),w.appendChild(P),y.appendChild(w),m.appendChild(y),p.appendChild(m)})}function Pr(p,h){const f=t[p];return!f||f.status!=="reserved"?!1:f.secondaryReservationId?!0:!hs(f.reservedTime,h)}function Or(p,h,f,m){const y=t[h];y&&y.status==="occupied"?t[h]={...y,secondaryReservationId:p,secondaryReservedTime:f}:!y||y.status!=="reserved"?t[h]={status:"reserved",reservationId:p,reservedTime:f}:y.secondaryReservationId||hs(y.reservedTime,f)&&(t[h].secondaryReservationId=p,t[h].secondaryReservedTime=f),s[m].assignedTable=h,I(),z(),ce()}function Mr(p,h){if(console.log("confirmSeating 被调用:",{table:p,index:h}),p==null){console.error("错误: 桌号为空"),alert("错误: 无法确认入座，桌号不存在");return}if(h===void 0||h<0||h>=s.length){console.error("错误: 无效的订位索引",h,"列表长度:",s.length),alert("错误: 无法确认入座，订位记录不存在");return}const f=s[h];if(console.log("订位信息:",f),!f){console.error("错误: 订位信息不存在"),alert("错误: 无法获取订位信息");return}if(!t[p])console.log("桌子状态不存在，创建新状态"),t[p]={status:"occupied",startTime:new Date};else{console.log("当前桌子状态:",t[p]);const m=t[p].reservationId,y=t[p].secondaryReservationId;if(console.log("比较ID:",{currentReservationId:m,secondaryReservationId:y,reservationId:f.id}),m===f.id){console.log("确认主要预订入座");const w={status:"occupied",startTime:new Date};y&&(w.secondaryReservationId=y,w.secondaryReservedTime=t[p].secondaryReservedTime),t[p]=w}else if(y===f.id){console.log("尝试确认次要预订入座 - 需要先切换"),alert("請先切換為此預訂，再確認入座");return}else console.log("预订ID与桌子不匹配，强制设置入座状态"),t[p]={status:"occupied",startTime:new Date}}try{console.log("移除预订，索引:",h),s.splice(h,1),console.log("标记数据已更改"),I(),console.log("重新渲染界面"),z(),ce(),console.log("入座操作完成")}catch(m){console.error("处理预订时发生错误:",m),alert("处理预订时发生错误: "+m.message)}}function Lr(p,h){t[p]={status:"occupied",startTime:new Date},i.splice(h,1),I(),z(),he()}function Fr(p){const h=s[p],f=h.assignedTable;if(f){const m=t[f];m.reservationId===h.id?m.secondaryReservationId?t[f]={status:"reserved",reservationId:m.secondaryReservationId,reservedTime:m.secondaryReservedTime}:delete t[f]:m.secondaryReservationId===h.id&&(delete m.secondaryReservationId,delete m.secondaryReservedTime)}s.splice(p,1),I(),z(),ce()}function Br(p,h){i[h].assignedTable=p,I(),z(),he()}function Wr(p){i.splice(p,1),I(),he()}function Ur(){document.getElementById("reservedCount").value="",document.getElementById("reservedName").value="",document.getElementById("reservedPhone").value="",document.getElementById("reservedTime").value="11:00"}function Hr(){document.getElementById("waitingCount").value="",document.getElementById("waitingName").value="",document.getElementById("waitingPhone").value=""}window.onload=function(){document.getElementById("mrButtonReserved").classList.add("active"),document.getElementById("mrButtonWaiting").classList.add("active"),u(),z(),ce(),he(),c=!1}});
