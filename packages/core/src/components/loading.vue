<template>
  <div id="__g">
    <div class="g-loading">
      <div class="loader">
        <svg viewBox="0 0 80 80">
          <defs>
            <linearGradient
              id="gradient"
              x1=".004%"
              x2="100.131%"
              y1="49.993%"
              y2="49.993%"
            >
              <stop offset="0%" stop-color="#6500FF"></stop>
              <stop offset="16%" stop-color="#6A09FF"></stop>
              <stop offset="43%" stop-color="#7623FF"></stop>
              <stop offset="77%" stop-color="#8A4CFF"></stop>
              <stop offset="99%" stop-color="#996BFF"></stop>
            </linearGradient>
          </defs>
          <circle cx="40" cy="40" r="32" stroke="url(#gradient)"></circle>
        </svg>
      </div>
      <div class="loader triangle">
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72" stroke="url(#gradient)"></polygon>
        </svg>
      </div>
      <div class="loader">
        <svg viewBox="0 0 80 80">
          <rect
            x="8"
            y="8"
            width="64"
            height="64"
            stroke="url(#gradient)"
          ></rect>
        </svg>
      </div>
      <div class="description">{{ props.message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    default: 'Loading...'
  }
})
const isLoading = ref(true)
const start = () => {
  isLoading.value = true
}
const finish = (): void => {
  isLoading.value = false
}
// const nuxtApp = useNuxtApp()
// nuxtApp.hook('page:start', start)
// nuxtApp.hook('page:finish', finish)
</script>

<style lang="scss" scoped>
#__g {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $zindex-tooltip;
  background: #ffffff;

  .g-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 9999;
    margin-top: -45px;
    margin-left: -116px;

    .loader {
      --duration: 3s;

      width: 44px;
      height: 44px;
      position: relative;
      display: inline-block;
      margin: 0 16px;

      &::before {
        content: ' ';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: absolute;
        display: block;
        background: #ff700a;
        top: 37px;
        left: 19px;
        transform: translate(-18px, -18px);
        animation: dot-rect-frames var(--duration)
          cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
      }

      svg {
        display: block;
        width: 100%;
        height: 100%;

        circle {
          stroke-dasharray: 150 50 150 50;
          stroke-dashoffset: 75;
          animation: path-circle-frames var(--duration)
            cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }

        polygon {
          stroke-dasharray: 145 76 145 76;
          stroke-dashoffset: 0;
          animation: path-triangle-frames var(--duration)
            cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }

        rect {
          stroke-dasharray: 192 64 192 64;
          stroke-dashoffset: 0;
          animation: path-rect-frames 3s cubic-bezier(0.785, 0.135, 0.15, 0.86)
            infinite;
        }

        circle,
        polygon,
        rect {
          fill: none;
          stroke-width: 10px;
          stroke-linejoin: round;
          stroke-linecap: round;
        }
      }

      &.triangle {
        width: 48px;

        &::before {
          left: 21px;
          transform: translate(-10px, -18px);
          animation: dot-triangle-frames var(--duration)
            cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
      }
    }

    .description {
      text-align: center;
      line-height: 40px;
      font-size: 12px;
      letter-spacing: 0.1em;
      color: #666;
    }
  }
}

@keyframes path-triangle-frames {
  33% {
    stroke-dashoffset: 74;
  }

  66% {
    stroke-dashoffset: 147;
  }

  to {
    stroke-dashoffset: 221;
  }
}

@keyframes dot-triangle-frames {
  33% {
    transform: translate(0);
  }

  66% {
    transform: translate(10px, -18px);
  }

  to {
    transform: translate(-10px, -18px);
  }
}

@keyframes path-rect-frames {
  25% {
    stroke-dashoffset: 64;
  }

  50% {
    stroke-dashoffset: 128;
  }

  75% {
    stroke-dashoffset: 192;
  }

  to {
    stroke-dashoffset: 256;
  }
}

@keyframes dot-rect-frames {
  25% {
    transform: translate(0);
  }

  50% {
    transform: translate(18px, -18px);
  }

  75% {
    transform: translateY(-36px);
  }

  to {
    transform: translate(-18px, -18px);
  }
}

@keyframes path-circle-frames {
  25% {
    stroke-dashoffset: 125;
  }

  50% {
    stroke-dashoffset: 175;
  }

  75% {
    stroke-dashoffset: 225;
  }

  to {
    stroke-dashoffset: 275;
  }
}
</style>
