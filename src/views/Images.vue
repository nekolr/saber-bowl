<template>
  <div class="container">
    <div class="image-container">
    <Card
      v-for="item of imageList"
      :key="item.id"
      :image="item"
    />
  </div>
  <div class="s-page">
      <Page
        :total="totalSize"
        :page-size="queryParams.size"
        @on-change="getImages"
        show-total
        show-elevator
        :styles="pageStyle"
      />
    </div>
  </div>
</template>


<script>
import { imageApi } from "@/api/image"
import Card from "@/components/Card"
import { mapMutations } from 'vuex'
import { Page } from "iview"

export default {
  name: "Images",
  data() {
    return {
      pageStyle: {
        height: "50px",
        marginTop: "20px"
      },
      queryParams: {
        page: 1,
        size: 20
      },
      imageList: [],
      totalSize: 0
    }
  },
  created() {
    // 隐藏分享链接
    this.setShowShare(false)
    Promise.all([this.getImages(1)]).then(() => {})
  },
  methods: {
    ...mapMutations('links', {
      setShowShare: 'setShowShare'
    }),
    // 获取用户的图片列表
    getImages(current) {
      this.queryParams.page = current
      return imageApi
        .getImages(this.queryParams)
        .then(res => {
          this.imageList = res.data
          this.totalSize = res.totalSize
        })
        .catch(() => {})
    }
  },
  components: {
    Card,
    Page
  }
};
</script>

<style>
@media (min-width: 768px) {
  .image-container {
    width: 540px;
  }
}

@media (min-width: 992px) {
  .image-container {
    width: 790px;
  }
}

@media (min-width: 1200px) {
  .image-container {
    width: 1040px;
  }
}

.image-container {
  margin: 5px auto;
  max-height: 5600px;
  display: flex;
  flex-wrap: wrap;
}

.s-page {
  margin: 20px auto;
  height: 50px;
  text-align: center;
}
</style>