(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62538b97"],{"087d":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bc-login"},[a("header-login"),a("div",{staticClass:"form"},[a("el-form",{ref:"form-signup",staticClass:"form-item",attrs:{model:e.form,rules:e.rules}},[a("div",{staticClass:"text-3xl text-semibold text-center mb-2 title-form"},[e._v(e._s(e.$t("forgot.title-form")))]),a("div",{staticClass:"text-base be-flex jc-space-center"},[e._v(" "+e._s(e.$t("forgot.desciption"))+" ")]),a("div",{staticClass:"text-base be-flex jc-space-center"},[e._v(" "+e._s(e.$t("forgot.description1"))+" ")]),a("div",{staticClass:"text-base be-flex jc-space-center"},[e._v(" "+e._s(e.$t("forgot.description2"))+" ")]),a("div",{staticClass:"label-box"},[a("label",{attrs:{for:""}},[e._v("Email")])]),a("el-form-item",{attrs:{prop:"email"}},[a("el-input",{attrs:{placeholder:e.$t("forgot.email")},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),a("el-button",{staticClass:"btn w-100 is-none-border cursor mb-24",class:e.getDisableBtn?"btn--disabled":null,attrs:{loading:e.isLoading},on:{click:e.handleConfirm}},[e._v(" "+e._s(e.$t("forgot.submit"))+" ")]),a("div",{staticClass:"text-base be-flex jc-space-center",staticStyle:{"margin-bottom":"8px"}},[e._v(" "+e._s(e.$t("login.question"))+"  "),a("span",{staticClass:"text-hyperlink text-semibold cursor",on:{click:e.handleSignUp}},[e._v(" "+e._s(e.$t("login.sign-up"))+" ")])]),a("div",{staticClass:"text-base be-flex jc-space-center"},[e._v(" "+e._s(e.$t("signup.have-account"))+"  "),a("span",{staticClass:"text-hyperlink text-semibold cursor",on:{click:e.handleLoginForm}},[e._v(e._s(e.$t("signup.sign-in"))+" ")])])],1)],1),a("language",{on:{changeLanguage:e.handleChangeLanguage}})],1)},i=[],s=a("c964"),r=a("276c"),l=a("e954"),o=a("920b"),c=a("92a6"),u=(a("96cf"),a("9ab4")),g=a("e096"),m=a("d60c"),f=a("e90e"),d=a("039e"),p=a("08ba"),b=a("1b40"),v=(Object(p["a"])("verify"),Object(p["a"])("auth")),h=function(e){Object(o["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.language="en",e.form={email:"",password:""},e.remember=!1,e.selectLanguage="",e.isVerifyCaptcha=!1,e.isLoading=!1,e.optionLanguage=[{id:1,lang:"en"},{id:2,lang:"vi"}],e.rules={email:[{required:!0,message:e.$t("login.wrong-email"),trigger:"blur"},{type:"email",message:e.$t("login.wrong-email-type"),trigger:"blur"}]},e}return Object(l["a"])(a,[{key:"getDisableBtn",get:function(){return!this.form.email}},{key:"created",value:function(){this.language=window.localStorage.getItem("bc-lang"),this.selectLanguage=this.language}},{key:"handleChangeLanguage",value:function(){var e;null===(e=this.$refs["form-signup"])||void 0===e||e.resetFields()}},{key:"verifyCaptcha",value:function(){this.isVerifyCaptcha=!0}},{key:"handleSignUp",value:function(){this.$router.push({name:"sign-up"})}},{key:"handleLoginForm",value:function(){this.$router.push({name:"login"})}},{key:"handleConfirm",value:function(){var e,t=this;this.getDisableBtn||null===(e=this.$refs["form-signup"])||void 0===e||e.validate(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(a){var n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=16;break}return e.prev=1,n="",t.isLoading=!0,i=t.form.email,e.next=7,v.resendCode({email:i,type:"EMAIL"});case 7:t.$router.push({name:"verify-email",query:{type:"EMAIL",email:i,reason:"FORGET_PASSWORD"}}),t.isLoading=!1,n=t.$t("notify.send-code"),t.$message.success({message:n,duration:5e3}),e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](1),t.isLoading=!1;case 16:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t){return e.apply(this,arguments)}}())}}]),a}(b["d"]);h=Object(u["a"])([Object(b["a"])({components:{VueRecaptcha:g["a"],HeaderLogin:m["a"],VerifyPage:d["a"],Language:f["a"]}})],h);var x=h,y=x,_=(a("5377"),a("2877")),C=Object(_["a"])(y,n,i,!1,null,"84c674c8",null);t["default"]=C.exports},5377:function(e,t,a){"use strict";a("d64c")},d64c:function(e,t,a){}}]);
//# sourceMappingURL=chunk-62538b97.2c299e3c.js.map