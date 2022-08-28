<template>
  <div class="row">
    <div class="col-sm-6" v-for="gallery in galleries">
      <ul class="exp__list list-unstyled">
        <h3>{{ gallery.title }}</h3>
        <template v-for="exp in gallery.data">
          <li class="mb-3" v-if="gallery.id == MDL_ID.EXPERIENCE">
            <h5>{{ exp.companyName + ' • ' + exp.title }}</h5>
            <time
              style="margin-bottom: 0.5rem"
              :datetime="exp.startDate + '/' + exp.endDate"
            >
              {{ exp.startDate + ' - ' + exp.endDate }}
            </time>

            <ul class="list--circle-inside" v-if="exp.responsibilities">
              <li v-for="responsibility in exp.responsibilities">
                {{ responsibility }}
              </li>
            </ul>
          </li>
          <li class="mb-3" v-else>
            <h5>
              <i class="ali degree icon"></i>
              {{ exp.field + ' • ' + exp.degree }}
            </h5>
            <time
              style="margin-bottom: 0.5rem"
              :datetime="exp.startYear + '/' + exp.endYear"
            >
              {{ exp.startYear + ' - ' + exp.endYear }}
            </time>
            <p style="font-size: 1rem; font-weight: 500">{{ exp.school }}</p>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MDL_ID } from '@/types/fluent/resume'

const props = defineProps<{
  galleries: Array<{ id: MDL_ID; title: string; data: Array<any> }>
}>()
const galleries = props.galleries
</script>
