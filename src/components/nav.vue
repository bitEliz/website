<template>
  <nav class="aki-nav">
    <ul class="aki-nav__list">
      <li
        class="aki-nav__list-item"
        v-for="(link, index) in navLinks"
        :class="link.title.toLowerCase()"
        :key="index"
      >
        <a
          class="aki-nav__link"
          :class="index === 0 ? 'active' : ''"
          :href="link.url"
        >{{ link.title }}</a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@import "@/styles/variables";
@import "@/styles/mixins";

.aki-nav {
  display: flex;
  align-items: center;
  &:before {
    content: "";
    display: inline-block;
    height: 5em;
    width: 15em;
    /*background-image: url('assets/vapor-3.png');*/
    background-size: 100%;
    background-position: center left;
    background-repeat: no-repeat;
  }
  .aki-nav__list,
  .aki-nav__list-item {
    display: inline-block;
  }
  .aki-nav__list {
    width: 100%;
    text-align: right;
  }
  .aki-nav__list-item {
    text-transform: uppercase;
    font-weight: bold;
  }
  .aki-nav__link {
    color: black;
    margin: 0 0.5em;
    font-size: large;
    text-decoration: none;
    &.active,
    &:hover {
      color: $color-blue;
    }
  }
}
@include respond-to(phablet) {
  .aki-nav {
    flex-direction: column;
    .aki-nav__list {
      padding: 0;
      text-align: center;
    }
  }
}
@include respond-to(tablet) {
  .aki-nav {
    font-size: small;
  }
}
</style>

<script>
export default {
  name: "AkiNav",
  data() {
    return {
      navLinks: [
        { title: "HOME", url: "/" },
        { title: "BLOG", url: "/blog" }
      ]
    };
  }
};
</script>
