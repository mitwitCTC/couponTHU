<template>
  <main>
    <div class="bg-dark text-white text-center py-3">停車費查詢</div>
    <div class="container mt-5">
      <label for="exampleInputEmail1" class="form-label">車牌號碼</label>
      <div class="d-flex">
        <input class="form-control me-2" type="search" placeholder="請輸入車牌號碼搜尋(需包含 - )" v-model="plate"
          @keydown.enter="search(plate)">
        <img v-if="!isLoading" src="../assets/icons8-search.svg" alt="search" class="mx-3" @click="search(plate)">
        <img v-if="isLoading" src="../../public/Spinner-1s-200px.svg" style="width:30px;" alt="loading" class="mx-3">
      </div>
      <p v-if="!hasPlate" class="text-warning fs-6 mt-1"><img src="../assets/icons8-info.svg" alt=""> 查無此車號，請重新輸入</p>
    </div>
  </main>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import router from '../router';
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
const Api = "https://944b-122-116-23-30.ngrok-free.app";

export default {
  data() {
    return {
      isLoading: false,
      plate: "",
      hasPlate: true,
      stationIndex: ""
    }
  },
  components: {
    RouterView,
    RouterLink,
  },
  methods: {
    // 取場站資訊
    getStationInfo() {
      const getStationInfoApi = `${Api}/points/stationInfo`;
      this.$http
        .post(getStationInfoApi, { "stationIndex": this.stationIndex })
        .then((response) => {
          if (!response.data.ip) {
            console.warn(response.data.message);
          }
        })
    },
    search(plate) {
      this.isLoading = true;
      const searchApi = `${Api}/points/search`;
      this.$http
        .post(searchApi, { "stationIndex": this.stationIndex, "plate": this.plate })
        .then((response) => {
          this.isLoading = false;
          if (response.data.arr_time) {
            localStorage.setItem('plate', response.data.plate);
            router.push(`/${this.stationIndex}/bill`)
          } else {
            this.hasPlate = false;
          }
        })
    }
  },
  created() {
    this.stationIndex = this.$route.params.stationIndex;
    this.getStationInfo();
  }
}
</script>
