(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-067010f9"],{1252:function(t,e,a){"use strict";a("2000")},"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},1847:function(t,e,a){"use strict";var n=a("2b0e"),i=new n["default"];e["a"]=i},1855:function(t,e,a){"use strict";a("7c0b")},2e3:function(t,e,a){},"3bf5":function(t,e,a){},4808:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"fee"},[a("div",{staticClass:"w-100 bo-kyc"},[a("div",{staticClass:"bg-white wallet-header"},[a("div",{staticClass:"be-flex align-center jc-space-between wallet-header__above"},[a("div",{staticClass:"wallet-header__above-tabs be-flex"},t._l(t.getTab,(function(e){return a("div",{key:e.id,staticClass:"tab-item cursor",class:t.$route.name===e.routeName?"tab-active":null,on:{click:function(a){return t.handleChangeTab(e)}}},[a("span",{staticClass:"text-base"},[t._v(t._s(t.$t("menu."+e.title)))])])})),0)])]),a("div",{staticClass:"container wallet-header-task",staticStyle:{width:"calc(100% - 48px)"}},[a("div",{staticClass:"col-width col-margin"},[a("div",{staticClass:"sack-banlance"},[a("span",{staticClass:"text1"},[t._v(" "+t._s(t.$t("fee.total-withdraw"))+" ")]),a("div",[a("base-icon",{attrs:{icon:"icon-upload",size:"24"}})],1)]),a("span",{staticClass:"number2"},[t._v(" "+t._s(t._f("convertAmountDecimal")(t.withdraw.totalTransactionFee,t.withdraw.currency))+" "),a("span",{staticClass:"currency"},[t._v(t._s(t.withdraw.currency)+" ")])]),a("div",[a("span",{staticClass:"text3"},[t._v("~$"+t._s(t._f("convertAmountDecimal")(t.withdraw.totalTransactionFeeUsd,"USD")))])])]),a("div",{staticClass:"col-width col-margin"},[a("div",{staticClass:"sack-banlance"},[a("span",{staticClass:"text1"},[t._v(t._s(t.$t("fee.total-transfer"))+" ")]),a("div",[a("base-icon",{attrs:{icon:"icon-swap-2",size:"24"}})],1)]),a("span",{staticClass:"number2"},[t._v(" "+t._s(t._f("convertAmountDecimal")(t.transfer.totalTransactionFee,t.transfer.currency))+" "),a("span",{staticClass:"currency"},[t._v(t._s(t.transfer.currency)+" ")])]),a("span",{staticClass:"text3"},[t._v("~$"+t._s(t._f("convertAmountDecimal")(t.transfer.totalTransactionFeeUsd,"USD")))])]),a("div",{staticClass:"col-width col-margin"},[a("div",{staticClass:"sack-banlance"},[a("span",{staticClass:"text1"},[t._v(t._s(t.$t("fee.total-fee")))]),a("div",[a("base-icon",{attrs:{icon:"total-fee",size:"24"}})],1)]),a("span",{staticClass:"number2"},[t._v(" "+t._s(t._f("convertAmountDecimal")(t.withdraw.totalTransactionFee+t.transfer.totalTransactionFee,t.withdraw.currency))+" "),a("span",{staticClass:"currency"},[t._v(t._s(t.withdraw.currency)+" ")])]),a("span",{staticClass:"text3"},[t._v("~$"+t._s(t._f("convertAmountDecimal")(t.withdraw.totalTransactionFeeUsd+t.transfer.totalTransactionFeeUsd,"USD"))+" ")])]),a("div",{staticClass:"col-width col-margin",staticStyle:{visibility:"hidden"}},[a("div",{staticClass:"sack-banlance"},[a("span",{staticClass:"text1"},[t._v(" "+t._s(t.$t("fee.total-exchange")))]),a("div",[a("base-icon",{attrs:{icon:"icon-gift",size:"24"}})],1)])])])]),a("div",{staticClass:"w-100 box-shadow",staticStyle:{height:"auto","background-color":"white"}},[a("div",{staticClass:"w-100 filter-header"},t._l(t.filterTypes,(function(e){return a("span",{key:e.typeId,staticClass:"filter-type cursor",class:t.typeActive.typeId===e.typeId?"tab-active":null,on:{click:function(a){return t.handleChangeType(e)}}},[t._v(" "+t._s(e.title)+" ")])})),0),a("div",{staticClass:"w-100",staticStyle:{"background-color":"red"}},[a("fee-filter",{attrs:{reseted:{deleteCache:t.isChanged}},on:{filterFee:function(e){return t.handleFilter(e)},reseted:t.handleNormalize}}),a("fee-table",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],attrs:{query:t.query,propTabActive:t.tabActive,data:t.propdataTable},on:{rowClick:t.handleRowClick,sizeChange:t.handleSizeChange,pageChange:t.handlePageChange}})],1)]),a("fee-detail",{attrs:{"detail-row":t.detailRow,"tab-active-filter":t.tabActive}})],1)},i=[],s=a("f3f3"),o=a("c964"),c=a("d0ff"),r=a("276c"),l=a("e954"),u=a("920b"),p=a("92a6"),d=(a("96cf"),a("99af"),a("ac1f"),a("1276"),a("159b"),a("4de4"),a("841c"),a("9ab4")),f=a("1b40"),h=a("9f48"),v=a("08ba"),b=a("2ef0"),m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pb-24 pt-24 be-flex align-center kyc-filter"},[a("el-input",{staticClass:"input-search",attrs:{placeholder:t.$t("placeholder.search")},model:{value:t.filterFee.search,callback:function(e){t.$set(t.filterFee,"search",e)},expression:"filterFee.search"}},[a("span",{staticClass:"prefix-search",attrs:{slot:"prefix"},slot:"prefix"},[a("base-icon",{attrs:{icon:"icon-search",size:"24"}})],1)]),a("div",{staticClass:"filter-item"},[a("div",{staticClass:"cursor text-filter",staticStyle:{"font-size":"16px"},on:{click:t.handleOpen}},[a("span",{staticClass:"abicon"},[a("base-icon",{staticStyle:{color:"#5b616e","margin-right":"10px"},attrs:{icon:"icon-filter",size:"18"}})],1),t._v(" "+t._s(t.$t("kyc.filter.filter"))+" ")])]),a("div",[a("el-dropdown",{staticClass:"sort",attrs:{trigger:"click"},on:{command:t.handleSort}},[a("span",{staticClass:"abicon sort-title",staticStyle:{"font-size":"16px"}},[a("base-icon",{staticClass:"icon",staticStyle:{color:"#5b616e","margin-right":"10px"},attrs:{icon:"icon-sort",size:"18"}}),t._v(" "+t._s(t.$t("kyc.filter.sort")))],1),a("el-dropdown-menu",{staticClass:"header-downloadapp dropdown-sort",staticStyle:{width:"230px"},attrs:{slot:"dropdown"},slot:"dropdown"},t._l(t.sorts,(function(e,n){return a("el-dropdown-item",{key:n,class:t.sortActive===e.command?"active":null,attrs:{command:e.command,divided:e.divided}},[a("span",{staticClass:"be-flex"},[a("span",{staticClass:"be-flex-item"},[t._v(" "+t._s(e.label)+" ")]),t.sortActive===e.command?a("base-icon",{attrs:{icon:"icon-tick-dropdown",size:"16"}}):t._e()],1)])})),1)],1)],1),a("popup-fee",{attrs:{resetFilter:{deleteCache:t.isChanged}},on:{feeFilterBark:function(e){return t.handleCatchBark(e)},filterReseted:t.handleNormalize}})],1)},y=[],_=a("1847"),C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("base-popup",{staticClass:"popup-fee",attrs:{name:"popup-fee",width:"600px",close:t.handleClose}},[a("div",{staticClass:"title-popup",attrs:{slot:"title"},slot:"title"},[a("span",[t._v(t._s(t.popup_data.header.title))])]),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticClass:"content"},[a("div",{staticClass:"content-block"},[a("p",{staticClass:"content-block__title"},[t._v(t._s(t.popup_data.content.date.title))]),a("div",{staticClass:"content-block__inputs"},[a("el-date-picker",{staticClass:"input-small",attrs:{placeholder:t.popup_data.content.date.input.placeholder1,format:"MM/dd/yyyy","value-format":"timestamp","prefix-icon":"el-icon-date",type:"date","picker-options":t.pickerOption2},model:{value:t.popup_data.content.date.input.value1,callback:function(e){t.$set(t.popup_data.content.date.input,"value1",e)},expression:"popup_data.content.date.input.value1"}}),a("span",{staticStyle:{display:"block",width:"8px",height:"2px","background-color":"#dbdbdb"}}),a("el-date-picker",{staticClass:"input-small",attrs:{placeholder:t.popup_data.content.date.input.placeholder2,format:"MM/dd/yyyy","value-format":"timestamp","prefix-icon":"el-icon-date",type:"date","picker-options":t.pickerOption},model:{value:t.popup_data.content.date.input.value2,callback:function(e){t.$set(t.popup_data.content.date.input,"value2",e)},expression:"popup_data.content.date.input.value2"}})],1)]),a("div",{staticClass:"content-block"},[a("p",{staticClass:"content-block__title"},[t._v(t._s(t.popup_data.content.amount.title))]),a("div",{staticClass:"content-block__inputs"},[a("el-input",{staticClass:"input-small money",class:{"input-error":!!t.error.amount},attrs:{placeholder:t.popup_data.content.amount.input.placeholder1},nativeOn:{keypress:function(e){return t.onlyNumber(e)},keyup:function(e){return t.numberFormat(e,"amount")}},model:{value:t.popup_data.content.amount.input.value1,callback:function(e){t.$set(t.popup_data.content.amount.input,"value1",e)},expression:"popup_data.content.amount.input.value1"}}),a("span",{staticStyle:{display:"block",width:"8px",height:"2px","background-color":"#dbdbdb"}}),a("el-input",{staticClass:"input-small money",class:{"input-error":!!t.error.amount},attrs:{placeholder:t.popup_data.content.amount.input.placeholder2},nativeOn:{keypress:function(e){return t.onlyNumber(e)},keyup:function(e){return t.numberFormat(e,"amount")}},model:{value:t.popup_data.content.amount.input.value2,callback:function(e){t.$set(t.popup_data.content.amount.input,"value2",e)},expression:"popup_data.content.amount.input.value2"}})],1),"amount"===this.error.amount?a("p",{staticClass:"content-block__alert"},[t._v(t._s(t.popup_data.content.amount.alert))]):t._e()]),a("div",{staticClass:"content-block"},[a("p",{staticClass:"content-block__title"},[t._v(t._s(t.popup_data.content.fee.title))]),a("div",{staticClass:"content-block__inputs"},[a("el-input",{staticClass:"input-small money",class:{"input-error":!!t.error.fee},attrs:{placeholder:t.popup_data.content.fee.input.placeholder1},nativeOn:{keypress:function(e){return t.onlyNumber(e)},keyup:function(e){return t.numberFormat(e,"fee")}},model:{value:t.popup_data.content.fee.input.value1,callback:function(e){t.$set(t.popup_data.content.fee.input,"value1",e)},expression:"popup_data.content.fee.input.value1"}}),a("span",{staticStyle:{display:"block",width:"8px",height:"2px","background-color":"#dbdbdb"}}),a("el-input",{staticClass:"input-small money",class:{"input-error":!!t.error.fee},attrs:{placeholder:t.popup_data.content.fee.input.placeholder2},nativeOn:{keypress:function(e){return t.onlyNumber(e)},keyup:function(e){return t.numberFormat(e,"fee")}},model:{value:t.popup_data.content.fee.input.value2,callback:function(e){t.$set(t.popup_data.content.fee.input,"value2",e)},expression:"popup_data.content.fee.input.value2"}})],1),"fee"===this.error.fee?a("p",{staticClass:"content-block__alert"},[t._v(t._s(t.popup_data.content.fee.alert))]):t._e()]),a("div",{staticClass:"content-block"},[a("p",{staticClass:"content-block__title"},[t._v(t._s(t.popup_data.content.status.title))]),a("div",{staticClass:"content-block__inputs"},[a("el-select",{staticClass:"input-lg",attrs:{placeholder:"Select",clearable:""},model:{value:t.popup_data.content.status.value,callback:function(e){t.$set(t.popup_data.content.status,"value",e)},expression:"popup_data.content.status.value"}},t._l(t.popup_data.content.status.options,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1)])]),a("div",{staticClass:"footer",attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:"wrap-button"},[a("div",{staticClass:"btn-right"},[a("el-button",{staticClass:"btn-default btn-400 btn-h-40 btn-close",on:{click:t.handleReset}},[t._v(" "+t._s(t.popup_data.footer.btnReset)+" ")]),a("el-button",{staticClass:"btn-default-bg btn-400 btn-h-40 is-none-border",staticStyle:{"font-size":"14px","font-weight":"600"},attrs:{disabled:!(!t.error.amount&&!t.error.fee)},on:{click:t.handleFilters}},[t._v(" "+t._s(t.popup_data.footer.btnContinues)+" ")])],1)])])])},k=[],w=function(t){Object(u["a"])(a,t);var e=Object(p["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.isLoading=!1,t.error={amount:"",fee:""},t.popup_data={header:{title:t.$i18n.t("popup-fee.title")},content:{date:{title:t.$i18n.t("popup-fee.date"),input:{placeholder1:t.$i18n.t("popup-fee.placeholder.date1"),placeholder2:t.$i18n.t("popup-fee.placeholder.date2"),value1:"",value2:""}},amount:{title:t.$i18n.t("popup-fee.amount"),input:{placeholder1:t.$i18n.t("popup-fee.placeholder.amount1"),placeholder2:t.$i18n.t("popup-fee.placeholder.amount2"),value1:"",value2:""},alert:t.$i18n.t("popup-fee.alert.amount")},fee:{title:t.$i18n.t("popup-fee.fee"),input:{placeholder1:t.$i18n.t("popup-fee.placeholder.fee1"),placeholder2:t.$i18n.t("popup-fee.placeholder.fee2"),value1:"",value2:""},alert:t.$i18n.t("popup-fee.alert.fee")},status:{title:t.$i18n.t("popup-fee.status"),options:[{value:"SUCCESS",label:t.$i18n.t("popup-fee.success")},{value:"PENDING",label:t.$i18n.t("popup-fee.pending")},{value:"FAILED",label:t.$i18n.t("popup-fee.failed")},{value:"REJECTED",label:t.$i18n.t("popup-fee.reject")},{value:"PROCESSING",label:t.$i18n.t("popup-fee.processing")}],value:"SUCCESS"}},footer:{btnReset:t.$i18n.t("popup-fee.reset"),btnContinues:t.$i18n.t("popup-fee.continues")}},t}return Object(l["a"])(a,[{key:"pickerOption",get:function(){var t=this;return{disabledDate:function(e){return t.disableTime(e,"from-to")}}}},{key:"pickerOption2",get:function(){var t=this;return{disabledDate:function(e){return t.disableTime(e,"to-from")}}}},{key:"disableTime",value:function(t,e){if("from-to"===e){if(this.popup_data.content.date.input.value1)return t.getTime()/1e3<new Date(this.popup_data.content.date.input.value1).getTime()/1e3-25200}else if(this.popup_data.content.date.input.value2)return t.getTime()/1e3>new Date(this.popup_data.content.date.input.value2).getTime()/1e3}},{key:"handleDeleteCache",value:function(t){!0===this.resetFilter.deleteCache&&(this.handleReset(),this.$emit("filterReseted"))}},{key:"onlyNumber",value:function(t){var e=t.keyCode?t.keyCode:t.which;(e<48||e>57)&&46!==e&&t.preventDefault()}},{key:"checkValid",value:function(t){var e=parseFloat(this.popup_data.content[t].input.value2.replaceAll(",","")),a=parseFloat(this.popup_data.content[t].input.value1.replaceAll(",",""));return a>e?(this.error[t]=t,!1):(this.error[t]="",!0)}},{key:"numberFormat",value:function(t,e){var a=t;this.checkValid(e);var n,i=a.target.value;i.length>0&&(i=i.replaceAll(",",""),i=null===(n=this.$options.filters)||void 0===n?void 0:n.numberWithCommas(i),a.target.value=i)}},{key:"handleReset",value:function(){this.popup_data.content.date.input.value1="",this.popup_data.content.date.input.value2="",this.popup_data.content.amount.input.value1="",this.popup_data.content.amount.input.value2="",this.popup_data.content.fee.input.value1="",this.popup_data.content.fee.input.value2="",this.popup_data.content.status.value="SUCCESS",this.checkValid("amount"),this.checkValid("fee")}},{key:"handleClose",value:function(){this.setOpenPopup({popupName:"popup-fee",isOpen:!1})}},{key:"handleFilters",value:function(){var t,e,a="",n="";this.popup_data.content.date.input.value1&&(a=null===(t=this.$options.filters)||void 0===t?void 0:t.formatReferral(this.popup_data.content.date.input.value1));this.popup_data.content.date.input.value2&&(n=null===(e=this.$options.filters)||void 0===e?void 0:e.formatReferral(this.popup_data.content.date.input.value2+86399e3));var i={fromDate:a,toDate:n,fromAmount:this.popup_data.content.amount.input.value1,toAmount:this.popup_data.content.amount.input.value2,fromFee:this.popup_data.content.fee.input.value1,toFee:this.popup_data.content.fee.input.value2,status:""===this.popup_data.content.status.value?null:this.popup_data.content.status.value};this.$emit("feeFilterBark",i),this.handleClose()}}]),a}(Object(f["b"])(h["a"]));Object(d["a"])([Object(f["c"])({required:!0,type:Object,default:[]})],w.prototype,"resetFilter",void 0),Object(d["a"])([Object(f["e"])("resetFilter")],w.prototype,"handleDeleteCache",null),w=Object(d["a"])([f["a"]],w);var g=w,O=g,$=(a("95a1"),a("2877")),F=Object($["a"])(O,C,k,!1,null,"4228832f",null),T=F.exports,x=(Object(v["a"])("kyc"),function(t){Object(u["a"])(a,t);var e=Object(p["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.filterFee={search:"",fromDate:"",toDate:"",fromAmount:"",toAmount:"",fromFee:"",toFee:"",status:"SUCCESS",orderBy:"1"},t.loading=!1,t.isChanged=!1,t.queryApprove={page:1,limit:20,search:""},t.sorts=[{command:"1",label:t.$i18n.t("fee-filter.transaction-date"),divided:!1,i18n:"fee-filter.transaction-date"},{command:"2",label:t.$i18n.t("fee-filter.transaction-amount"),divided:!1,i18n:"fee-filter.transaction-amount"},{command:"3",label:t.$i18n.t("fee-filter.status"),divided:!1,i18n:"fee-filter.status"}],t.sortActive="1",t.isVisible=!1,t.searchText=Object(b["debounce"])((function(e){t.$emit("filterFee",Object(s["a"])(Object(s["a"])({},t.filterFee),{},{search:Object(b["trim"])(e)}))}),500),t}return Object(l["a"])(a,[{key:"getSign",get:function(){return{deleteCache:this.reseted.deleteCache}}},{key:"handleSearch",value:function(t){this.searchText(t)}},{key:"handleDeleteCache",value:function(t){!0===this.reseted.deleteCache&&(this.handleReset(),this.sortActive="1",this.isChanged=!0,this.$emit("reseted"))}},{key:"numberFormat",value:function(t){var e,a=t,n=a.target.value;n.length>0&&(n=n.replaceAll(",",""),n=parseInt(n),isNaN(n)?a.target.value=0:(n=null===(e=this.$options.filters)||void 0===e?void 0:e.numberWithCommas(n),a.target.value=n))}},{key:"created",value:function(){var t=this;_["a"].$on("changeLang",(function(){Object(b["forEach"])(t.sorts,(function(e){e.label=t.$i18n.t(e.i18n)})),t.$forceUpdate()}))}},{key:"destroyed",value:function(){_["a"].$off("changeLang")}},{key:"handleCatchBark",value:function(t){var e=Object(s["a"])(Object(s["a"])({search:this.filterFee.search},t),{},{orderBy:this.filterFee.orderBy});this.$emit("filterFee",e),this.filterFee=e}},{key:"handleOpen",value:function(){this.setOpenPopup({popupName:"popup-fee",isOpen:!0})}},{key:"resetFilter",value:function(){this.filterFee={search:"",fromDate:"",toDate:"",fromAmount:"",toAmount:"",fromFee:"",toFee:"",status:"",orderBy:""}}},{key:"handleSort",value:function(t){this.sortActive=t,this.filterFee.orderBy=t,this.$emit("filterFee",this.filterFee)}},{key:"handleReset",value:function(){this.filterFee={search:"",fromDate:"",toDate:"",fromAmount:"",toAmount:"",fromFee:"",toFee:"",status:"",orderBy:"1"},this.isVisible=!1}},{key:"handleNormalize",value:function(){this.isChanged=!1}}]),a}(Object(f["b"])(h["a"])));Object(d["a"])([Object(f["c"])({required:!0,type:Object,default:[]})],x.prototype,"reseted",void 0),Object(d["a"])([Object(f["e"])("filterFee.search")],x.prototype,"handleSearch",null),Object(d["a"])([Object(f["e"])("reseted")],x.prototype,"handleDeleteCache",null),x=Object(d["a"])([Object(f["a"])({components:{PopupFee:T}})],x);var D=x,S=D,A=(a("1855"),Object($["a"])(S,m,y,!1,null,"d864d520",null)),R=A.exports,j=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"w-100 bg-white wallet-table"},[a("div",{staticClass:"wallet-table__below"},[a("base-table",{staticClass:"base-table table-wallet",attrs:{data:t.data,table:t.query,paginationInfo:t.getPaginationInfo},on:{sizeChange:t.handleSizeChange,currentChange:t.handleCurrentChange,rowClick:t.handleRowClick}},[a("el-table-column",{attrs:{label:"#",type:"index",index:t.indexMethod,align:"center",width:"80"}}),a("el-table-column",{attrs:{label:t.$t("transaction.table.trans-id")},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"be-flex align-center"},[a("span",{staticClass:"transaction-code d-ib mr-2"},[t._v(t._s(t._f("formatTransactionCode")(e.row.transactionHash,10)))]),e.row.transactionHash?a("span",{ref:"buttonCopy",staticClass:"icon-copy",on:{click:function(a){return a.stopPropagation(),t.handleCopyTransaction(e.row)}}},[a("base-icon",{attrs:{icon:"icon-copy",size:"24"}})],1):t._e()])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.table.date"),prop:"transactionDate",width:220},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("formatMMDDYY")(e.row.transactionMillisecond)))])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.table.CUSTOMER"),width:"260"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"customer"},[a("p",[t._v(t._s(e.row.fullName))]),a("p",{staticStyle:{"font-size":"14px",color:"#5b616e","line-height":"20px"}},[t._v(t._s(e.row.email))])])]}}])}),a("el-table-column",{attrs:{label:t.$t("transaction.table.status"),width:144,align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"text-xs",class:t.checkType(e.row.status)},[t._v(t._s(t.handleCapitalize(e.row.status)))])]}}])}),a("el-table-column",{attrs:{label:t.$t("fee.table.fee"),align:"right",width:200,prop:"transactionFee"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("div",{staticClass:"amount-increase"},[a("span",{class:t.checkValueFeeDisplay(e.row.transactionFee)},[t._v(" "+t._s(e.row.transactionFeeDisplay.index)+" "+t._s(e.row.transactionFeeDisplay)+" ")]),a("span",{staticClass:"d-block amount-exchange-small"},[t._v("~$"+t._s(t._f("convertAmountDecimal")(e.row.transactionFeeToUsd,"USD")))])])])]}}])})],1)],1)])},E=[],N=function(t){Object(u["a"])(a,t);var e=Object(p["a"])(a);function a(){return Object(r["a"])(this,a),e.apply(this,arguments)}return Object(l["a"])(a,[{key:"getPaginationInfo",get:function(){return this.$t("paging.transaction")}},{key:"checkType",value:function(t){var e="PENDING"===t?"status status-pending":"FAILED"===t||"LOCKED"===t||"WAITING"===t||"EXPIRED"===t?"status status-error":"PROCESSING"===t?"status status-warning":"REJECTED"===t?"status status-rejected":"status status-success";return e}},{key:"getDataSelectTab",value:function(){}},{key:"created",value:function(){}},{key:"checkStatus",value:function(t){switch(t){case"PENDING":return this.$t("status.pending");case"VERIFIED":return this.$t("status.verified");default:return this.$t("status.rejected")}}},{key:"checkValueAmountDisplay",value:function(t){return t?-1!==t.indexOf("+")?"add":"sub":""}},{key:"checkValueFeeDisplay",value:function(t){return t?t>=0?"add":"sub":""}},{key:"handleCopyTransaction",value:function(t){this.$emit("copy","copy");var e="",a=document.createElement("input");a.value=t.transactionHash,document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),e=this.$t("notify.copy"),this.$message.success(e)}},{key:"indexMethod",value:function(t){return(this.query.page-1)*this.query.limit+t+1}},{key:"handleSizeChange",value:function(t){this.$emit("sizeChange",t)}},{key:"handleCurrentChange",value:function(t){this.$emit("pageChange",t)}},{key:"handleRowClick",value:function(t){this.$emit("rowClick",t.row)}},{key:"handleCapitalize",value:function(t){var e="";switch(t){case"SUCCESS":e=this.$i18n.t("fee.status.success");break;case"PENDING":e=this.$i18n.t("fee.status.pending");break;case"FAILED":e=this.$i18n.t("fee.status.failed");break;case"REJECTED":e=this.$i18n.t("fee.status.reject");break;case"PROCESSING":e=this.$i18n.t("fee.status.processing");break;case"LOCKED":e=this.$i18n.t("fee.status.locked");break;case"WAITING":e=this.$i18n.t("fee.status.waiting");break;case"EXPIRED":e=this.$i18n.t("fee.status.expired");break}return e}}]),a}(f["d"]);Object(d["a"])([Object(f["c"])({required:!0,type:Object,default:{}})],N.prototype,"query",void 0),Object(d["a"])([Object(f["c"])({required:!0,type:Array,default:[]})],N.prototype,"data",void 0),Object(d["a"])([Object(f["c"])()],N.prototype,"propTabActive",void 0),N=Object(d["a"])([f["a"]],N);var I=N,q=I,P=(a("8450"),Object($["a"])(q,j,E,!1,null,"5b0e269a",null)),U=P.exports,z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("base-popup",{staticClass:"popup-fee-detail",attrs:{name:"popup-fee-detail",width:"480px",isShowFooter:!1,open:t.handleOpen,close:t.handleClose}},[a("div",{staticClass:"title-popup",attrs:{slot:"title"},slot:"title"},[a("span",[t._v(t._s(t.handleRenderTitleDetail(t.detailRow.transactionType))+" "+t._s(t.detailRow.currency))])]),a("div",{staticClass:"w-100 fluctuating"},[a("div",{staticClass:"text-center"},[a("div",{staticClass:"icon",class:t.checkTypeStatusIcon(t.detailRow.status)},[a("base-icon",{attrs:{className:"icon-pending",icon:t.checkTypeIcon(t.detailRow.transactionType,t.detailRow.status),size:"64"}})],1),a("p",{class:t.checkValueFeeDisplay(t.detailRow.transactionFee)},[t._v(t._s(t._f("convertAmountDecimal")(t.detailRow.transactionFee,t.detailRow.currency))+" "+t._s(t.detailRow.currency))]),a("p",{staticClass:"usd"},[t._v("~$"+t._s(t._f("convertAmountDecimal")(t.detailRow.transactionFeeToUsd,"USD")))])])]),a("div",{staticClass:"transaction-detail"},[a("p",{staticClass:"title"},[t._v(t._s(t.$t("transaction.popup.transaction-detail")))]),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.transaction-id")))]),a("div",{staticClass:"be-flex align-center"},[a("p",{staticClass:"text-detail-2"},[t._v(t._s(t._f("formatTransactionCode")(t.detailRow.transactionHash,10)))]),t.detailRow.transactionHash?a("span",{staticClass:"icon-copy",staticStyle:{"margin-left":"8px"},on:{click:function(e){return t.handleCopyTransaction(t.detailRow.transactionHash)}}},[a("base-icon",{attrs:{icon:"icon-copy",size:"24"}})],1):t._e()])]),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.date")))]),a("p",{staticClass:"text-detail-2"},[t._v(t._s(t._f("formatMMDDYY")(t.detailRow.transactionMillisecond)))])]),t.checkFromType(t.detailRow.transactionType)?a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.from")))]),a("div",{staticClass:"be-flex align-center"},[a("base-icon",{attrs:{icon:t.renderIconCurrency(t.detailRow.currency),size:"20"}}),a("p",{staticClass:"text-detail-2",staticStyle:{"margin-left":"8px"}},[t._v(t._s(t._f("formatTransactionCode")(t.detailRow.fromAddress,10)))]),t.detailRow.fromAddress?a("span",{staticClass:"icon-copy",staticStyle:{"margin-left":"8px"},on:{click:function(e){return t.handleCopyTransaction(t.detailRow.fromAddress)}}},[a("base-icon",{attrs:{icon:"icon-copy",size:"24"}})],1):t._e()],1)]):t._e(),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.to")))]),a("div",{staticClass:"be-flex align-center"},[a("base-icon",{attrs:{icon:t.renderIconCurrency(t.detailRow.currency),size:"20"}}),a("p",{staticClass:"text-detail-2",staticStyle:{"margin-left":"8px"}},[void 0!==t.detailRow.toAddress&&t.detailRow.toAddress.length>25?a("span",[t._v(" "+t._s(t._f("formatTransactionCode")(t.detailRow.toAddress,10))+" ")]):a("span",[t._v(" "+t._s(t.detailRow.toAddress)+" ")])]),t.detailRow.toAddress?a("span",{staticClass:"icon-copy",staticStyle:{"margin-left":"8px"},on:{click:function(e){return t.handleCopyTransaction(t.detailRow.toAddress)}}},[a("base-icon",{attrs:{icon:"icon-copy",size:"24"}})],1):t._e()],1)]),t.checkFeeType(t.detailRow.transactionType)?a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.fees")))]),a("div",{staticClass:"be-flex"},[t.detailRow.transactionFee>0?a("p",{staticClass:"add"},[t._v(t._s(t._f("convertAmountDecimal")(t.detailRow.transactionFee,t.detailRow.currency))+" "+t._s(t.detailRow.currency))]):t._e(),t.detailRow.transactionFee<0?a("p",{staticClass:"sub"},[t._v(t._s(t._f("convertAmountDecimal")(t.detailRow.transactionFee,t.detailRow.currency))+" "+t._s(t.detailRow.currency))]):t._e(),a("p",{staticClass:"convert",staticStyle:{"margin-left":"4px"}},[t._v("(~$"+t._s(t._f("convertAmountDecimal")(t.detailRow.transactionFeeToUsd,"USD"))+")")])])]):t._e(),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.status")))]),a("p",{class:t.checkType(t.detailRow.status)},[t._v(t._s(t.checkTransactionStatus(t.detailRow.status)))])])]),a("div",{staticClass:"customer-info"},[a("p",{staticClass:"title"},[t._v(t._s(t.$t("transaction.popup.customer-info")))]),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.full-name")))]),a("p",{staticClass:"text-detail-2"},[t._v(t._s(t.detailRow.fullName))])]),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.phone-number")))]),t.detailRow.phone?a("p",{staticClass:"text-detail-2"},[t._v("("+t._s(t.detailRow.phoneCode)+") "+t._s(t.detailRow.phone))]):t._e()]),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.email")))]),a("p",{staticClass:"text-detail-2"},[t._v(t._s(t.detailRow.email))])])])])},B=[],L=function(t){Object(u["a"])(a,t);var e=Object(p["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.isLoading=!1,t.tabActive=0,t}return Object(l["a"])(a,[{key:"handleOpen",value:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}()},{key:"handleClose",value:function(){this.tabActive=0,this.setOpenPopup({popupName:"popup-fee-detail",isOpen:!1})}},{key:"checkTransactionStatus",value:function(t){switch(t){case"SUCCESS":return this.$i18n.t("transaction.table.succsess");case"PENDING":return this.$i18n.t("transaction.table.pending");case"PROCESSING":return this.$i18n.t("transaction.table.processing");case"REJECTED":return this.$i18n.t("transaction.table.rejected");case"LOCKED":return this.$i18n.t("transaction.table.locked");case"WAITING":return this.$i18n.t("transaction.table.waiting");case"EXPIRED":return this.$i18n.t("transaction.table.expired");default:return this.$i18n.t("transaction.table.failed")}}},{key:"checkType",value:function(t){return"PENDING"===t?"status status-pending":"FAILED"===t||"LOCKED"===t||"EXPIRED"===t||"WAITING"===t?"status status-error":"PROCESSING"===t?"status status-warning":"REJECTED"===t?"status status-rejected":"status status-success"}},{key:"checkFeeType",value:function(t){return!!t&&!(-1!==t.indexOf("BONUS")||"DEPOSIT"===t)}},{key:"checkFromType",value:function(t){return!!t&&!(-1!==t.indexOf("BONUS")||"DEPOSIT"===t)}},{key:"checkTypeIcon",value:function(t,e){return t&&e?(t.toUpperCase(),e.toUpperCase(),"PENDING"===e||"PROCESSING"===e?-1!==t.indexOf("BONUS")?"icon-bonus-pending":"WITHDRAW"===t?"icon-withdraw-pending":"TRANSFER"===t?"icon-transfer-pending":"":-1!==t.indexOf("BONUS")?"icon-bonus-success":"WITHDRAW"===t?"icon-withdraw-success":"TRANSFER"===t?"icon-transfer-success":""):""}},{key:"renderIconCurrency",value:function(t){var e;return t=null===(e=t)||void 0===e?void 0:e.toLowerCase(),"lynk"===t?"icon-lynk":"clm"===t?"icon-clm":"btc"===t?"icon-btc":"eth"===t?"icon-eth":"usdt"===t?"icon-usdt":"bnb"===t?"icon-bnb":"usdc"===t?"icon-usdc":"busd"===t?"icon-busd":"icon-lynk"}},{key:"checkTypeStatusIcon",value:function(t){return"PENDING"===t?"icon-pending":"FAILED"===t?"icon-failed":"PROCESSING"===t?"icon-pending":"REJECTED"===t?"icon-failed":"icon-success"}},{key:"checkValueFeeDisplay",value:function(t){return t?t>=0?"add":"sub":""}},{key:"handleCopyTransaction",value:function(t){var e="",a=document.createElement("input");a.value=t,document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),e=this.$t("notify.copy"),this.$message.success(e)}},{key:"handleRenderTitleDetail",value:function(t){if(t){var e=t.replaceAll("_"," ");switch(e){case"WITHDRAW":return this.$i18n.t("fee.withdraw");case"TRANSFER":return this.$i18n.t("fee.transfer");case"TRADING NFT":return this.$i18n.t("fee.trading");case"EXCHANGE":return this.$i18n.t("fee.exchange")}return e}return""}}]),a}(Object(f["b"])(h["a"]));Object(d["a"])([Object(f["c"])({required:!0,type:Object,default:{}})],L.prototype,"detailRow",void 0),Object(d["a"])([Object(f["c"])({required:!0,type:String,default:""})],L.prototype,"tabActiveFilter",void 0),L=Object(d["a"])([Object(f["a"])({components:{}})],L);var G=L,M=G,W=(a("9e59"),Object($["a"])(M,z,B,!1,null,"11452a6c",null)),H=W.exports,V=a("4bb5"),J=Object(v["a"])("fee"),K=Object(V["a"])("beBase"),Y=function(t){Object(u["a"])(a,t);var e=Object(p["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=e.apply(this,arguments),t.typeActive={typeId:1,title:t.$i18n.t("fee.withdraw"),value:t.$i18n.t("fee.withdraw-value")},t.currencyActive=1,t.filterTypes=[{typeId:1,title:t.$i18n.t("fee.withdraw"),value:t.$i18n.t("fee.withdraw-value")},{typeId:2,title:t.$i18n.t("fee.transfer"),value:t.$i18n.t("fee.transfer-value")}],t.tabs=[{id:2,title:"BTC",routeName:"FeeBtc"},{id:3,title:"ETH",routeName:"FeeEth"},{id:4,title:"BNB",routeName:"FeeBnb"},{id:5,title:"USDT",routeName:"FeeUsdt"},{id:6,title:"USDC",routeName:"FeeUsdc"},{id:7,title:"BUSD",routeName:"FeeBusd"}],t.titlePending="",t.tabActive="",t.isLoading=!1,t.isChanged=!1,t.data=[],t.filters={fromAmount:null,fromDate:null,fromFee:null,orderBy:null,search:null,status:null,toAmount:null,toDate:null,toFee:null},t.detailRow={},t.dataDetail={},t.query={keywordString:"",currency:"",transactionType:"",fromDate:"",toDate:"",fromAmount:"",toAmount:"",fromTransactionFee:"",toTransactionFee:"",orderBy:"1",status:"",page:1,limit:10,total:10},t.withdraw={},t.transfer={},t.listApproveBy=[],t.propdataTable=[],t.debounceInit=Object(b["debounce"])((function(){t.init()}),300),t}return Object(l["a"])(a,[{key:"getTab",get:function(){return"LYNK"===this.coinMain?[{id:1,title:"LYNK",routeName:"FeeLynk"}].concat(Object(c["a"])(this.tabs)):[{id:1,title:"CLM",routeName:"FeeClm"}].concat(Object(c["a"])(this.tabs))}},{key:"getTabActive",get:function(){return this.$route.path.split("/")[2]}},{key:"created",value:function(){this.tabActive=this.getTabActive,this.query.currency=this.getTabActive,this.query.status="SUCCESS",this.query.transactionType=this.typeActive.value,this.debounceInit()}},{key:"init",value:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e,a,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,this.isLoading=!0,e=Object(s["a"])(Object(s["a"])({},this.query),{},{orderBy:this.query.orderBy,limit:this.query.limit,page:this.query.page,currency:this.tabActive,fromDate:this.query.fromDate,toDate:this.query.toDate,fromAmount:this.query.fromAmount,toAmount:this.query.toAmount,transactionType:this.query.transactionType,total:null}),t.next=5,J.getListFee("",e);case 5:a=t.sent,this.propdataTable=a.transactions.content,this.propdataTable.length>0&&this.propdataTable.forEach((function(t){t.status="PENDING"===t.status||"SUCCESS"===t.status||"REJECTED"===t.status||"PROCESSING"===t.status||"FAILED"===t.status?t.status:"LOCKED"===t.status?"PENDING":"PROCESSING"})),n=a.summary.filter((function(t){return"WITHDRAW"===t.transactionType}))[0],this.withdraw=Object(s["a"])(Object(s["a"])({},n),{},{currency:this.tabActive}),i=a.summary.filter((function(t){return"TRANSFER"===t.transactionType}))[0],this.transfer=Object(s["a"])(Object(s["a"])({},i),{},{currency:this.tabActive}),this.query.total=a.transactions.totalElements,this.isLoading=!1,t.next=19;break;case 16:t.prev=16,t.t0=t["catch"](0),this.isLoading=!1;case 19:case"end":return t.stop()}}),t,this,[[0,16]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"handleChangeType",value:function(t){this.resetQuery(),this.query.currency=this.tabActive,this.query.page=1,this.query.limit=10,this.query.orderBy=1,this.query.transactionType=t.value,this.init(),this.typeActive=t,this.isChanged=!1}},{key:"handleChangeTab",value:function(t){this.typeActive={typeId:1,title:this.$i18n.t("fee.withdraw"),value:this.$i18n.t("fee.withdraw-value")},this.resetQuery(),this.$router.push({name:t.routeName}),this.tabActive=t.title,this.query.currency=t.title,this.query.page=1,this.query.limit=10,this.query.orderBy=1,this.query.transactionType=this.typeActive.value,this.init(),this.isChanged=!1}},{key:"resetQuery",value:function(){this.query=Object(s["a"])(Object(s["a"])({},this.query),{},{page:1,limit:10,orderBy:"1",keywordString:this.filters.search,currency:null,fromDate:this.filters.fromDate,toDate:this.filters.toDate,fromAmount:this.filters.fromAmount,toAmount:this.filters.toAmount,fromTransactionFee:this.filters.fromFee,toTransactionFee:this.filters.toFee,bonusType:null})}},{key:"handlePageChange",value:function(t){this.query.page=t,this.init()}},{key:"handleSizeChange",value:function(t){this.query.limit=t,this.init()}},{key:"handleRowClick",value:function(t){this.detailRow=t,this.setOpenPopup({popupName:"popup-fee-detail",isOpen:!0})}},{key:"handleFilter",value:function(t){this.filters=t,this.query=Object(s["a"])(Object(s["a"])({},this.query),{},{keywordString:this.filters.search,currency:"",transactionType:this.typeActive.value,fromDate:this.filters.fromDate,toDate:this.filters.toDate,fromAmount:this.filters.fromAmount,toAmount:this.filters.toAmount,fromTransactionFee:this.filters.fromFee,toTransactionFee:this.filters.toFee,status:this.filters.status,orderBy:this.filters.orderBy,page:1,limit:10}),this.debounceInit()}},{key:"handleNormalize",value:function(){this.isChanged=!1}}]),a}(Object(f["b"])(h["a"]));Object(d["a"])([K.State("coinMain")],Y.prototype,"coinMain",void 0),Y=Object(d["a"])([Object(f["a"])({components:{FeeFilter:R,FeeTable:U,FeeDetail:H}})],Y);var X=Y,Q=X,Z=(a("1252"),Object($["a"])(Q,n,i,!1,null,"7bc4e8b0",null));e["default"]=Z.exports},6621:function(t,e,a){},"7c0b":function(t,e,a){},"841c":function(t,e,a){"use strict";var n=a("d784"),i=a("825a"),s=a("1d80"),o=a("129f"),c=a("14c3");n("search",(function(t,e,a){return[function(e){var a=s(this),n=void 0==e?void 0:e[t];return void 0!==n?n.call(e,a):new RegExp(e)[t](String(a))},function(t){var n=a(e,this,t);if(n.done)return n.value;var s=i(this),r=String(t),l=s.lastIndex;o(l,0)||(s.lastIndex=0);var u=c(s,r);return o(s.lastIndex,l)||(s.lastIndex=l),null===u?-1:u.index}]}))},8450:function(t,e,a){"use strict";a("eae7")},"95a1":function(t,e,a){"use strict";a("3bf5")},"9e59":function(t,e,a){"use strict";a("6621")},eae7:function(t,e,a){}}]);