<template>
  <el-card class="tile" :body-style="{ padding: '0px' }" shadow="always">
    <header>
      <div class="tile__backgimg">
        <a v-if="content.trackable" :href="content.url" target="_blank">
          <el-image :src="content.backgroundImageUrl" fit="fit" lazy></el-image>
        </a>
        <el-image v-else :src="content.backgroundImageUrl" fit="fit" lazy>
          <div slot="placeholder">LOADING<span>...</span></div>
        </el-image>
      </div>
      <div class="tile__extra">
        <span class="tile__tag">{{ content.tag }}</span>
        <time
          class="tile__datetime txt-t-uppercase"
          :datetime="content.datetime"
          >{{ content.datetime }}</time
        >
      </div>
      <h3 class="tile__title">
        <a v-if="content.trackable" :href="content.url" target="_blank">
          {{ content.title }}
        </a>
        <span v-else>{{ content.title }}</span>
      </h3>
    </header>
    <div
      class="tile__excerpt"
      :inner-html.prop="content.excerpt | markup"
    ></div>
  </el-card>
</template>

<script>
export default {
  name: "GridTile",
  props: {
    content: {
      type: Object,
      default: () => ({
        title: "",
        url: "",
        excerpt: "",
        backgroundImageUrl: "",
        tag: "",
        datetime: "",
        trackable: true,
      }),
    },
  },
};
</script>

<style lang="scss">
.tile {
  background: var(--white);
  color: var(--black);
  border: none;

  %margin {
    margin: 0.5rem;
  }

  & &__extra {
    @extend %margin;

    %font-size {
      font-size: 12px;
    }

    .tile__tag {
      padding: 0.125rem;
      margin-right: 0.5rem;
      @extend %font-size;
      background-color: var(--powder-100);
      color: var(--powder-700);
      border: 1px solid transparent;
      border-radius: 0.25rem;
    }

    .tile__datetime {
      @extend %font-size;
      color: var(--black-600);
    }
  }

  & &__title {
    @extend %margin;
  }

  & &__backgimg {
    display: block;
    position: relative;
    padding-top: 52.3%;

    .el-image {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }

  & &__excerpt {
    @extend %margin;
  }
}
</style>
