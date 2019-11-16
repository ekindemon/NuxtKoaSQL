<template>
  <div>
    <div>
      <!-- As a link -->
      <b-navbar type="light" variant="info">
        <div class="d-flex justify-content-between w-100">
          <b-navbar-nav>
            <b-nav-item href="#">Home</b-nav-item>
            <!-- Navbar dropdowns -->
            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="User" right>
              <b-dropdown-item href="#">Account</b-dropdown-item>
              <b-dropdown-item href="#">Settings</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <div class="">
            <div v-if="userName == null">
              <b-button variant="success" @click="$bvModal.show('loginModal')">
                Login
              </b-button>
              <b-button
                variant="success"
                @click="$bvModal.show('regFormModal')"
              >
                RegForm
              </b-button>
            </div>
            <div v-else class="d-flex h-100">
              <b-button variant="success" @click="updateAccount()">
                修改{{ userName }}
              </b-button>
              <b-button class="ml-2" variant="success" @click="deleteAccount()">
                刪除{{ userName }}
              </b-button>
              <p class="align-self-center mb-0 px-2">{{ userName }} ，你好</p>
            </div>
            <b-alert
              id="alertStyle"
              :show="dismissCountDown"
              dismissible
              fade
              variant="warning"
              @dismiss-count-down="countDownChanged"
            >
              {{ userName }} welcome back!!
            </b-alert>
          </div>
        </div>
      </b-navbar>
    </div>
    <b-breadcrumb :items="items" />
    <nuxt />
    <!-- 登入彈窗 -->
    <b-modal id="loginModal" size="lg" title="登入一下吧">
      <p class="my-4 text-center">Hello from modal!</p>
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="3" class="d-flex align-items-center">
            <label class="mb-0" for="type-text">Account</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              id="type-text"
              v-model="login.loginAccount"
              type="text"
            />
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3" class="d-flex align-items-center">
            <label class="mb-0" for="type-password">Password</label>
          </b-col>
          <b-col sm="6">
            <b-form-input
              id="type-password"
              v-model="login.loginPassword"
              type="password"
            />
          </b-col>
        </b-row>
      </b-container>
      <template v-slot:modal-footer="{ ok, cancel, hide }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="success" @click.prevent="loginMember()">
          登入
        </b-button>
        <b-button size="sm" variant="danger" @click="cancel()">
          取消
        </b-button>
      </template>
    </b-modal>
    <!-- 註冊彈窗form 表單 -->
    <b-modal id="regFormModal" size="lg" title="註冊一下Form">
      <b-form @submit.stop.prevent>
        <!-- 名稱 -->
        <label for="feedback-Name">User Name</label>
        <b-input
          id="feedback-Name"
          v-model="regForm.regName"
          :state="validation"
        />
        <b-form-invalid-feedback :state="validation">
          Your userName must be over 2 characters long.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation">
          Looks Good.
        </b-form-valid-feedback>
        <!-- 帳號 -->
        <label for="feedback-Account">User Account</label>
        <b-input
          id="feedback-Account"
          v-model="regForm.regAccount"
          :state="validation1"
        />
        <b-form-invalid-feedback :state="validation1">
          Your user ID must be over 2 characters long and nobody used.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation1">
          Looks Good.
        </b-form-valid-feedback>
        <!-- 密碼 -->
        <label for="feedback-Password">User Password</label>
        <b-input
          id="feedback-Password"
          v-model="regForm.regPassword"
          :state="validation2"
          type="password"
        />
        <b-form-invalid-feedback :state="validation2">
          Your user Password must be 2 characters long.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation2">
          Looks Good.
        </b-form-valid-feedback>
        <!-- 二次密碼 -->
        <label for="feedback-SecondPassword">User Password</label>
        <b-input
          id="feedback-SecondPassword"
          v-model="regForm.regSecondPassword"
          :state="validation3"
          type="password"
        />
        <b-form-invalid-feedback :state="validation3">
          二次密碼與上次的不符合
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validation3">
          Looks Good.
        </b-form-valid-feedback>
      </b-form>
      <template v-slot:modal-footer="{ ok, cancel, hide }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="success" @click.prevent="regFormMember()">
          註冊
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
// import {
//   BNavbar,
//   BNavbarBrand,
//   BBreadcrumb,
//   BButton,
//   VBModal,
//   BInputGroup,
//   BFormInput
// } from 'bootstrap-vue'

