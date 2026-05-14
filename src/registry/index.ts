import type { Registry } from "shadcn/schema"

import { components } from "./components/_registry"
import { examples } from "./examples/_registry"
import { hook } from "./hooks/_registry"
import { lib } from "./lib/_registry"
import { styles } from "./styles/_registry"

export const registry = {
  name: "ncdai",
  homepage: "https://chanhdai.com/components",
  items: [
    ...lib,
    ...hook,
    ...components,
    ...styles,

    // Internal use only
    ...examples,
  ],
} satisfies Registry
