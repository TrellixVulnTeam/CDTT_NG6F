(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1a3f8b26"],{"0555":function(e,t,a){},"0e30":function(e,t,a){"use strict";a("640c")},"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"17e3":function(e,t,a){"use strict";a("4dc7")},"1a5d":function(e,t,a){"use strict";a("73d4")},2130:function(e,t,a){"use strict";a("0555")},"259d":function(e,t,a){"use strict";a("34a8")},"34a8":function(e,t,a){},"4dc7":function(e,t,a){},"54cb":function(e,t,a){"use strict";a("5525")},5525:function(e,t,a){},"640c":function(e,t,a){},"73d4":function(e,t,a){},"841c":function(e,t,a){"use strict";var i=a("d784"),s=a("825a"),n=a("1d80"),l=a("129f"),r=a("14c3");i("search",(function(e,t,a){return[function(t){var a=n(this),i=void 0==t?void 0:t[e];return void 0!==i?i.call(t,a):new RegExp(t)[e](String(a))},function(e){var i=a(t,this,e);if(i.done)return i.value;var n=s(this),o=String(e),c=n.lastIndex;l(c,0)||(n.lastIndex=0);var u=r(n,o);return l(n.lastIndex,c)||(n.lastIndex=c),null===u?-1:u.index}]}))},a15b:function(e,t,a){"use strict";var i=a("23e7"),s=a("44ad"),n=a("fc6a"),l=a("a640"),r=[].join,o=s!=Object,c=l("join",",");i({target:"Array",proto:!0,forced:o||!c},{join:function(e){return r.call(n(this),void 0===e?",":e)}})},d824:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"w-100 bo-kyc"},[a("div",{staticClass:"bg-white wallet-header"},[a("div",{staticClass:"be-flex align-center jc-space-between wallet-header__above"},[a("div",{staticClass:"wallet-header__above-tabs be-flex"},e._l(e.tabs,(function(t){return a("div",{key:t.id,staticClass:"tab-item cursor",class:e.$route.name===t.routeName?"tab-active":null,on:{click:function(a){return e.handleChangeTab(t)}}},[a("span",{staticClass:"text-base"},[e._v(e._s(e.$t("menu."+t.title)))])])})),0)])]),a("member-filter",{attrs:{"is-change-tab":e.isChangeTab},on:{filter:e.handleFilter,addMember:e.handleAddMember}}),a("member-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],attrs:{query:e.query,data:e.data},on:{rowClick:e.handleRowClick,edit:e.handleClickEdit,sizeChange:e.handleSizeChange,pageChange:e.handlePageChange}}),a("popup-member",{attrs:{type:e.type,detailRow:e.detailRow},on:{reload:e.init}}),a("popup-detail-member",{attrs:{detailRow:e.detailRow},on:{openEdit:e.handleClickEdit}})],1)},s=[],n=a("f3f3"),l=a("c964"),r=a("276c"),o=a("e954"),c=a("920b"),u=a("92a6"),d=(a("96cf"),a("b0c0"),a("9ab4")),p=a("1b40"),b=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"w-100 bg-white wallet-table"},[a("div",{staticClass:"wallet-table__below"},[a("base-table",{staticClass:"base-table table-wallet",attrs:{data:e.data,table:e.query,paginationInfo:e.getPaginationInfo},on:{sizeChange:e.handleSizeChange,currentChange:e.handleCurrentChange,rowClick:e.handleRowClick}},[a("el-table-column",{attrs:{label:"#",type:"index",index:e.indexMethod,align:"center",width:"70"}}),a("el-table-column",{attrs:{label:e.$t("kyc.table.fullName"),"min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"be-flex align-center"},[a("span",{staticClass:"d-ib mr-2"},[e._v(e._s(t.row.fullName))])])]}}])}),a("el-table-column",{attrs:{label:e.$t("kyc.table.email"),prop:"email",width:"330"}}),a("el-table-column",{attrs:{label:e.$t("kyc.table.role"),prop:"roles",width:"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.getRole(t.row.roles)))])]}}])}),a("el-table-column",{attrs:{label:e.$t("kyc.table.date"),prop:"createdDate",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("formatDateHourMs")(t.row.createdAt)))])]}}])}),a("el-table-column",{attrs:{prop:"kycStatus",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{on:{click:function(a){return e.handleEdit(t.row)}}},[a("base-icon",{attrs:{icon:"icon-edit",size:"24"}})],1)]}}])})],1)],1)])},m=[],f=(a("a15b"),a("2ef0")),h=function(e){Object(c["a"])(a,e);var t=Object(u["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.isConflickClick=!1,e}return Object(o["a"])(a,[{key:"getPaginationInfo",get:function(){return this.$t("paging.customers")}},{key:"indexMethod",value:function(e){return(this.query.page-1)*this.query.limit+e+1}},{key:"handleSizeChange",value:function(e){this.$emit("sizeChange",e)}},{key:"handleCurrentChange",value:function(e){this.$emit("pageChange",e)}},{key:"handleRowClick",value:function(e){this.isConflickClick?this.isConflickClick=!1:this.$emit("rowClick",e.row)}},{key:"handleEdit",value:function(e){this.isConflickClick=!0,this.$emit("edit",e)}},{key:"getRole",value:function(e){var t=this;if(e.length){var a=[];return Object(f["forEach"])(e,(function(e){a.push(t.switchRole(e))})),a.join("; ")}return""}},{key:"switchRole",value:function(e){switch(e){case"ADMIN":return"Admin";case"SUPPORT":return"Support";case"MARKETING":return"Marketing";default:return"Accountant"}}}]),a}(p["d"]);Object(d["a"])([Object(p["c"])({required:!0,type:Object,default:{}})],h.prototype,"query",void 0),Object(d["a"])([Object(p["c"])({required:!0,type:Array,default:[]})],h.prototype,"data",void 0),h=Object(d["a"])([p["a"]],h);var v=h,y=v,C=(a("0e30"),a("2877")),g=Object(C["a"])(y,b,m,!1,null,"58ce0b01",null),w=g.exports,O=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pb-24 pt-24 be-flex align-center kyc-filter"},[a("el-input",{staticClass:"input-search",attrs:{placeholder:e.$t("placeholder.search")},model:{value:e.filter.search,callback:function(t){e.$set(e.filter,"search",t)},expression:"filter.search"}},[a("span",{staticClass:"prefix-search",attrs:{slot:"prefix"},slot:"prefix"},[a("base-icon",{attrs:{icon:"icon-search",size:"24"}})],1)]),a("div",{staticClass:"filter-item"}),a("div",[a("el-dropdown",{staticClass:"sort",attrs:{trigger:"click"},on:{command:e.handleSort}},[a("span",{staticClass:"abicon sort-title",staticStyle:{"font-size":"16px"}},[a("base-icon",{staticClass:"icon",staticStyle:{color:"#5b616e","margin-right":"10px"},attrs:{icon:"icon-sort",size:"18"}}),e._v(" "+e._s(e.$t("kyc.filter.sort")))],1),a("el-dropdown-menu",{staticClass:"header-downloadapp dropdown-sort",attrs:{slot:"dropdown"},slot:"dropdown"},e._l(e.sorts,(function(t,i){return a("el-dropdown-item",{key:i,class:e.sortActive===t.command?"active":null,attrs:{command:t.command,divided:t.divided}},[a("span",{staticClass:"be-flex"},[a("span",{staticClass:"be-flex-item"},[e._v(" "+e._s(t.label)+" ")]),e.sortActive===t.command?a("base-icon",{attrs:{icon:"icon-tick-dropdown",size:"16"}}):e._e()],1)])})),1)],1)],1),a("button",{staticClass:"btn-default-bg text-sm ml-auto add-member",attrs:{type:"button"},on:{click:e.handleAddMember}},[a("span",[e._v(e._s(e.$t("button.add-member")))])])],1)},k=[],j=(a("4de4"),a("ac1f"),a("841c"),a("1847")),_=a("08ba"),$=a("94d8"),x=(Object(_["a"])("kyc"),function(e){Object(c["a"])(a,e);var t=Object(u["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.filter={search:"",orderBy:3},e.loading=!1,e.queryApprove={page:1,limit:20,search:""},e.sorts=[{command:1,label:e.$i18n.t("member.sort.full-name"),divided:!1,i18n:"member.sort.full-name"},{command:2,label:e.$i18n.t("member.sort.email"),divided:!1,i18n:"member.sort.email"},{command:3,label:e.$i18n.t("member.sort.create-date"),divided:!1,i18n:"member.sort.create-date"}],e.sortActive=3,e.listCountry=$,e.identificationType=[{id:0,type:e.$i18n.t("kyc.filter.all-status"),value:""},{id:1,type:e.$i18n.t("kyc.filter.kyc-processing"),value:"KYC"},{id:2,type:e.$i18n.t("kyc.filter.not-verified"),value:"NOT_VERIFIED"},{id:3,type:e.$i18n.t("kyc.filter.verified"),value:"VERIFIED"},{id:4,type:e.$i18n.t("kyc.filter.locked"),value:"LOCKED"}],e.isVisible=!1,e.searchText=Object(f["debounce"])((function(t){e.$emit("filter",Object(n["a"])(Object(n["a"])({},e.filter),{},{search:Object(f["trim"])(t)}))}),500),e}return Object(o["a"])(a,[{key:"handleSearch",value:function(e){this.searchText(e)}},{key:"created",value:function(){var e=this;j["a"].$on("changeLang",(function(){Object(f["forEach"])(e.sorts,(function(t){t.label=e.$i18n.t(t.i18n)})),e.$forceUpdate()})),j["a"].$on("changeTabMember",this.handleChangeTab),this.$emit("filter",this.filter)}},{key:"destroyed",value:function(){j["a"].$off("changeLang"),j["a"].$off("changeTab")}},{key:"handleShowPopper",value:function(){this.isVisible=!0}},{key:"resetFilter",value:function(){this.filter={search:"",orderBy:3}}},{key:"handleChangeTab",value:function(){this.sortActive=3,this.queryApprove={page:1,limit:20,search:""},this.filter.search?this.resetFilter():(this.$emit("filter",Object(n["a"])(Object(n["a"])({},this.filter),{},{orderBy:3})),this.filter=Object(n["a"])(Object(n["a"])({},this.filter),{},{orderBy:3}))}},{key:"handleSort",value:function(e){this.sortActive=e,this.filter.orderBy=e,this.$emit("filter",this.filter)}},{key:"handleApply",value:function(){this.$emit("filter",this.filter),this.isVisible=!1}},{key:"handleReset",value:function(){this.filter=Object(n["a"])({},this.filter),this.$emit("filter",this.filter),this.isVisible=!1}},{key:"handleAddMember",value:function(){this.$emit("addMember")}}]),a}(p["d"]));Object(d["a"])([Object(p["c"])({required:!0})],x.prototype,"isChangeTab",void 0),Object(d["a"])([Object(p["e"])("filter.search")],x.prototype,"handleSearch",null),x=Object(d["a"])([p["a"]],x);var R=x,A=R,N=(a("1a5d"),Object(C["a"])(A,O,k,!1,null,"38add38a",null)),M=N.exports,S=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("base-popup",{staticClass:"popup-member",attrs:{name:"popup-member",width:"480px",close:e.handleClose,open:e.handleOpen}},[a("div",{staticClass:"title-popup",attrs:{slot:"title"},slot:"title"},[a("span",[e._v(e._s(e.getTitle))])]),a("div",{staticClass:"content"},[a("el-form",{staticClass:"form-item"},[a("div",{staticClass:"be-flex jc-space-between"},[a("el-form-item",{staticClass:"be-flex-item mr-16 is-required",attrs:{label:e.$t("label.f-name"),prop:"firstName"}},[a("el-input",{attrs:{placeholder:e.$t("placeholder.f-name"),clearable:""},model:{value:e.form.firstName,callback:function(t){e.$set(e.form,"firstName",t)},expression:"form.firstName"}})],1),a("el-form-item",{staticClass:"be-flex-item is-required",attrs:{label:e.$t("label.l-name"),prop:"lastName"}},[a("el-input",{attrs:{placeholder:e.$t("placeholder.l-name"),clearable:""},model:{value:e.form.lastName,callback:function(t){e.$set(e.form,"lastName",t)},expression:"form.lastName"}})],1)],1),a("el-form-item",{staticClass:"is-required",attrs:{label:e.$t("label.email"),prop:"email"}},[a("el-input",{attrs:{placeholder:e.$t("placeholder.email"),clearable:""},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),"add"===e.type?a("el-form-item",{staticClass:"input-password is-required",attrs:{label:e.$t("label.password"),prop:"password"}},[a("el-input",{staticClass:"input-password",attrs:{type:1==e.showPass?"text":"password",placeholder:e.$t("login.placeholder.password")},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}}),a("span",{staticClass:"icon-show-password",on:{click:function(t){e.showPass=!e.showPass}}},[a("base-icon",{attrs:{icon:1==e.showPass?"icon-eye-off":"icon-eye",size:"22"}})],1)],1):e._e(),a("el-form-item",{staticClass:"is-required",attrs:{label:e.$t("label.role"),prop:"role"}},[a("el-checkbox-group",{staticClass:"list-role",model:{value:e.form.roles,callback:function(t){e.$set(e.form,"roles",t)},expression:"form.roles"}},[a("el-checkbox",{attrs:{label:"MARKETING"}},[e._v("Marketing")]),a("el-checkbox",{attrs:{label:"ACCOUNTANT"}},[e._v("Accountant")]),a("el-checkbox",{attrs:{label:"SUPPORT"}},[e._v("Support")]),a("el-checkbox",{attrs:{label:"ADMIN"}},[e._v("Admin")])],1)],1),"edit"===e.type?a("div",{staticClass:"bg-line"}):e._e(),"edit"===e.type?a("div",{staticClass:"be-flex align-center jc-space-between status-active"},[a("span",[e._v(e._s(e.$t("member.popup.status-active")))]),a("el-switch",{staticClass:"switch-status",attrs:{"active-color":"#129961","active-value":"ACTIVE","inactive-value":"INACTIVE"},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}})],1):e._e()],1)],1),a("div",{staticClass:"footer",attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:"be-flex wrap-button",class:"edit"===e.type?"jc-space-between":null},["edit"===e.type?a("div",{staticClass:"btn-left"},[a("el-button",{staticClass:"btn-default btn-close btn-h-40 mr-16",on:{click:e.handleDelete}},[e._v(e._s(e.$t("button.delete-user")))])],1):e._e(),a("div",{staticClass:"btn-right"},[a("el-button",{staticClass:"btn-default btn-close btn-h-40 mr-16",on:{click:e.handleReset}},[e._v(e._s(e.$t("button.reset")))]),a("button",{staticClass:"btn-default-bg text-sm ml-auto add-member",attrs:{type:"button"},on:{click:e.handleAddMember}},["add"===e.type?a("span",[e._v(e._s(e.$t("button.add-member-1")))]):a("span",[e._v(e._s(e.$t("button.save")))])])],1)])]),a("popup-confirm",{on:{delete:e.handleSubmitDelete}})],1)},T=[],I=a("9f48"),E=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("base-popup",{staticClass:"popup-member",attrs:{name:"popup-confirm",width:"400px"}},[a("div",{staticClass:"title-popup",attrs:{slot:"title"},slot:"title"},[a("span",[e._v(e._s(e.$t("member.popup.title-confirm")))])]),a("div",{staticClass:"content",staticStyle:{"padding-bottom":"24px"}},[a("span",[e._v(e._s(e.$t("member.popup.content-confirm")))])]),a("div",{staticClass:"footer",attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:"be-flex wrap-button"},[a("div",{staticClass:"btn-right"},[a("el-button",{staticClass:"btn-default btn-close btn-h-40 mr-16",on:{click:e.handleCancel}},[e._v(e._s(e.$t("button.cancel")))]),a("button",{staticClass:"btn-default-bg text-sm ml-auto add-member",attrs:{type:"button"},on:{click:e.handleSubmit}},[a("span",[e._v(e._s(e.$t("button.submit")))])])],1)])])])},P=[],q=function(e){Object(c["a"])(a,e);var t=Object(u["a"])(a);function a(){return Object(r["a"])(this,a),t.apply(this,arguments)}return Object(o["a"])(a,[{key:"handleCancel",value:function(){this.setOpenPopup({popupName:"popup-confirm",isOpen:!1})}},{key:"handleSubmit",value:function(){this.$emit("delete"),this.handleCancel()}}]),a}(Object(p["b"])(I["a"]));q=Object(d["a"])([Object(p["a"])({components:{}})],q);var z=q,D=z,L=(a("54cb"),Object(C["a"])(D,E,P,!1,null,"0da6509f",null)),V=L.exports,B=Object(_["a"])("member"),F=function(e){Object(c["a"])(a,e);var t=Object(u["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.detail={},e.isLoading=!1,e.showPass=!1,e.tabActive=0,e.lang="en",e.form={firstName:"",lastName:"",email:"",roles:[]},e.listBlance=[],e}return Object(o["a"])(a,[{key:"getTitle",get:function(){return"add"===this.type?this.$t("member.popup.title-add"):this.$t("member.popup.title-edit")}},{key:"handleOpen",value:function(){this.lang=window.localStorage.getItem("bc-lang"),"edit"===this.type&&(this.form=Object(n["a"])({},this.detailRow))}},{key:"handleClose",value:function(){this.form={firstName:"",lastName:"",email:"",roles:[]}}},{key:"handleReset",value:function(){"add"===this.type?this.form={firstName:"",lastName:"",email:"",roles:[]}:this.form=Object(n["a"])({},this.detailRow)}},{key:"handleDelete",value:function(){this.setOpenPopup({popupName:"popup-confirm",isOpen:!0})}},{key:"handleAddMember",value:function(){var e=this;if("add"===this.type){var t,a=null===(t=this.$options.filters)||void 0===t?void 0:t.encryptPassword(this.form.password);B.createMember(Object(n["a"])(Object(n["a"])({},this.form),{},{password:a})).then((function(){var t=e.$t("notify.add-user-succsess");e.$message.success({message:t,duration:5e3}),e.setOpenPopup({popupName:"popup-member",isOpen:!1}),e.$emit("reload")}))}else B.updateMember(this.detailRow.userId,this.form).then((function(){var t=e.$t("notify.update-user-succsess");e.$message.success({message:t,duration:5e3}),e.setOpenPopup({popupName:"popup-member",isOpen:!1}),e.$emit("reload")}))}},{key:"handleSubmitDelete",value:function(){var e=this;B.deleteMember(this.detailRow.userId).then((function(){var t=e.$t("notify.delete-user-success");e.$message.success({message:t,duration:5e3}),e.setOpenPopup({popupName:"popup-member",isOpen:!1}),e.$emit("reload")}))}}]),a}(Object(p["b"])(I["a"]));Object(d["a"])([Object(p["c"])({required:!1,type:Object,default:function(){return{}}})],F.prototype,"detailRow",void 0),Object(d["a"])([Object(p["c"])({required:!0,type:String,default:"add"})],F.prototype,"type",void 0),F=Object(d["a"])([Object(p["a"])({components:{PopupConfirm:V}})],F);var K=F,U=K,G=(a("259d"),Object(C["a"])(U,S,T,!1,null,"3fe6c843",null)),H=G.exports,J=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("base-popup",{staticClass:"popup-member",attrs:{name:"popup-detail-member",width:"600px",isShowFooter:!1}},[a("div",{staticClass:"title-popup",attrs:{slot:"title"},slot:"title"},[a("span",[e._v(e._s(e.$t("member.popup.title-detail")))])]),a("div",{staticClass:"content"},[a("div",{staticClass:"content__top"},[a("div",{staticClass:"avatar"},[e.detailRow.avatar?a("img",{attrs:{src:e.detailRow.avatar,alt:""}}):a("base-icon",{staticStyle:{display:"inline-flex"},attrs:{icon:"default-avatar",size:"80"}})],1),a("span",{staticClass:"text-xl text-bold"},[e._v(e._s(e.detailRow.fullName))]),a("div",{staticClass:"roles mb-16"},e._l(e.detailRow.roles,(function(t){return a("span",{key:t,staticClass:"text-sm role-item"},[e._v(e._s(e.switchRole(t)))])})),0),a("div",{staticClass:"cursor wrap-edit",on:{click:e.handleEdit}},[a("base-icon",{staticStyle:{display:"inline-flex"},attrs:{icon:"icon-edit",size:"16"}}),a("span",[e._v(e._s(e.$t("member.popup.edit")))])],1)]),a("div",{staticClass:"bg-line"}),a("div",{staticClass:"content__bottom"},[a("div",{staticClass:"be-flex align-center jc-space-between item"},[a("span",[e._v(e._s(e.$t("member.popup.email")))]),a("span",{staticClass:"text-base"},[e._v(e._s(e.detailRow.email))])]),a("div",{staticClass:"be-flex align-center jc-space-between item"},[a("span",[e._v(e._s(e.$t("member.popup.create-date")))]),a("span",{staticClass:"text-base"},[e._v(e._s(e._f("formatDateHourMs")(e.detailRow.createdAt)))])]),a("div",{staticClass:"be-flex align-center jc-space-between item"},[a("span",[e._v(e._s(e.$t("member.popup.last-login")))]),a("span",{staticClass:"text-base"},[e._v(e._s(e._f("formatDateHourMs")(e.detailRow.lastTimeLogin)))])]),a("div",{staticClass:"be-flex align-center jc-space-between item"},[a("span",[e._v(e._s(e.$t("member.popup.active-status")))]),a("span",{staticClass:"text-base",class:"INACTIVE"===e.detailRow.status?"inactive":"active"},[e._v(e._s(e.switchStatus(e.detailRow.status)))])])])])])},Q=[],Y=function(e){Object(c["a"])(a,e);var t=Object(u["a"])(a);function a(){return Object(r["a"])(this,a),t.apply(this,arguments)}return Object(o["a"])(a,[{key:"switchRole",value:function(e){switch(e){case"ADMIN":return"Admin";case"SUPPORT":return"Support";case"MARKETING":return"Marketing";default:return"Accountant"}}},{key:"switchStatus",value:function(e){switch(e){case"INACTIVE":return"Inactive";default:return"Active"}}},{key:"handleEdit",value:function(){this.$emit("openEdit",this.detailRow),this.setOpenPopup({popupName:"popup-detail-member",isOpen:!1})}}]),a}(Object(p["b"])(I["a"]));Object(d["a"])([Object(p["c"])({required:!1,type:Object,default:function(){return{}}})],Y.prototype,"detailRow",void 0),Y=Object(d["a"])([Object(p["a"])({components:{}})],Y);var W=Y,X=W,Z=(a("17e3"),Object(C["a"])(X,J,Q,!1,null,"36292ed4",null)),ee=Z.exports,te=a("4bb5"),ae=Object(te["a"])("bcKyc"),ie=Object(te["a"])("beAuth"),se=Object(_["a"])("member"),ne=function(e){Object(c["a"])(a,e);var t=Object(u["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.tabs=[{id:1,title:"member-active",routeName:"MemberActive"},{id:2,title:"member-inactive",routeName:"MemberInactive"}],e.titlePending="",e.tabActive="Pending",e.isLoading=!1,e.isChangeTab=!1,e.isConflickClick=!1,e.type="add",e.data=[],e.detailRow={},e.query={orderBy:3,page:1,limit:10,total:10,status:null},e.objType={MemberActive:"ACTIVE",MemberInactive:"INACTIVE"},e.debounceInit=Object(f["debounce"])((function(){e.init()}),300),e}return Object(o["a"])(a,[{key:"created",value:function(){var e=this.$route.name;this.query.status=this.objType[e]}},{key:"init",value:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(){var t,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.isLoading=!0,t=this.$route.name,this.query.status=this.objType[t],e.next=6,se.getListMember(Object(n["a"])(Object(n["a"])({},this.query),{},{total:null}));case 6:a=e.sent,this.data=a.members||[],this.query.total=a.totalElement,this.isLoading=!1,e.next=16;break;case 12:e.prev=12,e.t0=e["catch"](0),this.isLoading=!1,console.log(e.t0);case 16:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"handleChangeTab",value:function(e){var t=this;this.isChangeTab=1!==e.id,this.$router.push({name:e.routeName}).then((function(){t.resetQuery(),j["a"].$emit("changeTabMember")}))}},{key:"resetQuery",value:function(){this.query=Object(n["a"])(Object(n["a"])({},this.query),{},{page:1,limit:10,search:"",orderBy:3})}},{key:"handlePageChange",value:function(e){this.query.page=e,this.init()}},{key:"handleSizeChange",value:function(e){this.query.limit=e,this.init()}},{key:"handleRowClick",value:function(e){this.detailRow=e,this.setOpenPopup({popupName:"popup-detail-member",isOpen:!0})}},{key:"handleClickEdit",value:function(e){this.type="edit",this.detailRow=e,this.setOpenPopup({popupName:"popup-member",isOpen:!0})}},{key:"handleFilter",value:function(e){this.isLoading||(this.query=Object(n["a"])(Object(n["a"])(Object(n["a"])({},this.query),e),{},{page:1,limit:10}),this.init())}},{key:"handleAddMember",value:function(){this.type="add",this.setOpenPopup({popupName:"popup-member",isOpen:!0})}}]),a}(Object(p["b"])(I["a"]));Object(d["a"])([ae.Action("getListReason")],ne.prototype,"getListReason",void 0),Object(d["a"])([ie.Getter("listModuleCanView")],ne.prototype,"listModuleCanView",void 0),ne=Object(d["a"])([Object(p["a"])({components:{MemberTable:w,MemberFilter:M,PopupMember:H,PopupDetailMember:ee}})],ne);var le=ne,re=le,oe=(a("2130"),Object(C["a"])(re,i,s,!1,null,"52172233",null));t["default"]=oe.exports}}]);
//# sourceMappingURL=chunk-1a3f8b26.85d427ec.js.map