'use client'
import {
        NavigationMenu,
        NavigationMenuContent,
        NavigationMenuIndicator,
        NavigationMenuItem,
        NavigationMenuLink,
        NavigationMenuList,
        NavigationMenuTrigger,
        NavigationMenuViewport,
        navigationMenuTriggerStyle,
    } from "@/components/ui/navigation-menu"
import Link from "next/link"; // Add this import statement
import * as React from "react"

function SiteNavigationMenu() {
        return (
// wrap this in a translucent bar to make it sticky full width
<NavigationMenu>
  <NavigationMenuList>
  <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/lookup" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              IP Lookup
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
    </NavigationMenuList>
</NavigationMenu>
    )
}
export { SiteNavigationMenu }