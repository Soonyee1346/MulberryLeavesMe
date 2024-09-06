"use client"

import { Nav, NavLink } from "@/components/Nav"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
//import {}

export default function Layout({
    children,
}: Readonly<{
        children: React.ReactNode
}>) {
  

  return <>
    <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
        <div className="my-2 mx-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className=""><FontAwesomeIcon icon={faCartShopping} style={{color: "#ffffff",}} /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Cart</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
    </Nav>
    <div className="container my-6">{children}</div>
  </>
}
//<NavLink href="/cart"><FontAwesomeIcon icon={faCartShopping} style={{color: "#ffffff",}} /></NavLink>