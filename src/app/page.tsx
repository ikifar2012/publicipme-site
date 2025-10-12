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
import copy from 'copy-to-clipboard';

export default function Home() {
  const [publicIPV4, setPublicIPV4] = useState('');
  const [loadingIPV4, setLoadingIPV4] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/ip');
        if (!response.ok) {
          setPublicIPV4('Not available');
          setLoadingIPV4(false);
          return;
        }
        const data = await response.json();
        setPublicIPV4(data.ip || 'Not available');
        setLoadingIPV4(false);
      } catch (e) {
        setPublicIPV4('Not available');
        setLoadingIPV4(false);
      }
    };

    fetchData();
  }, []);

  const [loadingIPV6, setLoadingIPV6] = useState(true);
  const [publicIPV6, setPublicIPV6] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/ip');
        if (!response.ok) {
          setPublicIPV6('Not available');
          setLoadingIPV6(false);
          return;
        }
        const data = await response.json();
        setPublicIPV6(data.ip || 'Not available');
        setLoadingIPV6(false);
      } catch (e) {
        setPublicIPV6('Not available');
        setLoadingIPV6(false);
      }
    };
    fetchData();
  }, [publicIPV4]);
  const [copyButtonTextIPV4, setCopyButtonTextIPV4] = useState('Copy');
  const handleIPV4Copy = async () => {
    copy(publicIPV4 || '');
    setCopyButtonTextIPV4('Copied!');
    // reset the button text after 3 seconds
    setTimeout(() => {
      setCopyButtonTextIPV4('Copy');
    }, 3000);
  }

  const [copyButtonTextIPV6, setCopyButtonTextIPV6] = useState('Copy');
  const handleIPV6Copy = async () => {
      copy(publicIPV6 || '');
    setCopyButtonTextIPV6('Copied!');
    // reset the button text after 3 seconds
    setTimeout(() => {
      setCopyButtonTextIPV6('Copy');
    }, 3000);
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
        <Card className="max-w-md w-full lg:max-w-max bg-opacity-45 backdrop-blur-xl bg-stone-950">
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
                <Button className="ml-2 px-4 py-2" onPointerDown={() => handleIPV4Copy()}>
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
                    </Skeleton> : 
                    <div className="overflow-x-scroll lg:overflow-hidden">
                    {publicIPV6}
                    </div>
                    }
                  <Button className="ml-2 px-4" onPointerDown={() => handleIPV6Copy()}>
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

