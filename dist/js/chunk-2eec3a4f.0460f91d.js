(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2eec3a4f"],{"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},1847:function(t,e,a){"use strict";var i=a("2b0e"),n=new i["default"];e["a"]=n},5190:function(t,e,a){"use strict";a("54bf")},"54bf":function(t,e,a){},"841c":function(t,e,a){"use strict";var i=a("d784"),n=a("825a"),s=a("1d80"),o=a("129f"),c=a("14c3");i("search",(function(t,e,a){return[function(e){var a=s(this),i=void 0==e?void 0:e[t];return void 0!==i?i.call(e,a):new RegExp(e)[t](String(a))},function(t){var i=a(e,this,t);if(i.done)return i.value;var s=n(this),r=String(t),l=s.lastIndex;o(l,0)||(s.lastIndex=0);var u=c(s,r);return o(s.lastIndex,l)||(s.lastIndex=l),null===u?-1:u.index}]}))},"87b7":function(t,e,a){"use strict";a("d8d2")},"8ea1d":function(t,e,a){"use strict";a("fd44")},a15b:function(t,e,a){"use strict";var i=a("23e7"),n=a("44ad"),s=a("fc6a"),o=a("a640"),c=[].join,r=n!=Object,l=o("join",",");i({target:"Array",proto:!0,forced:r||!l},{join:function(t){return c.call(s(this),void 0===t?",":t)}})},a94c:function(t,e,a){},bf3e:function(t,e,a){"use strict";a("a94c")},d8d2:function(t,e,a){},dd06:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"w-100 bo-kyc"},[a("div",{staticClass:"bg-white wallet-header"},[a("div",{staticClass:"be-flex align-center jc-space-between wallet-header__above"},[a("div",{staticClass:"wallet-header__above-tabs be-flex"},t._l(t.tabs,(function(e){return a("div",{key:e.id,staticClass:"tab-item cursor",class:t.$route.name===e.routeName?"tab-active":null,on:{click:function(a){return t.handleChangeTab(e)}}},[a("span",{staticClass:"text-base"},[t._v(t._s(t.$t("menu."+e.title)))])])})),0)])]),a("exception-filter",{on:{filterException:t.handleFilter}}),a("div",{staticClass:"ending-balance be-flex jc-space-between",staticStyle:{"justify-content":"end"}},[a("p",{staticStyle:{width:"160px","text-align":"center"}},[t._v(t._s(t.$t("exception.total")))]),a("p",{staticStyle:{width:"210px","text-align":"right"}},[t._v("$"+t._s(t.totalAmount))])]),a("exception-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],attrs:{query:t.query,data:t.propdataTable},on:{coppy:t.handleCoppy,rowClick:t.handleRowClick,sizeChange:t.handleSizeChange,pageChange:t.handlePageChange}}),a("exception-detail",{attrs:{"detail-row":t.detailRow,"tab-active-filter":t.tabActive}})],1)},n=[],s=a("f3f3"),o=a("c964"),c=a("276c"),r=a("e954"),l=a("920b"),u=a("92a6"),p=(a("96cf"),a("ac1f"),a("841c"),a("b0c0"),a("d3b7"),a("25f0"),a("9ab4")),d=a("1b40"),f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"w-100 bg-white wallet-table"},[a("div",{staticClass:"wallet-table__below"},[a("base-table",{staticClass:"base-table table-wallet",attrs:{data:t.data,table:t.query,paginationInfo:t.getPaginationInfo},on:{sizeChange:t.handleSizeChange,currentChange:t.handleCurrentChange,rowClick:t.handleRowClick}},[a("el-table-column",{attrs:{label:"#",type:"index",index:t.indexMethod,align:"center",width:"60"}}),a("el-table-column",{attrs:{label:t.$t("transaction.table.trans-id")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"be-flex align-center"},["CROWDSALE"===e.row.transactionType?a("span",{staticClass:"transaction-code d-ib mr-2"},[t._v(t._s(t._f("formatTransactionCode")(e.row.transactionCode,10)))]):a("span",{staticClass:"transaction-code d-ib mr-2"},[t._v(t._s(t._f("formatTransactionCode")(e.row.transactionHash,10)))]),e.row.transactionHash||e.row.transactionCode?a("span",{staticClass:"icon-copy",on:{click:function(a){return t.handleCopyTransaction(e.row)}}},[a("base-icon",{attrs:{icon:"icon-copy",size:"24"}})],1):t._e()])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.table.date"),prop:"transactionDate",width:"customer"!==t.type?220:200},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("formatMMDDYY")(e.row.transactionMillisecond)))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.table.CUSTOMER"),width:"260"},scopedSlots:t._u([{key:"default",fn:function(e){return["CROWDSALE"===e.row.transactionType?a("div",{staticClass:"customer"},[a("p",[t._v(t._s(t._f("formatTransactionCode")(e.row.paidAddress,10)))])]):a("div",{staticClass:"customer"},[a("p",[t._v(t._s(e.row.fullName))]),a("p",{staticStyle:{color:"#5b616e","font-size":"14px"}},[t._v(t._s(e.row.email))])])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.table.status"),prop:"status",width:"160",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return["CROWDSALE"===e.row.transactionType?a("span",{staticClass:"text-xs",class:"LOCKED"==e.row.status?"status-locked":"status-fail"},[t._v(t._s(t.checkTransactionStatusCrowdSale(e.row.status)))]):a("span",{staticClass:"text-xs",class:"LOCKED"==e.row.status?"status-locked":"status-fail"},[t._v(t._s(t.checkTransactionStatus(e.row.status)))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.table.amount"),width:"220",align:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return["CROWDSALE"===e.row.transactionType?a("div",[a("div",{staticClass:"amount-increase"},[a("span",{staticStyle:{color:"#cf202f"}},[t._v("-"+t._s(e.row.paidAmountDisplay)+" "+t._s(e.row.paidCurrency))]),a("span",{staticClass:"d-block amount-exchange-small"},[t._v("~$"+t._s(e.row.paidAmountToUsd))])])]):a("div",[a("div",{staticClass:"amount-increase"},[a("span",{staticStyle:{color:"#cf202f"}},[t._v("-"+t._s(e.row.amountWithoutFeeDisplay)+" "+t._s(e.row.currency))]),a("span",{staticClass:"d-block amount-exchange-small"},[t._v("~$"+t._s(e.row.amountWithoutFeeToUsdDisplay))])])])]}}])})],1)],1)])},h=[],b=a("1847"),y=function(t){Object(l["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(c["a"])(this,a),t=e.apply(this,arguments),t.checkTabActive="",t.coppy=0,t}return Object(r["a"])(a,[{key:"getPaginationInfo",get:function(){return this.$t("paging.transaction")}},{key:"checkType",value:function(t){return"Not verified"===t?"status-not-verified":"PENDING"===t?"status-pending":"VERIFIED"===t?"status-verified":"status-rejected"}},{key:"getDataSelectTab",value:function(){console.log("1")}},{key:"checkStatus",value:function(t){switch(t){case"PENDING":return this.$t("status.pending");case"VERIFIED":return this.$t("status.verified");default:return this.$t("status.rejected")}}},{key:"checkTransactionStatus",value:function(t){switch(t){case"SUCCESS":return this.$i18n.t("transaction.table.succsess");case"PENDING":return this.$i18n.t("transaction.table.pending");case"PROCESSING":return this.$i18n.t("transaction.table.processing");case"REJECTED":return this.$i18n.t("transaction.table.rejected");case"LOCKED":return this.$i18n.t("transaction.table.locked");case"FAILED":return this.$i18n.t("exception.fail-ex");default:return this.$i18n.t("exception.failed-tranfer")}}},{key:"checkTransactionStatusCrowdSale",value:function(t){switch(t){case"SUCCESS":return this.$i18n.t("transaction.table.succsess");case"PENDING":return this.$i18n.t("transaction.table.pending");case"PROCESSING":return this.$i18n.t("transaction.table.processing");case"REJECTED":return this.$i18n.t("transaction.table.rejected");case"LOCKED":return this.$i18n.t("transaction.table.locked");case"FAILED":return this.$i18n.t("exception.failed-tranfer");default:return this.$i18n.t("exception.failed-tranfer")}}},{key:"indexMethod",value:function(t){return(this.query.page-1)*this.query.limit+t+1}},{key:"created",value:function(){b["a"].$on("checkRowClick",this.handlecheckRowClick)}},{key:"handlecheckRowClick",value:function(){this.coppy=0}},{key:"handleSizeChange",value:function(t){this.$emit("sizeChange",t)}},{key:"handleCurrentChange",value:function(t){this.$emit("pageChange",t)}},{key:"handleRowClick",value:function(t){console.log("coppi",this.coppy),console.log("row",t),this.$emit("coppy",this.coppy),this.$emit("rowClick",t)}},{key:"handleCopyTransaction",value:function(t){var e="",a=document.createElement("input");a.value=t.transactionCode,document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),e=this.$t("notify.copy"),this.$message.success(e),this.coppy++,this.$emit("coppy",this.coppy)}}]),a}(d["d"]);Object(p["a"])([Object(d["c"])({required:!0,type:Object,default:{}})],y.prototype,"query",void 0),Object(p["a"])([Object(d["c"])({required:!0,type:Array,default:[]})],y.prototype,"data",void 0),y=Object(p["a"])([d["a"]],y);var m=y,v=m,C=(a("87b7"),a("2877")),x=Object(C["a"])(v,f,h,!1,null,"6eaa60a5",null),w=x.exports,_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pb-24 pt-24 be-flex align-center kyc-filter"},[a("el-input",{staticClass:"input-search",attrs:{placeholder:t.$t("placeholder.search")},model:{value:t.filterException.search,callback:function(e){t.$set(t.filterException,"search",e)},expression:"filterException.search"}},[a("span",{staticClass:"prefix-search",attrs:{slot:"prefix"},slot:"prefix"},[a("base-icon",{attrs:{icon:"icon-search",size:"24"}})],1)]),a("div",{staticClass:"filter-item"},[a("el-popover",{attrs:{value:t.isVisible,placement:"bottom-start",width:"518",trigger:"click","popper-class":"popper-filter"},on:{show:t.handleShowPopper}},[a("div",{staticClass:"content"},[a("el-form",[a("el-form-item",{attrs:{label:t.$t("label.buy-token")}},[a("el-select",{staticClass:"w-100",attrs:{multiple:"",clearable:""},model:{value:t.filterException.currency,callback:function(e){t.$set(t.filterException,"currency",e)},expression:"filterException.currency"}},t._l(t.getListWallet,(function(e){return a("el-option",{key:e.id,attrs:{value:e.symbol,label:e.name}},[[a("div",{staticClass:"be-flex wallet-item"},[a("base-icon",{attrs:{icon:e.icon,size:"24"}}),a("span",{staticClass:"d-ib",staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.name))]),a("span",{staticClass:"d-ib",staticStyle:{"margin-left":"4px"}},[t._v("("+t._s(e.symbol.toUpperCase())+")")])],1)]],2)})),1)],1),a("div",{staticClass:"be-flex jc-space-between row"},[a("el-form-item",{staticClass:"be-flex-item mr-40 form-item-line",attrs:{label:t.$t("label.trans-date")}},[a("el-date-picker",{staticClass:"w-100 date-picker",attrs:{format:"MM/dd/yyyy","value-format":"yyyy-MM-dd",placeholder:t.$t("label.from-date"),type:"date","picker-options":t.pickerOption2},model:{value:t.filterException.fromDate,callback:function(e){t.$set(t.filterException,"fromDate",e)},expression:"filterException.fromDate"}})],1),a("el-form-item",{staticClass:"be-flex-item hide-label",attrs:{label:"1"}},[a("el-date-picker",{staticClass:"w-100 date-picker",attrs:{format:"MM/dd/yyyy",placeholder:t.$t("label.to-date"),"value-format":"yyyy-MM-dd",type:"date","picker-options":t.pickerOption},model:{value:t.filterException.toDate,callback:function(e){t.$set(t.filterException,"toDate",e)},expression:"filterException.toDate"}})],1)],1),a("div",{staticClass:"transaction-amount-form"},[a("div",{staticClass:"be-flex jc-space-between row"},[a("el-form-item",{staticClass:"be-flex-item mr-40 form-item-line",class:"amount"===t.errorType&&"error-amount-border-popup-transaction",attrs:{label:t.$t("label.trans-amount")}},[a("el-input",{attrs:{placeholder:t.$t("placeholder.from-amount")},nativeOn:{keypress:function(e){return t.onlyNumber(e,"fromAmount")},keyup:function(e){return t.numberFormat(e)}},model:{value:t.filterException.fromAmount,callback:function(e){t.$set(t.filterException,"fromAmount",e)},expression:"filterException.fromAmount"}},[a("div",{staticClass:"prefix",attrs:{slot:"prefix"},slot:"prefix"},[t._v("$")])])],1),a("el-form-item",{staticClass:"be-flex-item hide-label",class:"amount"===t.errorType&&"error-amount-border-popup-transaction",attrs:{label:"1"}},[a("el-input",{attrs:{placeholder:t.$t("placeholder.to-amount")},nativeOn:{keypress:function(e){return t.onlyNumber(e,"toAmount")},keyup:function(e){return t.numberFormat(e)}},model:{value:t.filterException.toAmount,callback:function(e){t.$set(t.filterException,"toAmount",e)},expression:"filterException.toAmount"}},[a("div",{staticClass:"prefix",attrs:{slot:"prefix"},slot:"prefix"},[t._v("$")])])],1)],1),"amount"===t.errorType?a("div",{staticClass:"error-amount"},[a("p",[t._v(t._s(t.$t("notify.amount-invalid")))])]):t._e()]),"ExceptionCrowdsale"===this.$route.name?a("el-form-item",{staticClass:"be-flex-item",attrs:{label:t.$t("label.status")}},[a("el-select",{staticClass:"w-100",attrs:{clearable:""},model:{value:t.filterException.status,callback:function(e){t.$set(t.filterException,"status",e)},expression:"filterException.status"}},t._l(t.listStatus,(function(e){return a("el-option",{key:e.id,attrs:{value:e.value,label:e.label}},[[a("span",{staticClass:"d-ib"},[t._v(t._s(e.label))])]],2)})),1)],1):t._e()],1)],1),a("div",{staticClass:"be-flex jc-flex-end footer"},[a("el-button",{staticClass:"btn-default btn-400 btn-h-40 btn-close text-regular",on:{click:t.handleReset}},[t._v(t._s(t.$t("button.reset")))]),a("el-button",{staticClass:"btn-default-bg btn-400 btn-h-40 is-none-border h-40 text-regular",on:{click:t.handleApply}},[t._v(t._s(t.$t("button.apply")))])],1),a("div",{staticClass:"cursor text-filter",staticStyle:{"font-size":"16px"},attrs:{slot:"reference"},slot:"reference"},[a("span",{staticClass:"abicon"},[a("base-icon",{staticStyle:{color:"#5b616e","margin-right":"10px"},attrs:{icon:"icon-filter",size:"18"}})],1),t._v(" "+t._s(t.$t("kyc.filter.filter"))+" ")])])],1),a("div",[a("el-dropdown",{staticClass:"sort",attrs:{trigger:"click"},on:{command:t.handleSort}},[a("span",{staticClass:"abicon sort-title",staticStyle:{"font-size":"16px"}},[a("base-icon",{staticClass:"icon",staticStyle:{color:"#5b616e","margin-right":"10px"},attrs:{icon:"icon-sort",size:"18"}}),t._v(" "+t._s(t.$t("kyc.filter.sort")))],1),a("el-dropdown-menu",{staticClass:"header-downloadapp dropdown-sort",attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.sorts,(function(e,i){return a("el-dropdown-item",{key:i,class:t.sortActive===e.command?"active":null,attrs:{command:e.command,divided:e.divided}},[a("span",{staticClass:"be-flex"},[a("span",{staticClass:"be-flex-item"},[t._v(" "+t._s(e.label)+" ")]),t.sortActive===e.command?a("base-icon",{attrs:{icon:"icon-tick-dropdown",size:"16"}}):t._e()],1)])})),1)],1)],1)],1)},g=[],k=a("d0ff"),E=(a("a15b"),a("99af"),a("2ef0")),A=a("08ba"),O=a("4bb5"),T=a("94d8"),R=Object(A["a"])("kyc"),S=Object(O["a"])("beBase"),$=function(t){Object(l["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(c["a"])(this,a),t=e.apply(this,arguments),t.filterException={search:"",currency:"",fromDate:"",toDate:"",fromAmount:"",toAmount:"",status:"",orderBy:"1"},t.listWallet=[{id:0,name:"Bitcoin",symbol:"btc",icon:"icon-btc"},{id:1,name:"Ethereum",symbol:"eth",icon:"icon-eth"},{id:2,name:"Tether",symbol:"usdt",icon:"icon-usdt",disabled:!0},{id:3,name:"USDC",symbol:"usdc",icon:"icon-usdc",disabled:!0},{id:4,name:"BNB",symbol:"bnb",icon:"icon-bnb",disabled:!0}],t.listStatus=[{id:0,label:t.$i18n.t("exception.locked"),value:"LOCKED"},{id:1,label:t.$i18n.t("exception.failed-tranfer"),value:"FAILED_TRANSFER"}],t.listBonusType=[{id:0,label:"Sign Up",value:"BONUS_SIGN_UP"},{id:1,label:"Crowdsale",value:"BONUS_CROWDSALE"},{id:2,label:"First Transaction",value:"BONUS_FIRST_TRANS"},{id:3,label:"Affiliate",value:"BONUS_AFFILIATE"},{id:4,label:"Big Backers",value:"BONUS_BIG_BACKER"},{id:5,label:"Early Backers",value:"BONUS_EARLY_BACKER"}],t.loading=!1,t.listApprove=[],t.queryApprove={page:1,limit:20,search:""},t.sorts=[{command:"1",label:t.$i18n.t("kyc.sort.date"),divided:!1,i18n:"kyc.sort.date"},{command:"2",label:t.$i18n.t("exception.amount"),divided:!1,i18n:"exception.amount"}],t.errorType="",t.sortActive="1",t.listCountry=T,t.identificationType=[{id:0,type:"Id Card",value:"ID_CARD"},{id:1,type:"Passport",value:"PASSPORT"},{id:2,type:"Driver’s License",value:"DRIVER_LICENSE"}],t.isVisible=!1,t.searchText=Object(E["debounce"])((function(e){var a="";t.filterException.currency&&(a=t.filterException.currency.join(",")),t.$emit("filterException",Object(s["a"])(Object(s["a"])({},t.filterException),{},{search:Object(E["trim"])(e),currency:a}))}),500),t.tabActive="",t}return Object(r["a"])(a,[{key:"getListWallet",get:function(){return"LYNK"===this.coinMain?[{id:5,name:"LynKey",symbol:"lynk",icon:"icon-lin"}].concat(Object(k["a"])(this.listWallet)):[{id:5,name:"CLM",symbol:"clm",icon:"icon-clm"}].concat(Object(k["a"])(this.listWallet))}},{key:"handleSearch",value:function(t){this.searchText(t)}},{key:"availabelAmount",value:function(t){console.log("value","$ "+t)}},{key:"watchFromAmount",value:function(t){this.errorType=""==t?"":"amount"}},{key:"watchToAmount",value:function(t){var e=t.toString().replaceAll(",",""),a=this.filterException.fromAmount.toString().replaceAll(",","");console.log("a",a),parseFloat(e)>parseFloat(a)||""==t?this.errorType="":this.errorType="amount"}},{key:"numberFormat",value:function(t){var e,a=t,i=a.target.value;i.length>0&&(i=i.replaceAll(",",""),i=parseInt(i),isNaN(i)?a.target.value=0:(i=null===(e=this.$options.filters)||void 0===e?void 0:e.numberWithCommas(i),a.target.value=i))}},{key:"onlyNumber",value:function(t,e){var a=t.keyCode?t.keyCode:t.which;(a<48||a>57)&&46!==a&&t.preventDefault(),46===a&&Object(E["includes"])(this.filterException[e],".")&&t.preventDefault()}},{key:"pickerOption",get:function(){var t=this;return{disabledDate:function(e){return t.disableTime(e,"from-to")}}}},{key:"pickerOption2",get:function(){var t=this;return{disabledDate:function(e){return t.disableTime(e,"to-from")}}}},{key:"disableTime",value:function(t,e){if("from-to"===e){if(this.filterException.fromDate)return t.getTime()<new Date(this.filterException.fromDate).getTime()}else if(this.filterException.toDate)return t.getTime()>=new Date(this.filterException.toDate).getTime()}},{key:"created",value:function(){var t=this;this.errorType="",b["a"].$on("changeLang",(function(){console.log("a",window.localStorage.getItem("bc-lang")),Object(E["forEach"])(t.sorts,(function(e){e.label=t.$i18n.t(e.i18n)})),t.$forceUpdate()})),b["a"].$on("changeTabException",this.handleChangeTab)}},{key:"destroyed",value:function(){b["a"].$off("changeLang"),b["a"].$off("changeTab")}},{key:"handleShowPopper",value:function(){var t=parseInt(this.filterException.toAmount.replaceAll(",","")),e=parseInt(this.filterException.fromAmount.replaceAll(",",""));this.errorType=e>t?"amount":"",console.log("gfdgdfg",this.errorType),this.isVisible=!0,this.listApprove=Object(k["a"])(this.listApproveBy)}},{key:"handleSearchApprove",value:function(t){var e=this;""!==t?(this.loading=!0,this.queryApprove.page=1,this.queryApprove.search=Object(E["trim"])(t),R.getListApprove(this.queryApprove).then((function(t){e.listApprove=t.content||[],e.loading=!1}))):this.listApprove=this.listApproveBy}},{key:"loadMoreApprove",value:function(){var t=this;this.queryApprove.page+=1,R.getListApprove(this.queryApprove).then((function(e){t.listApprove=[].concat(Object(k["a"])(t.listApprove),Object(k["a"])(e.content))}))}},{key:"resetFilter",value:function(){console.log("k")}},{key:"handleChangeTab",value:function(t){this.tabActive=t,console.log("vao"),this.filterException.search="",this.filterException.currency="",this.filterException.fromDate="",this.filterException.toDate="",this.filterException.fromAmount="",this.filterException.toAmount="",this.filterException.status="",this.filterException.orderBy="1",this.errorType="",this.sortActive="1"}},{key:"handleSort",value:function(t){this.sortActive=t,this.filterException.orderBy=t,this.$emit("filterException",this.filterException)}},{key:"handleApply",value:function(){if(""==this.errorType){this.isVisible=!1;var t="";this.filterException.currency&&(t=this.filterException.currency.join(","));var e=Object(s["a"])(Object(s["a"])({},this.filterException),{},{fromAmount:this.filterException.fromAmount.replaceAll(",",""),toAmount:this.filterException.toAmount.replaceAll(",",""),currency:t});this.$emit("filterException",e)}}},{key:"resetFilters",value:function(){this.filterException.search="",this.filterException.currency="",this.filterException.fromDate="",this.filterException.toDate="",this.filterException.fromAmount="",this.filterException.toAmount="",this.filterException.status="",this.filterException.orderBy="1",this.errorType=""}},{key:"handleReset",value:function(){this.filterException.search="",this.filterException.currency="",this.filterException.fromDate="",this.filterException.toDate="",this.filterException.fromAmount="",this.filterException.toAmount="",this.filterException.status="",this.filterException.orderBy="1",this.errorType="",this.$emit("filterException",this.filterException),this.isVisible=!1}}]),a}(d["d"]);Object(p["a"])([S.State("coinMain")],$.prototype,"coinMain",void 0),Object(p["a"])([Object(d["c"])({required:!0,type:Array,default:[]})],$.prototype,"listApproveBy",void 0),Object(p["a"])([Object(d["e"])("filterException.search")],$.prototype,"handleSearch",null),Object(p["a"])([Object(d["e"])("filterException.fromAvailableAmount")],$.prototype,"availabelAmount",null),Object(p["a"])([Object(d["e"])("filterException.fromAmout")],$.prototype,"watchFromAmount",null),Object(p["a"])([Object(d["e"])("filterException.toAmount")],$.prototype,"watchToAmount",null),$=Object(p["a"])([d["a"]],$);var D=$,j=D,I=(a("bf3e"),Object(C["a"])(j,_,g,!1,null,"166d2bb6",null)),N=I.exports,L=a("9f48"),q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("base-popup",{staticClass:"popup-exception-detail",attrs:{name:"popup-exception-detail",width:"480px",isShowFooter:!1,open:t.handleOpen,close:t.handleClose}},[a("div",{staticClass:"title-popup",attrs:{slot:"title"},slot:"title"},["WITHDRAW"===t.detailRow.transactionType?a("span",[t._v(t._s(t.$t("exception.title-widthdraw"))+" "+t._s(t.detailRow.currency))]):a("span",[t._v(t._s(t.$t("exception.title-crowdasle"))+" "+t._s(t.detailRow.currency))])]),a("div",{staticClass:"w-100 fluctuating"},[a("div",{staticClass:"text-center"},[a("div",{staticClass:"icon",class:t.checkTypeStatusIcon(t.detailRow.status)},[a("base-icon",{attrs:{className:"icon-pending",icon:t.getIcon,size:"64"}})],1),"WITHDRAW"===t.detailRow.transactionType?a("p",{class:t.checkValueAmountDisplay(t.detailRow.amountWithoutFeeDisplay)},[t._v(" -"+t._s(t.detailRow.amountWithoutFeeDisplay)+" "+t._s(t.detailRow.currency)+" ")]):a("p",{staticClass:"sub"},[t._v("-"+t._s(t.detailRow.paidAmountDisplay)+" "+t._s(t.detailRow.currency))]),"WITHDRAW"===t.detailRow.transactionType?a("p",{staticClass:"usd"},[t._v("~$"+t._s(t.detailRow.amountWithoutFeeToUsdDisplay))]):a("p",{staticClass:"usd"},[t._v("~$"+t._s(t.detailRow.paidAmountToUsd))])])]),a("div",{staticClass:"transaction-detail"},[a("p",{staticClass:"title"},[t._v(t._s(t.$t("transaction.popup.transaction-detail")))]),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.transaction-id")))]),"WITHDRAW"===t.detailRow.transactionType?a("div",{staticClass:"be-flex align-center"},[a("p",{staticClass:"text-detail-2"},[t._v(t._s(t._f("formatTransactionCode")(t.detailRow.transactionHash,10)))]),t.detailRow.transactionHash?a("span",{staticClass:"icon-copy",staticStyle:{"margin-left":"8px"},on:{click:function(e){return t.handleCopyTransaction(t.detailRow.transactionHash)}}},[a("base-icon",{attrs:{icon:"icon-copy",size:"24"}})],1):t._e()]):a("div",{staticClass:"be-flex align-center"},[a("p",{staticClass:"text-detail-2"},[t._v(t._s(t._f("formatTransactionCode")(t.detailRow.transactionCode,10)))]),t.detailRow.transactionCode?a("span",{staticClass:"icon-copy",staticStyle:{"margin-left":"8px"},on:{click:function(e){return t.handleCopyTransaction(t.detailRow.transactionCode)}}},[a("base-icon",{attrs:{icon:"icon-copy",size:"24"}})],1):t._e()])]),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.date")))]),a("p",{staticClass:"text-detail-2"},[t._v(t._s(t._f("formatMMDDYY")(t.detailRow.transactionMillisecond)))])]),t.checkFeeType(t.detailRow.transactionType)&&"WITHDRAW"===t.detailRow.transactionType?a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.from")))]),a("div",{staticClass:"be-flex align-center"},[a("base-icon",{attrs:{icon:t.renderIconCurrency(t.detailRow.currency.toLowerCase()),size:"20"}}),a("p",{staticClass:"text-detail-2",staticStyle:{"margin-left":"8px"}},[t._v(t._s(t._f("formatTransactionCode")(t.detailRow.fromAddress,10)))]),t.detailRow.fromAddress?a("span",{staticClass:"icon-copy",staticStyle:{"margin-left":"8px"},on:{click:function(e){return t.handleCopyTransaction(t.detailRow.fromAddress)}}},[a("base-icon",{attrs:{icon:"icon-copy",size:"24"}})],1):t._e()],1)]):a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.from")))]),a("div",{staticClass:"be-flex align-center"},[a("base-icon",{attrs:{icon:t.renderIconCurrency(t.detailRow.paidCurrency.toLowerCase()),size:"20"}}),a("p",{staticClass:"text-detail-2",staticStyle:{"margin-left":"8px"}},[t._v(t._s(t._f("formatTransactionCode")(t.detailRow.paidAddress,10)))]),t.detailRow.paidAddress?a("span",{staticClass:"icon-copy",staticStyle:{"margin-left":"8px"},on:{click:function(e){return t.handleCopyTransaction(t.detailRow.paidAddress)}}},[a("base-icon",{attrs:{icon:"icon-copy",size:"24"}})],1):t._e()],1)]),"WITHDRAW"===t.detailRow.transactionType?a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.to")))]),a("div",{staticClass:"be-flex align-center"},[a("base-icon",{attrs:{icon:t.renderIconCurrency(t.detailRow.currency.toLowerCase()),size:"20"}}),a("p",{staticClass:"text-detail-2",staticStyle:{"margin-left":"8px"}},[t._v(t._s(t._f("formatTransactionCode")(t.detailRow.toAddress,10)))]),t.detailRow.toAddress?a("span",{staticClass:"icon-copy",staticStyle:{"margin-left":"8px"},on:{click:function(e){return t.handleCopyTransaction(t.detailRow.toAddress)}}},[a("base-icon",{attrs:{icon:"icon-copy",size:"24"}})],1):t._e()],1)]):a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.to")))]),a("div",{staticClass:"be-flex align-center"},[t.detailRow.tokenAddress?a("base-icon",{attrs:{icon:t.renderIconCurrency(t.detailRow.paidCurrency.toLowerCase()),size:"20"}}):t._e(),a("p",{staticClass:"text-detail-2",staticStyle:{"margin-left":"8px"}},[t._v(t._s(t._f("formatTransactionCode")(t.detailRow.tokenAddress,10)))]),t.detailRow.tokenAddress?a("span",{staticClass:"icon-copy",staticStyle:{"margin-left":"8px"},on:{click:function(e){return t.handleCopyTransaction(t.detailRow.tokenAddress)}}},[a("base-icon",{attrs:{icon:"icon-copy",size:"24"}})],1):t._e()],1)]),t.checkFeeType(t.detailRow.transactionType)&&"WITHDRAW"===t.detailRow.transactionType?a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.fees")))]),a("div",{staticClass:"be-flex"},[a("p",{staticClass:"sub"},[t._v("-"+t._s(t.detailRow.transactionFeeDisplay)+" "+t._s(t.detailRow.currency))]),a("p",{staticClass:"convert",staticStyle:{"margin-left":"4px"}},[t._v("(~$"+t._s(t.detailRow.transactionFeeToUsdDisplay)+")")])])]):t._e(),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.status")))]),"CROWDSALE"===t.detailRow.transactionType?a("p",{class:"LOCKED"==t.detailRow.status?"status-locked":"status-fail"},[t._v(" "+t._s(t.checkTransactionStatusCrowdSale(t.detailRow.status))+" ")]):a("p",{class:"LOCKED"==t.detailRow.status?"status-locked":"status-fail"},[t._v(t._s(t.checkTransactionStatus(t.detailRow.status)))])])]),"WITHDRAW"===t.detailRow.transactionType?a("div",{staticClass:"customer-info"},[a("p",{staticClass:"title"},[t._v(t._s(t.$t("transaction.popup.customer-info")))]),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.full-name")))]),a("p",{staticClass:"text-detail-2"},[t._v(t._s(t.detailRow.fullName))])]),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.phone-number")))]),t.detailRow.countryCode?a("p",{staticClass:"text-detail-2"},[t._v("("+t._s(t.detailRow.countryCode)+") "+t._s(t.detailRow.phone))]):t._e()]),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.email")))]),a("p",{staticClass:"text-detail-2"},[t._v(t._s(t.detailRow.email))])])]):t._e()])},W=[],F=function(t){Object(l["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(c["a"])(this,a),t=e.apply(this,arguments),t.isLoading=!1,t.tabActive=0,t.titlePopUp="",t}return Object(r["a"])(a,[{key:"handleOpen",value:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.log("open",this.detailRow);case 1:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"handleClose",value:function(){this.tabActive=0,this.detailRow={},this.setOpenPopup({popupName:"popup-exception-detail",isOpen:!1})}},{key:"checkTransactionStatus",value:function(t){switch(t){case"SUCCESS":return this.$i18n.t("transaction.table.succsess");case"PENDING":return this.$i18n.t("transaction.table.pending");case"PROCESSING":return this.$i18n.t("transaction.table.processing");case"REJECTED":return this.$i18n.t("transaction.table.rejected");case"LOCKED":return this.$i18n.t("transaction.table.locked");default:return this.$i18n.t("transaction.table.failed")}}},{key:"checkTransactionStatusCrowdSale",value:function(t){switch(t){case"SUCCESS":return this.$i18n.t("transaction.table.succsess");case"PENDING":return this.$i18n.t("transaction.table.pending");case"PROCESSING":return this.$i18n.t("transaction.table.processing");case"REJECTED":return this.$i18n.t("transaction.table.rejected");case"LOCKED":return this.$i18n.t("transaction.table.locked");case"FAILED":return this.$i18n.t("exception.failed-tranfer");default:return this.$i18n.t("exception.failed-tranfer")}}},{key:"checkType",value:function(t){return"PENDING"===t?"status status-pending":"FAILED"===t?"status status-error":"PROCESSING"===t?"status status-warning":"REJECTED"===t?"status status-rejected":"LOCKED"===t?"status status-locked":"status status-success"}},{key:"getIcon",get:function(){var t=this.detailRow.transactionType;return"WITHDRAW"===t?"icon-withdraw-exception":"CROWDSALE"===t?"menu-crowdsale":"icon-withdraw-exception"}},{key:"checkFeeType",value:function(t){return!(-1!==t.indexOf("BONUS")||"DEPOSIT"===t)}},{key:"checkFromType",value:function(t){return!(-1!==t.indexOf("BONUS")||"DEPOSIT"===t)}},{key:"checkTypeIcon",value:function(t,e){return t&&e?(t.toUpperCase(),e.toUpperCase(),"PENDING"===e||"PROCESSING"===e?-1!==t.indexOf("BONUS")?"icon-bonus-pending":"icon-".concat(t.toLowerCase(),"-pending"):-1!==t.indexOf("BONUS")?"icon-bonus-success":"icon-".concat(t.toLowerCase(),"-success")):""}},{key:"renderIconCurrency",value:function(t){return"lynk"===t?"icon-lynk":"clm"===t?"icon-clm":"btc"===t?"icon-btc":"eth"===t?"icon-eth":"usdt"===t?"icon-usdt":"bnb"===t?"icon-bnb":"usdc"===t?"icon-usdc":"icon-lynk"}},{key:"checkTypeStatusIcon",value:function(t){return"PENDING"===t?"icon-pending":"FAILED"===t?"icon-failed":"PROCESSING"===t?"icon-pending":"REJECTED"===t?"icon-failed":"icon-success"}},{key:"checkValueAmountDisplay",value:function(t){return t?-1!==t.indexOf("+")?"add":"sub":""}},{key:"handleCopyTransaction",value:function(t){var e="",a=document.createElement("input");a.value=t,document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),e=this.$t("notify.copy"),this.$message.success(e)}}]),a}(Object(d["b"])(L["a"]));Object(p["a"])([Object(d["c"])({required:!0,type:Object,default:{}})],F.prototype,"detailRow",void 0),Object(p["a"])([Object(d["c"])({required:!0,type:String,default:""})],F.prototype,"tabActiveFilter",void 0),F=Object(p["a"])([Object(d["a"])({components:{}})],F);var B=F,P=B,U=(a("8ea1d"),Object(C["a"])(P,q,W,!1,null,"eca30598",null)),z=U.exports,M=Object(A["a"])("exception"),G=Object(O["a"])("beBase"),H=function(t){Object(l["a"])(a,t);var e=Object(u["a"])(a);function a(){var t;return Object(c["a"])(this,a),t=e.apply(this,arguments),t.tabs=[{id:2,title:"withdraw",routeName:"ExceptionWithdraw"},{id:3,title:"crowdsales",routeName:"ExceptionCrowdsale"}],t.titlePending="",t.tabActive="withdraw",t.isLoading=!1,t.data=[],t.detailRow={},t.dataDetail={},t.query={search:"",orderBy:1,page:1,limit:10,total:10},t.proptabActive="",t.totalAmount="",t.listApproveBy=[],t.propdataTable=[],t.checkCoppy="",t.debounceInit=Object(E["debounce"])((function(){t.init()}),300),t}return Object(r["a"])(a,[{key:"created",value:function(){this.$router.push({name:"ExceptionWithdraw"}),this.init()}},{key:"init",value:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.data=[],this.propdataTable=[],t.prev=2,this.isLoading=!0,e=Object(s["a"])(Object(s["a"])({},this.query),{},{search:this.query.search,orderBy:this.query.orderBy,limit:this.query.limit,page:this.query.page,total:null}),console.log("params",e),t.next=8,M.getListException(this.tabActive,e);case 8:a=t.sent,"ExceptionWithdraw"===this.$route.name?(this.totalAmount=a.totalAmount,this.data=a.withdrawPage.content||[],this.propdataTable=a.withdrawPage.content||[],this.query.total=a.withdrawPage.totalElements):"ExceptionCrowdsale"===this.$route.name&&(this.totalAmount=a.totalTokenAmount,this.data=a.crowdsales.content||[],this.propdataTable=a.crowdsales.content||[],this.query.total=a.crowdsales.totalElements),this.isLoading=!1,t.next=17;break;case 13:t.prev=13,t.t0=t["catch"](2),this.isLoading=!1,console.log(t.t0);case 17:case"end":return t.stop()}}),t,this,[[2,13]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"handleChangeTab",value:function(t){this.$router.push({name:t.routeName}),this.tabActive=t.title,this.query.page=1,this.query.limit=10,this.query.orderBy=1,this.query.search="",this.query.currency="",this.query.fromDate="",this.query.toDate="",this.query.fromAmount="",this.query.toAmount="",this.query.status="",this.query.orderBy="1",this.init(),this.resetQuery(),b["a"].$emit("changeTabException",this.$route.name)}},{key:"resetQuery",value:function(){this.query=Object(s["a"])(Object(s["a"])({},this.query),{},{page:1,limit:10,search:"",orderBy:"1"})}},{key:"handlePageChange",value:function(t){this.query.page=t,this.init()}},{key:"handleSizeChange",value:function(t){this.query.limit=t,this.init()}},{key:"handleCoppy",value:function(t){console.log("value",t),this.checkCoppy=t.toString()}},{key:"handleRowClick",value:function(t){this.detailRow=t.row,"1"==this.checkCoppy?this.setOpenPopup({popupName:"popup-exception-detail",isOpen:!1}):this.setOpenPopup({popupName:"popup-exception-detail",isOpen:!0}),b["a"].$emit("checkRowClick")}},{key:"handleFilter",value:function(t){this.query=Object(s["a"])(Object(s["a"])(Object(s["a"])({},this.query),t),{},{page:1,limit:10}),this.debounceInit()}}]),a}(Object(d["b"])(L["a"]));Object(p["a"])([G.State("coinMain")],H.prototype,"coinMain",void 0),H=Object(p["a"])([Object(d["a"])({components:{ExceptionTable:w,ExceptionDetail:z,ExceptionFilter:N}})],H);var K=H,V=K,J=(a("5190"),Object(C["a"])(V,i,n,!1,null,"78c066e8",null));e["default"]=J.exports},fd44:function(t,e,a){}}]);
//# sourceMappingURL=chunk-2eec3a4f.0460f91d.js.map