<template>
  <div class="uploader-links-container" v-show="showShare">
    <div class="links-container">
      <div class="uploader-links-panel">
        <div class="panel-heading">
          <Button @click="cancelShowShare">{{ $t('links.cancel') }}</Button>&nbsp;
          <Poptip trigger="click" :content="$t('links.successfulCopy')" placement="right">
            <Button id="copyButton" data-clipboard-target="#link">{{ $t('links.copy') }}</Button>
          </Poptip>
        </div>
        <div class="panel-body">
          <div class="links-left">
            <ButtonGroup vertical size="large">
              <Button :type="originType" @click="handleOrigin">{{ $t('links.origin') }}</Button>
              <Button :type="htmlType" @click="handleHtml">HTML</Button>
              <Button :type="markdownType" @click="handleMarkdown">Markdown</Button>
            </ButtonGroup>
          </div>
          <div class="links-right">
            <Input element-id="link" type="textarea" :rows="4" v-model="wrappedLink"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import ClipboardJS from 'clipboard'

var clipboard = new ClipboardJS('#copyButton')
// 成功回调
clipboard.on('success', function(e) {
    e.clearSelection();
})

export default {
  name: "Share",
  computed: {
    ...mapGetters("links", {
      link: 'getLink',
      wrappedLink: 'getWrappedLink',
      showShare: 'getShowShare',
      originType: 'getOriginType',
      htmlType: 'getHtmlType',
      markdownType: 'getMarkdownType'
    })
  },
  methods: {
    ...mapMutations('links', {
      setShowShare: 'setShowShare',
      setWrappedLink: 'setWrappedLink',
      setOriginType: 'setOriginType',
      setHtmlType: 'setHtmlType',
      setMarkdownType: 'setMarkdownType'
    }),
    cancelShowShare () {
        // 隐藏分享组件
        this.setShowShare(false)
        // 移除选中状态
        var items = window.document.querySelectorAll(".filepond--item")
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove("selected")
        }
    },
    handleOrigin () {
        this.setOriginType('primary')
        this.setHtmlType('default')
        this.setMarkdownType('default')
        // 修改链接值
        this.setWrappedLink(this.$serverUrl + "/images/" + this.link)
    },
    handleHtml () {
        this.setOriginType('default')
        this.setHtmlType('primary')
        this.setMarkdownType('default')
        // 修改链接值
        this.setWrappedLink('<img src="' + this.$serverUrl + '/images/"' + this.link + '>')
    },
    handleMarkdown () {
        this.setOriginType('default')
        this.setHtmlType('default')
        this.setMarkdownType('primary')
        // 修改链接值
        this.setWrappedLink('![](' + this.$serverUrl + '/images/' + this.link + ')')
    }
  }
}
</script>

<style>
.uploader-links-container {
  position: fixed;
  bottom: 4.8em;
  z-index: 5;
  right: 0;
  left: 0;
  height: 16.5em;
  font-size: 14px;
}

@media (min-width: 768px) {
  .links-container {
    width: 600px;
  }
}

@media (min-width: 992px) {
  .links-container {
    width: 800px;
  }
}

@media (min-width: 1200px) {
  .links-container {
    width: 1100px;
  }
}

.links-container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.uploader-links-panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  margin-bottom: 0px !important;
  border-color: #ddd;
  height: 16.5em;
}

.uploader-links-panel > .panel-heading {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;
}

.panel-heading {
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.panel-body {
  padding: 15px;
}

.links-left {
  margin-left: 15px;
  margin-right: 15px;
}

.links-right {
  width: calc(100% - 30%);
}

.links-left,
.links-right {
  float: left;
}
</style>
