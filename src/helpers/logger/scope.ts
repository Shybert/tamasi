const scopes: {[x: string]: number} = {}

export default async function getMillisecondDiff (scope: string): Promise<number> {
  // Initialize scope if not initialized yet
  if (!scopes[scope]) {
    scopes[scope] = Date.now()
  }

  const diff: number = Date.now() - scopes[scope]
  scopes[scope] = Date.now()

  return diff
}