export default {
  // component: {
  //   'b-navbar': BNavbar,
  //   'b-navbar-brand': BNavbarBrand,
  //   'b-button': BButton,
  //   'b-modal': VBModal,
  //   'b-input-group': BInputGroup,
  //   'b-form-input': BFormInput
  // },
  data() {
    return {
      // 麵包屑
      items: [
        {
          text: 'Admin',
          to: { name: 'index' }
        },
        {
          text: 'Manage',
          href: '#'
        },
        {
          text: 'Library',
          active: true
        }
      ],
      dismissSecs: 3, //alert 出現時間
      dismissCountDown: 0, // alert
      showDismissibleAlert: false, // alert show
      //註冊
      reg: {
        regName: '名字',
        regAccount: 'aa',
        regPassword: 'aa1234',
        regSecondPassword: 'aa1234'
      },
      //登入
      login: {
        loginAccount: 'aaaaaaaaa',
        loginPassword: 'bbbbbbbb'
      },
      account: null,
      userName: null,
      //form方式註冊
      regForm: {
        regName: '',
        regAccount: '',
        regPassword: '',
        regSecondPassword: '',
        haveAccount: false
      },
      ajaxTime: true,
      timer: null
    }
  },
  computed: {
    validation() {
      return this.regForm.regName.length > 2 //名稱驗證
    },
    validation1() {
      this.loginValid()
      return this.regForm.regAccount.length > 2 && this.regForm.haveAccount //帳號驗證
    },
    validation2() {
      return this.regForm.regPassword.length > 2 //密碼驗證
    },
    validation3() {
      return (
        //二次密碼驗證
        this.regForm.regSecondPassword.length ==
          this.regForm.regPassword.length &&
        this.regForm.regSecondPassword.length > 2
      )
    }
  },
  mounted() {
    // Object.keys(this.test).forEach((key) => console.log(key, this.test[key]))
    for (let i in this.test) {
      console.log(i, this.test[i])
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    loginMember() {
      this.$axios
        .post('/api/login', {
          id: this.login.loginAccount,
          password: this.login.loginPassword
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.message == true) {
            this.userName = res.data.userName
            this.account = this.login.loginAccount
            this.token = res.data.token
            this.$bvModal.hide('loginModal') // 關閉 boostarp bvModal
            this.dismissCountDown = this.dismissSecs // 登入成功後 boostarp alert 顯示秒數
          } else {
            alert(res.data.message)
            this.$bvModal.hide('loginModal') // 關閉 boostarp bvModal
          }
          // 清空輸入框
          for (let i in this.login) {
            this.login[i] = ''
          }
        })
    },
    regFormMember() {
      this.$axios
        .post('/api/reg', {
          userName: this.regForm.regName,
          account: this.regForm.regAccount,
          password: this.regForm.regPassword
        })
        .then((res) => {
          console.log(res)
          if (res.data.message == true) {
            alert('申請成功')
            console.log(res.data.message)
            this.$bvModal.hide('regFormModal') // 關閉 boostarp bvModal
            // 清空輸入框
            for (let i in this.regForm) {
              this.regForm[i] = ''
            }
          } else {
            alert('已有相同帳號')
            console.log(res.data.message)
          }
        })
    },
    loginValid() {
      clearTimeout(this.timer)
      let t = this
      this.timer = setTimeout(() => {
        this.$axios
          .get('/api/login', {
            params: {
              regAccount: this.regForm.regAccount
            }
          })
          .then((res) => {
            this.regForm.haveAccount = res.data.message
          })
      }, 1000)
    },
    deleteAccount() {
      console.log(this.account)
      this.$axios
        .delete('/api/login', {
          params: {
            deleteAccount: this.account
          }
        })
        .then((res) => {
          if (res.status == 200) {
            this.account = null
            this.userName = null
          } else {
            console.log('delete api is wrong')
          }
        })
    },
    updateAccount() {}
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
#alertStyle {
  position: fixed;
  right: 2.5px;
  top: 2.5px;
}
#regModal___BV_modal_body_,
#loginModal___BV_modal_body_ {
  margin-bottom: 3rem;
}
.form-control.is-valid ~ .valid-feedback,
.form-control.is-invalid ~ .invalid-feedback {
  display: none;
}
</style>
