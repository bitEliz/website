<template>
  <main id="__blogs">
    <section v-if="latestBlog" class="lastest bg-light">
      <div class="container">
        <h1 class="p-3 pb-0">Latest Blog</h1>
        <ul class="list-unstyled d-flex flex-wrap mb-0">
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
                :data="blog"
              />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>
    <section v-if="trunkedBlog" class="trunked">
      <div class="container">
        <h1 class="p-3 pb-0">More Blog</h1>
        <ul class="list-unstyled mb-0">
          <li class="list-item p-3" v-for="blog in trunkedBlog" :key="blog.id">
            <Cell
              axis="horizontal"
              class="text-reset text-body border-light"
              :data="blog"
            />
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { data } = await useFetch(`/api/_blog`)

const latestBlog = computed(() => unref(data).latestBlog)
const featuredBlog = computed(() => unref(data).featuredBlog)
const trunkedBlog = computed(() => unref(data).trunkedBlog)
</script>
