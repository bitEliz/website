// --- Utilities ---

const RX_BV_PREFIX = /^(BV?)/
const RX_HYPHENATE = /\B([A-Z])/g
export const RX_HREF = /^.*(#[^#]+)$/
export const onlyDigitsRE = /^\d+$/

const ROOT_EVENT_NAME_PREFIX = "bv"
const ROOT_EVENT_NAME_SEPARATOR = "::"

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

export const ROOT_EVENT_NAME_ACTIVATE = getRootEventName("BVScrollspy", "activate")

export const hasClass = (el: Element, className: string) => el.classList.contains(className)
