export const getParam = (paramName: string) => {
  return new URLSearchParams(document.location.search).get(paramName)
}
