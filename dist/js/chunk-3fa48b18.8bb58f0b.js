(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3fa48b18"],{"03c9":function(t,e,a){},"0cb9":function(t,e,a){"use strict";a("efda")},"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"229f":function(t,e,a){"use strict";a("7ad1")},"3bcb":function(t,e,a){},4168:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"w-100 bo-kyc"},[a("div",{staticClass:"bg-white wallet-header"},[a("div",{staticClass:"be-flex align-center jc-space-between wallet-header__above"},[a("div",{staticClass:"wallet-header__above-tabs be-flex"},t._l(t.tabs,(function(e){return a("div",{key:e.id,staticClass:"tab-item cursor",class:t.$route.name===e.routeName?"tab-active":null,on:{click:function(a){return t.handleChangeTab(e)}}},[a("span",{staticClass:"text-base"},[t._v(t._s(t.$t("menu."+e.title)))])])})),0)])]),a("kyc-filter",{attrs:{listApproveBy:t.listApproveBy},on:{filter:t.handleFilter}}),a("kyc-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],attrs:{query:t.query,data:t.data},on:{rowClick:t.handleRowClick,sizeChange:t.handleSizeChange,pageChange:t.handlePageChange}}),a("kyc-detail",{attrs:{detailRow:t.detailRow},on:{init:t.init}})],1)},s=[],n=a("f3f3"),l=a("c964"),r=a("276c"),c=a("e954"),o=a("920b"),p=a("92a6"),d=(a("96cf"),a("b0c0"),a("9ab4")),u=a("1b40"),b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"w-100 bg-white wallet-table"},[a("div",{staticClass:"wallet-table__below"},[a("base-table",{staticClass:"base-table table-wallet",attrs:{data:t.data,table:t.query,paginationInfo:t.getPaginationInfo},on:{sizeChange:t.handleSizeChange,currentChange:t.handleCurrentChange,rowClick:t.handleRowClick}},[a("el-table-column",{attrs:{label:"#",type:"index",index:t.indexMethod,align:"center",width:"40"}}),a("el-table-column",{attrs:{label:t.$t("kyc.table.fullName"),"min-width":"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"be-flex align-center"},[a("span",{staticClass:"d-ib mr-2"},[t._v(t._s(e.row.firstName+" "+e.row.lastName))])])]}}])}),a("el-table-column",{attrs:{label:t.$t("kyc.table.email"),prop:"email",width:"300"}}),a("el-table-column",{attrs:{label:t.$t("kyc.table.national"),prop:"nationality",width:"140"}}),a("el-table-column",{attrs:{label:t.$t("kyc.table.date"),prop:"createdAt",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("formatDateHourMs")(e.row.createdAt)))])]}}])}),a("el-table-column",{attrs:{label:t.$t("kyc.table.status"),prop:"kycStatus",align:"center",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{class:t.checkType(e.row.kycStatus)},[t._v(t._s(t.checkStatus(e.row.kycStatus)))])]}}])})],1)],1)])},h=[],f=function(t){Object(o["a"])(a,t);var e=Object(p["a"])(a);function a(){return Object(r["a"])(this,a),e.apply(this,arguments)}return Object(c["a"])(a,[{key:"getPaginationInfo",get:function(){return this.$t("paging.customers")}},{key:"checkType",value:function(t){return"Not verified"===t?"status-not-verified":"PENDING"===t?"status-pending":"VERIFIED"===t?"status-verified":"status-rejected"}},{key:"checkStatus",value:function(t){switch(t){case"PENDING":return this.$t("status.pending");case"VERIFIED":return this.$t("status.verified");default:return this.$t("status.rejected")}}},{key:"indexMethod",value:function(t){return(this.query.page-1)*this.query.limit+t+1}},{key:"handleSizeChange",value:function(t){this.$emit("sizeChange",t)}},{key:"handleCurrentChange",value:function(t){this.$emit("pageChange",t)}},{key:"handleRowClick",value:function(t){this.$emit("rowClick",t.row)}}]),a}(u["d"]);Object(d["a"])([Object(u["c"])({required:!0,type:Object,default:{}})],f.prototype,"query",void 0),Object(d["a"])([Object(u["c"])({required:!0,type:Array,default:[]})],f.prototype,"data",void 0),f=Object(d["a"])([u["a"]],f);var v=f,y=v,m=(a("4e2c"),a("2877")),C=Object(m["a"])(y,b,h,!1,null,"1d18e9fe",null),g=C.exports,k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pb-24 pt-24 be-flex align-center kyc-filter"},[a("el-input",{staticClass:"input-search",attrs:{placeholder:t.$t("placeholder.search")},model:{value:t.filter.search,callback:function(e){t.$set(t.filter,"search",e)},expression:"filter.search"}},[a("span",{staticClass:"prefix-search",attrs:{slot:"prefix"},slot:"prefix"},[a("base-icon",{attrs:{icon:"icon-search",size:"24"}})],1)]),a("div",{staticClass:"filter-item"},[a("el-popover",{attrs:{value:t.isVisible,placement:"bottom-start",width:"518",trigger:"click","popper-class":"popper-filter"},on:{show:t.handleShowPopper}},[a("div",{staticClass:"content"},[a("el-form",[a("div",{staticClass:"be-flex jc-space-between row"},[a("el-form-item",{staticClass:"be-flex-item mr-40",attrs:{label:t.$t("label.nationality")}},[a("el-select",{staticClass:"w-100",attrs:{filterable:"",placeholder:t.$t("label.placehoderNationality"),clearable:""},model:{value:t.filter.nationality,callback:function(e){t.$set(t.filter,"nationality",e)},expression:"filter.nationality"}},t._l(t.listCountry,(function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.name}})})),1)],1),a("el-form-item",{staticClass:"be-flex-item",attrs:{label:t.$t("label.from-date")}},[a("el-date-picker",{staticClass:"w-100",attrs:{format:"dd/MM/yyyy","value-format":"yyyy-MM-dd",type:"date"},model:{value:t.filter.fromCreatedAt,callback:function(e){t.$set(t.filter,"fromCreatedAt",e)},expression:"filter.fromCreatedAt"}})],1)],1),a("div",{staticClass:"be-flex jc-space-between row"},[a("el-form-item",{staticClass:"be-flex-item mr-40",attrs:{label:t.$t("label.id-type")}},[a("el-select",{staticClass:"w-100",attrs:{"id-type":"",placeholder:t.$t("label.placehoderidType"),clearable:""},model:{value:t.filter.identificationType,callback:function(e){t.$set(t.filter,"identificationType",e)},expression:"filter.identificationType"}},t._l(t.identificationType,(function(t,e){return a("el-option",{key:e,attrs:{label:t.type,value:t.value}})})),1)],1),a("el-form-item",{staticClass:"be-flex-item",attrs:{label:t.$t("label.to-date")}},[a("el-date-picker",{staticClass:"w-100",attrs:{format:"dd/MM/yyyy","value-format":"yyyy-MM-dd",type:"date"},model:{value:t.filter.toCreatedAt,callback:function(e){t.$set(t.filter,"toCreatedAt",e)},expression:"filter.toCreatedAt"}})],1)],1),a("div",{staticClass:"be-flex jc-space-between row"},[a("el-form-item",{staticClass:"be-flex-item",attrs:{label:t.$t("label.approve-by")}},[a("el-select",{attrs:{filterable:"",remote:"",clearable:"","reserve-keyword":"",placeholder:t.$t("label.placehoderApprove"),"remote-method":t.handleSearchApprove,loading:t.loading},model:{value:t.filter.approvedBy,callback:function(e){t.$set(t.filter,"approvedBy",e)},expression:"filter.approvedBy"}},[a("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMoreApprove,expression:"loadMoreApprove"}],attrs:{"infinite-scroll-delay":"500"}},t._l(t.listApprove,(function(t){return a("el-option",{key:t.id,attrs:{label:t.fullName,value:t.userId}})})),1)])],1)],1)])],1),a("div",{staticClass:"be-flex jc-flex-end footer"},[a("el-button",{staticClass:"btn-default btn-400 btn-h-40 btn-close text-regular",on:{click:t.handleReset}},[t._v(t._s(t.$t("button.reset")))]),a("el-button",{staticClass:"btn-default-bg btn-400 btn-h-40 is-none-border h-40 text-regular",on:{click:t.handleApply}},[t._v(t._s(t.$t("button.apply")))])],1),a("div",{staticClass:"cursor text-filter",staticStyle:{"font-size":"16px"},attrs:{slot:"reference"},slot:"reference"},[a("span",{staticClass:"abicon"},[a("base-icon",{staticStyle:{color:"#5b616e","margin-right":"10px"},attrs:{icon:"icon-filter",size:"18"}})],1),t._v(" "+t._s(t.$t("kyc.filter.filter"))+" ")])])],1),a("div",[a("el-dropdown",{staticClass:"sort",attrs:{trigger:"click"},on:{command:t.handleSort}},[a("span",{staticClass:"abicon sort-title",staticStyle:{"font-size":"16px"}},[a("base-icon",{staticClass:"icon",staticStyle:{color:"#5b616e","margin-right":"10px"},attrs:{icon:"icon-sort",size:"18"}}),t._v(" "+t._s(t.$t("kyc.filter.sort")))],1),a("el-dropdown-menu",{staticClass:"header-downloadapp dropdown-sort",attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.sorts,(function(e,i){return a("el-dropdown-item",{key:i,class:t.sortActive===e.command?"active":null,attrs:{command:e.command,divided:e.divided}},[a("span",{staticClass:"be-flex"},[a("span",{staticClass:"be-flex-item"},[t._v(" "+t._s(e.label)+" ")]),t.sortActive===e.command?a("base-icon",{attrs:{icon:"icon-tick-dropdown",size:"16"}}):t._e()],1)])})),1)],1)],1)],1)},j=[],_=a("d0ff"),w=(a("4de4"),a("ac1f"),a("841c"),a("99af"),a("1847")),O=a("2ef0"),x=a("08ba"),$=a("94d8"),A=Object(x["a"])("kyc"),R=function(t){Object(o["a"])(a,t);var e=Object(p["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.filter={search:"",orderBy:"CREATED_AT",fromCreatedAt:"",toCreatedAt:"",nationality:"",identificationType:"",approvedBy:""},t.loading=!1,t.listApprove=[],t.queryApprove={page:1,limit:20,search:""},t.sorts=[{command:"CREATED_AT",label:t.$i18n.t("kyc.sort.date"),divided:!1,i18n:"kyc.sort.date"},{command:"nationality",label:t.$i18n.t("kyc.sort.country"),divided:!1,i18n:"kyc.sort.country"}],t.sortActive="CREATED_AT",t.listCountry=$,t.identificationType=[{id:0,type:"Id Card",value:"ID_CARD"},{id:1,type:"Passport",value:"PASSPORT"},{id:2,type:"Driver’s License",value:"DRIVER_LICENSE"}],t.isVisible=!1,t.searchText=Object(O["debounce"])((function(e){t.$emit("filter",Object(n["a"])(Object(n["a"])({},t.filter),{},{search:Object(O["trim"])(e)}))}),500),t}return Object(c["a"])(a,[{key:"handleSearch",value:function(t){this.searchText(t)}},{key:"created",value:function(){var t=this;w["a"].$on("changeLang",(function(){console.log("a",window.localStorage.getItem("bc-lang")),Object(O["forEach"])(t.sorts,(function(e){e.label=t.$i18n.t(e.i18n)})),t.$forceUpdate()})),w["a"].$on("changeTab",this.handleChangeTab),this.$emit("filter",this.filter)}},{key:"destroyed",value:function(){w["a"].$off("changeLang"),w["a"].$off("changeTab")}},{key:"handleShowPopper",value:function(){this.isVisible=!0,this.listApprove=Object(_["a"])(this.listApproveBy)}},{key:"handleSearchApprove",value:function(t){var e=this;""!==t?(this.loading=!0,this.queryApprove.page=1,this.queryApprove.search=Object(O["trim"])(t),A.getListApprove(this.queryApprove).then((function(t){e.listApprove=t.content||[],e.loading=!1}))):this.listApprove=this.listApproveBy}},{key:"loadMoreApprove",value:function(){var t=this;this.queryApprove.page+=1,A.getListApprove(this.queryApprove).then((function(e){t.listApprove=[].concat(Object(_["a"])(t.listApprove),Object(_["a"])(e.content))}))}},{key:"resetFilter",value:function(){this.filter={search:"",orderBy:"CREATED_AT",fromCreatedAt:"",toCreatedAt:"",nationality:"",identificationType:"",approvedBy:""}}},{key:"handleChangeTab",value:function(){this.sortActive="CREATED_AT",this.queryApprove={page:1,limit:20,search:""},this.filter.search?this.resetFilter():(this.$emit("filter",Object(n["a"])(Object(n["a"])({},this.filter),{},{orderBy:"CREATED_AT",fromCreatedAt:"",toCreatedAt:"",nationality:"",identificationType:"",approvedBy:""})),this.filter=Object(n["a"])(Object(n["a"])({},this.filter),{},{orderBy:"CREATED_AT",fromCreatedAt:"",toCreatedAt:"",nationality:"",identificationType:"",approvedBy:""}))}},{key:"handleSort",value:function(t){this.sortActive=t,this.filter.orderBy=t,this.$emit("filter",this.filter)}},{key:"handleApply",value:function(){console.log("toCreatedAt",this.filter.toCreatedAt),console.log("fromCreatedAt",this.filter.fromCreatedAt),this.$emit("filter",this.filter),this.isVisible=!1}},{key:"handleReset",value:function(){this.filter=Object(n["a"])(Object(n["a"])({},this.filter),{},{fromCreatedAt:"",toCreatedAt:"",nationality:"",identificationType:"",approvedBy:""}),this.$emit("filter",this.filter),this.isVisible=!1}}]),a}(u["d"]);Object(d["a"])([Object(u["c"])({required:!0,type:Array,default:[]})],R.prototype,"listApproveBy",void 0),Object(d["a"])([Object(u["e"])("filter.search")],R.prototype,"handleSearch",null),R=Object(d["a"])([u["a"]],R);var E=R,T=E,S=(a("497d"),Object(m["a"])(T,k,j,!1,null,"9ac59212",null)),I=S.exports,L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("base-popup",{staticClass:"popup-kyc-detail",class:"KycRejected"===t.$route.name?"popup-reject-style":null,attrs:{name:"popup-kyc-detail",width:"960px",isShowFooter:t.getShowFooter,open:t.handleOpen}},[a("div",{staticClass:"title-popup",attrs:{slot:"title"},slot:"title"},[a("span",[t._v(t._s(t.$t("kyc.popup.title")))])]),"KycRejected"===t.$route.name?a("div",{staticClass:"reason-reject mb-24"},[a("h3",{staticClass:"text-xl text-bold mb-16"},[t._v(t._s(t.$t("kyc.reason-reject")))]),a("ul",{staticClass:"list-reason"},[t._l(t.listReasonReject,(function(e){return a("li",{key:e.id,staticClass:"text-base item"},[t._v(" "+t._s(t.$t("params."+e.key))+" ")])})),t.detail.kycRejectReasons?a("li",{staticClass:"text-base item"},[t._v(t._s(t.$t("kyc.other-reason"))+" "+t._s(t.detail.kycRejectReasons))]):t._e()],2)]):t._e(),"KycRejected"===t.$route.name?a("h3",{staticClass:"text-xl text-bold mb-16"},[t._v(t._s(t.$t("kyc.title")))]):t._e(),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticClass:"be-flex content"},[a("div",{staticClass:"mr-24 detail-left"},[a("div",{staticClass:"detail-item detail-item--above"},[a("span",{staticClass:"title text-l text-bold"},[t._v(t._s(t.$t("kyc.popup.personal-detail")))]),a("div",{staticClass:"wrap"},[a("span",{staticClass:"wrap-small"},[t._v(t._s(t.$t("kyc.popup.f-name")))]),a("span",{staticClass:"name"},[t._v(t._s(t.detail.firstName))])]),a("div",{staticClass:"wrap"},[a("span",{staticClass:"wrap-small"},[t._v(t._s(t.$t("kyc.popup.l-name")))]),a("span",{staticClass:"name"},[t._v(t._s(t.detail.lastName))])]),a("div",{staticClass:"wrap"},[a("span",{staticClass:"wrap-small"},[t._v(t._s(t.$t("kyc.popup.national")))]),a("span",{staticClass:"name"},[t._v(t._s(t.detail.nationality))])])]),a("div",{staticClass:"detail-item detail-item--below"},[a("span",{staticClass:"title text-l text-bold"},[t._v(t._s(t.$t("kyc.popup.id-verification")))]),a("div",{staticClass:"wrap"},[a("span",{staticClass:"wrap-small"},[t._v(t._s(t.$t("kyc.popup.id-type")))]),a("span",{staticClass:"name"},[t._v(t._s(t.detail.identificationType))])]),a("div",{staticClass:"wrap"},[a("span",{staticClass:"wrap-small"},[t._v(t._s(t.$t("kyc.popup.id-number")))]),a("span",{staticClass:"name"},[t._v(t._s(t.detail.identificationNumber))])])])]),a("div",{staticClass:"detail-right"},[a("span",{staticClass:"text-l text-bold mb-24 d-ib"},[t._v(t._s(t.$t("kyc.popup.title-photo")))]),a("div",{staticClass:"be-flex w-100 slider"},[a("el-carousel",{attrs:{"indicator-position":"none",arrow:"always",autoplay:!1}},t._l(t.listImage,(function(e,i){return a("el-carousel-item",{key:i},[a("el-image",{staticClass:"img-fluid",staticStyle:{height:"100%"},attrs:{src:e,"preview-src-list":t.listImage}})],1)})),1)],1)])]),a("div",{staticClass:"footer",attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:"be-flex jc-space-between wrap-button"},[a("div",{staticClass:"btn-left"},[a("el-button",{staticClass:"btn-default btn-close btn-h-40",on:{click:t.handleClose}},[t._v(t._s(t.$t("button.close")))])],1),a("div",{staticClass:"btn-right"},[a("el-button",{staticClass:"btn btn-reject btn-h-40 is-none-border",on:{click:t.handleReject}},[t._v(t._s(t.$t("button.reject")))]),a("el-button",{staticClass:"btn btn-approve btn-h-40 is-none-border",on:{click:t.handleApprove}},[t._v(t._s(t.$t("button.approve")))])],1)])]),a("popup-reject",{on:{reject:t.submitReject}})],1)},N=[],P=(a("1276"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("base-popup",{staticClass:"popup-reject",attrs:{name:"popup-reject",width:"480px",close:t.handleClose}},[a("div",{staticClass:"title-popup",attrs:{slot:"title"},slot:"title"},[a("span",[t._v(t._s(t.$t("kyc.popup.title-reject")))])]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticClass:"content"},[a("div",{staticClass:"checkbox"},[a("span",{staticClass:"d-ib mb-16",staticStyle:{color:"#0a0b0d"}},[t._v(t._s(t.$t("kyc.popup.title-cb")))]),a("el-checkbox-group",{staticClass:"be-flex-column",model:{value:t.checkList,callback:function(e){t.checkList=e},expression:"checkList"}},t._l(t.listReason,(function(e){return a("el-checkbox",{key:e.key,attrs:{label:e.id}},[t._v(t._s(t.$t("params."+e.key)))])})),1)],1),a("span",{staticClass:"d-ib",staticStyle:{"padding-bottom":"8px"}},[t._v(t._s(t.$t("kyc.popup.reason")))]),a("el-input",{attrs:{type:"textarea",placeholder:t.$t("placeholder.reason"),maxlength:"250","show-word-limit":"",rows:"4"},model:{value:t.reason,callback:function(e){t.reason=e},expression:"reason"}})],1),a("div",{staticClass:"footer",attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:"wrap-button"},[a("div",{staticClass:"btn-right"},[a("el-button",{staticClass:"btn-default btn-400 btn-h-40 btn-close",on:{click:t.handleClose}},[t._v(t._s(t.$t("button.cancel")))]),a("el-button",{staticClass:"btn-default-bg btn-400 btn-h-40 is-none-border",on:{click:t.handleReject}},[t._v(t._s(t.$t("button.submit")))])],1)])])])}),q=[],D=(a("a15b"),a("9f48")),B=a("4bb5"),K=Object(B["a"])("bcKyc"),V=function(t){Object(o["a"])(a,t);var e=Object(p["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.checkList=[],t.reason="",t.isLoading=!1,t}return Object(c["a"])(a,[{key:"handleReject",value:function(){if(this.checkList.length){var t={rejectResonIds:this.checkList.join(","),reason:this.reason};this.$emit("reject",t),this.handleClose()}else{var e=this.$t("notify.no-select-reject");this.$message.warning({message:e,duration:5e3})}}},{key:"handleClose",value:function(){this.setOpenPopup({popupName:"popup-reject",isOpen:!1}),this.checkList=[],this.reason=""}}]),a}(Object(u["b"])(D["a"]));Object(d["a"])([K.State("listReason")],V.prototype,"listReason",void 0),V=Object(d["a"])([u["a"]],V);var M=V,z=M,F=(a("0cb9"),Object(m["a"])(z,P,q,!1,null,"09b6217e",null)),G=F.exports,J=Object(x["a"])("kyc"),U=Object(B["a"])("bcKyc"),Q=function(t){Object(o["a"])(a,t);var e=Object(p["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.detail={},t.isLoading=!1,t.listReasonReject=[],t}return Object(c["a"])(a,[{key:"listImage",get:function(){return[this.detail.idPhoto1,this.detail.idPhoto2,this.detail.selfiePhoto]}},{key:"getShowFooter",get:function(){return"KycPending"===this.$route.name}},{key:"handleGetListRejectOfUser",value:function(){var t=this,e=this.detail.kycRejectReasonIds.split(",");this.listReasonReject=e.reduce((function(e,a){var i=Object(O["filter"])(t.listReason,(function(t){return t.id==a}))[0];return e.push(i),e}),[])}},{key:"handleOpen",value:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,this.isLoading=!0,t.next=4,J.getDetailKyc(this.detailRow.userId);case 4:this.detail=t.sent,this.handleGetListRejectOfUser(),this.isLoading=!1,t.next=13;break;case 9:t.prev=9,t.t0=t["catch"](0),this.isLoading=!1,console.log(t.t0);case 13:case"end":return t.stop()}}),t,this,[[0,9]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"handleApprove",value:function(){var t=this,e={ids:[this.detailRow.id]};J.approveKyc(e).then((function(){var e=t.$i18n.t("notify.approve-success");t.$message.success({message:e,duration:5e3}),t.handleClose(),t.$emit("init")}))}},{key:"submitReject",value:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(e){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,J.rejectKyc(Object(n["a"])(Object(n["a"])({},e),{},{ids:[this.detailRow.id]}));case 3:a=this.$i18n.t("notify.reject-success"),this.$message.success({message:a,duration:5e3}),this.handleClose(),this.$emit("init"),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,this,[[0,9]])})));function e(e){return t.apply(this,arguments)}return e}()},{key:"handleReject",value:function(){this.setOpenPopup({popupName:"popup-reject",isOpen:!0})}},{key:"handleClose",value:function(){this.setOpenPopup({popupName:"popup-kyc-detail",isOpen:!1})}}]),a}(Object(u["b"])(D["a"]));Object(d["a"])([Object(u["c"])({required:!0,type:Object,default:{}})],Q.prototype,"detailRow",void 0),Object(d["a"])([U.State("listReason")],Q.prototype,"listReason",void 0),Q=Object(d["a"])([Object(u["a"])({components:{PopupReject:G}})],Q);var H=Q,W=H,X=(a("229f"),Object(m["a"])(W,L,N,!1,null,"e1b86aee",null)),Y=X.exports,Z=Object(B["a"])("bcKyc"),tt=Object(x["a"])("kyc"),et=function(t){Object(o["a"])(a,t);var e=Object(p["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.tabs=[{id:1,title:"Pending",routeName:"KycPending"},{id:2,title:"Verified",routeName:"KycVerified"},{id:3,title:"Rejected",routeName:"KycRejected"}],t.titlePending="",t.tabActive="Pending",t.isLoading=!1,t.data=[],t.detailRow={},t.kycStatus={Pending:"PENDING",Verified:"VERIFIED",Rejected:"REJECTED"},t.query={status:"ACTIVE",kycStatus:"PENDING",orderBy:"CREATED_AT",page:1,limit:10,total:10},t.listApproveBy=[],t.debounceInit=Object(O["debounce"])((function(){t.init()}),300),t}return Object(c["a"])(a,[{key:"created",value:function(){var t=this;this.getListReason(),tt.getListApprove({page:1,limit:20}).then((function(e){t.listApproveBy=e.content||[]}));var e=this.$route.name;this.query.kycStatus="KycPending"===e?"PENDING":"KycVerified"===e?"VERIFIED":"REJECTED"}},{key:"init",value:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,this.isLoading=!0,t.next=4,tt.getListKyc(Object(n["a"])(Object(n["a"])({},this.query),{},{total:null}));case 4:e=t.sent,this.data=e.content||[],this.query.total=e.totalElements,this.isLoading=!1,t.next=14;break;case 10:t.prev=10,t.t0=t["catch"](0),this.isLoading=!1,console.log(t.t0);case 14:case"end":return t.stop()}}),t,this,[[0,10]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"handleChangeTab",value:function(t){this.$router.push({name:t.routeName}),this.query.kycStatus=this.kycStatus[t.title],this.resetQuery(),w["a"].$emit("changeTab")}},{key:"resetQuery",value:function(){this.query=Object(n["a"])(Object(n["a"])({},this.query),{},{page:1,limit:10,search:"",orderBy:"CREATED_AT"})}},{key:"handlePageChange",value:function(t){this.query.page=t,this.init()}},{key:"handleSizeChange",value:function(t){this.query.limit=t,this.init()}},{key:"handleRowClick",value:function(t){this.detailRow=t,this.setOpenPopup({popupName:"popup-kyc-detail",isOpen:!0})}},{key:"handleFilter",value:function(t){this.query=Object(n["a"])(Object(n["a"])({},this.query),t),this.debounceInit()}}]),a}(Object(u["b"])(D["a"]));Object(d["a"])([Z.Action("getListReason")],et.prototype,"getListReason",void 0),et=Object(d["a"])([Object(u["a"])({components:{KycTable:g,KycFilter:I,KycDetail:Y}})],et);var at=et,it=at,st=(a("47ac"),Object(m["a"])(it,i,s,!1,null,"40060b30",null));e["default"]=st.exports},4736:function(t,e,a){},"47ac":function(t,e,a){"use strict";a("03c9")},"497d":function(t,e,a){"use strict";a("3bcb")},"4e2c":function(t,e,a){"use strict";a("4736")},"7ad1":function(t,e,a){},"841c":function(t,e,a){"use strict";var i=a("d784"),s=a("825a"),n=a("1d80"),l=a("129f"),r=a("14c3");i("search",(function(t,e,a){return[function(e){var a=n(this),i=void 0==e?void 0:e[t];return void 0!==i?i.call(e,a):new RegExp(e)[t](String(a))},function(t){var i=a(e,this,t);if(i.done)return i.value;var n=s(this),c=String(t),o=n.lastIndex;l(o,0)||(n.lastIndex=0);var p=r(n,c);return l(n.lastIndex,o)||(n.lastIndex=o),null===p?-1:p.index}]}))},"9f48":function(t,e,a){"use strict";var i=a("276c"),s=a("920b"),n=a("92a6"),l=a("9ab4"),r=a("1b40"),c=a("4bb5"),o=Object(c["a"])("beBase"),p=function(t){Object(s["a"])(a,t);var e=Object(n["a"])(a);function a(){return Object(i["a"])(this,a),e.apply(this,arguments)}return a}(r["d"]);Object(l["a"])([o.Action("setOpenPopup")],p.prototype,"setOpenPopup",void 0),p=Object(l["a"])([r["a"]],p),e["a"]=p},a15b:function(t,e,a){"use strict";var i=a("23e7"),s=a("44ad"),n=a("fc6a"),l=a("a640"),r=[].join,c=s!=Object,o=l("join",",");i({target:"Array",proto:!0,forced:c||!o},{join:function(t){return r.call(n(this),void 0===t?",":t)}})},efda:function(t,e,a){}}]);
//# sourceMappingURL=chunk-3fa48b18.8bb58f0b.js.map