import { useMediaQuery } from './mediaQuery'

export declare type BreakpointLabel = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export const breakpointsMap: Record<BreakpointLabel, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

export function useBreakpoints(record?: Record<BreakpointLabel, number>) {
  function getValue(label: BreakpointLabel, delta?: number) {
    let v = (record ?? breakpointsMap)[label]

    if (delta) v += delta

    return `${v}px`
  }

  return {
    lessThan: (label: BreakpointLabel) =>
      useMediaQuery(`(max-width: ${getValue(label, -0.02)})`),
    lessThanOrEqual: (label: BreakpointLabel) =>
      useMediaQuery(`(max-width: ${getValue(label)})`),
    greaterThan: (label: BreakpointLabel) =>
      useMediaQuery(`(min-width: ${getValue(label, 0.02)})`),
    greaterThanOrEqual: (label: BreakpointLabel) =>
      useMediaQuery(`(min-width: ${getValue(label)})`),
    between: (lower: BreakpointLabel, upper: BreakpointLabel) =>
      useMediaQuery(
        `(min-width: ${getValue(lower)}) and (max-width: ${getValue(upper)})`
      )
  }
}
