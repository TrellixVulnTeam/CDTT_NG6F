(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0c1ce360"],{"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"144c":function(t,e,a){"use strict";a("c7b0")},"2b15":function(t,e,a){},3029:function(t,e,a){},4101:function(t,e,a){"use strict";a("d09d")},"52d0":function(t,e,a){"use strict";a("57ae")},"57ae":function(t,e,a){},"6dfb":function(t,e,a){},"841c":function(t,e,a){"use strict";var n=a("d784"),l=a("825a"),i=a("1d80"),s=a("129f"),c=a("14c3");n("search",(function(t,e,a){return[function(e){var a=i(this),n=void 0==e?void 0:e[t];return void 0!==n?n.call(e,a):new RegExp(e)[t](String(a))},function(t){var n=a(e,this,t);if(n.done)return n.value;var i=l(this),o=String(t),r=i.lastIndex;s(r,0)||(i.lastIndex=0);var u=c(i,o);return s(i.lastIndex,r)||(i.lastIndex=r),null===u?-1:u.index}]}))},"94e7":function(t,e,a){"use strict";a("3029")},a91e:function(t,e,a){"use strict";a("2b15")},c7b0:function(t,e,a){},d09d:function(t,e,a){},d2b0:function(t,e,a){"use strict";a("6dfb")},fd70:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"w-100 bo-kyc"},[a("div",{staticClass:"bg-white wallet-header"},[a("div",{staticClass:"be-flex align-center jc-space-between wallet-header__above"},[a("div",{staticClass:"wallet-header__above-tabs be-flex"},t._l(t.tabs,(function(e){return a("div",{key:e.id,staticClass:"tab-item cursor",class:t.$route.name===e.routeName?"tab-active":null,on:{click:function(a){return t.handleChangeTab(e)}}},[a("span",{staticClass:"text-base"},[t._v(t._s(t.$t("menu."+e.title)))])])})),0)])]),a("div",{staticClass:"container bg-white wallet-header",staticStyle:{width:"100%"}},[a("div",{staticClass:"col-width col-margin"},[a("div",{staticClass:"sack-banlance"},[a("span",{staticClass:"text1"},[t._v(" "+t._s(t.$t("balance.investor"))+" ")]),a("div",[a("base-icon",{attrs:{icon:"icon-people",size:"19"}})],1)]),a("span",{staticClass:"number2"},[t._v(" "+t._s(t.numOfInvestor))]),a("div",[a("span",{staticClass:"text3"},[t._v(" of total "+t._s(t._f("formatNumber")(t.numOfUser)))])])]),a("div",{staticClass:"col-width col-margin"},[a("div",{staticClass:"sack-banlance"},[a("span",{staticClass:"text1"},[t._v(t._s(t.$t("balance.total-available")))]),a("div",[a("base-icon",{attrs:{icon:"icon-swap",size:"19"}})],1)]),a("span",{staticClass:"number2"},[t._v(" "+t._s(t._f("formatNumber")(t.totalAvailable)))]),a("span",{staticClass:"text3"},[t._v(" ~ $"+t._s(t._f("convertAmountDecimal")(t.totalAvailableUSD,this.tabActive)))])]),a("div",{staticClass:"col-width col-margin"},[a("div",{staticClass:"sack-banlance"},[a("span",{staticClass:"text1"},[t._v(t._s(t.$t("balance.total-locked")))]),a("div",[a("base-icon",{attrs:{icon:"icon-lock-balance",size:"19"}})],1)]),a("span",{staticClass:"number2"},[t._v(" "+t._s(t._f("formatNumber")(t.totalLocked)))]),a("span",{staticClass:"text3"},[t._v("~ $"+t._s(t._f("convertAmountDecimal")(t.totalLockedUSD,this.tabActive)))])]),a("div",{staticClass:"col-width col-margin"},[a("div",{staticClass:"sack-banlance"},[a("span",{staticClass:"text1"},[t._v(" "+t._s(t.$t("balance.balance-wallet")))]),a("div",[a("base-icon",{attrs:{icon:"icon-wallet",size:"19"}})],1)]),a("span",{staticClass:"number2"},[t._v(" "+t._s(t._f("formatNumber")(t.totalBalance)))]),a("span",{staticClass:"text3"},[t._v(" ~ $"+t._s(t._f("convertAmountDecimal")(t.totalBalanceUSD,this.tabActive)))])])]),a("balance-filter",{attrs:{listApproveBy:t.listApproveBy},on:{filterBalance:t.handleFilter}}),a("balance-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],attrs:{query:t.query,data:t.propdataTable},on:{rowClick:t.handleRowClick,sizeChange:t.handleSizeChange,pageChange:t.handlePageChange}}),a("balance-detail",{attrs:{detailRow:t.detailRow,data:t.dataDetail,"tab-active-filter":t.tabActive}})],1)},l=[],i=a("f3f3"),s=a("c964"),c=a("276c"),o=a("e954"),r=a("920b"),u=a("92a6"),d=(a("96cf"),a("ac1f"),a("841c"),a("9ab4")),b=a("1b40"),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"w-100 bg-white wallet-table"},[a("div",{staticClass:"wallet-table__below"},[a("base-table",{staticClass:"base-table table-wallet",attrs:{data:t.data,table:t.query,paginationInfo:t.getPaginationInfo},on:{sizeChange:t.handleSizeChange,currentChange:t.handleCurrentChange,rowClick:t.handleRowClick}},[a("el-table-column",{attrs:{label:"#",type:"index",index:t.indexMethod,align:"center",width:"60"}}),a("el-table-column",{attrs:{label:t.$t("kyc.table.fullName"),prop:"fullName"}}),a("el-table-column",{attrs:{label:t.$t("kyc.table.email"),prop:"email"}}),a("el-table-column",{attrs:{label:t.$t("balance.available"),align:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"box-paid"},[a("p",{staticClass:"text-paid fw-400 fs-16"},[t._v(t._s(t._f("convertAmountDecimal")(e.row.availableBalance,e.row.availableBalanceUSD))+" "+t._s(e.row.currency))]),a("p",{staticClass:"avi fw-400 fs-14",staticStyle:{color:"#5b616e"}},[t._v("~ $"+t._s(t._f("convertAmountDecimal")(e.row.availableBalanceUSD,e.row.currency)))])])]}}])}),a("el-table-column",{attrs:{label:t.$t("balance.lockedAmount"),align:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"box-paid"},[a("p",{staticClass:"text-paid fw-400 fs-16"},[t._v(" "+t._s(t._f("convertAmountDecimal")(e.row.totalLockedAmount,e.row.availableBtotalLockedAmountUSDalanceUSD))+" "+t._s(e.row.currency)+" ")]),a("p",{staticClass:"avi fw-400 fs-14",staticStyle:{color:"#5b616e"}},[t._v("~ $"+t._s(t._f("convertAmountDecimal")(e.row.totalLockedAmountUSD,e.row.currency)))])])]}}])}),a("el-table-column",{attrs:{label:t.$t("balance.balance"),align:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"box-paid"},[a("p",{staticClass:"text-paid fw-400 fs-16"},[t._v(t._s(t._f("convertAmountDecimal")(e.row.balance,e.row.availableBalanceUSD))+" "+t._s(e.row.currency))]),a("p",{staticClass:"avi fw-400 fs-14",staticStyle:{color:"#5b616e"}},[t._v("~ $"+t._s(t._f("convertAmountDecimal")(e.row.balanceUSD,e.row.currency)))])])]}}])})],1)],1)])},f=[],m=function(t){Object(r["a"])(a,t);var e=Object(u["a"])(a);function a(){return Object(c["a"])(this,a),e.apply(this,arguments)}return Object(o["a"])(a,[{key:"getPaginationInfo",get:function(){return this.$t("paging.investor")}},{key:"checkType",value:function(t){return"Not verified"===t?"status-not-verified":"PENDING"===t?"status-pending":"VERIFIED"===t?"status-verified":"status-rejected"}},{key:"getDataSelectTab",value:function(){console.log("1")}},{key:"checkStatus",value:function(t){switch(t){case"PENDING":return this.$t("status.pending");case"VERIFIED":return this.$t("status.verified");default:return this.$t("status.rejected")}}},{key:"indexMethod",value:function(t){return(this.query.page-1)*this.query.limit+t+1}},{key:"handleSizeChange",value:function(t){this.$emit("sizeChange",t)}},{key:"handleCurrentChange",value:function(t){this.$emit("pageChange",t)}},{key:"handleRowClick",value:function(t){this.$emit("rowClick",t.row)}}]),a}(b["d"]);Object(d["a"])([Object(b["c"])({required:!0,type:Object,default:{}})],m.prototype,"query",void 0),Object(d["a"])([Object(b["c"])({required:!0,type:Array,default:[]})],m.prototype,"data",void 0),m=Object(d["a"])([b["a"]],m);var h=m,v=h,y=(a("52d0"),a("2877")),g=Object(y["a"])(v,p,f,!1,null,"63913186",null),C=g.exports,_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pb-24 pt-24 be-flex align-center kyc-filter"},[a("el-input",{staticClass:"input-search",attrs:{placeholder:t.$t("placeholder.search")},model:{value:t.filterBalance.search,callback:function(e){t.$set(t.filterBalance,"search",e)},expression:"filterBalance.search"}},[a("span",{staticClass:"prefix-search",attrs:{slot:"prefix"},slot:"prefix"},[a("base-icon",{attrs:{icon:"icon-search",size:"24"}})],1)]),a("div",{staticClass:"filter-item"},[a("el-popover",{attrs:{value:t.isVisible,placement:"bottom-start",width:"518",trigger:"click","popper-class":"popper-filter"},on:{show:t.handleShowPopper}},[a("div",{staticClass:"content"},[a("el-form",[a("div",{staticClass:"be-flex jc-space-between row"},[a("el-form-item",{staticClass:"be-flex-item mr-40",attrs:{label:t.$t("label.available-amount")}},[a("el-row",{staticClass:"flex_line"},[a("el-col",{attrs:{span:11}},[a("el-input",{attrs:{type:"text",placeholder:"From"},nativeOn:{keyup:function(e){return t.numberFormat(e)}},model:{value:t.filterBalance.fromAvailableAmount,callback:function(e){t.$set(t.filterBalance,"fromAvailableAmount",e)},expression:"filterBalance.fromAvailableAmount"}})],1),a("el-col",{staticStyle:{float:"right"},attrs:{span:11}},[a("el-input",{attrs:{type:"text",placeholder:"To"},nativeOn:{keyup:function(e){return t.numberFormat(e)}},model:{value:t.filterBalance.toAvailableAmount,callback:function(e){t.$set(t.filterBalance,"toAvailableAmount",e)},expression:"filterBalance.toAvailableAmount"}})],1)],1)],1)],1),a("div",{staticClass:"be-flex jc-space-between row"},[a("el-form-item",{staticClass:"be-flex-item mr-40",attrs:{label:t.$t("label.locked-amount")}},[a("el-row",{staticClass:"flex_line"},[a("el-col",{attrs:{span:11}},[a("el-input",{attrs:{type:"text",placeholder:"From"},nativeOn:{keyup:function(e){return t.numberFormat(e)}},model:{value:t.filterBalance.fromLockedAmount,callback:function(e){t.$set(t.filterBalance,"fromLockedAmount",e)},expression:"filterBalance.fromLockedAmount"}})],1),a("el-col",{staticStyle:{float:"right"},attrs:{span:11}},[a("el-input",{attrs:{type:"text",placeholder:"To"},nativeOn:{keyup:function(e){return t.numberFormat(e)}},model:{value:t.filterBalance.toLockedAmount,callback:function(e){t.$set(t.filterBalance,"toLockedAmount",e)},expression:"filterBalance.toLockedAmount"}})],1)],1)],1)],1),a("div",{staticClass:"be-flex jc-space-between row"},[a("el-form-item",{staticClass:"be-flex-item mr-40",attrs:{label:t.$t("label.balance")}},[a("el-row",{staticClass:"flex_line"},[a("el-col",{attrs:{span:11}},[a("el-input",{attrs:{type:"text",placeholder:"From"},nativeOn:{keyup:function(e){return t.numberFormat(e)}},model:{value:t.filterBalance.fromBalanceAmount,callback:function(e){t.$set(t.filterBalance,"fromBalanceAmount",e)},expression:"filterBalance.fromBalanceAmount"}})],1),a("el-col",{staticStyle:{float:"right"},attrs:{span:11}},[a("el-input",{attrs:{type:"text",placeholder:"To"},nativeOn:{keyup:function(e){return t.numberFormat(e)}},model:{value:t.filterBalance.toBalanceAmount,callback:function(e){t.$set(t.filterBalance,"toBalanceAmount",e)},expression:"filterBalance.toBalanceAmount"}})],1)],1)],1)],1)])],1),a("div",{staticClass:"be-flex jc-flex-end footer"},[a("el-button",{staticClass:"btn-default btn-400 btn-h-40 btn-close text-regular",on:{click:t.handleReset}},[t._v(t._s(t.$t("button.reset")))]),a("el-button",{staticClass:"btn-default-bg btn-400 btn-h-40 is-none-border h-40 text-regular",on:{click:t.handleApply}},[t._v(t._s(t.$t("button.apply")))])],1),a("div",{staticClass:"cursor text-filter",staticStyle:{"font-size":"16px"},attrs:{slot:"reference"},slot:"reference"},[a("span",{staticClass:"abicon"},[a("base-icon",{staticStyle:{color:"#5b616e","margin-right":"10px"},attrs:{icon:"icon-filter",size:"18"}})],1),t._v(" "+t._s(t.$t("kyc.filter.filter"))+" ")])])],1),a("div",[a("el-dropdown",{staticClass:"sort",attrs:{trigger:"click"},on:{command:t.handleSort}},[a("span",{staticClass:"abicon sort-title",staticStyle:{"font-size":"16px"}},[a("base-icon",{staticClass:"icon",staticStyle:{color:"#5b616e","margin-right":"10px"},attrs:{icon:"icon-sort",size:"18"}}),t._v(" "+t._s(t.$t("kyc.filter.sort")))],1),a("el-dropdown-menu",{staticClass:"header-downloadapp dropdown-sort",attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.sorts,(function(e,n){return a("el-dropdown-item",{key:n,class:t.sortActive===e.command?"active":null,attrs:{command:e.command,divided:e.divided}},[a("span",{staticClass:"be-flex"},[a("span",{staticClass:"be-flex-item"},[t._v(" "+t._s(e.label)+" ")]),t.sortActive===e.command?a("base-icon",{attrs:{icon:"icon-tick-dropdown",size:"16"}}):t._e()],1)])})),1)],1)],1)],1)},A=[],k=a("d0ff"),w=(a("99af"),a("1847")),B=a("2ef0"),O=a("08ba"),j=a("94d8"),x=Object(O["a"])("kyc"),$=function(t){Object(r["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(c["a"])(this,a),t=e.apply(this,arguments),t.filterBalance={search:"",toBalanceAmount:"",fromBalanceAmount:"",toLockedAmount:"",fromLockedAmount:"",toAvailableAmount:"",fromAvailableAmount:"",orderBy:""},t.loading=!1,t.listApprove=[],t.queryApprove={page:1,limit:20,search:""},t.sorts=[{command:"1",label:t.$i18n.t("kyc.sort.date"),divided:!1,i18n:"kyc.sort.date"},{command:"2",label:t.$i18n.t("balance.lastChange"),divided:!1,i18n:"balance.lastChange"},{command:"3",label:t.$i18n.t("balance.balance"),divided:!1,i18n:"balance.balance"},{command:"4",label:t.$i18n.t("balance.lockedAmount"),divided:!1,i18n:"balance.lockedAmount"},{command:"5",label:t.$i18n.t("balance.availableAmout"),divided:!1,i18n:"balance.availableAmout"},{command:"6",label:t.$i18n.t("balance.name"),divided:!1,i18n:"balance.name"}],t.sortActive="1",t.listCountry=j,t.identificationType=[{id:0,type:"Id Card",value:"ID_CARD"},{id:1,type:"Passport",value:"PASSPORT"},{id:2,type:"Driver’s License",value:"DRIVER_LICENSE"}],t.isVisible=!1,t.searchText=Object(B["debounce"])((function(e){t.$emit("filterBalance",Object(i["a"])(Object(i["a"])({},t.filterBalance),{},{search:Object(B["trim"])(e)}))}),500),t}return Object(o["a"])(a,[{key:"handleSearch",value:function(t){this.searchText(t)}},{key:"numberFormat",value:function(t){var e,a=t,n=a.target.value;n.length>0&&(n=n.replaceAll(",",""),n=parseInt(n),isNaN(n)?a.target.value=0:(n=null===(e=this.$options.filters)||void 0===e?void 0:e.numberWithCommas(n),a.target.value=n))}},{key:"created",value:function(){var t=this;w["a"].$on("changeLang",(function(){console.log("a",window.localStorage.getItem("bc-lang")),Object(B["forEach"])(t.sorts,(function(e){e.label=t.$i18n.t(e.i18n)})),t.$forceUpdate()})),w["a"].$on("selectTabBalance",this.handleChangeTab),this.$emit("filterBalance",this.filterBalance)}},{key:"destroyed",value:function(){w["a"].$off("changeLang"),w["a"].$off("changeTab")}},{key:"handleShowPopper",value:function(){this.isVisible=!0,this.listApprove=Object(k["a"])(this.listApproveBy)}},{key:"handleSearchApprove",value:function(t){var e=this;""!==t?(this.loading=!0,this.queryApprove.page=1,this.queryApprove.search=Object(B["trim"])(t),x.getListApprove(this.queryApprove).then((function(t){e.listApprove=t.content||[],e.loading=!1}))):this.listApprove=this.listApproveBy}},{key:"loadMoreApprove",value:function(){var t=this;this.queryApprove.page+=1,x.getListApprove(this.queryApprove).then((function(e){t.listApprove=[].concat(Object(k["a"])(t.listApprove),Object(k["a"])(e.content))}))}},{key:"resetFilter",value:function(){this.filterBalance={search:"",toBalanceAmount:"",fromBalanceAmount:"",toLockedAmount:"",fromLockedAmount:"",toAvailableAmount:"",fromAvailableAmount:"",orderBy:""}}},{key:"handleChangeTab",value:function(){this.filterBalance.search="";this.filterBalance.search}},{key:"handleSort",value:function(t){this.sortActive=t,this.filterBalance.orderBy=t,this.$emit("filterBalance",this.filterBalance),console.log("1")}},{key:"handleApply",value:function(){this.isVisible=!1;var t=Object(i["a"])(Object(i["a"])({},this.filterBalance),{},{fromAvailableAmount:this.filterBalance.fromAvailableAmount.replaceAll(",",""),fromBalanceAmount:this.filterBalance.fromBalanceAmount.replaceAll(",",""),fromLockedAmount:this.filterBalance.fromLockedAmount.replaceAll(",",""),toAvailableAmount:this.filterBalance.toAvailableAmount.replaceAll(",",""),toBalanceAmount:this.filterBalance.toBalanceAmount.replaceAll(",",""),toLockedAmount:this.filterBalance.toLockedAmount.replaceAll(",","")});console.log("data",t),this.$emit("filterBalance",t)}},{key:"handleReset",value:function(){this.filterBalance={search:"",orderBy:"",toBalanceAmount:"",fromBalanceAmount:"",toLockedAmount:"",fromLockedAmount:"",toAvailableAmount:"",fromAvailableAmount:""},this.$emit("filterBalance",this.filterBalance),this.isVisible=!1}}]),a}(b["d"]);Object(d["a"])([Object(b["c"])({required:!0,type:Array,default:[]})],$.prototype,"listApproveBy",void 0),Object(d["a"])([Object(b["e"])("filterBalance.search")],$.prototype,"handleSearch",null),$=Object(d["a"])([b["a"]],$);var S=$,q=S,D=(a("d2b0"),Object(y["a"])(q,_,A,!1,null,"9e9679d6",null)),L=D.exports,T=a("9f48"),R=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("base-popup",{staticClass:"popup-balance-detail",attrs:{name:"popup-balance-detail",width:"1040px",isShowFooter:!1,open:t.handleOpen,close:t.handleClose}},[a("div",{staticClass:"title-popup",attrs:{slot:"title"},slot:"title"},[a("span",[t._v(t._s(t.$t("balance.popup.title")))])]),a("div",{staticClass:"content"},[a("div",{staticClass:"be-flex mb-24 content__header"},[a("div",{staticClass:"avatar"},[t.detailRow.avatar?a("img",{attrs:{src:t.detailRow.avatar,"altdetailRow.avatar":""}}):a("base-icon",{staticStyle:{display:"inline-flex"},attrs:{icon:"default-avatar",size:"48"}})],1),a("div",{staticClass:"ml-24 w-100 info"},[a("div",{staticClass:"full-name text-l text-bold"},[t._v(t._s(t.detailRow.fullName))]),""===t.detailRow.phone?a("span",[t._v(t._s(t._f("formatEmail")(t.detailRow.email)))]):a("span",[t._v(" "+t._s(t._f("formatEmail")(t.detailRow.email))+"| "+t._s(t._f("formatNumberPhone")(t.detailRow.phone)))])])]),a("balance-detail-card",{attrs:{"data-card":t.detailRow,"tab-active-filter":t.tabActiveFilter}}),a("account-statement-card",{attrs:{data:t.dataTable,summary:t.dataSummary,query:t.query},on:{sizeChange:t.handleSizeChange,pageChange:t.handlePageChange}})],1)])},I=[],z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"balance-card-detail be-flex"},[a("div",{staticClass:"card-item"},[a("div",{staticClass:"title be-flex align-center"},[a("base-icon",{attrs:{icon:t.checkTypeIcon(t.tabActiveFilter),size:"40"}}),a("div",{staticClass:"content-card"},[a("p",[t._v(t._s(t.$t("balance.popup.bitcoin-wallet")))]),a("p",[t._v(t._s(t.$t("balance.balance")))])])],1),a("div",{staticClass:"value-card",class:t.checkType(t.tabActiveFilter)},[a("p",{staticClass:"current"},[t._v(t._s(t._f("numberWithCommas")(t.dataCard.balance))+" "+t._s(t.dataCard.currency))]),a("p",{staticClass:"last"},[t._v("-$"+t._s(t._f("numberWithCommas")(t.dataCard.balanceUSD)))])])]),a("div",{staticClass:"card-item"},[a("div",{staticClass:"title be-flex align-center"},[a("base-icon",{attrs:{icon:t.checkTypeIcon(t.tabActiveFilter),size:"40"}}),a("div",{staticClass:"content-card"},[a("p",[t._v(t._s(t.$t("balance.popup.available-amount")))]),a("p",[t._v(t._s(t.$t("balance.popup.available-amount")))])])],1),a("div",{staticClass:"value-card",class:t.checkType(t.tabActiveFilter)},[a("p",{staticClass:"current"},[t._v(t._s(t._f("numberWithCommas")(t.dataCard.availableBalance))+" "+t._s(t.dataCard.currency))]),a("p",{staticClass:"last"},[t._v("-$"+t._s(t._f("numberWithCommas")(t.dataCard.availableBalanceUSD)))])])]),a("div",{staticClass:"card-item"},[a("div",{staticClass:"title be-flex align-center"},[a("base-icon",{attrs:{icon:"icon-lock",size:"40"}}),a("div",{staticClass:"content-card"},[a("p",[t._v(t._s(t.$t("balance.popup.locked-amount")))]),a("p",[t._v(t._s(t.$t("balance.popup.withdrawal-request")))])])],1),a("div",{staticClass:"value-card amount-locker"},[a("p",{staticClass:"current"},[t._v(t._s(t._f("numberWithCommas")(t.dataCard.totalLockedAmount))+" "+t._s(t.dataCard.currency))]),a("p",{staticClass:"last"},[t._v("~$"+t._s(t._f("numberWithCommas")(t.dataCard.totalLockedAmountUSD)))])])])])},N=[],U=function(t){Object(r["a"])(a,t);var e=Object(u["a"])(a);function a(){return Object(c["a"])(this,a),e.apply(this,arguments)}return Object(o["a"])(a,[{key:"checkType",value:function(t){return"lynk"===t?"amount-lynk":"btc"===t?"amount-btc":"eth"===t?"amount-eth":"usdt"===t?"amount-usdt":"bnb"===t?"amount-bnb":"usdc"===t?"amount-usdc":"amount-locker"}},{key:"checkTypeIcon",value:function(t){return"lynk"===t?"icon-lynk":"btc"===t?"icon-btc":"eth"===t?"icon-eth":"usdt"===t?"icon-usdt":"bnb"===t?"icon-bnb":"usdc"===t?"icon-usdc":"icon-locker"}}]),a}(b["d"]);Object(d["a"])([Object(b["c"])({required:!0,type:Object,default:{}})],U.prototype,"dataCard",void 0),Object(d["a"])([Object(b["c"])({required:!0})],U.prototype,"tabActiveFilter",void 0),U=Object(d["a"])([b["a"]],U);var E=U,F=E,P=(a("94e7"),Object(y["a"])(F,z,N,!1,null,"1bc03fba",null)),W=P.exports,V=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"w-100 bg-white wallet-table-balance"},[a("div",{staticClass:"title-popup",attrs:{slot:"title"},slot:"title"},[a("span",{staticStyle:{"font-weight":"600"}},[t._v(t._s(t.$t("balance.popup.account-statement")))])]),a("div",{staticClass:"opening-balance be-flex jc-space-between"},[a("p",[t._v(t._s(t.$t("balance.popup.opening-balance")))]),a("p",[t._v(t._s(t.summary.openBalance))])]),a("div",{staticClass:"wallet-table-balance__below"},[a("base-table",{staticClass:"base-table table-wallet",attrs:{data:t.data,table:t.query,paginationInfo:t.getPaginationInfo},on:{sizeChange:t.handleSizeChange,currentChange:t.handleCurrentChange,rowClick:t.handleRowClick}},[a("el-table-column",{attrs:{label:t.$t("balance.popup.type"),width:"200",prop:"transactionType"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("p",{staticStyle:{"font-size":"16px"}},[t._v(t._s(t._f("formatType")(e.row.transactionType)))]),a("p",{staticStyle:{color:"#5b616e","font-size":"14px"}},[t._v(t._s(t._f("formatMMDDYY")(e.row.transactionMillisecond)))])]}}])}),a("el-table-column",{attrs:{label:t.$t("balance.popup.credit"),align:"right",prop:"creditAmountDisplay"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.creditAmount?a("span",{staticStyle:{color:"#129961","font-size":"16px"}},[t._v(" "+t._s(e.row.creditAmountDisplay))]):a("span",{staticStyle:{color:"#129961","font-size":"16px"}},[t._v("+ "+t._s(e.row.creditAmountDisplay))])]}}])}),a("el-table-column",{attrs:{label:t.$t("balance.popup.debit"),align:"right",prop:"debitAmountDisplay"},scopedSlots:t._u([{key:"default",fn:function(e){return[(e.row.debitAmount,a("span",{staticStyle:{color:"#cf202f","font-size":"16px"}},[t._v(t._s(e.row.debitAmountDisplay))]))]}}])}),a("el-table-column",{attrs:{label:t.$t("balance.popup.balance"),align:"right",prop:"balanceDisplay"}}),a("el-table-column",{attrs:{label:t.$t("balance.popup.status"),align:"center",width:"144",prop:"status"},scopedSlots:t._u([{key:"default",fn:function(e){return["FAILED"!==e.row.status?a("span",{class:t.checkType(e.row.status)},[t._v(t._s(t.checkStatus(e.row.status)))]):a("span",{staticClass:"status-locked"},[t._v(t._s(t.$t("status.failed")))])]}}])})],1)],1),a("div",{staticClass:"total be-flex"},[a("div",{staticClass:"total-title"},[t._v(t._s(t.$t("balance.popup.total")))]),"0"===t.summary.totalCreditAmount?a("p",[t._v("0")]):a("p",[t._v("+ "+t._s(t._f("numberWithCommas")(t.summary.totalCreditAmount)))]),"0"===t.summary.totalDebitAmount?a("p",[t._v("0")]):a("p",[t._v("- "+t._s(t._f("numberWithCommas")(t.summary.totalDebitAmount)))])]),a("div",{staticClass:"ending-balance be-flex jc-space-between"},[a("p",[t._v(t._s(t.$t("balance.popup.ending-balance")))]),"0"===t.summary.closeBalance?a("p",[t._v("0")]):a("p",[t._v(t._s(t._f("numberWithCommas")(t.summary.closeBalance)))])])])},M=[],G=function(t){Object(r["a"])(a,t);var e=Object(u["a"])(a);function a(){return Object(c["a"])(this,a),e.apply(this,arguments)}return Object(o["a"])(a,[{key:"getPaginationInfo",get:function(){return this.$t("paging.transaction")}},{key:"checkType",value:function(t){return"Not verified"===t?"status-not-verified":"PENDING"===t?"status-pending":"SUCCESS"===t?"status-verified":"status-rejected"}},{key:"getDataSelectTab",value:function(){console.log("1")}},{key:"checkStatus",value:function(t){switch(t){case"SUCCESS":return this.$t("status.success");case"PENDING":return this.$t("status.pending");default:return this.$t("status.failed")}}},{key:"handleSizeChange",value:function(t){this.$emit("sizeChange",t)}},{key:"handleCurrentChange",value:function(t){this.$emit("pageChange",t)}},{key:"handleRowClick",value:function(t){this.$emit("rowClick",t.row)}}]),a}(b["d"]);Object(d["a"])([Object(b["c"])({required:!0,type:Array,default:[]})],G.prototype,"data",void 0),Object(d["a"])([Object(b["c"])({required:!0})],G.prototype,"summary",void 0),Object(d["a"])([Object(b["c"])({required:!0,type:Object,default:{}})],G.prototype,"query",void 0),G=Object(d["a"])([b["a"]],G);var J=G,Q=J,Y=(a("144c"),Object(y["a"])(Q,V,M,!1,null,"512a3cc0",null)),H=Y.exports,K=Object(O["a"])("transaction"),X=function(t){Object(r["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(c["a"])(this,a),t=e.apply(this,arguments),t.detail={},t.isLoading=!1,t.query={currency:"",transactionType:"",orderBy:1,page:1,limit:10,total:10,userId:0},t.dataTable=[],t.dataSummary={},t.tabActive=0,t}return Object(o["a"])(a,[{key:"init",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e=Object(i["a"])(Object(i["a"])({},this.query),{},{currency:this.tabActiveFilter.toUpperCase(),userId:this.detailRow.id}),t.next=4,K.getlistBalanceDetail("request/transactions",e);case 4:a=t.sent,this.dataTable=a.transactions.content,this.dataSummary=a.summary,this.query.total=a.transactions.totalElements,this.isLoading=!1,t.next=15;break;case 11:t.prev=11,t.t0=t["catch"](0),this.isLoading=!1,console.log(t.t0);case 15:case"end":return t.stop()}}),t,this,[[0,11]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"handleOpen",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.init().then();case 1:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"handleClose",value:function(){this.tabActive=0,this.setOpenPopup({popupName:"popup-balance-detail",isOpen:!1})}},{key:"handleChangeTab",value:function(t){this.tabActive=t.id}},{key:"handlePageChange",value:function(t){this.query.page=t,this.init()}},{key:"handleSizeChange",value:function(t){this.query.limit=t,this.init()}}]),a}(Object(b["b"])(T["a"]));Object(d["a"])([Object(b["c"])({required:!0,type:Object,default:{}})],X.prototype,"detailRow",void 0),Object(d["a"])([Object(b["c"])({required:!0})],X.prototype,"tabActiveFilter",void 0),X=Object(d["a"])([Object(b["a"])({components:{BalanceDetailCard:W,AccountStatementCard:H}})],X);var Z=X,tt=Z,et=(a("4101"),Object(y["a"])(tt,R,I,!1,null,"f4973fd0",null)),at=et.exports,nt=Object(O["a"])("balance"),lt=function(t){Object(r["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(c["a"])(this,a),t=e.apply(this,arguments),t.tabs=[{id:1,title:"lynk",routeName:"BalanceLynk"},{id:2,title:"btc",routeName:"BalanceBtc"},{id:3,title:"eth",routeName:"BalanceEth"},{id:4,title:"bnb",routeName:"BalanceBnb"},{id:5,title:"usdt",routeName:"BalanceUsdt"},{id:6,title:"usdc",routeName:"BalanceUsdc"}],t.titlePending="",t.tabActive="lynk",t.isLoading=!1,t.data=[],t.detailRow={},t.dataDetail={},t.query={search:"",orderBy:1,page:1,limit:10,total:10},t.numOfInvestor="",t.numOfUser="",t.totalAvailable="",t.totalBalance="",t.totalElement="",t.totalLocked="",t.totalAvailableUSD="",t.totalLockedUSD="",t.totalBalanceUSD="",t.listApproveBy=[],t.propdataTable=[],t.debounceInit=Object(B["debounce"])((function(){t.init()}),300),t}return Object(o["a"])(a,[{key:"getListBalance",value:function(){console.log("1")}},{key:"created",value:function(){}},{key:"init",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var e,a,n,l,s,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,console.log("query",this.query),this.isLoading=!0,e=Object(i["a"])(Object(i["a"])({},this.query),{},{search:this.query.search,orderBy:this.query.orderBy,limit:this.query.limit,page:this.query.page,total:null}),t.next=6,nt.getlistBalance(this.tabActive,e);case 6:if(a=t.sent,this.data=a.balances||[],this.query.total=a.totalElement,this.isLoading=!1,this.data.length>0)for(n=0;n<this.data.length;n++)l=this.data[n].email,s=l.substring(0,6)+"..."+l.substring(l.length-10,l.length),c=Object(i["a"])(Object(i["a"])({},this.data[n]),{},{email:s}),this.propdataTable.push(c);console.log("propdataTable",this.propdataTable),this.numOfInvestor=a.numOfInvestor,this.numOfUser=a.numOfUser,this.totalAvailable=a.totalAvailable,this.totalBalance=a.totalBalance,this.totalLocked=a.totalLocked,this.totalBalance=a.totalBalance,this.totalAvailableUSD=a.totalAvailableUSD,this.totalLockedUSD=a.totalLockedUSD,this.totalBalanceUSD=a.totalBalanceUSD,t.next=27;break;case 23:t.prev=23,t.t0=t["catch"](0),this.isLoading=!1,console.log(t.t0);case 27:case"end":return t.stop()}}),t,this,[[0,23]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"handleGetBalanceDetail",value:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:try{Object(i["a"])(Object(i["a"])({},this.query),{},{search:this.query.search,orderBy:this.query.orderBy,limit:this.query.limit,page:this.query.page,total:null})}catch(e){this.isLoading=!1,console.log(e)}case 1:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"handleChangeTab",value:function(t){this.$router.push({name:t.routeName}),this.tabActive=t.title,this.query.page=1,this.query.limit=10,this.query.orderBy=1,this.query.toBalanceAmount="",this.query.fromBalanceAmount="",this.query.toLockedAmount="",this.query.fromLockedAmount="",this.query.toAvailableAmount="",this.query.fromAvailableAmount="",this.query.search="",this.init(),this.resetQuery(),w["a"].$emit("selectTabBalance")}},{key:"resetQuery",value:function(){this.query=Object(i["a"])(Object(i["a"])({},this.query),{},{page:1,limit:10,search:"",orderBy:"1"})}},{key:"handlePageChange",value:function(t){this.query.page=t,this.init()}},{key:"handleSizeChange",value:function(t){this.query.limit=t,this.init()}},{key:"handleRowClick",value:function(t){this.detailRow=t,this.setOpenPopup({popupName:"popup-balance-detail",isOpen:!0})}},{key:"handleFilter",value:function(t){this.query=Object(i["a"])(Object(i["a"])({},this.query),t),this.debounceInit()}}]),a}(Object(b["b"])(T["a"]));lt=Object(d["a"])([Object(b["a"])({components:{BalanceTable:C,BalanceFilter:L,BalanceDetail:at}})],lt);var it=lt,st=it,ct=(a("a91e"),Object(y["a"])(st,n,l,!1,null,"f81f540a",null));e["default"]=ct.exports}}]);
//# sourceMappingURL=chunk-0c1ce360.fcf727e2.js.map