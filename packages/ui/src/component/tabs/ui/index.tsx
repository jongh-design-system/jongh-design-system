import { Tabs as TabsPrimitive } from "radix-ui"
import { ElementRef, forwardRef, ComponentPropsWithoutRef } from "react"
import { cx } from "@styled-system/css"
import { recipe } from "./recipe"

export const Root = forwardRef<
  ElementRef<typeof TabsPrimitive.Root>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => {
  const classes = recipe()
  return (
    <TabsPrimitive.Root
      ref={ref}
      className={cx(classes.root, className)}
      {...props}
    />
  )
})

export const List = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const classes = recipe()
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cx(classes.list, className)}
      {...props}
    />
  )
})

export const Trigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const classes = recipe()
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cx(classes.trigger, className)}
      {...props}
    />
  )
})

export const Content = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  const classes = recipe()
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cx(classes.content, className)}
      {...props}
    />
  )
})
