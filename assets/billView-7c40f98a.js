import{_ as u,R as g,a as m,o as n,c as a,b as h,d as t,t as o,e as c,F as b,r as f}from"./index-3e21200d.js";const x="/assets/icons8-info-success-38adac5f.svg";const p="https://1422-122-116-23-30.ngrok-free.app",y={data(){return{isLoading:!0,billDetail:{arr_time:"",fee:"",plate:"",slipHour:"",station:""},hourArr:[],getDiscountHour:"",amount:null,today:"",getSucces:!1,hasApplied:!1,getMessage:"",stationIndex:""}},components:{RouterView:g,RouterLink:m},methods:{getStationInfo(){const r=`${p}/points/stationInfo`;this.$http.post(r,{stationIndex:this.stationIndex}).then(e=>{e.data.ip||console.warn(e.data.message)})},getPlate(){this.plate=localStorage.getItem("plate")},toThousands(){this.billDetail.fee=(this.billDetail.fee||0).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,")},search(r){this.getStationInfo(),this.getPlate();const e=`${p}/points/search`;this.$http.post(e,{stationIndex:this.stationIndex,plate:this.plate}).then(d=>{this.isLoading=!1,d.data.arr_time&&(this.billDetail=d.data,this.toThousands(),this.checkHours())})},checkHours(){this.hourArr=this.billDetail.slipHour.split(",")},getHours(){this.isLoading=!0;const r=document.querySelector("#discountHours");this.getDiscountHour=r.value,this.amount=this.getDiscountHour*60;const e=new Date;this.today=e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+e.getDate();const d=`${p}/points/discount`;this.$http.post(d,{amount:this.amount,IssueDate:this.today,SerialNumber:"test016"}).then(_=>{this.isLoading=!1,this.getMessage=_.data.message,this.getMessage=="折抵成功."?(this.hasApplied=!0,this.getSucces=!0):this.getMessage=="票券已使用過."?(this.hasApplied=!0,this.getSucces=!1):(this.hasApplied=!1,this.getSucces=!1),this.search()})},goBack(){return this.$router.go(-1)},pay(){parent.window.location.replace("https://utaggoif.utaggo.com.tw/payment/startpay01")}},mounted(){this.search()},created(){this.stationIndex=this.$route.params.stationIndex}},D=t("div",{class:"bg-dark text-white text-center py-3 mb-3"},"停車折抵查詢",-1),k={key:0,class:"loading"},v={key:1,class:"container"},S={class:"plate-bg"},A={class:"billDetail mt-2 pb-3"},I={class:"detailContent"},w={class:"amount"},H=t("p",{class:"text-secondary pt-3 ps-3"},"應繳金額",-1),L={class:"text-center"},N={class:"fs-3"},C={class:"detail"},M={class:"text-secondary"},T={class:"text-primary"},B={class:"text-secondary"},V={class:"text-primary"},F={class:"text-secondary"},R=["disabled"],q=t("option",{disabled:""},"請選擇折抵時數",-1),P=["value"],j={key:0,class:"text-secondary"},E={key:1,class:"warningInfo"},Y=t("p",{class:"text-success fs-6 mt-1"},[t("img",{src:x,alt:"info-icon"}),c(" 無需繳費，請儘速離場，謝謝！")],-1),z=[Y],G={class:"mt-2 d-flex justify-content-center"},J={key:2,class:"billDetail d-flex flex-column mt-5"},K={class:"plate-bg"},O={class:"text-success text-center fs-3"},Q={class:"text-center"},U={class:"fs-3"},W={key:3,class:"billDetail d-flex flex-column mt-5"},X={class:"plate-bg"},Z={class:"text-danger text-center fs-3"},$=t("span",{class:"text-center fs-6 mb-2"},"請直接繳費離場",-1),tt={class:"text-center"},st={class:"fs-3"},et=t("p",{class:"text-danger text-center fs-6 mb-2"},"如有疑問，請洽停車場管理員",-1),it={key:4,class:"billDetail d-flex flex-column align-items-center mt-5"},ot=t("p",{class:"text-danger text-center fs-3"},[c(" 哎呀！出錯了！"),t("br"),t("span",{class:"fs-6"},"請回上頁重新搜尋再次折抵")],-1),lt={class:"text-center"},nt={class:"fs-3"},at=t("p",{class:"text-danger text-center fs-6 mb-2"},"如有疑問，請洽停車場管理員",-1);function ct(r,e,d,_,s,l){return n(),a("main",null,[D,s.isLoading?(n(),a("div",k)):h("",!0),!s.hasApplied&&!s.isLoading?(n(),a("div",v,[t("div",S,o(s.billDetail.plate),1),t("div",A,[t("div",I,[t("div",w,[H,t("p",L,[c("NT$ "),t("span",N,o(s.billDetail.fee),1)])]),t("div",C,[t("p",M,[c("停車地點"),t("span",T,"　"+o(s.billDetail.station),1)]),t("p",B,[c("進場時間"),t("span",V,"　"+o(s.billDetail.arr_time),1)]),t("p",F,[c("折抵時數　 "),t("select",{class:"form-select-sm",id:"discountHours",disabled:s.billDetail.amount<=0,required:""},[q,(n(!0),a(b,null,f(s.hourArr,i=>(n(),a("option",{value:i},o(i)+" 小時",9,P))),256))],8,R)])]),s.billDetail.hasApplied&&s.billDetail.amount!=0?(n(),a("div",j," 今日無法再次折抵，請直接繳費離場！ ")):h("",!0),s.billDetail.amount==0?(n(),a("div",E,z)):h("",!0),t("div",G,[t("button",{class:"btn btn-primary",onClick:e[0]||(e[0]=(...i)=>l.getHours&&l.getHours(...i))},"確認折抵")])])])])):s.hasApplied&&s.getSucces?(n(),a("div",J,[t("div",K,o(s.billDetail.plate),1),t("p",O,o(s.getMessage),1),t("p",Q,[c("應繳金額 NT$ "),t("span",U,o(s.billDetail.fee),1)]),t("button",{class:"btn btn-primary w-50 align-self-center mb-3",onClick:e[1]||(e[1]=(...i)=>l.pay&&l.pay(...i))},"繳費離場")])):s.hasApplied&&!s.getSucces?(n(),a("div",W,[t("div",X,o(s.billDetail.plate),1),t("p",Z,o(s.getMessage),1),$,t("p",tt,[c("應繳金額 NT$ "),t("span",st,o(s.billDetail.fee),1)]),t("button",{class:"btn btn-primary w-50 align-self-center mb-3",onClick:e[2]||(e[2]=(...i)=>l.pay&&l.pay(...i))},"繳費離場"),et])):!s.hasApplied&&!s.getSucces?(n(),a("div",it,[ot,t("button",{onClick:e[3]||(e[3]=(...i)=>l.goBack&&l.goBack(...i)),class:"btn btn-sm btn-primary"},"重新查詢"),t("p",lt,[c("應繳金額 NT$ "),t("span",nt,o(s.billDetail.fee),1)]),t("button",{class:"btn btn-primary w-50 align-self-center mb-3",onClick:e[4]||(e[4]=(...i)=>l.pay&&l.pay(...i))},"繳費離場"),at])):h("",!0)])}const dt=u(y,[["render",ct]]);export{dt as default};
