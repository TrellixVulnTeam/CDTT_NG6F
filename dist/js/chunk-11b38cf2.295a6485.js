(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-11b38cf2"],{"48af":function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticClass:"w-100 bo-crowdsale"},[s("div",{staticClass:"box-content-1"},[s("div",{staticClass:"round bg-white box-shadow"},[s("div",{staticClass:"head"},[s("div",{staticClass:"fw-600 fs-24 title"},[t._v(t._s(t.getRoundNumber))]),1===t.getStatus?s("div",{staticClass:"box-status"},[t._v(t._s(t.$t("crowdsale.opening")))]):t._e(),1!==t.getStatus&&t.isFinish?s("div",{staticClass:"box-status finish"},[t._v(t._s(t.$t("crowdsale.finish")))]):t._e(),1===t.getStatus||t.isFinish?t._e():s("div",{staticClass:"box-status upcoming"},[t._v(t._s(t.$t("crowdsale.upcoming")))])]),s("p",{staticClass:"fw-400 fs-16 time-date"},[t._v(" "+t._s(t._f("formatDDMMYY")(t.roundCurrent&&t.roundCurrent.fromDate&&t.roundCurrent.fromDate.time))+" - "+t._s(t._f("formatDDMMYY")(t.roundCurrent&&t.roundCurrent.toDate&&t.roundCurrent.toDate.time))+" ")]),s("div",{staticClass:"box-ellipse"},[s("div",{staticClass:"mini-ellipse"},[1===t.getStatus?s("p",{staticClass:"fw-600 fs-24 percentageSold",staticStyle:{"margin-bottom":"2px","margin-top":"24px"}},[t._v(" "+t._s((t.roundCurrent&&1e3*t.roundCurrent.percentageSold)/10)+"% ")]):t._e(),1!==t.getStatus&&t.isFinish?s("p",{staticClass:"fw-600 fs-24 percentageSold percentageSoldFinish",staticStyle:{"margin-bottom":"2px","margin-top":"24px"}},[t._v(" "+t._s((t.roundCurrent&&1e3*t.roundCurrent.percentageSold)/10)+"% ")]):t._e(),1===t.getStatus||t.isFinish?t._e():s("p",{staticClass:"fw-600 fs-24 percentageSold percentageSoldUpcoming",staticStyle:{"margin-bottom":"2px","margin-top":"24px"}},[t._v(" "+t._s((t.roundCurrent&&1e3*t.roundCurrent.percentageSold)/10)+"% ")]),s("p",{staticClass:"fw-400 fs-12",staticStyle:{color:"#5b616e"}},[t._v(" "+t._s(t.$t("crowdsale.of"))+" "),s("span",{staticClass:"fw-600"},[t._v(t._s((t.roundCurrent&&t.roundCurrent.totalAmount)/1e6)+"M")])])]),1===t.getStatus?s("el-progress",{attrs:{type:"circle",percentage:t.progressbar,"stroke-width":12,color:t.getColor,"show-text":!1}}):t._e(),1!==t.getStatus&&t.isFinish?s("el-progress",{attrs:{type:"circle",percentage:t.progressbar,"stroke-width":12,color:"#129961","show-text":!1}}):t._e(),1===t.getStatus||t.isFinish?t._e():s("el-progress",{attrs:{type:"circle",percentage:t.progressbar,"stroke-width":12,color:"#5B616E","show-text":!1}})],1)]),s("div",{staticClass:"progress bg-white box-shadow"},[s("p",{staticClass:"fw-600 fs-24 title"},[t._v(t._s(t.$t("crowdsale.progress")))]),s("p",{staticClass:"fw-400 fs-16 discript"},[t._v(" "+t._s(t.$t("crowdsale.from"))+" "+t._s(t._f("formatDDMMYY")(t.roundCurrent&&t.roundCurrent.fromDate&&t.roundCurrent.fromDate.time))+" "+t._s(t.$t("crowdsale.now"))+" ")]),s("div",{staticClass:"box-content"},[s("div",{staticClass:"box-left fw-400 fs-14"},[t._v(t._s(t._f("formatNumber")(t.roundCurrent&&t.roundCurrent.totalSold))+" "+t._s(t.$t("crowdsale.sold")))]),s("div",{staticClass:"box-right fw-400 fs-14"},[t._v(t._s(t._f("formatNumber")(t.roundCurrent&&t.roundCurrent.totalAvailable))+" "+t._s(t.$t("crowdsale.left")))])]),s("el-progress",{attrs:{type:"line",percentage:t.progressbar,"stroke-width":20,color:"#129961","show-text":!1}}),s("div",{staticClass:"bottom"},[s("div",{staticClass:"box1 box"},[s("p",{staticClass:"fw-600 fs-18 price"},[t._v(t._s((t.roundCurrent&&1e3*t.roundCurrent.percentageSold)/10)+"%")]),s("p",{staticClass:"fw-400 fs-14"},[t._v(t._s(t.$t("crowdsale.completed")))])]),s("div",{staticClass:"line"}),s("div",{staticClass:"box2 box"},[s("p",{staticClass:"fw-600 fs-18 price"},[t._v("$"+t._s(t._f("convertAmountDecimal")(t.roundCurrent&&t.roundCurrent.totalSold*t.roundCurrent.price,"USD")))]),s("p",{staticClass:"fw-400 fs-14"},[t._v(t._s(t.$t("crowdsale.raised")))])]),s("div",{staticClass:"line"}),s("div",{staticClass:"box3 box"},[s("p",{staticClass:"fw-600 fs-18 price"},[t._v(t._s(t._f("formatNumber")(t.roundCurrent&&t.roundCurrent.totalBacker)))]),s("p",{staticClass:"fw-400 fs-14"},[t._v(t._s(t.$t("crowdsale.backers")))])])])],1)]),s("div",{staticClass:"table bg-white box-shadow"},[s("div",{staticClass:"wallet-header"},[s("div",{staticClass:"be-flex align-center jc-space-between wallet-header__above"},[s("div",{staticClass:"wallet-header__above-tabs be-flex"},t._l(t.tabs,(function(e){return s("div",{key:e.id,staticClass:"tab-item cursor",class:t.$route.name===e.routeName?"tab-active":null,on:{click:function(s){return t.handleChangeTab(e)}}},[s("span",{staticClass:"text-base"},[t._v(t._s(t.$t("crowdsale."+e.title)))])])})),0)])]),s("div",{staticClass:"box-table"},[s("router-view")],1)])])},a=[],n=s("276c"),i=s("e954"),o=s("920b"),l=s("92a6"),u=(s("b0c0"),s("9ab4")),d=s("1b40"),c=s("3b19"),f=s("2ef0"),h=s("4bb5"),v=s("6c32"),g=Object(h["a"])("beAuth"),C=Object(h["a"])("beBase"),b=(Object(h["a"])("crowdsaleBo"),function(t){Object(o["a"])(s,t);var e=Object(l["a"])(s);function s(){var t;return Object(n["a"])(this,s),t=e.apply(this,arguments),t.tabs=[{id:1,title:"transactions",routeName:"CrowdsaleTransactions"},{id:2,title:"round",routeName:"CrowdsaleRound"},{id:3,title:"setting",routeName:"CrowdsaleSetting"}],t.listener=null,t.listRound=[],t.roundCurrent={},t.isEndOn=!1,t.progressbar=0,t.timing=null,t.day=0,t.hour=0,t.minute=0,t.second=0,t.isLoading=!0,t.countDownDate=0,t.isFinish=!1,t}return Object(i["a"])(s,[{key:"getIsEndRound",get:function(){var t=this,e=Object(f["findIndex"])(this.listRound,(function(e){return e.id===t.roundCurrent.id}));return e===this.listRound.length-1}},{key:"getRoundNumber",get:function(){var t;return null===(t=this.roundCurrent)||void 0===t?void 0:t.name}},{key:"getStatus",get:function(){var t;return null===(t=this.roundCurrent)||void 0===t?void 0:t.isActive}},{key:"created",value:function(){if(this.checkPemission("crowd-sale",["view"]))this.handleTurnOnFirebase();else{var t=v["a"][this.listModuleCanView[0].module];this.$router.push({name:t})}}},{key:"handleTurnOnFirebase",value:function(){var t=c["a"].ref("crowd-sales"),e=this;this.listener=t.on("value",(function(t){e.listRound=t.val();var s=Object(f["filter"])(t.val(),(function(t){return t.isActive}));s.length?(e.isFinish=!1,e.roundCurrent=s[0],e.isEndOn=!0,e.progressbar=1e3*e.roundCurrent.percentageSold/10,e.handleGetData()):(e.roundCurrent=null,e.isEndOn=!1,e.isFinish=!1,e.handleGetRoundNext())}))}},{key:"handleGetRoundNext",value:function(){var t=this,e=c["a"].ref("crowd-sales");if(e.off("value",this.listener),!this.roundCurrent){var s=this.listRound[0],r=this.listRound[this.listRound.length-1],a=Date.now(),n=new Date(s.fromDate.time).getTime(),i=new Date(r.toDate.time).getTime();a>i&&(this.day="00",this.hour="00",this.minute="00",this.second="00",this.roundCurrent=r,this.progressbar=1e3*this.roundCurrent.percentageSold/10,this.isEndOn=!0,this.isLoading=!1,this.isFinish=!0),a<n&&(this.roundCurrent=this.listRound[0],this.progressbar=1e3*this.roundCurrent.percentageSold/10,this.handleGetData("from")),a>n&&a<i&&(Object(f["forEach"])(this.listRound,(function(e){var s=new Date(e.fromDate.time).getTime();if(a<s)return t.roundCurrent=e,!1})),this.isEndOn=!1,this.progressbar=1e3*this.roundCurrent.percentageSold/10,this.handleGetData("from"))}}},{key:"handleGetData",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"to",e=this;this.countDownDate="to"===t?new Date(this.roundCurrent.toDate.time).getTime():new Date(this.roundCurrent.fromDate.time).getTime(),this.timing=setInterval((function(){var t=(new Date).getTime(),s=e.countDownDate-t;if(s<=0&&!e.isEndOn&&(console.log("vao day 1"),e.countDownDate=new Date(e.roundCurrent.toDate.time).getTime(),e.handleTurnOnFirebase(),e.isEndOn=!0,e.isLoading=!1),s<=0&&e.isEndOn&&!e.getIsEndRound)return e.isLoading=!0,e.handleTurnOnFirebase(),e.isEndOn=!0,void(e.isLoading=!1);if(s<=0&&e.isEndOn&&e.getIsEndRound){clearInterval(e.timing);var r=c["a"].ref("crowd-sales");return r.off("value",e.listener),void(e.isLoading=!1)}e.day=Math.floor(s/864e5)>=10?Math.floor(s/864e5):"0"+Math.floor(s/864e5),e.hour=Math.floor(s%864e5/36e5)>=10?Math.floor(s%864e5/36e5):"0"+Math.floor(s%864e5/36e5),e.minute=Math.floor(s%36e5/6e4)>=10?Math.floor(s%36e5/6e4):"0"+Math.floor(s%36e5/6e4),e.second=Math.floor(s%6e4/1e3)>=10?Math.floor(s%6e4/1e3):"0"+Math.floor(s%6e4/1e3)}),1e3),this.isLoading=!1}},{key:"destroyed",value:function(){var t=c["a"].ref("crowd-sales");t.off("value",this.listener)}},{key:"handleChangeTab",value:function(t){this.$router.push({name:t.routeName})}},{key:"getColor",value:function(){return"LYNK"===this.coinMain?"#0151fc":"#31b6b5"}}]),s}(d["d"]));Object(u["a"])([g.Getter("listModuleCanView")],b.prototype,"listModuleCanView",void 0),Object(u["a"])([C.State("coinMain")],b.prototype,"coinMain",void 0),b=Object(u["a"])([d["a"]],b);var p=b,w=p,m=(s("9f67"),s("2877")),_=Object(m["a"])(w,r,a,!1,null,"bb7d5ff4",null);e["default"]=_.exports},7711:function(t,e,s){},"9f67":function(t,e,s){"use strict";s("7711")}}]);
//# sourceMappingURL=chunk-11b38cf2.295a6485.js.map