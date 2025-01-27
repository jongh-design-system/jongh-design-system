/* eslint-disable @typescript-eslint/no-explicit-any */

export const arrayToEnum = <T extends string, U extends [T, ...T[]]>(
  items: U,
): { [k in U[number]]: k } => {
  const obj: any = {}
  for (const item of items) {
    obj[item] = item
  }
  return obj as any
}

export const ISSUE_CODE = arrayToEnum([
  "config_not_found",
  "resolve_path_fail",
  "failed_to_fetch",
])

export const FILE_TYPE = arrayToEnum([
  "components.json",
  "tsconfig.json",
  "panda.config.*",
  "package.json",
])

export type IssueBase = {
  code: keyof typeof ISSUE_CODE
  message?: string[]
}

export interface ConfigNotFoundIssue extends IssueBase {
  code: typeof ISSUE_CODE.config_not_found
  configFile: keyof typeof FILE_TYPE
}

export interface ResolvePathFailIssue extends IssueBase {
  code: typeof ISSUE_CODE.resolve_path_fail
  target: string
  cwd: string
}

export interface FetchError extends IssueBase {
  code: typeof ISSUE_CODE.failed_to_fetch
  target: string
  statusCode: number
}

export type Issue = ResolvePathFailIssue | ConfigNotFoundIssue | FetchError

export class CommandError extends Error {
  issue: Issue
  constructor(issue: Issue) {
    super()
    this.name = "NewError"
    this.issue = issue
  }

  get format() {
    return this.issue.message?.join("\n")
  }
}
