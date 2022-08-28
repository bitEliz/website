<template>
  <div class="d-sm-flex flex-row align-items-center">
    <div class="col-sm-4 profile__me" style="text-align: center">
      <img class="profile__avatar rounded-circle mb-5" :src="profile.avatarUrl" alt="user avatar" />
      <h1 class="mb-3">{{ fullName }}</h1>

      <div class="social-networking hstack justify-content-center" v-if="profile.social">
        <div style="text-align: center; padding: 0 0.5rem" v-for="e in profile.social" :key="e.id">
          <a :href="e.service?.name === 'Mail' ? 'mailto:' + e.url : e.url">
            <i :class="'ali ' + e.service?.name?.toLowerCase()" style="font-size: 2rem"></i>
          </a>
        </div>
      </div>
    </div>
    <Markup :src="profile.aboutMe" class="col-sm-8 profile__about flex-grow-1"></Markup>
  </div>
</template>

<script setup lang="ts">
import { SocialNetworking } from "@/types/fluent/resume"

const props = defineProps<{
  profile: {
    avatarUrl?: string
    social?: Array<SocialNetworking>
    firstName: string
    lastName: string
    aboutMe?: string
  }
}>()

const profile = props.profile
const fullName = profile.lastName + profile.firstName
</script>

<style lang="scss" scoped>
.profile__avatar {
  width: 50%;
  min-width: 100px;
  max-width: 170px;
  border: 4px solid white;
}
.social-networking a {
  color: var(--#{$prefix}body-color);
  text-decoration: none;

  &:hover {
    color: #a0c7e4;
  }
}
</style>
