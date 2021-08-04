// --- Convenience inspection utilities ---

const toType = (val: any) => typeof val

const toRawType = (val: any) => Object.prototype.toString.call(val).slice(8, -1)

export const isUndefined = (val: any) => val === undefined

export const isNull = (val: any) => val === null

export const isEmptyString = (val: string) => val === ""

export const isUndefinedOrNull = (val: any) => isUndefined(val) || isNull(val)

export const isUndefinedOrNullOrEmpty = (val: any) => isUndefinedOrNull(val) || isEmptyString(val)

export const isFunction = (val: any) => toType(val) === "function"

export const isBoolean = (val: any) => toType(val) === "boolean"

export const isString = (val: any) => toType(val) === "string"

export const isNumber = (val: any) => toType(val) === "number"

// Is a value number like (i.e. a number or a number as string)
export const isNumeric = (value: string) => !isNaN(parseInt(value, 10))

export const isPrimitive = (val: any) => isBoolean(val) || isString(val) || isNumber(val)

export const isArray = (val: any) => Array.isArray(val)

// Quick object check
// This is primarily used to tell Objects from primitive values
// when we know the value is a JSON-compliant type
// Note object could be a complex type like array, Date, etc.
export const isObject = (obj: any) => obj !== null && typeof obj === "object"

// Strict object type check
// Only returns true for plain JavaScript objects
export const isPlainObject = (obj: any) => Object.prototype.toString.call(obj) === "[object Object]"

export const isDate = (val: any) => val instanceof Date

export const isEvent = (val: any) => val instanceof Event

export const isFile = (val: any) => val instanceof File

export const isRegExp = (val: any) => toRawType(val) === "RegExp"

export const isPromise = (val: Promise<any>) =>
  !isUndefinedOrNull(val) && isFunction(val.then) && isFunction(val.catch)
