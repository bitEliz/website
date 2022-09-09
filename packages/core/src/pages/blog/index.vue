<template>
  <main id="__blogs">
    <section v-if="latestBlog.length" class="lastest bg-light">
      <div class="container">
        <h1 class="p-3 pb-0">Latest Blog</h1>
        <ul class="list-unstyled d-flex flex-wrap mb-0">
          <li
            v-for="(blog, index) in latestBlog"
            :key="blog.id"
            :class="
              index === 0
                ? 'p-3 col-12'
                : index > 4
                ? 'p-3 col-12 col-md-6 col-lg-4'
                : 'p-3 col-12 col-md-6'
            "
          >
            <a :herf="'/blog/' + blog.alias">
              <Tile
                class="text-reset text-body border-light h-100"
                :data="blog"
              />
            </a>
          </li>
        </ul>
      </div>
    </section>
    <section v-if="trunkedBlog.length" class="trunked">
      <div class="container">
        <h1 class="p-3 pb-0">More Blog</h1>
        <ul class="list-unstyled mb-0">
          <li class="p-3" v-for="blog in trunkedBlog" :key="blog.id">
            <a :herf="'/blog/' + blog.alias">
              <Tile
                layout-direction="horizontal"
                class="text-reset text-body border-light"
                :data="blog"
              />
            </a>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import Tile from '@/components/tile.vue'

const { data } = await useFetch(`/api/_blog`)

const latestBlog = computed(() => unref(data).latestBlog)
const featuredBlog = computed(() => unref(data).featuredBlog)
const trunkedBlog = computed(() => unref(data).trunkedBlog)
</script>
