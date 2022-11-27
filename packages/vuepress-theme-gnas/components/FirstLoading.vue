<template>
  <transition name="fade">
    <div class="loading-page" v-if="visible">
      <div class="loading-box">
        <p>{{ $site.title }}</p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
  },
  data() {
    return {
      visible: true
    };
  },
  created() {
    let _this = this
    setTimeout(() => {
      _this.visible = false
    }, this.$site.themeConfig.firstLoadingDuration || 0);
  }
};
</script>
<style lang="stylus" scoped>
.loading-page {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #eee;

  .loading-box {
    width: 50px;
    height: 50px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    &:before {
      content: "";
      width: 50px;
      height: 5px;
      background: #000;
      opacity: 0.1;
      position: absolute;
      top: 59px;
      left: 0;
      border-radius: 50%;
      animation: shadow 0.5s linear infinite;
    }
    &:after {
      content: "";
      width: 50px;
      height: 50px;
      background: #46bd87;
      animation: animate 0.5s linear infinite;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 3px;
    }

    p {
      position: absolute;
      bottom: -100px;
      left: 50%;
      transform:translateX(-50%);
      white-space: nowrap;
      font-size: 20px;
    }
  }

  @keyframes animate {
    17% {
      border-bottom-right-radius: 3px;
    }
    25% {
      transform: translateY(9px) rotate(22.5deg);
    }
    50% {
      transform: translateY(18px) scale(1, 0.9) rotate(45deg);
      border-bottom-right-radius: 40px;
    }
    75% {
      transform: translateY(9px) rotate(67.5deg);
    }
    100% {
      transform: translateY(0) rotate(90deg);
    }
  }

  @keyframes shadow {
    0%,
    100% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1.2, 1);
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s, transform 0.25s, filter 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>