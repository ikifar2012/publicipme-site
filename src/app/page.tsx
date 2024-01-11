"use client"
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
      <Card className="w-full max-w-md tex">
        <CardHeader>
          <p className="text-2xl text-center text-gray-500">
          <CardTitle>PublicIP.me</CardTitle>
          </p>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <p className="text-sm text-gray-500">
              Your public IP address is:
            </p>
            <p className="text-xl font-bold">{publicIP}</p>
            <p className="text-sm text-gray-500">
              Your public IPv6 address is:
            </p>
            <p className="text-xl font-bold">{publicIPV6}</p>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            No frills, just your public IP address.
          </p>
        </CardFooter>
      </Card>
      </div>
  )
}

