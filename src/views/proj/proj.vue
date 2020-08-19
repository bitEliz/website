<template>
  <div class="proj-wrapper">
    <div class="proj-summary d-flex flex-column flex-md-row align-items-center">
      <div class="intro p-5">
        <img
          id="appicon"
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
        class="img-promo .align-self-xl-end mt-4"
        :src="proj.promo_image_url"
        width="358"
        height="982"
      />
    </div>
    <div class="proj-promo d-flex flex-column flex-md-row m-5 p-5">
      <div class="proj-features">
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
    </div>
    <div class="proj-screenshots p-5">
      <h2 class="mb-5">屏幕截图</h2>
      <div
        class="proj-screen-list d-flex flex-column flex-md-row justify-content-between align-items-center"
      >
        <div
          class="proj-screen-list-item"
          v-for="(url, index) in screenshotUrls"
          :key="index"
        >
          <a
            :href="'#screenshot_' + index"
            v-on:click="visibility($event, true)"
          >
            <img class="w-100 h-100" :src="url" />
          </a>
        </div>
      </div>
      <div
        class="box-viewer"
        v-for="(url, index) in screenshotUrls"
        :key="index"
        :id="'screenshot_' + index"
        @click="visibility($event, false)"
      >
        <div class="m-auto" :class="index >= copyLength ? 'ipad' : ''">
          <img :src="url" alt="" />
        </div>
      </div>
    </div>
    <div class="proj-features p-5">
      <h2>Notable Features</h2>
      <ul>
        <li id="timeline">
          <strong>Timeline Filters</strong><br />Quickly filter a timeline to
          show only tweets with media, retweets, links, or create your own
          keyword or rules-based filter. Access these saved filters any time
          with two taps.
        </li>
        <li id="mute">
          <strong>Mute Filters</strong><br />
          Hide Tweets in your timelines by specific users, keywords, hashtags,
          or even the client that published the Tweet. Select the length of time
          to mute and use regular expressions for smarter muting.
        </li>
        <li id="notes">
          <strong>Profile Notes</strong><br />
          Ever forget why you followed someone or wanted to jot notes for future
          reference? Create private notes on a user’s profile that only you can
          see.
        </li>
        <li id="lists">
          <strong>Custom Timelines</strong><br />
          Create and manage public or private lists and then use them as curated
          timelines. Tweetbot allows you to quickly switch between lists and
          even use one as your main timeline.
        </li>
        <li id="sync">
          <strong>iCloud Sync</strong><br />
          Tweetbot syncs your read position and much more so your experience is
          seamless when switching from desktop to mobile and vice versa.
        </li>
        <li id="topics">
          <strong>Tweet Topics</strong><br />
          Start tweet topics to automatically chain together multiple Tweets
          (with the ability to append optional hashtags) and create tweet
          storms.
        </li>
      </ul>
    </div>
  </div>
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
      const copy = this.sizedListCopy(
        this.proj.screenshot_urls,
        this.copyLength
      ).concat(
        this.sizedListCopy(
          this.proj.ipad_screenshot_urls,
          maxLength - this.copyLength
        )
      );

      console.log(copy.length);
      return copy;
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
@import "~@styles/_body";

#app {
  background: #222222;
}

.proj-wrapper {
  max-width: 1100px;
  margin: 0 auto;

  .proj-summary {
    background: #2e3033;
  }

  .intro {
    flex-grow: 2;
  }

  .box-viewer {
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

    .ipad {
      img {
        max-width: 1000px;
        border-radius: 6px;
      }
    }
  }
}

.img-promo {
  flex-grow: 1;
  max-width: 800px;
  height: auto;
  flex-basis: 33%;
  margin-top: 20px;

  @media (max-width: 768px) {
    width: 95%;
    flex-grow: 0;
  }
}

.proj-promo {
  background: #e53f5b;
  border-radius: 1.5rem;
}

.proj-screen-list {
  .proj-screen-list-item {
    margin: 0 1rem;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }

    @media (max-width: 768px) {
      margin: 1rem 0;
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  img {
    max-width: 180px;
    max-height: 180px;
    border-radius: 1rem;
    object-fit: cover;
  }
}
</style>
