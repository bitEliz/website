<template>
  <div class="d-flex flex-column h-100">
    <a
      :href="content.url"
      class="d-block bar-lg overflow-hidden imgfill box-shadow-md position-relative"
    >
      <img
        class="w-100 h-100 d-block"
        :src="content.imageUrl"
        alt=""
        loading="lazy"
      >
    </a>
    <header class="mt-4 mt-sm-3">
      <section class="mb-3">
        <a
          :href="content.tag.url"
          class="s-tag bar-md va-middle mr-2"
          v-if="content.tag != null"
        >{{ content.tag.name }}
        </a>
        <span class="text-uppercase">
          {{ content.time }}
        </span>
      </section>
      <h2 class="">
        <a
          :href="content.url"
          :title="content.title"
          rel="bookmark"
          class="fc-black-800 h:fc-blue-500"
        >
          {{ content.title }}
        </a>
      </h2>
    </header>
    <div class="mb-4">
      {{ content.summary }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridTile',
  props: {
    content: Object,
  },
};
</script>

<style lang="scss">
@import "@assets/css/common";

.box-shadow-md {
  box-shadow: var(--shadow-md);
  &:hover {
    box-shadow: var(--shadow-lg);
  }
}

.bar-lg {
  border-radius: 7px !important;
}

.imgfill {
    padding-top: 52.3%;
}

.imgfill img {
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

</style>
