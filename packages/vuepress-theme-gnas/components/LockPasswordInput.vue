<template>
  <div v-clickoutside="clickoutside" :class="{'show':show,'unlock':!lock}" class="lock-password-input-wrap">
    <i :class="{ 'center': lock, 'left': !lock, 'error': error, 'shake-slow shake-constant shake-constant--hover': shake && error }"
      class="gnas-i gnas-i-lock"></i>
    <i :class="{ 'center': !lock, 'right': lock }" class="gnas-i gnas-i-unlock"></i>
    <div :class="{ 'hide': !lock }" @click="inputFocus" class="code-input-main">
      <div class="code-input-main-item">{{ code[0] ? '*' : '' }}</div>
      <div class="code-input-main-item">{{ code[1] ? '*' : '' }}</div>
      <div class="code-input-main-item">{{ code[2] ? '*' : '' }}</div>
      <div class="code-input-main-item">{{ code[3] ? '*' : '' }}</div>
    </div>
    <input maxlength="4" ref="input" type="tel" v-model="code" />
  </div>
</template>
<script>
import md5 from 'js-md5'

export default {
  inject: ['reload'],
  directives: {
    clickoutside: {
      bind(el, binding, vnode) {
        function clickHandler(e) {
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = clickHandler

        document.addEventListener('click', clickHandler)
      },
      unbind(el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__)

        delete el.__vueClickOutside__
      },
    },
  },
  data() {
    return {
      show: false,
      code: '',
      lock: true,
      error: false,
      shake: false,
    }
  },
  computed: {
    isCommonPw() {
      let pagePw = this.$page.frontmatter.password
      let commonPw = this.$site.themeConfig.password
      return pagePw == true || pagePw == commonPw
    },
    pagePassword() {
      return (this.$page.frontmatter.password != true ? this.$page.frontmatter.password : this.$site.themeConfig.password) || '81dc9bdb52d04dc20036dbd8313ed055'
    }
  },
  watch: {
    code: function (val) {
      let _this = this
      this.error = false
      if (val.length === 4) {
        if (md5(val) == this.pagePassword) {
          this.lock = false
          sessionStorage.setItem(this.isCommonPw ? 'gnasCommonLock' : `gnasPageLock-${this.$page.regularPath}`, 'unlock');
          setTimeout(() => {
            _this.show = false
            _this.reload()
          }, 600)

        } else {
          this.shake = true
          this.error = true
          setTimeout(() => {
            _this.shake = false
          }, 300)
          setTimeout(() => {
            _this.code = ''
          }, 700)
        }
      } else {
        this.lock = true
      }
    }
  },
  mounted() {
    let _this = this
    document.onkeydown = function (e) {
      var event = e || event
      if (event.keyCode == 13 && event.ctrlKey) {
        _this.$refs.input.focus()
        _this.show = true
      }
    }
  },
  destroyed() {
    document.onkeydown = undefined
  },
  methods: {
    showLockPasswordInput() {
      this.show = true
      this.inputFocus()
    },
    getCode() {
      return this.code
    },
    inputFocus() {
      this.$refs.input.focus()
    },
    inputBlur() {
      this.$refs.input.blur()
    },
    handleClose() {
      this.show = false
    },
    clickoutside(e) {
      let t = true
      e.path.forEach((item) => {
        if (item.className && item.className.includes('lock-content-wrap')) {
          t = false
        }
      })
      if (t) {
        this.show = false
      }
    },
    unlock() {
      document.onkeydown = null
      this.inputBlur()
      this.$emit('unLock')
    },
  },
}
</script>
<style lang="stylus" scoped>
.lock-password-input-wrap:focus-within{
  box-shadow:0 0px 16px 4px  alpha($accentColor,.2);
  border: 2px solid alpha($accentColor,.4);
}
.lock-password-input-wrap {
  z-index: 9999;
  cursor pointer;
  width: 200px;
  height: 160px;
  position: fixed;
  top: -230px;
  left: 50%;
  padding: 50px 20px 20px;
  text-align: center;
  background: #fff;
  border-radius: 30px;
  border: 2px solid #FFF;
  box-shadow: 0 0 16px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  overflow: hidden;

  i {
    font-size: 28px;
    transition: all 0.4s ease;

    &.center {
      position: absolute;
      left: 50%;
      margin-left: -14px;
    }

    &.left {
      position: absolute;
      left: -20px;
      margin-left: -14px;
    }

    &.right {
      position: absolute;
      left: 220px;
      margin-left: -14px;
    }

    &.error {
      color: #f56c6c;
    }

    &.gnas-i-unlock {
      color: #67c23a;
    }
  }

  &.show {
    top: -30px;
  }

  &.unlock {
    height: 110px;
  }

  input {
    position: relative;
    opacity: 0;
    top: 0;
    margin: 0 auto;
  }

  .code-input-main {
    position: relative;
    top: 0;
    width: 100%;
    margin: 40px auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease;

    &.hide {
      top: 30px;
    }

    .code-input-main-item {
      width: 50px;
      height: 50px;
      margin: 0 10px;
      text-align: center;
      padding-bottom: 0;
      font-size: 30px;
      color: #000;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>