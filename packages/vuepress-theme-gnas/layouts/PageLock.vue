<template>
  <div class="page page-lock-wrap" :class="{ 'is-gnas-page': isGnasPage }">
    <div @click="showLockPasswordInput" class="lock-content-wrap">
      <i class="gnas-i gnas-i-lock"></i>
      <p>该内容已被锁定，单击唤起输入密码面板</p>
      <p class="annotation">Ctrl + Enter 快捷键</p>
    </div>
    <ClientOnly>
      <component is="LockPasswordInput" ref="lockPasswordInput" />
    </ClientOnly>
  </div>
</template>
<script>
import LockPasswordInput from '@theme/components/LockPasswordInput'

export default {
  components: {
    LockPasswordInput
  },
  data() {
    return {
    }
  },
  computed: {
    isGnasPage() {
      return this.$page.frontmatter.home || this.$page.frontmatter.mode && ['tag', 'archives', 'friend'].includes(this.$page.frontmatter.mode)
    }
  },
  methods: {
    showLockPasswordInput() {
      if (this.$refs.lockPasswordInput) {
        this.$refs.lockPasswordInput.showLockPasswordInput()
      }
    },
  }
}
</script>
<style lang="stylus" scoped>
.page-lock-wrap {
  display flex
  align-items center;
  justify-content center;
  width: 100%;
  height: "calc(100vh - %s)" % ($navbarHeight);
  position: absolute;
  left: 0;
  margin-top:$navbarHeight;
  opacity: 1;
  transition: all 0.4s linear;

  .lock-content-wrap {
    cursor: pointer;
    z-index: 0;
    line-height: 2;
    position relative;
    top:- $navbarHeight;
    text-align: center;
    i {
      font-size: 40px;
    }
    .annotation {
      color: #909399;
    }
  }
  &::after {
    z-index: -1;
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    opacity: 0.97;
    filter: blur(10px);
  }

  .lock-password-input-wrap{
    margin-left : "calc(-100px + %s/2)" % ($sidebarWidth);
  }
  &.is-gnas-page{
    padding-left 0;    
    .lock-password-input-wrap{
      margin-left -100px;
    }
  }
}

@media (max-width: $MQMobile) {
    .page-lock-wrap  {
        .annotation{
          display none
        }
    }

    .lock-password-input-wrap{
      margin-left -100px !important;  
    }
}
</style>