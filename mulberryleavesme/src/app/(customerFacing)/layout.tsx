"use client"

import { Nav, NavLink } from "@/components/Nav"
import { ShoppingCart } from "./components/ShoppingCart"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
9

export default function Layout({
    children,
}: Readonly<{
        children: React.ReactNode
}>) {


  return <>
  <ShoppingCartProvider>
    <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
        <ShoppingCart />
    </Nav>
    <div className="container my-6">{children}</div>
  </ShoppingCartProvider>
  </>
}