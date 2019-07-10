<template>
  <Card class="p-login" dis-hover>
    <p slot="title">{{$t('user.pleaseLogin')}}</p>
    <Form
      class="pb-form"
      ref="formValidate"
      :model="loginForm.formValidate"
      :rules="loginForm.ruleValidate"
      :label-width="0"
      label-position="left">
      <Form-item prop="username">
        <Input
          v-model="loginForm.formValidate.username"
          size="large"
          prefix="md-person"
          :placeholder="$t('user.inputUsername')"
          @on-enter="handleLogin"/>
      </Form-item>
      <Form-item prop="password">
        <Input
          v-model="loginForm.formValidate.password"
          type="password"
          size="large"
          prefix="md-lock"
          :placeholder="$t('user.inputPassword')"
          @on-enter="handleLogin"/>
      </Form-item>
      <Form-item>
        <Button type="info" size="large" :loading="loading" long @click="handleLogin">{{$t('user.login')}}</Button>
      </Form-item>
    </Form>
  </Card>
</template>

<script>
import { accountApi } from '@/api/account'
import { mapActions } from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      loginForm: {
        formValidate: {
          username: '',
          password: ''
        },
        ruleValidate: {
          username: [
            {
              required: true,
              message: this.$t('user.usernameRequired')
            }
          ],
          password: [
            {
              required: true,
              message: this.$t('user.passwordRequired')
            }
          ]
        }
      }
    };
  },
  methods: {
    ...mapActions('account', {
        login: 'login'
      }),
    handleLogin() {
      // 打开 loading
      this.loading = true
      this.$refs.formValidate.validate(async valid => {
        if (!valid) {
            this.loading = false
            return false
        }
        accountApi.login(this.loginForm.formValidate)
          .then(async res => {
            // 关闭 loading
            this.loading = false
            await this.login(res)
            // 重定向对象不存在则返回顶层路径
            this.$router.replace(this.$route.query.redirect || '/')
          })
          .catch(() => {
            // 关闭 loading
            this.loading = false
          })
      });
    }
  }
};
</script>

<style>
.p-login {
  position: absolute !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -80%);
  background-color: white;
  width: 320px;
}

.pb-form {
  margin: 10px, 0px, 10px, 0px;
}
</style>