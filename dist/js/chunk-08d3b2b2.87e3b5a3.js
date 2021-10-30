(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-08d3b2b2"],{"039e":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bc-verify"},[a("h3",{staticClass:"text-3xl text-center text-semibold title-form"},[e._v(e._s(e.getTittle))]),a("div",{staticClass:"be-flex verify-code"},[a("base-icon",{attrs:{icon:e.getIcon,size:"80"}}),a("div",{staticClass:"ml-1 w-100 input-code"},[a("el-form",{ref:"form-verify",attrs:{model:e.form,rules:e.rules},nativeOn:{submit:function(t){return t.preventDefault(),e.handleSubmit.apply(null,arguments)}}},[a("el-form-item",{staticClass:"no-require-label",attrs:{prop:"code",label:""+e.$t("verify.label")}},[a("el-input",{attrs:{type:"text",maxlength:"6",placeholder:""+e.$t("verify.placeholder")},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code","string"===typeof t?t.trim():t)},expression:"form.code"}})],1)],1)],1)],1),a("el-button",{staticClass:"btn w-100 is-none-border cursor",class:e.getDisableBtn?"btn--disabled":null,attrs:{loading:e.isLoading},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("verify.submit"))+" ")]),"verify-app"!==e.$route.name?a("div",{staticClass:"text-base be-flex jc-space-center mt-24 text-grey-130"},[e._v(" "+e._s(e.$t("verify.question"))+"  "),a("span",{staticClass:"text-hyperlink text-semibold cursor",on:{click:e.handleResendCode}},[e._v(" "+e._s(e.$t("verify.re-send"))+" ")])]):e._e(),"VERIFY-SMS"===e.$route.query.reason?a("div",{staticClass:"text-base be-flex jc-space-center mt-24 text-grey-130"},[a("span",{staticClass:"text-hyperlink text-semibold cursor",on:{click:e.handleUseOtherPhone}},[e._v(" "+e._s(e.$t("verify.another-phone"))+" ")])]):e._e()],1)},s=[],n=a("f3f3"),r=a("c964"),o=a("276c"),c=a("e954"),l=a("920b"),u=a("92a6"),d=(a("96cf"),a("b0c0"),a("9ab4")),p=a("1b40"),f=a("08ba"),g=a("4bb5"),h=a("2ef0"),m=Object(g["a"])("beAuth"),b=(Object(f["a"])("verify"),Object(f["a"])("auth")),v=function(e){Object(l["a"])(a,e);var t=Object(u["a"])(a);function a(){var e;return Object(o["a"])(this,a),e=t.apply(this,arguments),e.form={code:""},e.isLoading=!1,e.rules={code:[{required:!0,message:e.$t("verify.wrong-code"),trigger:"blur"}]},e}return Object(c["a"])(a,[{key:"getDisableBtn",get:function(){return 6!==this.form.code.length}},{key:"getIcon",get:function(){var e=this.$route.name;return"verify-phone"===e?"verify-phone":"verify-email"===e?"verify-email":"verify-app"}},{key:"getTittle",get:function(){var e=this.$route.name;return"verify-phone"===e?this.$t("verify.title-phone"):"verify-email"===e?this.$t("verify.title-email"):this.$t("verify.title-app")}},{key:"clearValidate",value:function(){var e;null===(e=this.$refs["form-verify"])||void 0===e||e.resetFields()}},{key:"handleUseOtherPhone",value:function(){this.$router.push({name:"verify-phone-number",query:{email:this.$route.query.email}})}},{key:"handleResendCode",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,a,i,s,n,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,t="",a=this.$route.query.email,i=this.$route.query.type,e.next=6,b.resendCode({email:a,type:i});case 6:t=this.$t("notify.send-code"),this.$message.success({message:t,duration:5e3}),e.next=16;break;case 10:e.prev=10,e.t0=e["catch"](0),s="",n=e.t0.response,r=n.config,o=n.data,"USER_BLOCKED"===o.status&&Object(h["includes"])(r.url,"resendCode")&&(s=this.$t("notify.user-blocked-resend-code"),this.$message.error({message:s,duration:5e3})),"USER_LOCKED"===o.status&&Object(h["includes"])(r.url,"resendCode")&&(s=this.$t("notify.user-locked-resend-code"),this.$message.error({message:s,duration:5e3}));case 16:case"end":return e.stop()}}),e,this,[[0,10]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"handleSubmit",value:function(){var e=this;this.getDisableBtn||this.$refs["form-verify"].validate((function(t){if(t){e.isLoading=!0;var a="",i=e.$route.query.pass,s=e.$route.query.email,r=e.$route.query.reason,o={email:s,password:i,verificationCode:e.form.code};"REQUEST_LOGIN"===r&&e.login(Object(n["a"])({},o)).then((function(){a=e.$t("notify.verify-success"),e.$message.success({message:a,duration:5e3}),e.$router.push({name:"KycPending"}),e.isLoading=!1})).catch((function(){e.isLoading=!1})),"SIGN_UP"===r&&(delete o.password,b.verifyCode("CODE",Object(n["a"])(Object(n["a"])({},o),{},{type:"EMAIL"})).then((function(t){e.$router.push({name:"verify-phone-number",query:{email:s}})})).catch((function(t){e.isLoading=!1}))),"VERIFY-SMS"===r&&(delete o.password,b.verifyCode("CODE",Object(n["a"])(Object(n["a"])({},o),{},{type:"SMS"})).then((function(t){e.setUserInfo(t),e.$router.push({name:"Wallet"})})).catch((function(t){console.log(t),e.isLoading=!1}))),"FORGET_PASSWORD"===r&&b.forgetPassword(Object(n["a"])({},o)).then((function(t){a=e.$t("notify.verify-success"),e.$message.success({message:a,duration:5e3}),e.$router.push({name:"reset-password",query:{email:s,reason:"FORGET_PASSWORD",code:t}}),e.isLoading=!1})).catch((function(){e.isLoading=!1}))}}))}}]),a}(p["d"]);Object(d["a"])([m.Action("login")],v.prototype,"login",void 0),Object(d["a"])([m.Mutation("SET_USER_INFO")],v.prototype,"setUserInfo",void 0),v=Object(d["a"])([p["a"]],v);var y=v,w=y,$=(a("dd67"),a("2877")),C=Object($["a"])(w,i,s,!1,null,"42cb9a6c",null);t["a"]=C.exports},"0a11":function(e,t,a){"use strict";a("6339")},"2b1a":function(e,t,a){"use strict";a("7e03")},6339:function(e,t,a){},"7e03":function(e,t,a){},"93c7":function(e,t,a){"use strict";a("9b09")},"9b09":function(e,t,a){},d60c:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"header-login be-flex align-center jc-space-between"},[a("div",{staticClass:"header-login__left be-flex align-center cursor",on:{click:e.redirect}},[a("base-icon",{attrs:{icon:"logo-login",size:"32"}}),a("span",{staticClass:"title"},[e._v("LYNKEY")])],1),a("div",{staticClass:"header-login__right be-flex align-center"},[a("div",{staticClass:"item cursor mr-24"},[a("span",[e._v(e._s(e.$t("login.support")))])]),a("div",{staticClass:"item cursor mr-24"},[a("el-dropdown",{staticClass:"pl-2 login-page-header",attrs:{trigger:"click"}},[a("span",{staticClass:"el-dropdown-link",staticStyle:{color:"#201f1e"}},[e._v(" "+e._s(e.$t("login.download"))),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),a("el-dropdown-menu",{staticClass:"header-downloadapp",attrs:{slot:"dropdown"},slot:"dropdown"},[a("div",{staticClass:"dropdown-group pb-1"},[a("div",{staticClass:"dropdown-group-title"},[e._v("Application for mobile devices")]),a("el-dropdown-item",{attrs:{command:"chplay"}},[a("base-icon",{staticStyle:{"font-size":"16px"},attrs:{icon:"chplay"}}),a("span",{staticClass:"pl-1"},[e._v("Get the app on Google Play")])],1),a("el-dropdown-item",{attrs:{command:"appstore"}},[a("base-icon",{staticStyle:{"font-size":"17px"},attrs:{icon:"appstore"}}),a("span",{staticClass:"pl-1"},[e._v("Get the app on App Store")])],1)],1),a("div",{staticClass:"dropdown-group pb-1 pt-1",staticStyle:{"border-top":"1px solid #dbdbdb"}},[a("div",{staticClass:"dropdown-group-title"},[e._v("Applications for computers")]),a("el-dropdown-item",{attrs:{command:"macos"}},[a("base-icon",{staticStyle:{"font-size":"18px"},attrs:{icon:"macos"}}),a("span",{staticClass:"pl-1"},[e._v("Download apps for macOS")])],1),a("el-dropdown-item",{attrs:{command:"window"}},[a("base-icon",{staticStyle:{"font-size":"19px"},attrs:{icon:"window"}}),a("span",{staticClass:"pl-1"},[e._v("Download apps for Windows")])],1)],1)])],1)],1),a("div",{staticClass:"item cursor be-flex align-center"},[a("base-icon",{staticStyle:{"padding-right":"5px"},attrs:{icon:"email",size:"20"}}),a("span",[e._v(e._s(e.$t("login.email",{email:e.email})))])],1)])])},s=[],n=a("276c"),r=a("e954"),o=a("920b"),c=a("92a6"),l=a("9ab4"),u=a("1b40"),d=function(e){Object(o["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;return Object(n["a"])(this,a),e=t.apply(this,arguments),e.email="support@linkkey.com",e}return Object(r["a"])(a,[{key:"redirect",value:function(){this.$router.push({name:"login"})}}]),a}(u["d"]);d=Object(l["a"])([u["a"]],d);var p=d,f=p,g=(a("93c7"),a("2877")),h=Object(g["a"])(f,i,s,!1,null,"7113eeea",null);t["a"]=h.exports},d7ab:function(e,t,a){},dd67:function(e,t,a){"use strict";a("d7ab")},e096:function(e,t,a){"use strict";function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i])}return e},i.apply(this,arguments)}var s=function(){var e=!1,t=[],a=function(a){if(!e){e=!0;for(var i=0,s=t.length;i<s;i++)t[i](a)}},i=function(a){e?a():t.push(a)},s={resolved:function(){return e},resolve:a,promise:{then:i}};return s},n=Object.prototype.hasOwnProperty;function r(){var e=s();return{notify:function(){e.resolve()},wait:function(){return e.promise},render:function(e,t,a){this.wait().then((function(){a(window.grecaptcha.render(e,t))}))},reset:function(e){"undefined"!==typeof e&&(this.assertLoaded(),this.wait().then((function(){return window.grecaptcha.reset(e)})))},execute:function(e){"undefined"!==typeof e&&(this.assertLoaded(),this.wait().then((function(){return window.grecaptcha.execute(e)})))},checkRecaptchaLoad:function(){n.call(window,"grecaptcha")&&n.call(window.grecaptcha,"render")&&this.notify()},assertLoaded:function(){if(!e.resolved())throw new Error("ReCAPTCHA has not been loaded")}}}var o=r();"undefined"!==typeof window&&(window.vueRecaptchaApiLoaded=o.notify);var c={name:"VueRecaptcha",props:{sitekey:{type:String,required:!0},theme:{type:String},badge:{type:String},type:{type:String},size:{type:String},tabindex:{type:String},loadRecaptchaScript:{type:Boolean,default:!1},recaptchaScriptId:{type:String,default:"__RECAPTCHA_SCRIPT"},recaptchaHost:{type:String,default:"www.google.com"},language:{type:String,default:""}},beforeMount:function(){if(this.loadRecaptchaScript&&!document.getElementById(this.recaptchaScriptId)){var e=document.createElement("script");e.id=this.recaptchaScriptId,e.src="https://"+this.recaptchaHost+"/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit&hl="+this.language,e.async=!0,e.defer=!0,document.head.appendChild(e)}},mounted:function(){var e=this;o.checkRecaptchaLoad();var t=i({},this.$props,{callback:this.emitVerify,"expired-callback":this.emitExpired,"error-callback":this.emitError}),a=this.$slots["default"]?this.$el.children[0]:this.$el;o.render(a,t,(function(t){e.$widgetId=t,e.$emit("render",t)}))},methods:{reset:function(){o.reset(this.$widgetId)},execute:function(){o.execute(this.$widgetId)},emitVerify:function(e){this.$emit("verify",e)},emitExpired:function(){this.$emit("expired")},emitError:function(){this.$emit("error")}},render:function(e){return e("div",{},this.$slots["default"])}};t["a"]=c},e90e:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"text-center mt-2 language"},[a("el-select",{staticClass:"select-language",attrs:{"popper-class":"select-language-dropdown"},on:{change:e.handleChangeLanguage},model:{value:e.selectLanguage,callback:function(t){e.selectLanguage=t},expression:"selectLanguage"}},[a("el-option",{attrs:{label:""+e.$t("login.en"),value:"en"}},[[a("div",{staticClass:"be-flex flag"},[a("base-icon",{staticStyle:{"margin-right":"4px"},attrs:{icon:"flag-usa",size:"14"}}),a("span",{staticClass:"lang"},[e._v(e._s(e.$t("login.en")))])],1)]],2),a("el-option",{attrs:{label:""+e.$t("login.vi"),value:"vi"}},[[a("div",{staticClass:"be-flex flag"},[a("base-icon",{staticStyle:{"margin-right":"4px","margin-left":"-2px"},attrs:{icon:"flag-vn",size:"19"}}),a("span",{staticClass:"lang",staticStyle:{"margin-left":"1px"}},[e._v(e._s(e.$t("login.vi")))])],1)]],2),a("div",{staticClass:"suffix",attrs:{slot:"prefix"},slot:"prefix"},["flag-usa"===e.getIcon?a("base-icon",{staticClass:"flag-usa",attrs:{icon:e.getIcon,size:"14"}}):a("base-icon",{staticClass:"flag-vn",attrs:{icon:e.getIcon,size:"19"}})],1)],1)],1)},s=[],n=a("276c"),r=a("e954"),o=a("920b"),c=a("92a6"),l=a("9ab4"),u=a("1b40"),d=function(e){Object(o["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;return Object(n["a"])(this,a),e=t.apply(this,arguments),e.selectLanguage="",e}return Object(r["a"])(a,[{key:"created",value:function(){this.selectLanguage=window.localStorage.getItem("bc-lang")}},{key:"getIcon",get:function(){return"vi"===this.selectLanguage?"flag-vn":"flag-usa"}},{key:"handleChangeLanguage",value:function(e){this.$i18n.locale=e,window.localStorage.setItem("bc-lang",e),location.reload()}}]),a}(u["d"]);Object(l["a"])([Object(u["c"])({required:!1,type:Boolean,default:!1})],d.prototype,"isReload",void 0),d=Object(l["a"])([u["a"]],d);var p=d,f=p,g=(a("0a11"),a("2877")),h=Object(g["a"])(f,i,s,!1,null,"0850ba00",null);t["a"]=h.exports},f42c:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bc-login"},[a("header-login"),a("div",{staticClass:"form"},["login"===e.$route.name?a("el-form",{ref:"form-login",staticClass:"form-item",attrs:{model:e.form,rules:e.rules}},[a("div",{staticClass:"text-3xl text-semibold text-center mb-2 title-form"},[e._v(e._s(e.$t("login.title-form")))]),a("el-form-item",{attrs:{prop:"email"}},[a("el-input",{attrs:{placeholder:"Email",type:"email"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),a("el-form-item",{staticClass:"input-password",attrs:{prop:"password"}},[a("el-input",{staticClass:"input-password",attrs:{type:1==e.showPass?"text":"password",placeholder:e.$t("login.placeholder.password")},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}}),a("span",{staticClass:"icon-show-password",on:{click:function(t){e.showPass=!e.showPass}}},[a("base-icon",{attrs:{icon:1==e.showPass?"icon-eye-off":"icon-eye",size:"22"}})],1)],1),a("div",{staticClass:"be-flex jc-space-between w-100 mt-2"},[a("el-checkbox",{model:{value:e.remember,callback:function(t){e.remember=t},expression:"remember"}},[a("span",{staticClass:"text-base",staticStyle:{color:"#201f1e","font-weight":"400","margin-left":"-2px"}},[e._v(e._s(e.$t("login.remember")))])]),a("span",{staticClass:"text-base text-hyperlink cursor",on:{click:e.handleForgotPass}},[e._v(e._s(e.$t("login.forgot")))])],1),a("div",{staticClass:"captcha be-flex jc-space-center mt-2"},[a("vue-recaptcha",{ref:"recaptcha",attrs:{loadRecaptchaScript:!0,language:e.language,sitekey:e.siteKey},on:{verify:e.verifyCaptcha,expired:e.expiredCaptcha}})],1),a("el-button",{staticClass:"btn w-100 is-none-border cursor",class:e.getDisableBtn?"btn--disabled":null,attrs:{loading:e.isLoading},on:{click:e.handleLogin}},[e._v(e._s(e.$t("login.title-form"))+" ")]),a("div",{staticClass:"text-base be-flex jc-space-center",staticStyle:{color:"#201f1e"}},[e._v(" "+e._s(e.$t("login.question"))+"  "),a("span",{staticClass:"text-hyperlink text-semibold cursor",on:{click:e.handleSignUp}},[e._v(" "+e._s(e.$t("login.sign-up"))+" ")])])],1):a("verify-page",{ref:"verify",staticClass:"form-item"})],1),a("language",{attrs:{isReload:"login"===e.$route.name},on:{changeLanguage:e.handleChangeLanguage}})],1)},s=[],n=a("f3f3"),r=a("c964"),o=a("276c"),c=a("e954"),l=a("920b"),u=a("92a6"),d=(a("96cf"),a("9ab4")),p=a("e096"),f=a("d60c"),g=a("e90e"),h=a("039e"),m=a("08ba"),b=a("1b40"),v=a("4bb5"),y=Object(v["a"])("beAuth"),w=Object(m["a"])("auth"),$=function(e){Object(l["a"])(a,e);var t=Object(u["a"])(a);function a(){var e;return Object(o["a"])(this,a),e=t.apply(this,arguments),e.showPass=!1,e.language="en",e.siteKey="6LcbbKAcAAAAAGS9BixBvH4okIBVNsY7lywPDleX",e.form={email:"",password:""},e.remember=!1,e.isVerifyCaptcha=!1,e.captcha="",e.isLoading=!1,e.optionLanguage=[{id:1,lang:"en"},{id:2,lang:"vi"}],e.rules={email:[{required:!0,message:e.$t("login.wrong-email"),trigger:"blur"},{type:"email",message:e.$t("login.wrong-email-type"),trigger:"blur"}],password:[{required:!0,message:e.$t("login.wrong-password"),trigger:"blur"}]},e}return Object(c["a"])(a,[{key:"created",value:function(){this.language=window.localStorage.getItem("bc-lang")}},{key:"getDisableBtn",get:function(){return!(this.form.email&&this.form.password&&this.isVerifyCaptcha)}},{key:"verifyCaptcha",value:function(e){this.captcha=e,this.isVerifyCaptcha=!0}},{key:"expiredCaptcha",value:function(){this.isVerifyCaptcha=!1}},{key:"handleSignUp",value:function(){this.$router.push({name:"sign-up"})}},{key:"handleForgotPass",value:function(){this.$router.push({name:"forgot-password"})}},{key:"handleChangeLanguage",value:function(){var e;null===(e=this.$refs["verify"])||void 0===e||e.clearValidate()}},{key:"handleLogin",value:function(){var e,t=this;this.getDisableBtn||null===(e=this.$refs["form-login"])||void 0===e||e.validate(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(a){var i,s,r,o,c,l,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=23;break}return e.prev=1,s="",t.isLoading=!0,r=null===(i=t.$options.filters)||void 0===i?void 0:i.encryptPassword(t.form.password),e.next=7,w.validateUser(Object(n["a"])(Object(n["a"])({},t.form),{},{password:r}),t.captcha);case 7:if(o=e.sent,c=o,l="EMAIL"===c.type?"verify-email":"SMS"===c.type?"verify-phone":"verify-app",!o.emailVerified&&!o.phoneVerified)try{t.$router.push({name:"verify-email",query:{type:"EMAIL",email:t.form.email,reason:"SIGN_UP"}}),s=t.$t("notify.send-code"),t.$message.success({message:s,duration:5e3})}catch(d){s=t.$t("notify.send-code-fail"),t.$message.error({message:s,duration:5e3})}if(o.emailVerified&&!o.phoneVerified&&t.$router.push({name:"verify-phone-number",query:{email:t.form.email}}),o.emailVerified&&o.phoneVerified&&("EMAIL"===c.type||"SMS"===c.type))try{t.$router.push({name:l,query:{type:c.type,email:t.form.email,pass:r,reason:"REQUEST_LOGIN"}}),s=t.$t("notify.send-code"),t.$message.success({message:s,duration:5e3})}catch(d){s=t.$t("notify.send-code-fail"),t.$message.error({message:s,duration:5e3})}o.emailVerified&&o.phoneVerified&&"APP"===c.type&&t.$router.push({name:l,query:{type:c.type,email:t.form.email,pass:r,reason:"REQUEST_LOGIN"}}),"NONE"===c.type&&(console.log("a"),t.login(Object(n["a"])(Object(n["a"])({},t.form),{},{password:r})).then((function(){t.$router.push({name:"KycPending"}),s=t.$t("notify.login-success"),t.$message.success({message:s,duration:5e3})}))),t.isLoading=!1,e.next=23;break;case 18:e.prev=18,e.t0=e["catch"](1),t.isLoading=!1,u=e.t0.response.data,"INVALID_CAPTCHA"===u.status&&(t.$refs["recaptcha"].reset(),t.isVerifyCaptcha=!1);case 23:case"end":return e.stop()}}),e,null,[[1,18]])})));return function(t){return e.apply(this,arguments)}}())}}]),a}(b["d"]);Object(d["a"])([y.Action("login")],$.prototype,"login",void 0),$=Object(d["a"])([Object(b["a"])({components:{VueRecaptcha:p["a"],HeaderLogin:f["a"],VerifyPage:h["a"],Language:g["a"]}})],$);var C=$,x=C,O=(a("2b1a"),a("2877")),_=Object(O["a"])(x,i,s,!1,null,"4e97bb30",null);t["default"]=_.exports}}]);
//# sourceMappingURL=chunk-08d3b2b2.87e3b5a3.js.map