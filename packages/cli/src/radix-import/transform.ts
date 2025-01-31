import { SyntaxKind, type SourceFile } from "ts-morph"

const importMap = {
  "@radix-ui/react-accessible-icon": "AccessibleIcon",
  "@radix-ui/react-accordion": "Accordion",
  "@radix-ui/react-alert-dialog": "AlertDialog",
  "@radix-ui/react-aspect-ratio": "AspectRatio",
  "@radix-ui/react-avatar": "Avatar",
  "@radix-ui/react-checkbox": "Checkbox",
  "@radix-ui/react-collapsible": "Collapsible",
  "@radix-ui/react-context-menu": "ContextMenu",
  "@radix-ui/react-dialog": "Dialog",
  "@radix-ui/react-direction": "Direction",
  "@radix-ui/react-dropdown-menu": "DropdownMenu",
  "@radix-ui/react-form": "Form",
  "@radix-ui/react-hover-card": "HoverCard",
  "@radix-ui/react-label": "Label",
  "@radix-ui/react-menubar": "Menubar",
  "@radix-ui/react-navigation-menu": "NavigationMenu",
  "@radix-ui/react-popover": "Popover",
  "@radix-ui/react-portal": "Portal",
  "@radix-ui/react-progress": "Progress",
  "@radix-ui/react-radio-group": "RadioGroup",
  "@radix-ui/react-scroll-area": "ScrollArea",
  "@radix-ui/react-select": "Select",
  "@radix-ui/react-separator": "Separator",
  "@radix-ui/react-slider": "Slider",
  "@radix-ui/react-slot": "Slot",
  "@radix-ui/react-switch": "Switch",
  "@radix-ui/react-tabs": "Tabs",
  "@radix-ui/react-toast": "Toast",
  "@radix-ui/react-toggle": "Toggle",
  "@radix-ui/react-toggle-group": "ToggleGroup",
  "@radix-ui/react-toolbar": "Toolbar",
  "@radix-ui/react-tooltip": "Tooltip",
  "@radix-ui/react-visually-hidden": "VisuallyHidden",
} as const //기존의 개별 export하던 패키지이름 - 현재 radix-ui에서 export하는 이름

//기존에는 import {} from "@radix-ui/react-visually-hidden" -> 현재는 import {VisuallyHidden} from 'radix-ui'

export function transform(sourceFile: SourceFile) {
  sourceFile.getImportDeclarations().forEach((importDeclaration) => {
    const moduleName = importDeclaration.getModuleSpecifierValue()

    if (moduleName in importMap) {
      let newImportName = importMap[moduleName as keyof typeof importMap]

      const namespaceSpecifiers = importDeclaration.getNamespaceImport() //import * as
      if (namespaceSpecifiers) {
        const prevAsName = namespaceSpecifiers.getText()
        if (newImportName !== prevAsName) {
          newImportName += ` as ${prevAsName}`
        }
        importDeclaration.removeNamespaceImport()
        importDeclaration.addNamedImport(newImportName)
        importDeclaration.setModuleSpecifier("radix-ui")
        return
      }
      const namedSpecifiers = importDeclaration.getNamedImports() // import {a,b}

      if (namedSpecifiers.length) {
        const originalImportName = newImportName // 원본 저장

        namedSpecifiers.forEach((namedSpecifier) => {
          const importName = namedSpecifier.getName()
          const asName = namedSpecifier.getAliasNode()?.getText()
          const fullImportName = `${originalImportName}.${importName}`
          //as 키워드 사용 못함
          for (const syntaxKind of [
            SyntaxKind.JsxOpeningElement,
            SyntaxKind.JsxClosingElement,
            SyntaxKind.JsxSelfClosingElement,
          ] as const) {
            sourceFile.getDescendantsOfKind(syntaxKind).forEach((kind) => {
              const nodeName = kind.getTagNameNode().getText()
              if (nodeName === importName) {
                kind.getTagNameNode().replaceWithText(fullImportName)
              }
              if (nodeName === asName) {
                //as로 사용하고 있는 경우
                kind.getTagNameNode().replaceWithText(fullImportName)
              }
            })
          }
          sourceFile
            .getDescendantsOfKind(SyntaxKind.TypeQuery)
            .forEach((kind) => {
              kind.getChildren().forEach((v) => {
                const typeName = v.getText()
                if (typeName === importName || typeName === asName) {
                  v.replaceWithText(fullImportName)
                }
              })
            })
        })
        importDeclaration.removeNamedImports()
        importDeclaration.addNamedImport(originalImportName)
        importDeclaration.setModuleSpecifier("radix-ui")
      }
    }
  })
  return sourceFile.getFullText()
}
