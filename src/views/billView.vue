<template>
    <main>
        <div class="bg-dark text-white text-center py-3 mb-3">停車折抵查詢</div>
        <div v-if="!billDetail.hasApplied" class="container">
            <div class="plate-bg">
                {{ billDetail.plate }}
            </div>
            <div class="billDetail mt-2 pb-3">
                <div class="detailContent">
                    <div class="amount">
                        <p class="text-secondary pt-3 ps-3">應繳金額</p>
                        <p class="text-center">NT$ <span class="fs-3">{{ billDetail.totalAmount }}</span></p>
                    </div>
                    <div class="detail">
                        <p class="text-secondary">停車地點<span class="text-primary">　{{ billDetail.location }}</span></p>
                        <p class="text-secondary">進場時間<span class="text-primary">　{{ billDetail.inTime }}</span></p>
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
        <div v-else-if="billDetail.hasApplied && getSucces" class="billDetail d-flex flex-column mt-5">
            <p class="text-success text-center fs-3">折抵成功</p>
            <p class="text-center">應繳金額：</p>
            <button class="btn btn-primary w-50 align-self-center mb-3">繳費離場</button>
        </div>
        <!-- 折抵失敗 -->
        <div v-else-if="billDetail.hasApplied && !getSucces" class="billDetail d-flex flex-column mt-5">
            <p class="text-danger text-center fs-3">
                折抵失敗
            </p>
            <span class="text-center fs-6 mb-2">請直接繳費離場</span>
            <p class="text-center">應繳金額：</p>
            <button class="btn btn-primary w-50 align-self-center mb-3">繳費離場</button>
            <p class="text-danger text-center fs-6 mb-2">如有疑問，請洽停車場管理員</p>
        </div>
    </main>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import router from '../router';
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
    data() {
        return {
            isLoading: false,
            billDetail: {
                plate: "AAA-1111",
                originalAmount: 160,
                totalAmount: 160,
                location: '台中誠品',
                inTime: '2023-01-01 11:11:11',
                discountHours: "1,2,3",
                hasApplied: false,
            },
            hourArr: [],
            getDiscountHour: '',
            amount: null,
            getSucces: false,
        }
    },
    components: {
        RouterView,
        RouterLink,
    },
    methods: {
        // 確認可以折抵的時數額度
        checkHours() {
            this.hourArr = this.billDetail.discountHours.split(',');
        },
        // 確認折抵時數
        getHours() {
            const hour = document.querySelector('#discountHours');
            this.getDiscountHour = hour.value;
            this.amount = this.getDiscountHour * 60;
            this.billDetail.hasApplied = true;
            this.getSucces = false;
        }
    },
    mounted() {
        this.checkHours(); // 確認可以折抵的時數額度
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
</style>
  