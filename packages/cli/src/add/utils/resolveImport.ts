import { ConfigError } from "../../common/error"
import { createMatchPath, type ConfigLoaderSuccessResult } from "tsconfig-paths"

export async function resolveImport(
  importPath: string,
  config: Pick<ConfigLoaderSuccessResult, "absoluteBaseUrl" | "paths">,
) {
  const match = createMatchPath(config.absoluteBaseUrl, config.paths)(
    importPath,
    undefined,
    () => true,
  )
  if (!match) {
    throw new ConfigError("cannot resolve your tsconfig import", {
      cause: "no match found",
    })
  }
  return match
}
