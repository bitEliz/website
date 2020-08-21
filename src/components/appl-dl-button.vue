<template>
  <div class="appl-dl-button">
    <a class="appstore" :href="appl_dl_url"
      ><img
        src="https://tapbots.com/tweetbot/img/appstore@2x.png"
        alt="Download on the App Store"
        width="237"
        height="70"
    /></a>
  </div>
</template>

<script>
export default {
  name: "ApplDLButton",
  props: {
    appl_dl_url: String,
  },
};
</script>
