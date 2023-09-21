<template>
    <main>
        <div class="bg-dark text-white text-center py-3 mb-3">停車折抵查詢</div>
        <div v-if="isLoading" class="loading"></div>
        <div v-if="!hasApplied && !isLoading" class="container">
            <div class="plate-bg">
                {{ billDetail.plate }}
            </div>
            <div class="billDetail mt-2 pb-3">
                <div class="detailContent">
                    <div class="amount">
                        <p class="text-secondary pt-3 ps-3">應繳金額</p>
                        <p class="text-center">NT$ <span class="fs-3">{{ billDetail.fee }}</span></p>
                    </div>
                    <div class="detail">
                        <p class="text-secondary">停車地點<span class="text-primary">　{{ billDetail.station }}</span></p>
                        <p class="text-secondary">進場時間<span class="text-primary">　{{ billDetail.arr_time }}</span></p>
                        <!-- <p class="text-secondary">折抵時數<span class="text-primary">　{{ billDetail.amount==0 || billDetail.hasApplied ? 0 : billDetail.discountHours }} 小時</span> -->
                        <p class="text-secondary">折抵時數　
                            <select class="form-select-sm" id="discountHours" :disabled="billDetail.amount <= 0" required>
                                <option disabled>請選擇折抵時數</option>
                                <option v-for="i in hourArr" :value=i>{{ i }} 小時</option>
                            </select>
                        </p>
                    </div>
                    <div v-if="billDetail.hasApplied && billDetail.amount != 0" class="text-secondary">
                        今日無法再次折抵，請直接繳費離場！
                    </div>

                    <div v-if="billDetail.amount == 0" class="warningInfo">
                        <p class="text-success fs-6 mt-1"><img src="../assets/icons8-info-success.svg" alt="info-icon">
                            無需繳費，請儘速離場，謝謝！</p>
                    </div>

                    <div class="mt-2 d-flex justify-content-center">
                        <button class="btn btn-primary" @click="getHours">確認折抵</button>
                    </div>
                </div>
            </div>

        </div>
        <!-- 折抵成功 -->
        <div v-else-if="hasApplied && getSucces" class="billDetail d-flex flex-column mt-5">
            <p class="text-success text-center fs-3">{{ getMessage }}</p>
            <p class="text-center">應繳金額 NT$ <span class="fs-3">{{ billDetail.fee }}</span></p>
            <button class="btn btn-primary w-50 align-self-center mb-3" @click="pay">繳費離場</button>
        </div>
        <!-- 折抵失敗 -->
        <div v-else-if="hasApplied && !getSucces" class="billDetail d-flex flex-column mt-5">
            <p class="text-danger text-center fs-3">
                {{ getMessage }}
            </p>
            <span class="text-center fs-6 mb-2">請直接繳費離場</span>
            <p class="text-center">應繳金額 NT$ <span class="fs-3">{{ billDetail.fee }}</span></p>
            <button class="btn btn-primary w-50 align-self-center mb-3" @click="pay">繳費離場</button>
            <p class="text-danger text-center fs-6 mb-2">如有疑問，請洽停車場管理員</p>
        </div>
    </main>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import router from '../router';
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
const Api = "https://dc28-122-116-23-30.ngrok-free.app";

export default {
    data() {
        return {
            isLoading: true,
            billDetail: {
                arr_time: "",
                fee: "",
                plate: "",
                slipHour: "",
                station: ""
            },
            hourArr: [],
            getDiscountHour: '',
            amount: null,
            today: "",
            getSucces: false,
            hasApplied: false,
            getMessage: "",
            stationIndex: ""
        }
    },
    components: {
        RouterView,
        RouterLink,
    },
    methods: {
        // 取車號
        getPlate() {
            this.plate = localStorage.getItem('plate');
        },
        // 查車
        search(plate) {
            this.getPlate();
            const searchApi = `${Api}/points/search`;
            this.$http
                .post(searchApi, { "stationIndex": this.stationIndex, "plate": this.plate })
                .then((response) => {
                    this.isLoading = false
                    if (response.data.arr_time) {
                        this.billDetail = response.data;
                        this.checkHours();
                    }
                })
        },
        // 確認可以折抵的時數額度
        checkHours() {
            this.hourArr = this.billDetail.slipHour.split(',');
        },
        // 確認折抵時數
        getHours() {
            const hour = document.querySelector('#discountHours');
            this.getDiscountHour = hour.value;
            this.amount = this.getDiscountHour * 60;
            const d = new Date();
            this.today = d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2, "0") + "-" + d.getDate();
            const getHoursApi = `${Api}/points/discount`;
            this.$http
                .post(getHoursApi, { "amount": this.amount, "IssueDate": this.today, "SerialNumber": "testP004" })
                // .post(getHoursApi, { "amount": this.amount, "IssueDate": this.today, "SerialNumber": "test005" })
                .then((response) => {
                    this.getMessage = response.data.message;
                    if (this.getMessage == "折抵成功.") {
                        this.hasApplied = true;
                        this.getSucces = true
                    } else {
                        this.hasApplied = true;
                        this.getSucces = false;
                    }
                    this.search();
                })

        },
        pay() {
            parent.window.location.replace("https://utaggoif.utaggo.com.tw/payment/startpay01");
        }
    },
    mounted() {
        this.search();
    },
    created() {
        this.stationIndex = this.$route.params.stationIndex;
    }
}
</script>

<style>
.plate-bg {
    background-image: url(../assets/blank_plate3-sm.png);
    background-repeat: no-repeat;
    max-height: auto;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    font-size: 32px;
}

.billDetail {
    max-width: 324px;
    margin: 0 auto;
    /* offset-x | offset-y | blur-radius | spread-radius | color */
    box-shadow: 2px 2px 25px 2px rgba(0, 0, 0, 0.2);
}

.detailContent {
    max-width: 265px;
    margin: 0 auto;
}

.amount {
    border-bottom: 1px solid gray;
}

.loading {
    background: #FFFFFF;
    background-image: url(../../public/Spinner-1s-200px.svg);
    background-repeat: no-repeat;
    background-position: top center;
    width: 100vw;
    height: 100vh;
}
</style>
  