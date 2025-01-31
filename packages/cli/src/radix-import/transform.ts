import { Project } from "ts-morph"

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
} as const

export function transform(path: string) {
  const project = new Project({})

  const sourceFile = project.addSourceFileAtPathIfExists(path)
  if (!sourceFile) {
    return
  }

  sourceFile.getImportDeclarations().forEach((importDeclaration) => {
    const moduleName = importDeclaration.getModuleSpecifierValue()
    if (moduleName in importMap) {
      let newAsName = importMap[moduleName as keyof typeof importMap]

      const namespaceSpecifiers = importDeclaration.getNamespaceImport() //import * as
      if (namespaceSpecifiers) {
        const prevAsName = namespaceSpecifiers.getText()
        if (newAsName !== prevAsName) {
          newAsName += ` as ${prevAsName}`
        }
        importDeclaration.removeNamespaceImport()
        importDeclaration.addNamedImport(newAsName)
      }
      importDeclaration.setModuleSpecifier("radix-ui")
    }
  })
  sourceFile.saveSync()
  return sourceFile.getFullText()
}
