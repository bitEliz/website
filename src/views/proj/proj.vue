<template>
  <main class="main" role="main">
    <section
      class="proj__summary summary d-flex flex-column flex-md-row align-items-center"
    >
      <div class="p-5">
        <img
          class="mb-5"
          :src="proj.artwork_url"
          alt=""
          width="167"
          height="167"
        />
        <h1>{{ proj.name }}</h1>
        <h2>A Twitter Client with Personality</h2>
        <p class="mt-5 mb-5">{{ proj.summary }}</p>
        <appl-dl-button :appl_dl_url="proj.track_view_url" />
      </div>
      <img
        class="promo__img"
        :src="proj.promo_image_url"
        width="358"
        height="982"
      />
    </section>
    <section
      class="proj__features features d-flex flex-column flex-md-row m-5 p-5"
    >
      <div class="features__wrapper">
        <h2>特色功能</h2>
        <ul>
          <li v-for="(feature, index) in proj.features" :key="index">
            {{ feature }}
          </li>
        </ul>
      </div>
      <div id="choose">
        <h2>Why Choose Tweetbot?</h2>
        <ul>
          <li>Create and use Twitter Lists as multiple timelines.</li>
          <li>
            Filter any timeline via keywords or predefined criteria (like tweets
            with media or links only) and save for future access.
          </li>
          <li>
            Second column on iPad to view other content like a list, mentions,
            search results, and etc at the same time.
          </li>
          <li>
            Sync your unread status and timeline position across all of your
            devices running Tweetbot (Mac, iPhone, iPad).
          </li>
          <li>No inline ads.</li>
        </ul>
      </div>
    </section>
    <section
      class="proj__screenshots screenshots p-5"
      v-if="screenshotUrls.length > 0"
    >
      <h2 class="mb-5">屏幕截图</h2>
      <ul
        class="d-flex flex-column flex-md-row justify-content-between align-items-center"
      >
        <li v-for="(url, index) in screenshotUrls" :key="index">
          <a
            :href="'#screenshot_' + index"
            v-on:click="visibility($event, true)"
          >
            <img class="w-100 h-100" :src="url" />
          </a>
        </li>
      </ul>
      <div
        class="screenshots__browser-item"
        v-for="(url, index) in screenshotUrls"
        :key="index"
        :id="'screenshot_' + index"
        @click="visibility($event, false)"
      >
        <div class="m-auto" :class="index >= copyLength ? 'ipad' : ''">
          <img :src="url" alt="" />
        </div>
      </div>
    </section>
    <section class="proj__technology p-5">
      <h2>Notable Features</h2>
      <ul>
        <li id="timeline">
          <strong>Timeline Filters</strong><br />Quickly filter a timeline to
          show only tweets with media, retweets, links, or create your own
          keyword or rules-based filter. Access these saved filters any time
          with two taps.
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import AppleDLButton from "@components/appl-dl-button.vue";

export default {
  components: {
    "appl-dl-button": AppleDLButton,
  },
  data() {
    return {
      proj: {
        name: "Tweetbot for twitter",
        summary:
          "Tweetbot is an award-winning Twitter client for iOS and the Mac. Create lists and use them as curated timelines. Create and share powerful mute filters using keywords or regular expressions. Use timeline filters to quickly reveal tweets you want to see and hide the ones you don’t. Tweetbot lets you take over your timeline and view it your way.",
        artwork_url: "https://tapbots.com/tweetbot/img/appicon@2x.png",
        promo_image_url: "https://tapbots.com/tweetbot/img/phone@2x.png",
        track_view_url:
          "https://itunes.apple.com/us/app/tweetbot-5-for-twitter/id1018355599?mt=8",
        features: [
          "GIF support in compose view (Powered by Giphy).",
          "Redesigned profiles.",
          "Redesigned tweet status details.",
          "New iconography and app icon.",
          "Optimized dark theme for OLED displays.",
          "Support for haptic feedback.",
          "Auto video playback in the timeline (which can be disabled in the settings).",
        ],
        screenshot_urls: [
          "https://tapbots.com/tweetbot/img/screen_01@2x.jpg",
          "https://tapbots.com/tweetbot/img/screen_02@2x.jpg",
          "https://tapbots.com/tweetbot/img/screen_03@2x.jpg",
        ],
        ipad_screenshot_urls: [
          "https://tapbots.com/tweetbot/img/screen_04@2x.jpg",
        ],
      },
    };
  },
  computed: {
    screenshotUrls() {
      // Image viewer only display 4 image
      // Keep at least one ipad screenshot if `proj.ipad_screenshot` is not empty.
      const maxLength = 4;
      return this.sizedListCopy(
        this.proj.screenshot_urls,
        this.copyLength
      ).concat(
        this.sizedListCopy(
          this.proj.ipad_screenshot_urls,
          maxLength - this.copyLength
        )
      );
    },
    copyLength() {
      const maxLength = this.proj.ipad_screenshot_urls.length < 0 ? 4 : 3;
      return Math.min(this.proj.screenshot_urls.length, maxLength);
    },
  },
  mounted() {
    document.body.classList.toggle("has-darkmode__forced", true);
  },
  methods: {
    visibility: (e, isVisible) => {
      if (isVisible) {
        const destination = e.currentTarget.getAttribute("href").slice(1);
        document.getElementById(destination).classList.add("visible");
      } else {
        document
          .querySelectorAll("[id^='screenshot_']")
          .forEach((target) => target.classList.remove("visible"));
      }
    },

    sizedListCopy: (array, size) =>
      array.slice(0, Math.min(size, array.length)),
  },
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import "@assets/css/common";

main {
  max-width: 1100px;
  margin: 0 auto;
  background: url("~@/assets/img/texture.svg");
  background-repeat: no-repeat;
  background-color: var(--black-025);
  background-size: 100% auto;
}

.proj {
  &__summary {
    .promo__img {
      max-width: 800px;
      height: auto;
      flex-basis: 33%;
      margin-top: 20px;

      @media (max-width: $breakpoint-md) {
        width: 95%;
      }
    }
  }
  &__features {
    background: #e53f5b;
    border-radius: 1.5rem;
  }

  &__screenshots {
    background: var(--white);

    ul {
      list-style: none;

      li {
        &:not(:first-child) {
          margin: 0 1rem;
          @media (max-width: $breakpoint-md) {
            margin: 1rem 0;
          }
        }

        img {
          max-width: 180px;
          max-height: 180px;
          border-radius: 1rem;
          object-fit: cover;
        }
      }
    }

    .screenshots__browser-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      text-align: center;
      vertical-align: middle;
      left: 0;
      top: 0;
      overflow: scroll;
      background: rgba(0, 0, 0, 0.6);
      position: fixed;
      z-index: 2;
      visibility: hidden;

      div {
        width: 80%;
      }

      img {
        width: 100%;
        max-width: 375px;
        height: auto;
        border-radius: 40px;
      }

      .ipad img {
        max-width: 1000px;
        border-radius: 6px;
      }
    }
  }
}
</style>
