import { Avatar as AvatarPrimitive } from "radix-ui"
import { recipe } from "./recipe"
import { cx } from "@styled-system/css"
import { ElementRef, forwardRef, type ComponentPropsWithoutRef } from "react"

export const Root = forwardRef<
  ElementRef<typeof AvatarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => {
  const classes = recipe()
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cx(classes.root, className)}
      {...props}
    />
  )
})

export const Image = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => {
  const classes = recipe()
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cx(classes.image, className)}
      {...props}
    />
  )
})

export const Fallback = forwardRef<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => {
  const classes = recipe()
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cx(classes.fallback, className)}
      {...props}
    />
  )
})
