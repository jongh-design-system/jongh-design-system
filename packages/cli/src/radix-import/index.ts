import { Command } from "commander"
import fg from "fast-glob"
import path from "path"
import { transform } from "./transform"
import { Project } from "ts-morph"
export const codemodCommand = new Command()
  .name("radix-ui-import")
  .action(() => {
    const filePaths = fg.sync("**/*.tsx", {
      ignore: ["**/node_modules/**"],
      dot: false,
    })
    const project = new Project()
    filePaths.forEach((filePath) => {
      const sourceFile = project.addSourceFileAtPathIfExists(
        path.join(process.cwd(), filePath),
      )

      if (sourceFile) {
        transform(sourceFile)
        sourceFile.save()
      }
    })
  })
