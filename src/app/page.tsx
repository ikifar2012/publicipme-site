"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SiteNavigationMenu } from "@/components/nav"
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
  const [copyButtonTextIPV4, setCopyButtonTextIPV4] = useState('Copy');
  const handleIPV4Copy = () => {
    navigator.clipboard.writeText(publicIP);
    setCopyButtonTextIPV4('Copied!');
    // reset the button text after 3 seconds
    setTimeout(() => {
      setCopyButtonTextIPV4('Copy');
    }, 3000);
  }

  const [copyButtonTextIPV6, setCopyButtonTextIPV6] = useState('Copy');
  const handleIPV6Copy = () => {
    navigator.clipboard.writeText(publicIPV6);
    setCopyButtonTextIPV6('Copied!');
    // reset the button text after 3 seconds
    setTimeout(() => {
      setCopyButtonTextIPV6('Copy');
    }, 3000);
  }
  return (
    // add black bar across top
    <><div className="bg-black w-full h-auto">
      <SiteNavigationMenu />
    </div><div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Card>
          <CardHeader>
            <p className="text-2xl text-center text-gray-500">
              <CardTitle>PublicIP.me</CardTitle>
            </p>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p className="text-sm text-gray-500 py-1">
                Your public IP address is:
              </p>
              <p className="text-xl font-bold">
                <div className="flex flex-row items-center">
                  {publicIP}
                  <Button className="ml-2 px-4 py-2" onClick={() => handleIPV4Copy()}>
                    {copyButtonTextIPV4}
                  </Button>
                </div>
              </p>
              <p className="text-sm text-gray-500 py-1">
                Your public IPv6 address is:
              </p>
              <p className="text-xl font-bold">
                <div className="flex flex-row items-center">
                  {publicIPV6}
                  <Button className="ml-2 px-4 py-2" onClick={() => handleIPV6Copy()}>
                    {copyButtonTextIPV6}
                  </Button>
                </div>
              </p>
            </CardDescription>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">
              No frills, just your public IP address.
            </p>
          </CardFooter>
        </Card>
      </div></>
  )
}

