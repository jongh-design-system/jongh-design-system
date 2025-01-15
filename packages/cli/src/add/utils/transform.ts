import type { ConfigType } from "../../common/types"

export function transformImports(content: string, config: ConfigType) {
  let transformedContent = content

  // 모든 가능한 import 패턴들을 변환
  const transformPatterns = [
    // utils
    {
      from: /@utils\//g,
      to: `${config.utils}/`,
    },
    // hooks
    {
      from: /@hooks\//g,
      to: `${config.hooks}/`,
    },
    // styled-system
    {
      from: /@styled-system\//g,
      to: `${config.styledsystem}/`,
    },
    // components
    {
      from: /@components\//g,
      to: `${config.components}/`,
    },
  ]

  // 각 패턴에 대해 변환 수행
  transformPatterns.forEach(({ from, to }) => {
    transformedContent = transformedContent.replace(from, to)
  })

  return transformedContent
}
