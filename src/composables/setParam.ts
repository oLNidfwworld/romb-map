export const setParam = (name: string, value: string) => {
  const url = new URL(window.location as unknown as string)
  const params = new URLSearchParams(url.search)

  params.set(name, value)

  url.search = params.toString()
  window.history.pushState({}, '', url)
}
