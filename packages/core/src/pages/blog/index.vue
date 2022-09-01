<template>
  <div id="__blogs">
    <main role="main" class="container">
      <section v-if="latestBlog" class="lastest">
        <h1 class="ps-3">Latest Blog</h1>
        <ul class="list-unstyled d-flex flex-wrap">
          <li
            v-for="(blog, index) in latestBlog"
            :key="blog.id"
            class="list-item p-3 col-12"
            :class="
              index === 0 ? '' : index > 4 ? 'col-md-6 col-lg-4' : 'col-md-6'
            "
          >
            <NuxtLink :to="'/blog/' + blog.alias">
              <Cell
                class="text-reset text-body border-light h-100"
                border-radius="1rem"
                :aspect-ratio="0.5625"
                :data="blog"
              />
            </NuxtLink>
          </li>
        </ul>
      </section>
      <section v-if="trunkedBlog" class="trunked">
        <h1 class="ps-3">More Blog</h1>
        <ul class="list-unstyled mb-0">
          <li class="list-item p-3" v-for="blog in trunkedBlog" :key="blog.id">
            <Cell
              axis="horizontal"
              class="text-reset text-body border-light"
              :aspect-ratio="0.5625"
              :data="blog"
            />
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch(`/api/_blog`)

const latestBlog = computed(() => unref(data).latestBlog)
const featuredBlog = computed(() => unref(data).featuredBlog)
const trunkedBlog = computed(() => unref(data).trunkedBlog)
</script>

<style lang="scss">
#__blogs {
  background: #fafafb;

  // .blog__item-list {
  //   $blog__item-padding: 2rem;

  //   margin-right: -$blog__item-padding;
  // }
}
</style>
