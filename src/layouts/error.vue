<template>
  <div class="__error">
    <!-- <nav role="nav" class="nav">
      <div class="wrapper--fluid">
        <a class="logo" href="/">
          <img width="125" />
        </a>
        <ul class="nav__item-list">
          <li class="nav__item">
            <a class="nav__link" href="/contact">CONTACT</a>
          </li>
        </ul>
      </div>
    </nav> -->
    <main role="main" class="main localized-error d--flex flex--column justify--center">
      <div class="txt-a--center">
        <h1 class="localized-error__name">Whoops, {{ error.message }}.</h1>
        <p class="localized-error__description"></p>
        <h1 class="localized-error__code">{{ error.statusCode }}</h1>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    error: {
      type: Object,
      default: {}
    }
  }
})
</script>

<style lang="scss">
.__error {
  $nav__bar-height: 4rem;

  .nav {
    height: $nav__bar-height;
  }

  .localized-error {
    height: calc(100vh - #{$nav__bar-height});

    &__code {
      font-size: 5rem;
      color: var(--black-500);
      @include media-breakpoint-up(sm) {
        font-size: 10rem;
      }
    }
  }
}
</style>
