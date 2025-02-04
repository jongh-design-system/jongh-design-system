import { Accordion as AccordionPrimitive } from "radix-ui"
import { recipe } from "./recipe"
import { cx } from "@styled-system/css"
import { ElementRef, forwardRef, type ComponentPropsWithoutRef } from "react"

export const Root = forwardRef<
  ElementRef<typeof AccordionPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => {
  const classes = recipe()

  return (
    <AccordionPrimitive.Root
      ref={ref}
      className={cx(classes.root, className)}
      {...props}
    />
  )
})

export const Header = forwardRef<
  ElementRef<typeof AccordionPrimitive.Header>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ className, ...props }, ref) => {
  const classes = recipe()
  return (
    <AccordionPrimitive.Header
      ref={ref}
      {...props}
      className={cx(classes.header, className)}
    />
  )
})

export const Item = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const classes = recipe()
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cx(classes.item, className)}
      {...props}
    />
  )
})

export const Trigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const classes = recipe()
  return (
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cx(classes.trigger, className)}
      {...props}
    />
  )
})

export const Content = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, ...props }, ref) => {
  const classes = recipe()
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cx(classes.content, className)}
      {...props}
    />
  )
})
