(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5c9adc6b"],{2126:function(e,a,t){"use strict";t("bf99")},bf99:function(e,a,t){},f42c:function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"bc-login"},[t("header-login"),t("div",{staticClass:"form"},["login"===e.$route.name?t("el-form",{ref:"form-login",staticClass:"form-item",attrs:{model:e.form,rules:e.rules}},[t("div",{staticClass:"text-3xl text-semibold text-center mb-2 title-form"},[e._v(e._s(e.$t("login.title-form")))]),t("el-form-item",{attrs:{prop:"email"}},[t("el-input",{attrs:{placeholder:"Email",type:"email"},model:{value:e.form.email,callback:function(a){e.$set(e.form,"email",a)},expression:"form.email"}})],1),t("el-form-item",{staticClass:"input-password",attrs:{prop:"password"}},[t("el-input",{staticClass:"input-password",attrs:{type:1==e.showPass?"text":"password",placeholder:e.$t("login.placeholder.password")},model:{value:e.form.password,callback:function(a){e.$set(e.form,"password",a)},expression:"form.password"}}),t("span",{staticClass:"icon-show-password",on:{click:function(a){e.showPass=!e.showPass}}},[t("base-icon",{attrs:{icon:1==e.showPass?"icon-eye-off":"icon-eye",size:"22"}})],1)],1),t("div",{staticClass:"be-flex jc-space-between w-100 mt-2"},[t("el-checkbox",{model:{value:e.remember,callback:function(a){e.remember=a},expression:"remember"}},[t("span",{staticClass:"text-base",staticStyle:{color:"#201f1e","font-weight":"400","margin-left":"-2px"}},[e._v(e._s(e.$t("login.remember")))])])],1),t("div",{staticClass:"captcha be-flex jc-space-center mt-2"},[t("vue-recaptcha",{ref:"recaptcha",attrs:{loadRecaptchaScript:!0,language:e.language,sitekey:e.siteKey},on:{verify:e.verifyCaptcha,expired:e.expiredCaptcha}})],1),t("el-button",{staticClass:"btn w-100 is-none-border cursor",class:e.getDisableBtn?"btn--disabled":null,attrs:{loading:e.isLoading},on:{click:e.handleLogin}},[e._v(e._s(e.$t("login.title-form"))+" ")])],1):t("verify-page",{ref:"verify",staticClass:"form-item"})],1),t("language",{attrs:{isReload:"login"===e.$route.name},on:{changeLanguage:e.handleChangeLanguage}})],1)},i=[],r=t("f3f3"),n=t("c964"),o=t("276c"),l=t("e954"),c=t("920b"),u=t("92a6"),p=(t("96cf"),t("9ab4")),f=t("e096"),m=t("d60c"),d=t("e90e"),g=t("039e"),h=t("08ba"),y=t("1b40"),b=t("4bb5"),v=Object(b["a"])("beAuth"),w=Object(h["a"])("auth"),$=function(e){Object(c["a"])(t,e);var a=Object(u["a"])(t);function t(){var e;return Object(o["a"])(this,t),e=a.apply(this,arguments),e.showPass=!1,e.language="en",e.siteKey="6LcbbKAcAAAAAGS9BixBvH4okIBVNsY7lywPDleX",e.form={email:"",password:""},e.remember=!1,e.isVerifyCaptcha=!1,e.captcha="",e.isLoading=!1,e.optionLanguage=[{id:1,lang:"en"},{id:2,lang:"vi"}],e.rules={email:[{required:!0,message:e.$t("login.wrong-email"),trigger:"blur"},{type:"email",message:e.$t("login.wrong-email-type"),trigger:"blur"}],password:[{required:!0,message:e.$t("login.wrong-password"),trigger:"blur"}]},e}return Object(l["a"])(t,[{key:"created",value:function(){this.language=window.localStorage.getItem("bc-lang")}},{key:"getDisableBtn",get:function(){return!(this.form.email&&this.form.password&&this.isVerifyCaptcha)}},{key:"verifyCaptcha",value:function(e){this.captcha=e,this.isVerifyCaptcha=!0}},{key:"expiredCaptcha",value:function(){this.isVerifyCaptcha=!1}},{key:"handleSignUp",value:function(){this.$router.push({name:"sign-up"})}},{key:"handleForgotPass",value:function(){this.$router.push({name:"forgot-password"})}},{key:"handleChangeLanguage",value:function(){var e;null===(e=this.$refs["verify"])||void 0===e||e.clearValidate()}},{key:"handleLogin",value:function(){var e,a=this;this.getDisableBtn||null===(e=this.$refs["form-login"])||void 0===e||e.validate(function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var s,i,n,o,l,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t){e.next=23;break}return e.prev=1,i="",a.isLoading=!0,n=null===(s=a.$options.filters)||void 0===s?void 0:s.encryptPassword(a.form.password),e.next=7,w.validateUser(Object(r["a"])(Object(r["a"])({},a.form),{},{password:n}),a.captcha);case 7:if(o=e.sent,l=o,c="EMAIL"===l.type?"verify-email":"SMS"===l.type?"verify-phone":"verify-app",!o.emailVerified&&!o.phoneVerified)try{a.$router.push({name:"verify-email",query:{type:"EMAIL",email:a.form.email,reason:"SIGN_UP"}}),i=a.$t("notify.send-code"),a.$message.success({message:i,duration:5e3})}catch(p){i=a.$t("notify.send-code-fail"),a.$message.error({message:i,duration:5e3})}if(o.emailVerified&&!o.phoneVerified&&a.$router.push({name:"verify-phone-number",query:{email:a.form.email}}),o.emailVerified&&o.phoneVerified&&("EMAIL"===l.type||"SMS"===l.type))try{a.$router.push({name:c,query:{type:l.type,email:a.form.email,pass:n,reason:"REQUEST_LOGIN"}}),i=a.$t("notify.send-code"),a.$message.success({message:i,duration:5e3})}catch(p){i=a.$t("notify.send-code-fail"),a.$message.error({message:i,duration:5e3})}o.emailVerified&&o.phoneVerified&&"APP"===l.type&&a.$router.push({name:c,query:{type:l.type,email:a.form.email,pass:n,reason:"REQUEST_LOGIN"}}),"NONE"===l.type&&(console.log("a"),a.login(Object(r["a"])(Object(r["a"])({},a.form),{},{password:n})).then((function(){a.$router.push({name:"KycPending"}),i=a.$t("notify.login-success"),a.$message.success({message:i,duration:5e3})}))),a.isLoading=!1,e.next=23;break;case 18:e.prev=18,e.t0=e["catch"](1),a.isLoading=!1,u=e.t0.response.data,"INVALID_CAPTCHA"===u.status&&(a.$refs["recaptcha"].reset(),a.isVerifyCaptcha=!1);case 23:case"end":return e.stop()}}),e,null,[[1,18]])})));return function(a){return e.apply(this,arguments)}}())}}]),t}(y["d"]);Object(p["a"])([v.Action("login")],$.prototype,"login",void 0),$=Object(p["a"])([Object(y["a"])({components:{VueRecaptcha:f["a"],HeaderLogin:m["a"],VerifyPage:g["a"],Language:d["a"]}})],$);var C=$,k=C,x=(t("2126"),t("2877")),L=Object(x["a"])(k,s,i,!1,null,"805c2f24",null);a["default"]=L.exports}}]);
//# sourceMappingURL=chunk-5c9adc6b.c9e805d1.js.map