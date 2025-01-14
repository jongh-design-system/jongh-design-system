#!/usr/bin/env node

import { Command } from "commander"
import path from "path"
import { z } from "zod"

const addSchema = z.object({
  components: z.array(z.string()).optional(),
  cwd: z.string(),
})

export const addCommand = new Command()
  .name("add")
  .description("add components")
  .argument(
    "[components...]",
    "the components to add or a url to the component.",
  )
  .option(
    "-c, --cwd <cwd>",
    "current working directory, default to process.cwd()",
    process.cwd(),
  )
  .action(async (components, opts) => {
    const options = addSchema.parse({
      components,
      cwd: path.resolve(opts.cwd),
      ...opts,
    })
    options.components?.map((c) => c.charAt(0).toUpperCase() + c.slice(1))
  })
