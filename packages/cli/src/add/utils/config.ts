import { configSchema, type ConfigType } from "../../common/types"
import fs from "fs-extra"
import path from "path"
import { loadConfig } from "tsconfig-paths"
import { resolveImport } from "./resolveImport"
import { type ConfigLoaderSuccessResult } from "tsconfig-paths"
import { ConfigError } from "../../common/error"

// components.json 파일 읽기 전용
export function loadComponentConfig(cwd: string) {
  try {
    const configFile = fs.readJsonSync(path.resolve(cwd, configSchema.fileName))
    return configFile
  } catch (e) {
    throw new ConfigError(`cannot find components.json relative to ${cwd}`, {
      cause: e,
    })
  }
}

// tsConfig 읽기 전용
// loadConfig는 현재 디렉토리에 tsconfig가 없으면 경로를 내려가서 tsconfig를 찾는걸로 보임
export async function loadTSConfig(cwd: string) {
  const tsconfig = loadConfig(cwd)
  if (tsconfig.resultType === "failed") {
    throw new ConfigError(`cannot find tsconfig.json relative to ${cwd}`, {
      cause: tsconfig.message,
    })
  }
  return tsconfig
}

// 3. 모든 경로 해석
export async function resolveAllPaths(
  config: ConfigType,
  tsconfig: ConfigLoaderSuccessResult,
) {
  return {
    utils: await resolveImport(config.utils, tsconfig),
    components: await resolveImport(config.components, tsconfig),
    hooks: await resolveImport(config.hooks, tsconfig),
    styledsystem: await resolveImport(config.styledsystem, tsconfig),
  }
}

export async function getAbsolutePath(cwd: string) {
  const config = loadComponentConfig(cwd)
  const tsconfig = await loadTSConfig(cwd)
  return resolveAllPaths(config, tsconfig)
}
