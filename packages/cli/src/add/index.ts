#!/usr/bin/env node

import { Command } from "commander"
import path from "path"
import { z } from "zod"

const addSchema = z.object({
  components: z.array(z.string()).optional(),
  cwd: z.string(),
})

const BASE_URL = "https://whdgur.shop"
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
    const componentList = options.components?.map(
      (c) => c.charAt(0).toUpperCase() + c.slice(1),
    )
    if (!componentList?.length) {
      return
    }
    const results = await Promise.allSettled(
      componentList?.map(async (c) => {
        const response = await fetch(`${BASE_URL}/${c}.json`)
        if (!response.ok) {
          throw new Error(`Failed to fetch ${c}`)
        }
        const data = await response.json()
        return data
      }),
    )
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`${componentList[index]} completed successfully`)
        console.log(result.value)
      }
    })
  })
