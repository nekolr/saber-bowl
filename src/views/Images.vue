<template>
  <div class="image-container">
    <Card v-for="item of imageList" :key="item.id" :image="item" />
  </div>
</template>

<script>
import { imageApi } from "@/api/image"
import Card from "@/components/Card"

export default {
  name: "Images",
  data() {
    return {
      queryParams: {
          page: 1,
          size: 20
      },
      imageList: []
    }
  },
  created() {
    Promise.all([this.getImages()]).then(() => {})
  },
  methods: {
    // 获取用户的图片列表
    getImages() {
      return imageApi
        .getImages(this.queryParams)
        .then(res => {
          this.imageList = res.data
        })
        .catch(() => {})
    }
  },
  components: {
    Card
  }
}
</script>

<style>
@media (min-width: 768px) {
    .image-container {
        width:540px;
    }
}

@media (min-width: 992px) {
    .image-container {
        width:790px;
    }
}

@media (min-width: 1200px) {
    .image-container {
        width:1040px;
    }
}

@media (min-height: 768px) {
    .image-container {
        height:500px;
    }
}

@media (min-height: 992px) {
    .image-container {
        height:750px;
    }
}

@media (min-height: 1200px) {
    .image-container {
        height:1000px;
    }
}

.image-container {
    margin: 0 auto;
}

</style>