(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c51137a"],{"312b":function(t,e,a){"use strict";a("f2ad")},"9f48":function(t,e,a){"use strict";var n=a("276c"),i=a("920b"),s=a("92a6"),c=a("9ab4"),r=a("1b40"),o=a("4bb5"),l=Object(o["a"])("beBase"),u=function(t){Object(i["a"])(a,t);var e=Object(s["a"])(a);function a(){return Object(n["a"])(this,a),e.apply(this,arguments)}return a}(r["d"]);Object(c["a"])([l.Action("setOpenPopup")],u.prototype,"setOpenPopup",void 0),u=Object(c["a"])([r["a"]],u),e["a"]=u},e32b:function(t,e,a){"use strict";a("e349")},e349:function(t,e,a){},f0f2:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"w-100 transaction"},[a("div",{staticClass:"container wallet-header be-flex",staticStyle:{width:"100%"}},t._l(t.dataHeaderCard,(function(e,n){return a("div",{key:n,staticClass:"items-card"},[a("div",{staticClass:"item be-flex top"},[a("span",{staticClass:"text1"},[t._v(" "+t._s(t.renderTitleCard(e.transactionType))+" ")]),a("div",[a("base-icon",{attrs:{icon:t.renderIconCard(e.transactionType),size:"24"}})],1)]),a("div",{staticClass:"item"},[a("p",{staticClass:"number2"},[t._v("$"+t._s(t._f("convertAmountDecimal")(e.totalAmount,"USD")))])]),a("div",{staticClass:"item-bottom"},[a("span",{staticClass:"text3"},[t._v(t._s(t._f("formatNumber")(e.numOfTransaction))+" "+t._s(t.$t("transaction.table.transactions")))])])])})),0),a("div",{staticClass:"w-100 bo-kyc"},[a("div",{staticClass:"bg-white wallet-header"},[a("div",{staticClass:"be-flex align-center jc-space-between wallet-header__above"},[a("div",{staticClass:"wallet-header__above-tabs be-flex"},t._l(t.tabs,(function(e){return a("div",{key:e.id,staticClass:"tab-item cursor",class:t.$route.name===e.routeName?"tab-active":null,on:{click:function(a){return t.handleChangeTab(e)}}},[a("span",{staticClass:"text-base"},[t._v(t._s(t.$t("menu."+e.title)))])])})),0)])]),a("filter-transaction",{ref:"filter",attrs:{type:"transaction"},on:{filter:t.handleFilter}}),a("div",{staticClass:"table-transaction"},[a("table-transaction",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],attrs:{listTransaction:t.propDataTable,query:t.query,type:"transaction"},on:{sizeChange:t.handleSizeChange,pageChange:t.handlePageChange,rowClick:t.handleRowClick}})],1),a("popup-filter-transaction",{ref:"popup-filter",attrs:{"tab-active-filter":t.tabActive,type:"transaction"},on:{filter:t.handleFilter}}),a("transaction-detail",{attrs:{"detail-row":t.detailRow,"tab-active-filter":t.tabActive}})],1)])},i=[],s=a("d0ff"),c=a("f3f3"),r=a("c964"),o=a("276c"),l=a("e954"),u=a("920b"),d=a("92a6"),p=(a("96cf"),a("b0c0"),a("d81d"),a("4de4"),a("99af"),a("9ab4")),f=a("1b40"),b=a("9f48"),h=a("08ba"),y=a("2ef0"),v=a("5cd6"),m=a("645b"),C=a("f62c"),_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("base-popup",{staticClass:"popup-transaction-detail",attrs:{name:"popup-transaction-detail",width:"480px",isShowFooter:!1,open:t.handleOpen,close:t.handleClose}},[a("div",{staticClass:"title-popup",attrs:{slot:"title"},slot:"title"},[a("span",[t._v(t._s(t.handleRenderTitleDetail(t.detailRow.transactionType))+" "+t._s(t.detailRow.currency))])]),a("div",{staticClass:"w-100 fluctuating"},[a("div",{staticClass:"text-center"},[a("div",{staticClass:"icon",class:t.checkTypeStatusIcon(t.detailRow.status)},[a("base-icon",{attrs:{className:"icon-pending",icon:t.checkTypeIcon(t.detailRow.transactionType,t.detailRow.status),size:"64"}})],1),a("p",{class:t.checkValueAmountDisplay(t.detailRow.amountDisplay)},[t._v(t._s(t.detailRow.amountDisplay))]),a("p",{staticClass:"usd"},[t._v("~$"+t._s(t._f("convertAmountDecimal")(t.detailRow.amountToUsd,"USD")))])])]),a("div",{staticClass:"transaction-detail"},[a("p",{staticClass:"title"},[t._v(t._s(t.$t("transaction.popup.transaction-detail")))]),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.transaction-id")))]),a("div",{staticClass:"be-flex align-center"},[a("p",{staticClass:"text-detail-2"},[t._v(t._s(t._f("formatTransactionCode")(t.detailRow.transactionCode,10)))]),t.detailRow.transactionCode?a("span",{staticClass:"icon-copy",staticStyle:{"margin-left":"8px"},on:{click:function(e){return t.handleCopyTransaction(t.detailRow.transactionCode)}}},[a("base-icon",{attrs:{icon:"icon-copy",size:"24"}})],1):t._e()])]),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.date")))]),a("p",{staticClass:"text-detail-2"},[t._v(t._s(t._f("formatMMDDYY")(t.detailRow.transactionMillisecond)))])]),t.checkFromType(t.detailRow.transactionType)?a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.from")))]),a("div",{staticClass:"be-flex align-center"},[a("base-icon",{attrs:{icon:t.renderIconCurrency(t.detailRow.currency),size:"20"}}),a("p",{staticClass:"text-detail-2",staticStyle:{"margin-left":"8px"}},[t._v(t._s(t._f("formatTransactionCode")(t.detailRow.fromAddress,10)))]),t.detailRow.fromAddress?a("span",{staticClass:"icon-copy",staticStyle:{"margin-left":"8px"},on:{click:function(e){return t.handleCopyTransaction(t.detailRow.fromAddress)}}},[a("base-icon",{attrs:{icon:"icon-copy",size:"24"}})],1):t._e()],1)]):t._e(),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.to")))]),a("div",{staticClass:"be-flex align-center"},[a("base-icon",{attrs:{icon:t.renderIconCurrency(t.detailRow.currency),size:"20"}}),a("p",{staticClass:"text-detail-2",staticStyle:{"margin-left":"8px"}},[t._v(t._s(t._f("formatTransactionCode")(t.detailRow.toAddress,10)))]),t.detailRow.toAddress?a("span",{staticClass:"icon-copy",staticStyle:{"margin-left":"8px"},on:{click:function(e){return t.handleCopyTransaction(t.detailRow.toAddress)}}},[a("base-icon",{attrs:{icon:"icon-copy",size:"24"}})],1):t._e()],1)]),t.checkFeeType(t.detailRow.transactionType)?a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.fees")))]),a("div",{staticClass:"be-flex"},[t.detailRow.transactionFee>0?a("p",{staticClass:"add"},[t._v(t._s(t.detailRow.transactionFee)+" "+t._s(t.detailRow.currency))]):t._e(),t.detailRow.transactionFee<0?a("p",{staticClass:"sub"},[t._v(t._s(t.detailRow.transactionFee)+" "+t._s(t.detailRow.currency))]):t._e(),a("p",{staticClass:"convert",staticStyle:{"margin-left":"4px"}},[t._v("(~$"+t._s(t._f("convertAmountDecimal")(t.detailRow.transactionFeeToUsd,"USD"))+")")])])]):t._e(),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.status")))]),a("p",{class:t.checkType(t.detailRow.status)},[t._v(t._s(t.checkTransactionStatus(t.detailRow.status)))])])]),a("div",{staticClass:"customer-info"},[a("p",{staticClass:"title"},[t._v(t._s(t.$t("transaction.popup.customer-info")))]),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.full-name")))]),a("p",{staticClass:"text-detail-2"},[t._v(t._s(t.detailRow.fullName))])]),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.phone-number")))]),t.detailRow.phone?a("p",{staticClass:"text-detail-2"},[t._v("("+t._s(t.detailRow.phoneCode)+") "+t._s(t.detailRow.phone))]):t._e()]),a("div",{staticClass:"item be-flex"},[a("p",[t._v(t._s(t.$t("transaction.detail.email")))]),a("p",{staticClass:"text-detail-2"},[t._v(t._s(t.detailRow.email))])])])])},w=[],O=function(t){Object(u["a"])(a,t);var e=Object(d["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.isLoading=!1,t.tabActive=0,t}return Object(l["a"])(a,[{key:"handleOpen",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.log("open");case 1:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}()},{key:"handleClose",value:function(){this.tabActive=0,this.setOpenPopup({popupName:"popup-transaction-detail",isOpen:!1})}},{key:"checkTransactionStatus",value:function(t){switch(t){case"SUCCESS":return this.$i18n.t("transaction.table.succsess");case"PENDING":return this.$i18n.t("transaction.table.pending");case"PROCESSING":return this.$i18n.t("transaction.table.processing");case"REJECTED":return this.$i18n.t("transaction.table.rejected");default:return this.$i18n.t("transaction.table.failed")}}},{key:"checkType",value:function(t){return"PENDING"===t?"status status-pending":"FAILED"===t?"status status-error":"PROCESSING"===t?"status status-warning":"REJECTED"===t?"status status-rejected":"status status-success"}},{key:"checkFeeType",value:function(t){return!!t&&!(-1!==t.indexOf("BONUS")||"DEPOSIT"===t)}},{key:"checkFromType",value:function(t){return!!t&&!(-1!==t.indexOf("BONUS")||"DEPOSIT"===t)}},{key:"checkTypeIcon",value:function(t,e){return t&&e?(t.toUpperCase(),e.toUpperCase(),"PENDING"===e||"PROCESSING"===e?-1!==t.indexOf("BONUS")?"icon-bonus-pending":"icon-".concat(t.toLowerCase(),"-pending"):-1!==t.indexOf("BONUS")?"icon-bonus-success":"icon-".concat(t.toLowerCase(),"-success")):""}},{key:"renderIconCurrency",value:function(t){var e;return t=null===(e=t)||void 0===e?void 0:e.toLowerCase(),"lynk"===t?"icon-lynk":"clm"===t?"icon-clm":"btc"===t?"icon-btc":"eth"===t?"icon-eth":"usdt"===t?"icon-usdt":"bnb"===t?"icon-bnb":"usdc"===t?"icon-usdc":"icon-lynk"}},{key:"checkTypeStatusIcon",value:function(t){return"PENDING"===t?"icon-pending":"FAILED"===t?"icon-failed":"PROCESSING"===t?"icon-pending":"REJECTED"===t?"icon-failed":"icon-success"}},{key:"checkValueAmountDisplay",value:function(t){return t?-1!==t.indexOf("+")?"add":"sub":""}},{key:"handleCopyTransaction",value:function(t){var e="",a=document.createElement("input");a.value=t,document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),e=this.$t("notify.copy"),this.$message.success(e)}},{key:"handleRenderTitleDetail",value:function(t){return t?t.replaceAll("_"," "):""}}]),a}(Object(f["b"])(b["a"]));Object(p["a"])([Object(f["c"])({required:!0,type:Object,default:{}})],O.prototype,"detailRow",void 0),Object(p["a"])([Object(f["c"])({required:!0,type:String,default:""})],O.prototype,"tabActiveFilter",void 0),O=Object(p["a"])([Object(f["a"])({components:{}})],O);var T=O,R=T,g=(a("312b"),a("2877")),k=Object(g["a"])(R,_,w,!1,null,"47ad3e29",null),x=k.exports,j=Object(h["a"])("transaction"),S=function(t){Object(u["a"])(a,t);var e=Object(d["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.tabs=[{id:1,title:"deposit",routeName:"TransactionDeposit"},{id:2,title:"withdraw",routeName:"TransactionWithdraw"},{id:3,title:"transfer",routeName:"TransactionTransfer"},{id:4,title:"bonus",routeName:"TransactionBonus"}],t.tabActive="deposit",t.isLoading=!1,t.dataHeaderCard=[],t.detailRow={},t.query={currency:"",transactionType:"",fromDate:"",toDate:"",fromAmount:"",toAmount:"",orderBy:"1",page:1,limit:10,total:10},t.listApproveBy=[],t.propDataTable=[],t.debounceInit=Object(y["debounce"])((function(){t.init()}),300),t}return Object(l["a"])(a,[{key:"created",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e=this.$route.name,this.tabs.map((function(t,n){t.routeName===e&&(a.query.transactionType=t.title.toUpperCase(),a.tabActive=t.title)})),this.init().then();case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},{key:"init",value:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e,a,n,i,r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,this.isLoading=!0,e=Object(c["a"])(Object(c["a"])({},this.query),{},{orderBy:this.query.orderBy,limit:this.query.limit,page:this.query.page,currency:this.query.currency,fromDate:this.query.fromDate,toDate:this.query.toDate,fromAmount:this.query.fromAmount,toAmount:this.query.toAmount,total:null}),t.next=5,j.getListTransaction("search",e);case 5:a=t.sent,this.propDataTable=a.transactions.content,n=a.summary.filter((function(t){return"DEPOSIT"===t.transactionType})),i=a.summary.filter((function(t){return"WITHDRAW"===t.transactionType})),r=a.summary.filter((function(t){return"TRANSFER"===t.transactionType})),o=a.summary.filter((function(t){return"BONUS"===t.transactionType})),this.dataHeaderCard=[].concat(Object(s["a"])(n),Object(s["a"])(i),Object(s["a"])(r),Object(s["a"])(o)),this.query.total=a.transactions.totalElements,this.isLoading=!1,t.next=20;break;case 16:t.prev=16,t.t0=t["catch"](0),this.isLoading=!1,console.log(t.t0);case 20:case"end":return t.stop()}}),t,this,[[0,16]])})));function e(){return t.apply(this,arguments)}return e}()},{key:"renderTitleCard",value:function(t){switch(t){case"BONUS":return this.$i18n.t("transaction.table.total-bonus");case"DEPOSIT":return this.$i18n.t("transaction.table.total-deposit");case"TRANSFER":return this.$i18n.t("transaction.table.total-transfer");case"WITHDRAW":return this.$i18n.t("transaction.table.total-withdraw")}}},{key:"renderIconCard",value:function(t){switch(t){case"BONUS":return"icon-gift";case"DEPOSIT":return"icon-download";case"TRANSFER":return"icon-swap-2";case"WITHDRAW":return"icon-upload"}}},{key:"handleChangeTab",value:function(t){this.resetQuery(),this.$router.push({name:t.routeName}),this.tabActive=t.title,this.query.page=1,this.query.limit=10,this.query.orderBy=1,this.query.transactionType=t.title.toUpperCase();var e=this.$refs["popup-filter"];e&&e.handleReset();var a=this.$refs["filter"];a&&a.handleReset(),this.init()}},{key:"resetQuery",value:function(){this.query=Object(c["a"])(Object(c["a"])({},this.query),{},{page:1,limit:10,search:"",orderBy:"1",keywordString:"",currency:"",status:"",fromDate:"",toDate:"",fromAmount:"",toAmount:""})}},{key:"handlePageChange",value:function(t){this.query.page=t,this.init()}},{key:"handleSizeChange",value:function(t){this.query.limit=t,this.init()}},{key:"handleRowClick",value:function(t){this.detailRow=t,this.setOpenPopup({popupName:"popup-transaction-detail",isOpen:!0})}},{key:"handleFilter",value:function(t){Object(c["a"])({},t);this.query=Object(c["a"])(Object(c["a"])({},this.query),t),this.debounceInit()}}]),a}(Object(f["b"])(b["a"]));S=Object(p["a"])([Object(f["a"])({components:{PopupFilterTransaction:C["a"],TableTransaction:v["a"],FilterTransaction:m["a"],TransactionDetail:x}})],S);var D=S,A=D,N=(a("e32b"),Object(g["a"])(A,n,i,!1,null,"054b098e",null));e["default"]=N.exports},f2ad:function(t,e,a){}}]);
//# sourceMappingURL=chunk-1c51137a.821c7ca3.js.map