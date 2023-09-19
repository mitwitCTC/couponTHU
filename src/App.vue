<script>
import { RouterLink, RouterView } from 'vue-router'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data() {
    return {
      isLoading: false,
    }
  },
  components: {
    RouterView,
    RouterLink,
  },
  mounted() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000)

    // console.log(import.meta.env.VITE_APP_URL, import.meta.env.VITE_APP_PATH);
    // console.log(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`);

    this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`)
      // axios.get('https://randomuser.me/api/')
      .then((res) => {
        // console.log(res);
      })

  }
}

</script>

<template>
  <header>
    <VueLoading v-model:active="isLoading"></VueLoading>
  </header>
  <div class="content">
    <RouterView />
    <footer class="mt-5">
      <div class="bg-dark text-white text-center fixed-bottom py-2">Copyright&copy; {{ new Date().getFullYear() }} MitWit
        Inc. All rights reserved.</div>
    </footer>
  </div>

  <div class="noPC fs-3 text-center">
    不支援電腦使用，請改用手機裝置
  </div>
</template>

<style scoped>
footer {
  font-size: 8px;
}

.noPC{
  display: none;
}

@media (min-width: 912px) {
  .noPC {
    display: block;
  }

  .content {
    display: none;
  }
}
</style>
