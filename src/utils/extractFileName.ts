export const extractFileName = (fullPath: string) =>
  fullPath.split(/[/\\]/).pop()
