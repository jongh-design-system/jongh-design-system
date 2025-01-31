import { Command } from "commander"
import fg from "fast-glob"
import path from "path"
import { transform } from "./transform"
export const codemodCommand = new Command()
  .name("radix-ui-import")
  .action(() => {
    const filePaths = fg.sync("**/*.tsx", {
      ignore: ["**/node_modules/**"],
      dot: false,
    })
    filePaths.forEach((filePath) => {
      transform(path.join(process.cwd(), filePath))
    })
  })
