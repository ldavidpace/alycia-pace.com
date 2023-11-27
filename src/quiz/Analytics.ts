declare var window: {
  Analytics: {
    track:(key: string, props?: object) => void
  }
}

export default window.Analytics;