(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-99d082d2"],{"0e3a":function(e,t,a){},"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},1847:function(e,t,a){"use strict";var s=a("2b0e"),i=new s["default"];t["a"]=i},"1b27":function(e,t,a){"use strict";a("7718")},"333b":function(e,t,a){},"348c":function(e,t,a){"use strict";a("b206")},"366e":function(e,t,a){"use strict";a("333b")},"41b1":function(e,t,a){"use strict";a("0e3a")},"54cb":function(e,t,a){"use strict";a("5525")},5525:function(e,t,a){},"5f21":function(e,t,a){},7718:function(e,t,a){},"841c":function(e,t,a){"use strict";var s=a("d784"),i=a("825a"),l=a("1d80"),n=a("129f"),r=a("14c3");s("search",(function(e,t,a){return[function(t){var a=l(this),s=void 0==t?void 0:t[e];return void 0!==s?s.call(t,a):new RegExp(t)[e](String(a))},function(e){var s=a(t,this,e);if(s.done)return s.value;var l=i(this),o=String(e),c=l.lastIndex;n(c,0)||(l.lastIndex=0);var p=r(l,o);return n(l.lastIndex,c)||(l.lastIndex=c),null===p?-1:p.index}]}))},8489:function(e,t,a){"use strict";a("9f9b")},"9f9b":function(e,t,a){},a15b:function(e,t,a){"use strict";var s=a("23e7"),i=a("44ad"),l=a("fc6a"),n=a("a640"),r=[].join,o=i!=Object,c=n("join",",");s({target:"Array",proto:!0,forced:o||!c},{join:function(e){return r.call(l(this),void 0===e?",":e)}})},a450:function(e,t,a){"use strict";a("5f21")},b206:function(e,t,a){},d824:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"w-100 bo-kyc"},[a("div",{staticClass:"bg-white wallet-header"},[a("div",{staticClass:"be-flex align-center jc-space-between wallet-header__above"},[a("div",{staticClass:"wallet-header__above-tabs be-flex"},e._l(e.tabs,(function(t){return a("div",{key:t.id,staticClass:"tab-item cursor",class:e.$route.name===t.routeName?"tab-active":null,on:{click:function(a){return e.handleChangeTab(t)}}},[a("span",{staticClass:"text-base"},[e._v(e._s(e.$t("menu."+t.title)))])])})),0)])]),a("member-filter",{attrs:{"is-change-tab":e.isChangeTab},on:{filter:e.handleFilter,addMember:e.handleAddMember}}),a("member-table",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],attrs:{query:e.query,data:e.data},on:{rowClick:e.handleRowClick,edit:e.handleClickEdit,sizeChange:e.handleSizeChange,pageChange:e.handlePageChange}}),a("popup-member",{attrs:{type:e.type,detailRow:e.detailRow},on:{reload:e.init}}),a("popup-detail-member",{attrs:{detailRow:e.detailRow},on:{openEdit:e.handleClickEdit}})],1)},i=[],l=a("f3f3"),n=a("c964"),r=a("276c"),o=a("e954"),c=a("920b"),p=a("92a6"),u=(a("96cf"),a("b0c0"),a("4de4"),a("9ab4")),d=a("1b40"),b=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"w-100 bg-white wallet-table"},[a("div",{staticClass:"wallet-table__below"},[a("base-table",{staticClass:"base-table table-wallet",attrs:{data:e.data,table:e.query,paginationInfo:e.getPaginationInfo},on:{sizeChange:e.handleSizeChange,currentChange:e.handleCurrentChange,rowClick:e.handleRowClick}},[a("el-table-column",{attrs:{label:"#",type:"index",index:e.indexMethod,align:"center",width:"70"}}),a("el-table-column",{attrs:{label:e.$t("kyc.table.fullName"),"min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"be-flex align-center"},[a("span",{staticClass:"d-ib mr-2"},[e._v(e._s(t.row.fullName))])])]}}])}),a("el-table-column",{attrs:{label:e.$t("kyc.table.email"),prop:"email",width:"330"}}),a("el-table-column",{attrs:{label:e.$t("kyc.table.role"),prop:"roles",width:"230"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.getRole(t.row.roles)))])]}}])}),a("el-table-column",{attrs:{label:e.$t("kyc.table.date"),prop:"createdDate",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("formatDateHourMs")(t.row.createdAt)))])]}}])}),a("el-table-column",{attrs:{prop:"kycStatus",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{on:{click:function(a){return e.handleEdit(t.row)}}},[a("base-icon",{attrs:{icon:"icon-edit",size:"24"}})],1)]}}])})],1)],1)])},m=[],f=(a("a15b"),a("2ef0")),h=function(e){Object(c["a"])(a,e);var t=Object(p["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.isConflickClick=!1,e}return Object(o["a"])(a,[{key:"getPaginationInfo",get:function(){return this.$t("paging.member")}},{key:"indexMethod",value:function(e){return(this.query.page-1)*this.query.limit+e+1}},{key:"handleSizeChange",value:function(e){this.$emit("sizeChange",e)}},{key:"handleCurrentChange",value:function(e){this.$emit("pageChange",e)}},{key:"handleRowClick",value:function(e){this.isConflickClick?this.isConflickClick=!1:this.$emit("rowClick",e.row)}},{key:"handleEdit",value:function(e){this.isConflickClick=!0,this.$emit("edit",e)}},{key:"getRole",value:function(e){var t=this;if(e.length){var a=[];return Object(f["forEach"])(e,(function(e){a.push(t.switchRole(e))})),a.join("; ")}return""}},{key:"switchRole",value:function(e){switch(e){case"SUPERADMIN":return this.$t("member.sort.spadmin");case"ADMIN":return this.$t("member.sort.admin");case"SUPPORT":return this.$t("member.sort.support");case"MARKETING":return this.$t("member.sort.mkt");default:return this.$t("member.sort.accountant")}}}]),a}(d["d"]);Object(u["a"])([Object(d["c"])({required:!0,type:Object,default:{}})],h.prototype,"query",void 0),Object(u["a"])([Object(d["c"])({required:!0,type:Array,default:[]})],h.prototype,"data",void 0),h=Object(u["a"])([d["a"]],h);var v=h,g=v,w=(a("8489"),a("2877")),C=Object(w["a"])(g,b,m,!1,null,"e73af6f0",null),y=C.exports,$=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pb-24 pt-24 be-flex align-center kyc-filter"},[a("el-input",{staticClass:"input-search",attrs:{placeholder:e.$t("placeholder.search")},model:{value:e.filter.search,callback:function(t){e.$set(e.filter,"search",t)},expression:"filter.search"}},[a("span",{staticClass:"prefix-search",attrs:{slot:"prefix"},slot:"prefix"},[a("base-icon",{attrs:{icon:"icon-search",size:"24"}})],1)]),a("div",{staticClass:"be-flex align-center"},[a("div",{staticClass:"filter-role"},[a("el-select",{attrs:{"popper-class":"popper-select-role"},on:{change:e.handleSelectRole},model:{value:e.filter.filter,callback:function(t){e.$set(e.filter,"filter",t)},expression:"filter.filter"}},e._l(e.listRole,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("el-dropdown",{staticClass:"sort",attrs:{trigger:"click"},on:{command:e.handleSort}},[a("span",{staticClass:"abicon sort-title",staticStyle:{"font-size":"16px"}},[a("base-icon",{staticClass:"icon",staticStyle:{color:"#5b616e","margin-right":"10px"},attrs:{icon:"icon-sort",size:"18"}}),e._v(" "+e._s(e.$t("kyc.filter.sort")))],1),a("el-dropdown-menu",{staticClass:"header-downloadapp dropdown-sort",attrs:{slot:"dropdown"},slot:"dropdown"},e._l(e.sorts,(function(t,s){return a("el-dropdown-item",{key:s,class:e.sortActive===t.command?"active":null,attrs:{command:t.command,divided:t.divided}},[a("span",{staticClass:"be-flex"},[a("span",{staticClass:"be-flex-item"},[e._v(" "+e._s(t.label)+" ")]),e.sortActive===t.command?a("base-icon",{attrs:{icon:"icon-tick-dropdown",size:"16"}}):e._e()],1)])})),1)],1)],1),a("button",{staticClass:"btn-default-bg text-sm ml-auto add-member",class:"vi"===e.lang?"w-auto":null,attrs:{type:"button"},on:{click:e.handleAddMember}},[a("span",[e._v(e._s(e.$t("button.add-member")))])])],1)},k=[],O=(a("ac1f"),a("841c"),a("1847")),_=function(e){Object(c["a"])(a,e);var t=Object(p["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.filter={search:"",filter:"ALL",orderBy:3},e.lang="en",e.loading=!1,e.queryApprove={page:1,limit:20,search:""},e.listRole=[{value:"ALL",label:e.$i18n.t("member.sort.all-role")},{value:"SUPERADMIN",label:e.$i18n.t("member.sort.spadmin")},{value:"ADMIN",label:e.$i18n.t("member.sort.admin")},{value:"SUPPORT",label:e.$i18n.t("member.sort.support")},{value:"MARKETING",label:e.$i18n.t("member.sort.mkt")},{value:"ACCOUNTANT",label:e.$i18n.t("member.sort.accountant")}],e.sorts=[{command:1,label:e.$i18n.t("member.sort.full-name"),divided:!1,i18n:"member.sort.full-name"},{command:2,label:e.$i18n.t("member.sort.email"),divided:!1,i18n:"member.sort.email"},{command:3,label:e.$i18n.t("member.sort.create-date"),divided:!1,i18n:"member.sort.create-date"}],e.sortActive=3,e.searchText=Object(f["debounce"])((function(t){e.$emit("filter",Object(l["a"])(Object(l["a"])({},e.filter),{},{search:Object(f["trim"])(t)}))}),500),e}return Object(o["a"])(a,[{key:"handleSearch",value:function(e){this.searchText(e)}},{key:"created",value:function(){this.lang=window.localStorage.getItem("bc-lang"),O["a"].$on("changeTabMember",this.handleChangeTab),this.$emit("filter",this.filter)}},{key:"destroyed",value:function(){O["a"].$off("changeLang"),O["a"].$off("changeTab")}},{key:"resetFilter",value:function(){this.filter={search:"",filter:"ALL",orderBy:3}}},{key:"handleChangeTab",value:function(){this.sortActive=3,this.filter.filter="ALL",this.filter.search?this.resetFilter():(this.$emit("filter",Object(l["a"])(Object(l["a"])({},this.filter),{},{orderBy:3})),this.filter=Object(l["a"])(Object(l["a"])({},this.filter),{},{orderBy:3}))}},{key:"handleSelectRole",value:function(){this.$emit("filter",this.filter)}},{key:"handleSort",value:function(e){this.sortActive=e,this.filter.orderBy=e,this.$emit("filter",this.filter)}},{key:"handleApply",value:function(){this.$emit("filter",this.filter)}},{key:"handleReset",value:function(){this.filter=Object(l["a"])({},this.filter),this.$emit("filter",this.filter)}},{key:"handleAddMember",value:function(){this.$emit("addMember")}}]),a}(d["d"]);Object(u["a"])([Object(d["c"])({required:!0})],_.prototype,"isChangeTab",void 0),Object(u["a"])([Object(d["e"])("filter.search")],_.prototype,"handleSearch",null),_=Object(u["a"])([d["a"]],_);var x=_,j=x,R=(a("366e"),Object(w["a"])(j,$,k,!1,null,"0040f8ee",null)),N=R.exports,A=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("base-popup",{staticClass:"popup-member",attrs:{name:"popup-member",width:"480px",close:e.handleClose,open:e.handleOpen}},[a("div",{staticClass:"title-popup",attrs:{slot:"title"},slot:"title"},[a("span",[e._v(e._s(e.getTitle))])]),a("div",{staticClass:"content"},[a("el-form",{ref:"member",staticClass:"form-item",attrs:{model:e.form,rules:e.rules,autocomplete:"off"}},[a("div",{staticClass:"be-flex jc-space-between"},[a("el-form-item",{staticClass:"be-flex-item mr-16 is-required",attrs:{label:e.$t("label.f-name"),prop:"firstName"}},[a("el-input",{attrs:{placeholder:e.$t("placeholder.f-name"),clearable:""},model:{value:e.form.firstName,callback:function(t){e.$set(e.form,"firstName",t)},expression:"form.firstName"}})],1),a("el-form-item",{staticClass:"be-flex-item is-required",attrs:{label:e.$t("label.l-name"),prop:"lastName"}},[a("el-input",{attrs:{placeholder:e.$t("placeholder.l-name"),clearable:""},model:{value:e.form.lastName,callback:function(t){e.$set(e.form,"lastName",t)},expression:"form.lastName"}})],1)],1),a("el-form-item",{staticClass:"is-required",attrs:{label:e.$t("label.email"),prop:"email"}},[a("el-input",{attrs:{autocomplete:"new-password",readonly:!1,placeholder:e.$t("placeholder.email"),clearable:""},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),"add"===e.type?a("el-form-item",{staticClass:"input-password is-required",attrs:{label:e.$t("label.password"),prop:"password"}},[a("el-popover",{attrs:{placement:"right",width:"auto",trigger:"manual","popper-class":"popper-validate-password"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[[a("div",{staticClass:"check-password"},[a("div",{staticClass:"be-flex align-center check-item"},[e.validate.length?a("base-icon",{attrs:{icon:"icon-tick",size:"16"}}):a("base-icon",{attrs:{icon:"icon-x",size:"16"}}),a("span",{staticClass:"text-xs",staticStyle:{"padding-left":"8px",color:"#5b616e"}},[e._v(e._s(e.$t("validate.length")))])],1),a("div",{staticClass:"be-flex align-center check-item"},[e.validate.lowercase?a("base-icon",{attrs:{icon:"icon-tick",size:"16"}}):a("base-icon",{attrs:{icon:"icon-x",size:"16"}}),a("span",{staticClass:"text-xs",staticStyle:{"padding-left":"8px",color:"#5b616e"}},[e._v(e._s(e.$t("validate.lowercase")))])],1),a("div",{staticClass:"be-flex align-center check-item"},[e.validate.uppercase?a("base-icon",{attrs:{icon:"icon-tick",size:"16"}}):a("base-icon",{attrs:{icon:"icon-x",size:"16"}}),a("span",{staticClass:"text-xs",staticStyle:{"padding-left":"8px",color:"#5b616e"}},[e._v(e._s(e.$t("validate.uppercase")))])],1),a("div",{staticClass:"be-flex align-center check-item"},[e.validate.number?a("base-icon",{attrs:{icon:"icon-tick",size:"16"}}):a("base-icon",{attrs:{icon:"icon-x",size:"16"}}),a("span",{staticClass:"text-xs",staticStyle:{"padding-left":"8px",color:"#5b616e"}},[e._v(e._s(e.$t("validate.number")))])],1),a("div",{staticClass:"be-flex align-center check-item"},[e.validate.specialCharacter?a("base-icon",{attrs:{icon:"icon-tick",size:"16"}}):a("base-icon",{attrs:{icon:"icon-x",size:"16"}}),a("span",{staticClass:"text-xs",staticStyle:{"padding-left":"8px",color:"#5b616e"}},[e._v(e._s(e.$t("validate.specialCharacter")))])],1)])],a("el-input",{attrs:{slot:"reference",type:1==e.showPass?"text":"password",autocomplete:"new-password",placeholder:e.$t("signup.password")},on:{focus:function(t){e.visible=!0},blur:function(t){e.visible=!1}},slot:"reference",model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],2),a("span",{staticClass:"icon-show-password",on:{click:function(t){e.showPass=!e.showPass}}},[a("base-icon",{attrs:{icon:1==e.showPass?"icon-eye-off":"icon-eye",size:"22"}})],1)],1):e._e(),a("el-form-item",{staticClass:"is-required",attrs:{label:e.$t("label.role"),prop:"role"}},[a("el-checkbox-group",{staticClass:"list-role",model:{value:e.form.roles,callback:function(t){e.$set(e.form,"roles",t)},expression:"form.roles"}},[a("el-checkbox",{attrs:{label:"MARKETING"}},[e._v(e._s(e.$t("member.sort.mkt")))]),a("el-checkbox",{attrs:{label:"ACCOUNTANT"}},[e._v(e._s(e.$t("member.sort.accountant")))]),a("el-checkbox",{attrs:{label:"SUPPORT"}},[e._v(e._s(e.$t("member.sort.support")))]),a("el-checkbox",{attrs:{label:"ADMIN"}},[e._v(e._s(e.$t("member.sort.admin")))]),a("el-checkbox",{attrs:{label:"SUPERADMIN"}},[e._v(e._s(e.$t("member.sort.spadmin")))])],1)],1),"edit"===e.type?a("div",{staticClass:"bg-line"}):e._e(),"edit"===e.type?a("div",{staticClass:"be-flex align-center jc-space-between status-active"},[a("span",[e._v(e._s(e.$t("member.popup.status-active")))]),a("el-switch",{staticClass:"switch-status",attrs:{"active-color":"#129961","active-value":"ACTIVE","inactive-value":"INACTIVE"},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}})],1):e._e(),"edit"===e.type?a("div",{staticClass:"bg-line"}):e._e(),"edit"===e.type?a("div",{staticClass:"be-flex align-center jc-space-between status-active"},[a("span",[e._v(e._s(e.$t("member.popup.reset-password")))]),a("el-button",{staticClass:"btn-default btn-close btn-h-40 btn-rs-pass",class:"vi"===e.lang?"btn-vi":null,on:{click:e.handleOpenResetPass}},[e._v(e._s(e.$t("button.reset-pass")))])],1):e._e()],1)],1),a("div",{staticClass:"footer",attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:"be-flex wrap-button",class:"edit"===e.type?"jc-space-between":null},["edit"===e.type?a("div",{staticClass:"btn-left"},[a("el-button",{staticClass:"btn-default btn-close btn-h-40 mr-16 btn-delete",class:"vi"===e.lang?"btn-vi":null,on:{click:e.handleDelete}},[e._v(e._s(e.$t("button.delete-user")))])],1):e._e(),a("div",{staticClass:"btn-right"},[a("el-button",{staticClass:"btn-default btn-close btn-h-40 mr-16",on:{click:e.handleReset}},[e._v(e._s(e.$t("button.reset")))]),a("button",{staticClass:"btn-default-bg text-sm ml-auto add-member",class:"vi"===e.lang&&"add"===e.type?"w-auto":null,attrs:{type:"button"},on:{click:e.handleAddMember}},["add"===e.type?a("span",[e._v(e._s(e.$t("button.add-member-1")))]):a("span",[e._v(e._s(e.$t("button.save")))])])],1)])]),a("popup-confirm",{on:{delete:e.handleSubmitDelete}}),a("popup-reset-pass",{attrs:{detailRow:e.detailRow}})],1)},P=[],S=a("9f48"),z=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("base-popup",{staticClass:"popup-member",attrs:{name:"popup-confirm",width:"400px"}},[a("div",{staticClass:"title-popup",attrs:{slot:"title"},slot:"title"},[a("span",[e._v(e._s(e.$t("member.popup.title-confirm")))])]),a("div",{staticClass:"content",staticStyle:{"padding-bottom":"24px"}},[a("span",[e._v(e._s(e.$t("member.popup.content-confirm")))])]),a("div",{staticClass:"footer",attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:"be-flex wrap-button"},[a("div",{staticClass:"btn-right"},[a("el-button",{staticClass:"btn-default btn-close btn-h-40 mr-16",on:{click:e.handleCancel}},[e._v(e._s(e.$t("button.cancel")))]),a("button",{staticClass:"btn-default-bg text-sm ml-auto add-member",attrs:{type:"button"},on:{click:e.handleSubmit}},[a("span",[e._v(e._s(e.$t("button.submit")))])])],1)])])])},M=[],T=function(e){Object(c["a"])(a,e);var t=Object(p["a"])(a);function a(){return Object(r["a"])(this,a),t.apply(this,arguments)}return Object(o["a"])(a,[{key:"handleCancel",value:function(){this.setOpenPopup({popupName:"popup-confirm",isOpen:!1})}},{key:"handleSubmit",value:function(){this.$emit("delete"),this.handleCancel()}}]),a}(Object(d["b"])(S["a"]));T=Object(u["a"])([Object(d["a"])({components:{}})],T);var I=T,q=I,E=(a("54cb"),Object(w["a"])(q,z,M,!1,null,"0da6509f",null)),L=E.exports,D=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("base-popup",{staticClass:"popup-member",attrs:{name:"popup-reset-pass",width:"400px",close:e.handleClose}},[a("div",{staticClass:"title-popup",attrs:{slot:"title"},slot:"title"},[a("span",[e._v(e._s(e.$t("member.popup.title-reset")))])]),a("div",{staticClass:"content"},[a("el-form",{ref:"reset-pass",staticClass:"form-item",attrs:{model:e.form,rules:e.rules,autocomplete:"off"}},[a("el-form-item",{staticClass:"input-password",attrs:{label:e.$t("label.new-password"),prop:"password"}},[a("el-popover",{attrs:{placement:"right",width:"auto",trigger:"manual","popper-class":"popper-validate-password"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[[a("div",{staticClass:"check-password"},[a("div",{staticClass:"be-flex align-center check-item"},[e.validate.length?a("base-icon",{attrs:{icon:"icon-tick",size:"16"}}):a("base-icon",{attrs:{icon:"icon-x",size:"16"}}),a("span",{staticClass:"text-xs",staticStyle:{"padding-left":"8px",color:"#5b616e"}},[e._v(e._s(e.$t("validate.length")))])],1),a("div",{staticClass:"be-flex align-center check-item"},[e.validate.lowercase?a("base-icon",{attrs:{icon:"icon-tick",size:"16"}}):a("base-icon",{attrs:{icon:"icon-x",size:"16"}}),a("span",{staticClass:"text-xs",staticStyle:{"padding-left":"8px",color:"#5b616e"}},[e._v(e._s(e.$t("validate.lowercase")))])],1),a("div",{staticClass:"be-flex align-center check-item"},[e.validate.uppercase?a("base-icon",{attrs:{icon:"icon-tick",size:"16"}}):a("base-icon",{attrs:{icon:"icon-x",size:"16"}}),a("span",{staticClass:"text-xs",staticStyle:{"padding-left":"8px",color:"#5b616e"}},[e._v(e._s(e.$t("validate.uppercase")))])],1),a("div",{staticClass:"be-flex align-center check-item"},[e.validate.number?a("base-icon",{attrs:{icon:"icon-tick",size:"16"}}):a("base-icon",{attrs:{icon:"icon-x",size:"16"}}),a("span",{staticClass:"text-xs",staticStyle:{"padding-left":"8px",color:"#5b616e"}},[e._v(e._s(e.$t("validate.number")))])],1),a("div",{staticClass:"be-flex align-center check-item"},[e.validate.specialCharacter?a("base-icon",{attrs:{icon:"icon-tick",size:"16"}}):a("base-icon",{attrs:{icon:"icon-x",size:"16"}}),a("span",{staticClass:"text-xs",staticStyle:{"padding-left":"8px",color:"#5b616e"}},[e._v(e._s(e.$t("validate.specialCharacter")))])],1)])],a("el-input",{attrs:{slot:"reference",type:1==e.showPass?"text":"password",autocomplete:"new-password",placeholder:e.$t("placeholder.password")},on:{focus:function(t){e.visible=!0},blur:function(t){e.visible=!1}},slot:"reference",model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],2),a("span",{staticClass:"icon-show-password",on:{click:function(t){e.showPass=!e.showPass}}},[a("base-icon",{attrs:{icon:1==e.showPass?"icon-eye-off":"icon-eye",size:"22"}})],1)],1)],1)],1),a("div",{staticClass:"footer",attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:"be-flex wrap-button"},[a("div",{staticClass:"btn-right"},[a("el-button",{staticClass:"btn-default btn-close btn-h-40 mr-16",on:{click:e.handleCancel}},[e._v(e._s(e.$t("button.cancel")))]),a("button",{staticClass:"btn-default-bg text-sm ml-auto add-member",attrs:{type:"button"},on:{click:e.handleSubmit}},[a("span",[e._v(e._s(e.$t("button.save")))])])],1)])])])},U=[],V=a("08ba"),B=Object(V["a"])("member"),F=function(e){Object(c["a"])(a,e);var t=Object(p["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.showPass=!1,e.visible=!1,e.validate={length:!1,number:!1,uppercase:!1,lowercase:!1,specialCharacter:!1},e.form={password:""},e.regLow=/(?=.*[a-z])/g,e.regUp=/(?=.*[A-Z])/g,e.regNumber=/(?=.*[0-9])/g,e.regSpecial=/(?=.*[!@#$%^&*()_=+{}:;"'/?><.,-])/g,e.rules={password:[{required:!0,message:e.$t("member.validate.wrong-password"),trigger:"blur"},{pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,message:e.$t("member.validate.checkpass"),trigger:"blur"}]},e}return Object(o["a"])(a,[{key:"watchPassword",value:function(e){this.validate.length=e.length>=8,this.validate.number=this.regNumber.test(e),this.validate.uppercase=this.regUp.test(e),this.validate.lowercase=this.regLow.test(e),this.validate.specialCharacter=this.regSpecial.test(e)}},{key:"handleCancel",value:function(){this.setOpenPopup({popupName:"popup-reset-pass",isOpen:!1})}},{key:"handleClose",value:function(){this.showPass=!1,this.form.password="",this.$refs["reset-pass"].clearValidate()}},{key:"handleSubmit",value:function(){var e,t=this;null===(e=this.$refs["reset-pass"])||void 0===e||e.validate((function(e){if(e){var a,s={email:t.detailRow.email,password:null===(a=t.$options.filters)||void 0===a?void 0:a.encryptPassword(t.form.password)};B.resetPassWordMember(s).then((function(){var e=t.$t("notify.reset-pass-succsess");t.$message.success({message:e,duration:5e3}),t.handleCancel()}))}}))}}]),a}(Object(d["b"])(S["a"]));Object(u["a"])([Object(d["c"])({required:!1,type:Object,default:function(){return{}}})],F.prototype,"detailRow",void 0),Object(u["a"])([Object(d["e"])("form.password")],F.prototype,"watchPassword",null),F=Object(u["a"])([Object(d["a"])({components:{}})],F);var Z=F,G=Z,K=(a("a450"),Object(w["a"])(G,D,U,!1,null,"7e14f1ed",null)),H=K.exports,J=Object(V["a"])("member"),Q=function(e){Object(c["a"])(a,e);var t=Object(p["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.detail={},e.isLoading=!1,e.showPass=!1,e.visible=!1,e.tabActive=0,e.lang="en",e.form={firstName:"",lastName:"",email:"",roles:[]},e.validate={length:!1,number:!1,uppercase:!1,lowercase:!1,specialCharacter:!1},e.regLow=/(?=.*[a-z])/g,e.regUp=/(?=.*[A-Z])/g,e.regNumber=/(?=.*[0-9])/g,e.regSpecial=/(?=.*[!@#$%^&*()_=+{}:;"'/?><.,-])/g,e.rules={lastName:[{required:!0,message:e.$t("member.validate.lastname"),trigger:"blur"},{pattern:/^.{2,}$/,message:e.$t("member.validate.lastnameLength"),trigger:"blur"}],firstName:[{required:!0,message:e.$t("member.validate.firstname"),trigger:"blur"},{pattern:/^.{2,}$/,message:e.$t("member.validate.firstnameLength"),trigger:"blur"}],email:[{required:!0,message:e.$t("member.validate.wrong-email"),trigger:"blur"},{type:"email",message:e.$t("member.validate.wrong-email-type"),trigger:"blur"}],password:[{required:!0,message:e.$t("member.validate.wrong-password"),trigger:"blur"},{pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,message:e.$t("member.validate.checkpass"),trigger:"blur"}]},e}return Object(o["a"])(a,[{key:"getTitle",get:function(){return"add"===this.type?this.$t("member.popup.title-add"):this.$t("member.popup.title-edit")}},{key:"watchPassword",value:function(e){this.validate.length=e.length>=8,this.validate.number=this.regNumber.test(e),this.validate.uppercase=this.regUp.test(e),this.validate.lowercase=this.regLow.test(e),this.validate.specialCharacter=this.regSpecial.test(e)}},{key:"handleOpen",value:function(){this.lang=window.localStorage.getItem("bc-lang"),"edit"===this.type&&(this.form=Object(l["a"])({},this.detailRow))}},{key:"handleClose",value:function(){this.showPass=!1,this.$refs.member.clearValidate(),this.form={firstName:"",lastName:"",email:"",roles:[]}}},{key:"handleReset",value:function(){this.showPass=!1,this.$refs.member.clearValidate(),"add"===this.type?this.form={firstName:"",lastName:"",email:"",roles:[]}:this.form=Object(l["a"])({},this.detailRow)}},{key:"handleDelete",value:function(){this.setOpenPopup({popupName:"popup-confirm",isOpen:!0})}},{key:"handleOpenResetPass",value:function(){this.setOpenPopup({popupName:"popup-reset-pass",isOpen:!0})}},{key:"handleAddMember",value:function(){var e,t=this;null===(e=this.$refs["member"])||void 0===e||e.validate((function(e){if(e)if("add"===t.type){var a,s=null===(a=t.$options.filters)||void 0===a?void 0:a.encryptPassword(t.form.password);J.createMember(Object(l["a"])(Object(l["a"])({},t.form),{},{password:s})).then((function(){var e=t.$t("notify.add-user-succsess");t.$message.success({message:e,duration:5e3}),t.setOpenPopup({popupName:"popup-member",isOpen:!1}),t.$emit("reload")}))}else J.updateMember(t.detailRow.userId,Object(l["a"])(Object(l["a"])({},t.form),{},{fullName:null})).then((function(){var e=t.$t("notify.update-user-succsess");t.$message.success({message:e,duration:5e3}),t.setOpenPopup({popupName:"popup-member",isOpen:!1}),t.$emit("reload")}))}))}},{key:"handleSubmitDelete",value:function(){var e=this;J.deleteMember(this.detailRow.userId).then((function(){var t=e.$t("notify.delete-user-success");e.$message.success({message:t,duration:5e3}),e.setOpenPopup({popupName:"popup-member",isOpen:!1}),e.$emit("reload")}))}}]),a}(Object(d["b"])(S["a"]));Object(u["a"])([Object(d["c"])({required:!1,type:Object,default:function(){return{}}})],Q.prototype,"detailRow",void 0),Object(u["a"])([Object(d["c"])({required:!0,type:String,default:"add"})],Q.prototype,"type",void 0),Object(u["a"])([Object(d["e"])("form.password")],Q.prototype,"watchPassword",null),Q=Object(u["a"])([Object(d["a"])({components:{PopupConfirm:L,PopupResetPass:H}})],Q);var W=Q,X=W,Y=(a("348c"),Object(w["a"])(X,A,P,!1,null,"344b0264",null)),ee=Y.exports,te=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("base-popup",{staticClass:"popup-member",attrs:{name:"popup-detail-member",width:"600px",isShowFooter:!1}},[a("div",{staticClass:"title-popup",attrs:{slot:"title"},slot:"title"},[a("span",[e._v(e._s(e.$t("member.popup.title-detail")))])]),a("div",{staticClass:"content"},[a("div",{staticClass:"content__top"},[a("div",{staticClass:"avatar"},[e.detailRow.avatar?a("img",{attrs:{src:e.detailRow.avatar,alt:""}}):a("base-icon",{staticStyle:{display:"inline-flex"},attrs:{icon:"default-avatar",size:"80"}})],1),a("span",{staticClass:"text-xl text-bold"},[e._v(e._s(e.detailRow.fullName))]),a("div",{staticClass:"roles mb-16"},e._l(e.detailRow.roles,(function(t){return a("span",{key:t,staticClass:"text-sm role-item"},[e._v(e._s(e.switchRole(t)))])})),0),a("div",{staticClass:"cursor wrap-edit",on:{click:e.handleEdit}},[a("base-icon",{staticStyle:{display:"inline-flex"},attrs:{icon:"icon-edit",size:"16"}}),a("span",[e._v(e._s(e.$t("member.popup.edit")))])],1)]),a("div",{staticClass:"bg-line"}),a("div",{staticClass:"content__bottom"},[a("div",{staticClass:"be-flex align-center jc-space-between item"},[a("span",[e._v(e._s(e.$t("member.popup.email")))]),a("span",{staticClass:"text-base"},[e._v(e._s(e.detailRow.email))])]),a("div",{staticClass:"be-flex align-center jc-space-between item"},[a("span",[e._v(e._s(e.$t("member.popup.create-date")))]),a("span",{staticClass:"text-base"},[e._v(e._s(e._f("formatDateHourMs")(e.detailRow.createdAt)))])]),a("div",{staticClass:"be-flex align-center jc-space-between item"},[a("span",[e._v(e._s(e.$t("member.popup.last-login")))]),a("span",{staticClass:"text-base"},[e._v(e._s(e._f("formatDateHourMs")(e.detailRow.lastTimeLogin)))])]),a("div",{staticClass:"be-flex align-center jc-space-between item"},[a("span",[e._v(e._s(e.$t("member.popup.active-status")))]),a("span",{staticClass:"text-base",class:"INACTIVE"===e.detailRow.status?"inactive":"active"},[e._v(e._s(e.switchStatus(e.detailRow.status)))])])])])])},ae=[],se=function(e){Object(c["a"])(a,e);var t=Object(p["a"])(a);function a(){return Object(r["a"])(this,a),t.apply(this,arguments)}return Object(o["a"])(a,[{key:"switchRole",value:function(e){switch(e){case"SUPERADMIN":return this.$t("member.sort.spadmin");case"ADMIN":return this.$t("member.sort.admin");case"SUPPORT":return this.$t("member.sort.support");case"MARKETING":return this.$t("member.sort.mkt");default:return this.$t("member.sort.accountant")}}},{key:"switchStatus",value:function(e){switch(e){case"INACTIVE":return"Inactive";default:return"Active"}}},{key:"handleEdit",value:function(){this.$emit("openEdit",this.detailRow),this.setOpenPopup({popupName:"popup-detail-member",isOpen:!1})}}]),a}(Object(d["b"])(S["a"]));Object(u["a"])([Object(d["c"])({required:!1,type:Object,default:function(){return{}}})],se.prototype,"detailRow",void 0),se=Object(u["a"])([Object(d["a"])({components:{}})],se);var ie=se,le=ie,ne=(a("1b27"),Object(w["a"])(le,te,ae,!1,null,"6c0a6392",null)),re=ne.exports,oe=a("4bb5"),ce=Object(oe["a"])("bcKyc"),pe=Object(oe["a"])("beAuth"),ue=Object(V["a"])("member"),de=function(e){Object(c["a"])(a,e);var t=Object(p["a"])(a);function a(){var e;return Object(r["a"])(this,a),e=t.apply(this,arguments),e.tabs=[{id:1,title:"member-active",routeName:"MemberActive"},{id:2,title:"member-inactive",routeName:"MemberInactive"}],e.titlePending="",e.tabActive="Pending",e.isLoading=!1,e.isChangeTab=!1,e.isConflickClick=!1,e.type="add",e.data=[],e.detailRow={},e.query={orderBy:3,page:1,limit:10,total:10,status:null},e.objType={MemberActive:"ACTIVE",MemberInactive:"INACTIVE"},e.debounceInit=Object(f["debounce"])((function(){e.init()}),300),e}return Object(o["a"])(a,[{key:"created",value:function(){var e=this.$route.name;this.query.status=this.objType[e]}},{key:"init",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.isLoading=!0,t=this.$route.name,this.query.status=this.objType[t],e.next=6,ue.getListMember(Object(l["a"])(Object(l["a"])({},this.query),{},{total:null}));case 6:a=e.sent,this.data=a.members||[],this.query.total=a.totalElement,this.isLoading=!1,e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](0),this.isLoading=!1;case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"handleChangeTab",value:function(e){var t=this;this.isChangeTab=1!==e.id,this.$router.push({name:e.routeName}).then((function(){t.resetQuery(),O["a"].$emit("changeTabMember")}))}},{key:"resetQuery",value:function(){this.query=Object(l["a"])(Object(l["a"])({},this.query),{},{page:1,limit:10,search:"",orderBy:3})}},{key:"handlePageChange",value:function(e){this.query.page=e,this.init()}},{key:"handleSizeChange",value:function(e){this.query.limit=e,this.init()}},{key:"handleRowClick",value:function(e){this.detailRow=e,this.setOpenPopup({popupName:"popup-detail-member",isOpen:!0})}},{key:"handleClickEdit",value:function(e){this.type="edit",this.detailRow=e,this.setOpenPopup({popupName:"popup-member",isOpen:!0})}},{key:"handleFilter",value:function(e){this.isLoading||(this.query=Object(l["a"])(Object(l["a"])(Object(l["a"])({},this.query),e),{},{filter:"ALL"===e.filter?null:e.filter,page:1,limit:10}),this.init())}},{key:"handleAddMember",value:function(){this.type="add",this.setOpenPopup({popupName:"popup-member",isOpen:!0})}}]),a}(Object(d["b"])(S["a"]));Object(u["a"])([ce.Action("getListReason")],de.prototype,"getListReason",void 0),Object(u["a"])([pe.Getter("listModuleCanView")],de.prototype,"listModuleCanView",void 0),de=Object(u["a"])([Object(d["a"])({components:{MemberTable:y,MemberFilter:N,PopupMember:ee,PopupDetailMember:re}})],de);var be=de,me=be,fe=(a("41b1"),Object(w["a"])(me,s,i,!1,null,"1259a52b",null));t["default"]=fe.exports}}]);