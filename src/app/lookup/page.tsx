"use client"
import ResultsCard from "./lookup-results-card";
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { IpAddressInput } from "./ip-validate";
import { Lookup } from "./lookup";
import { addDataToDB } from "./save-data";


export default function Page() {
    const [publicIPV4, setPublicIPV4] = useState('');
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setPublicIPV4(data.ip);
      };
      fetchData();
    }, []);
  
    const [publicIPV6, setPublicIPV6] = useState('');
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        setPublicIPV6(data.ip);
      };
      fetchData();
    }, []);


const LookupServerSide = async (e: any) => {
    e.preventDefault();
    const lookupType = await e.target.name;
    const lookupData = await e.target[0].value;

  // get the lookup type from the form name
    const result = await Lookup(lookupData, lookupType);
    // add the result to the database
    await addDataToDB(result);
    console.log(result);
    return result;
}

    return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <Tabs className="w-full max-w-md" defaultValue="domain">
        <TabsList className="flex justify-center gap-4">
          <TabsTrigger value="domain">Domain</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="ip">IP</TabsTrigger>
        </TabsList>
        <TabsContent value="domain">
        <form className="flex flex-col gap-4" onSubmit={LookupServerSide} name="domain" >
            <Input placeholder="Search by domain" type="submit" />
            <Button type="submit">Search</Button>
          </form>
        </TabsContent>
        <TabsContent value="email">
        <form className="flex flex-col gap-4" onSubmit={LookupServerSide} name="email" >
            <Input placeholder="Search by email" type="submit" />
            <Button type="submit">Search</Button>
          </form>
        </TabsContent>
        <TabsContent value="ip">
            <section className="flex flex-row gap-4 justify-center">
      <Tabs className="w-full max-w-md" defaultValue="none">
        <TabsList className="flex justify-center gap-4">
          <TabsTrigger value="none">Custom</TabsTrigger>
          <TabsTrigger value="IPV4">Copy my IPV4</TabsTrigger>
          <TabsTrigger value="IPV6">Copy my IPV6</TabsTrigger>
        </TabsList>
        <TabsContent value="none">
          <form className="flex flex-col gap-4" onSubmit={LookupServerSide} name="ip" >
            <IpAddressInput type="submit"/>
            <Button type="submit">Search</Button>
          </form>
        </TabsContent>
        <TabsContent value="IPV4">
        <form className="flex flex-col gap-4" onSubmit={LookupServerSide} name="ip" >
            <IpAddressInput value={publicIPV4} type="submit"/>
            <Button type="submit">Search</Button>
          </form>
        </TabsContent>
        <TabsContent value="IPV6">
        <form className="flex flex-col gap-4" onSubmit={LookupServerSide} name="ip" >
            <IpAddressInput value={publicIPV6} type="submit"/>
            <Button type="submit">Search</Button>
          </form>
        </TabsContent>
      </Tabs>
            </section>
        </TabsContent>
      </Tabs>
        <Card className="w-full mt-8 rounded-none border-none">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <p className="text-gray-500 dark:text-gray-400">Your search results will appear here.</p> */}
            <ResultsCard ip="192.168.0.1" location="New York, NY" isp="Comcast" lookupTime="2021-10-10 12:00:00" />
          </CardContent>
        </Card>
    </main>
          )
}
