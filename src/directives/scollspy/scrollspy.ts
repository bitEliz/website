// HREFs must end with a hash followed by at least one non-hash character
import { ComponentPublicInstance } from "vue"

const RX_HREF = /^.*(#[^#]+)$/
const RX_BV_PREFIX = /^(BV?)/
const RX_HYPHENATE = /\B([A-Z])/g

const SELECTOR_NAV_ITEMS = ".nav-item"
const SELECTOR_NAV_LINKS = ".nav-link"

const ROOT_EVENT_NAME_PREFIX = "bv"
const ROOT_EVENT_NAME_SEPARATOR = "::"

// --- Utilities ---

// Converts PascalCase or camelCase to kebab-case
const kebabCase = (str: string) => {
  return str.replace(RX_HYPHENATE, "-$1").toLowerCase()
}

// Helper method to convert a component/directive name to a base event name
// `getBaseEventName('BNavigationItem')` => 'navigation-item'
// `getBaseEventName('BVToggle')` => 'toggle'
const getBaseEventName = (value: string) => kebabCase(value.replace(RX_BV_PREFIX, ""))

// Get a root event name by component/directive and event name
// `getBaseEventName('BModal', 'show')` => 'bv::modal::show'
const getRootEventName = (name: string, eventName: string) =>
  [ROOT_EVENT_NAME_PREFIX, getBaseEventName(name), eventName].join(ROOT_EVENT_NAME_SEPARATOR)

const ROOT_EVENT_NAME_ACTIVATE = getRootEventName("BVScrollspy", "activate")

export class BVScrollSpy {
  $el: HTMLElement
  $scroller: HTMLElement | Window | null
  $config: {
    offset: number
    activeClass: string
    scroller: HTMLElement | string | null
    throttle: number
    selector: string | null
  }
  $activeTarget: string | null
  $offsets: number[]
  $targets: string[]
  $scrollHeight: number
  $resizeTimeout: NodeJS.Timeout | null
  $root: ComponentPublicInstance | null

  static get DefaultConfig() {
    return {
      offset: 0,
      hrefAttribute: "href",
      activeClass: "active",
      scroller: "body",
      throttle: 75,
      selector: [SELECTOR_NAV_ITEMS, SELECTOR_NAV_LINKS].join(",")
    }
  }

  constructor(element: HTMLElement, config = {}, $root: ComponentPublicInstance | null) {
    this.$el = element
    this.$scroller = null
    this.$config = { ...BVScrollSpy.DefaultConfig, ...config }
    this.$offsets = []
    this.$targets = []
    this.$scrollHeight = 0
    this.$resizeTimeout = null
    this.$activeTarget = null
    this.$root = $root
    this.updateConfig(config, $root)
  }

  private updateConfig(config: {}, $root: ComponentPublicInstance | null) {
    if (this.$scroller) {
      this.unlisten()
      this.$scroller = null
    }
    const cfg = { ...BVScrollSpy.DefaultConfig, ...config }
    if ($root) {
      this.$root = $root
    }
    this.$config = cfg

    if (this.$root) {
      const self = this
      this.$root!.$nextTick(() => {
        self.listen()
      })
    } else {
      this.listen()
    }
  }

  listen() {
    const scroller = this.getScroller()
    if (scroller instanceof HTMLElement && scroller.tagName !== "BODY") {
      scroller.addEventListener("scroll", this)
    }
    window.addEventListener("scroll", this)
    window.addEventListener("resize", this)
    window.addEventListener("orientationchange", this)
    this.handleEvent("refresh")
  }

  unlisten() {
    const scroller = this.getScroller()
    if (scroller instanceof HTMLElement && scroller.tagName !== "BODY") {
      scroller.removeEventListener("scroll", this)
    }
    window.removeEventListener("scroll", this.handleEvent)
    window.removeEventListener("resize", this)
    window.removeEventListener("orientationchange", this)
  }

  handleEvent(event: Event | string) {
    const type = typeof event === "string" ? event : event.type

    const self = this
    const resizeThrottle = () => {
      if (!self.$resizeTimeout) {
        self.$resizeTimeout = setTimeout(() => {
          self.refresh()
          self.process()
          self.$resizeTimeout = null
        }, self.$config.throttle)
      }
    }

    if (type === "scroll") {
      this.process()
    } else {
      resizeThrottle()
    }
  }

  private refresh() {
    console.log("BVScrollSpy refreshing...")
    const scroller = this.getScroller()
    if (!scroller) {
      return
    }

    this.$offsets = []
    this.$targets = []

    this.$scrollHeight = this.getScrollHeight()

    Array.from(
      this.$el.querySelectorAll(this.$config.selector ?? BVScrollSpy.DefaultConfig.selector)
    )
      // Get HREF value
      .map((link) => link.getAttribute("href"))
      // Filter out HREFs that do not match our RegExp
      .filter((href) => href && RX_HREF.test(href || ""))
      // Find all elements with ID that match HREF hash
      .map((href) => {
        // Convert HREF into an ID (including # at beginning)
        const id = href!.replace(RX_HREF, "$1").trim()
        if (!id) {
          return null
        }
        // Find the element with the ID specified by id
        const el = (scroller instanceof Element ? scroller : document).querySelector(id)
        if (el instanceof HTMLElement) {
          return {
            offset: el.offsetTop,
            target: id
          }
        }
        return null
      })
      .filter((x) => x)
      // Sort them by their offsets (smallest first)
      .sort((a, b) => a!.offset - b!.offset)
      // record only unique targets/offsets
      .reduce((memo: any, item: any) => {
        if (!memo[item.target]) {
          this.$offsets.push(item.offset)
          this.$targets.push(item.target)
          memo[item.target] = true
        }
        return memo
      }, {})

    // Return this for easy chaining
    return this
  }

  private process() {
    const scrollTop = this.getScrollTop() + this.$config.offset
    const scrollHeight = this.getScrollHeight()
    const maxScroll = this.$config.offset + scrollHeight - this.getOffsetHeight()

    if (this.$scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      const target = this.$targets[this.$targets.length - 1]
      if (this.$activeTarget !== target) {
        this.activate(target)
      }
      return
    }

    if (this.$activeTarget && scrollTop < this.$offsets[0] && this.$offsets[0] > 0) {
      this.$activeTarget = null
      this.clear()
      return
    }

    for (let i = this.$offsets.length; i--; ) {
      const isActive =
        this.$activeTarget !== this.$targets[i] &&
        scrollTop >= this.$offsets[i] &&
        (typeof this.$offsets[i + 1] === "undefined" || scrollTop < this.$offsets[i + 1])

      if (isActive) {
        this.activate(this.$targets[i])
      }
    }
  }

  private getScroller() {
    if (this.$scroller) {
      return this.$scroller
    }

    let scroller

    if (!this.$config.scroller) {
      return null
    } else if (typeof this.$config.scroller === "string") {
      scroller = document.querySelector(this.$config.scroller)
    }
    if (!scroller) {
      return null
    }
    this.$scroller =
      scroller instanceof HTMLElement && scroller.tagName !== "BODY" ? scroller : window
    return this.$scroller
  }

  private getScrollTop() {
    const scroller = this.getScroller()
    if (!scroller) {
      return 0
    }
    return scroller instanceof Window ? scroller.pageYOffset : scroller.scrollTop
  }

  private getScrollHeight() {
    const scroller = this.getScroller()
    return scroller instanceof Element
      ? scroller.scrollHeight
      : Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
  }

  private getOffsetHeight() {
    const scroller = this.getScroller()
    if (!scroller) {
      return 0
    }
    return scroller instanceof Window ? window.innerHeight : scroller.getBoundingClientRect().height
  }

  private activate(target: string) {
    this.$activeTarget = target
    this.clear()

    // Grab the list of target links (<a href="{$target}">)
    const links = Array.from(
      this.$el.querySelectorAll(
        (this.$config.selector ?? BVScrollSpy.DefaultConfig.selector)
          // Split out the base selectors
          .split(",")
          // Map to a selector that matches links with HREF ending in the ID (including '#')
          .map((selector) => `${selector}[href$="${target}"]`)
          // Join back into a single selector string
          .join(",")
      )
    )

    links.forEach((link) => this.setActiveState(link, true))

    // Signal event to via $root, passing ID of activated target and reference to array of links
    if (links && links.length > 0 && this.$root) {
      this.$root.$emit(ROOT_EVENT_NAME_ACTIVATE, target, links)
    }
  }

  private clear() {
    Array.from(this.$el.querySelectorAll(`${this.$config.selector}`))
      .filter((el) => this.hasClass(el, this.$config.activeClass))
      .forEach((el) => this.setActiveState(el, false))
  }

  private setActiveState(el: Element, active: boolean) {
    if (active) {
      el.classList.add(this.$config.activeClass)
    } else {
      el.classList.remove(this.$config.activeClass)
    }
  }

  private hasClass(el: Element, className: string) {
    return el.classList.contains(className)
  }
}
