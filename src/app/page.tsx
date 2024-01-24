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
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [publicIPV4, setPublicIPV4] = useState(null);
  const [loadingIPV4, setLoadingIPV4] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setPublicIPV4(data.ip);
      setLoadingIPV4(false);
    };

    fetchData();
  }, []);

  const [loadingIPV6, setLoadingIPV6] = useState(true);
  const [publicIPV6, setPublicIPV6] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api64.ipify.org?format=json');
      const data = await response.json();
      setPublicIPV6(data.ip === publicIPV4 ? 'Not available' : data.ip);
      setLoadingIPV6(false);
    };
    fetchData();
  }, []);
  const [copyButtonTextIPV4, setCopyButtonTextIPV4] = useState('Copy');
  const handleIPV4Copy = () => {
    navigator.clipboard.writeText(publicIPV4 || '');
    setCopyButtonTextIPV4('Copied!');
    // reset the button text after 3 seconds
    setTimeout(() => {
      setCopyButtonTextIPV4('Copy');
    }, 3000);
  }

  const [copyButtonTextIPV6, setCopyButtonTextIPV6] = useState('Copy');
  const handleIPV6Copy = () => {
      navigator.clipboard.writeText(publicIPV6 || '');
    setCopyButtonTextIPV6('Copied!');
    // reset the button text after 3 seconds
    setTimeout(() => {
      setCopyButtonTextIPV6('Copy');
    }, 3000);
  }

  return (
    // add black bar across top
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <Card>
          <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-500">
                PublicIP.me
              </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <div className="text-sm text-gray-500 py-1">
                Your public IP address is:
              </div>
              <span className="text-xl font-bold">
              <div className="flex flex-row items-center">
              { loadingIPV4 ?  
                  <Skeleton className="w-[147px] h-8">
                    </Skeleton> : publicIPV4
                  }
                <Button className="ml-2 px-4 py-2" onClick={() => handleIPV4Copy()}>
                  {copyButtonTextIPV4}
                </Button>
              </div>
            </span>
              <div className="text-sm text-gray-500 py-1">
                Your public IPv6 address is:
              </div>
              <span className="text-xl font-bold">
                <div className="flex flex-row items-center">
                  { loadingIPV6 ?  
                  <Skeleton className="w-[430px] h-8">
                    </Skeleton> : publicIPV6
                    }
                  <Button className="ml-2 px-4 py-2" onClick={() => handleIPV6Copy()}>
                    {copyButtonTextIPV6}
                  </Button>
                </div>
              </span>
            </CardDescription>
          </CardContent>
          <CardFooter className="text-sm text-gray-500">
              No frills, just your public IP address.
          </CardFooter>
        </Card>
      </main>
  )
}

