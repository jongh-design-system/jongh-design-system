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

export class ConfigError extends Error {
  constructor(message: string, { cause }: { cause?: unknown }) {
    super(message)
    this.name = "ConfigError"
    this.cause = cause
  }
}

export const ISSUE_CODE = arrayToEnum(["config_not_found", "resolve_path_fail"])

export const FILE_TYPE = arrayToEnum([
  "components.json",
  "tsconfig.json",
  "panda.config.*",
  "package.json",
])

export type IssueBase = {
  path: string[]
  message?: string | string[]
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

export type Issue = ResolvePathFailIssue | ConfigNotFoundIssue

export class CommandError extends Error {
  issue: Issue
  constructor(issue: Issue) {
    super()
    this.name = "NewError"
    this.issue = issue
  }

  format() {
    this.issue //문자열 출력 담당해주면됨
  }
}
