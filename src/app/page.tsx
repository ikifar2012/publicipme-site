"use client"
import React, { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
export default function Home() {
  const [publicIP, setPublicIP] = useState('');
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => setPublicIP(data.ip));
  }, []);
  const [publicIPV6, setPublicIPV6] = useState('');
  useEffect(() => {
    fetch('https://api64.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => setPublicIPV6(data.ip));
  }, []);
  return (
    // add a NavigationMenu component
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">
        Your Public IP Address
      </h1>
      <p className="mt-3 text-2xl">
        {publicIP}
      </p>
      <p className="mt-3 text-2xl">
        {publicIPV6}
      </p>
      </div>
  )
}

