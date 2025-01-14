#!/usr/bin/env node

import { Command } from "commander"

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
