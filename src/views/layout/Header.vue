<template>
    <header>
      <div class="header">
        <a class="logo" :href="baseUrl">
          <svg class="animation" height="30" width="105" xmlns="http://www.w3.org/2000/svg">
            <text stroke-dasharray="90 310" stroke-width="0.5px" text-shadow="0 0 1px #fb9a40" stroke="#fb9a40" fill="none" text-transform="uppercase" y="100%" x="50%" text-anchor="middle" font-family="saber-chan" font-size="30">Saber 酱
              <animate attributeName="stroke-dashoffset" begin="-2s" dur="8s" from="0" to="-400" repeatCount="indefinite"></animate>
            </text>
            <text stroke-dasharray="90 310" stroke-width="0.5px" text-shadow="0 0 1px #f38181" stroke="#f38181" fill="none" text-transform="uppercase" y="100%" x="50%" text-anchor="middle" font-size="30" font-family="saber-chan">Saber 酱
              <animate attributeName="stroke-dashoffset" begin="-4s" dur="8s" from="0" to="-400" repeatCount="indefinite"></animate>
            </text>
            <text stroke-dasharray="90 310" stroke-width="0.5px" text-shadow="0 0 1px #ffb4ac" stroke="#ffb4ac" fill="none" text-transform="uppercase" y="100%" x="50%" text-anchor="middle" font-size="30" font-family="saber-chan">Saber 酱
              <animate attributeName="stroke-dashoffset" begin="-6s" dur="8s" from="0" to="-400" repeatCount="indefinite"></animate>
            </text>
            <text stroke-dasharray="90 310" stroke-width="0.5px" text-shadow="0 0 1px #7189bf" stroke="#7189bf" fill="none" text-transform="uppercase" y="100%" x="50%" text-anchor="middle" font-size="30" font-family="saber-chan">Saber 酱
              <animate attributeName="stroke-dashoffset" begin="-8s" dur="8s" from="0" to="-400" repeatCount="indefinite"></animate>
            </text>
          </svg>
          <svg class="text" height="30" width="105" xmlns="http://www.w3.org/2000/svg">
            <text font-family="saber-chan" font-size="30" fill="#777" y="100%" x="0">Saber 酱</text>
          </svg>
        </a>
        <div class="r-dropdown">
          <Dropdown v-if="userInfo" placement="bottom" trigger="click" @on-click="handleDropdown">
            <a href="javascript:void(0)">{{ userInfo.username }}</a>
            <DropdownMenu slot="list">
                <DropdownItem name="images">{{ $t('user.myImages') }}</DropdownItem>
                <DropdownItem name="logout">{{ $t('user.logout') }}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <a v-if="!userInfo" @click="login" href="javascript:void(0)">{{ $t('user.login') }}</a>
        </div>
      </div>
    </header>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { userApi } from '@/api/user'
import { Promise } from 'q';

export default {
  name: 'Header',
  data () {
    return {
      baseUrl: window.location.protocol + "//" + window.location.host
    }
  },
  computed: {
    ...mapGetters("user", {
      userInfo: 'getUser'
    })
  },
  created () {
    Promise.all([
      this.getUserInfo()
    ]).then(() => {})
  },
  methods: {
    ...mapMutations('user', {
      setUser: 'set'
    }),
    ...mapActions('account', {
        logout: 'logout'
    }),
    // 获取当前用户信息
    getUserInfo () {
      if (this.$route.path === '/login') {
        return new Promise((resolve) => {
          resolve()
        })
      } else {
        return userApi.getCurrentUserInfo()
        .then(res => {
          this.setUser(res)
        })
        .catch(() => {})
      }
    },
    // 登录
    login() {
      this.$router.push({
        name: 'Login'
      })
    },
    /**
     * 登出
     */
    handleDropdown (name) {
      if (name === 'logout') {
        this.logout({
          confirm: true
        })
      }
      if (name === 'images') {
        this.$router.push({
          name: 'Images'
        })
      }
    }
  }
}
</script>

<style>

@media (min-width: 768px) {
    .header {
        width:750px;
    }
}

@media (min-width: 992px) {
    .header {
        width:880px;
    }
}

@media (min-width: 1200px) {
    .header {
        width:980px;
    }
}

header {
    background: #f8f8f8;
}

.header {
    margin: 0 auto;
}

.header a {
    text-decoration: none;
}

/* Saber chan */
.saber-chan {
    font-family: 'saber-chan';
}

@font-face {
    font-family: 'saber-chan';
    src:
      url('../../assets/saber-chan/saber-chan.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

svg.text {
    display: inline;
    opacity: 1;
    width: auto;
    transition: .5s;
}

svg.animation {
    display: inline;
    opacity: 0;
    width: 0;
    transition: .5s;
}

a.logo:hover svg.text {
    opacity: 0;
    width: 0;
}

a.logo:hover svg.animation {
    opacity: 1;
    width: auto;
}

a.logo {
    font-weight: 600;
    display: inline-block;
    margin: 15px 0 15px 10px;
    width: 105px;
}

a.me {
  color: #777;
  font-size: 15px;
  float: right;
  margin-top: 28px;
  margin-right: 10px;
  font-weight: 400;
}

.r-dropdown {
  float: right;
  margin-top: 32px;
  margin-right: 10px;
  font-size: 14px;
}
</style>