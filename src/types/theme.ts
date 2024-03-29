import variables from '~/assets/scss/buefy.scss'

export const THEMES = {
  WHITE: {
    name: 'white',
    textColor: variables.text,
    schemeColor: variables.schemeMain,
    timelineBackgroundOpacity: 1,
    timelineItemLine: variables.timelineLineColorWhite,
    navbarBackground: variables.navbarBackgroundColorWhite,
    paginationCurrentBackground: variables.paginationCurrentBackgroundColorWhite
  },
  BLACK: {
    name: 'black',
    textColor: variables.textInvert,
    schemeColor: variables.schemeInvert,
    timelineBackgroundOpacity: 0.1,
    timelineItemLine: variables.timelineLineColorBlack,
    navbarBackground: variables.navbarBackgroundColorBlack,
    paginationCurrentBackground: variables.paginationCurrentBackgroundColorBlack
  }
}

export interface Theme {
  name: string
  textColor: string
  schemeColor: string
  timelineBackgroundOpacity: string
  timelineItemLine: string
  navbarBackground: string
  paginationCurrentBackground: string
}

export function invertTheme(theme: Theme) {
  return theme.name == THEMES.WHITE.name ? THEMES.BLACK : THEMES.WHITE
}
