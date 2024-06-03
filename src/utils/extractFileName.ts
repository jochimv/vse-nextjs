const extractFileName = (fullPath: string) => fullPath.split(/[/\\]/).pop()

export default extractFileName
