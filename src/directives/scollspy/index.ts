import { Directive, DirectiveBinding } from "vue"
import { BVScrollSpy } from "./scrollspy"
import { onlyDigitsRE } from "./utils"

const HAS_WINDOW_SUPPORT = typeof window !== "undefined"
const HAS_DOCUMENT_SUPPORT = typeof document !== "undefined"
const HAS_NAVIGATOR_SUPPORT = typeof navigator !== "undefined"

const IS_BROWSER = HAS_WINDOW_SUPPORT && HAS_DOCUMENT_SUPPORT && HAS_NAVIGATOR_SUPPORT

// Key we use to store our instance
const BV_SCROLLSPY = "__BV_ScrollSpy__"

// Build a ScrollSpy config based on bindings (if any)
// Arguments and modifiers take precedence over passed value config object
/* istanbul ignore next: not easy to test */
const parseBindings = (binding: DirectiveBinding) => /* istanbul ignore next: not easy to test */ {
  let config = BVScrollSpy.defaultConfig

  // If argument, assume element ID
  if (binding.arg) {
    // Element ID specified as arg
    // We must prepend '#' to become a CSS selector
    config.scroller = `#${binding.arg}`
  }

  // Process modifiers
  Object.keys(binding.modifiers).forEach((modifier) => {
    if (onlyDigitsRE.test(modifier)) {
      // Offset value
      const integer = parseInt(modifier, 10)
      config.offset = isNaN(integer) ? config.offset : integer
    }
  })

  // Process value
  if (typeof binding.value === "string") {
    // Value is a CSS ID or selector
    config.scroller = binding.value
  } else if (typeof binding.value === "number") {
    // Value is offset
    config.offset = Math.round(binding.value)
  } else if (binding.value !== null && typeof binding.value === "object") {
    // Value is config object
    // Filter the object based on our supported config options
    config = binding.value
  }

  return config
}

const applyScrollspy = (el: any, binding: DirectiveBinding) => {
  if (!IS_BROWSER) {
    return
  }

  const config = parseBindings(binding)

  if (el[BV_SCROLLSPY]) {
    el[BV_SCROLLSPY].updateConfig(config, binding.instance?.$root ?? null)
  } else {
    el[BV_SCROLLSPY] = new BVScrollSpy(el, config, binding.instance?.$root ?? null)
  }
}

// Remove ScrollSpy on our element
/* istanbul ignore next: not easy to test */
const removeScrollspy = (el: any) => /* istanbul ignore next: not easy to test */ {
  if (el[BV_SCROLLSPY]) {
    el[BV_SCROLLSPY].dispose()
    el[BV_SCROLLSPY] = null
    delete el[BV_SCROLLSPY]
  }
}

export const VBScrollspy: Directive = {
  created(el, binding) {
    applyScrollspy(el, binding)
  },
  mounted(el, binding) {
    if (binding.value !== binding.oldValue) {
      applyScrollspy(el, binding)
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      applyScrollspy(el, binding)
    }
  },
  unmounted(el) {
    removeScrollspy(el)
  }
}
