"use client"
import Results from "./results";
import { Button } from "@/components/ui/button";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { IpAddressInput } from "./ip-validate";
import { Lookup } from "./lookup";
import { addDataToDB } from "./save-data";
import DialogResults from "./results-dialog";

export default function Page() {
  const [publicIPV4, setPublicIPV4] = useState('');
  const [loadingIPV4, setLoadingIPV4] = useState(true);
  const [publicIPV6, setPublicIPV6] = useState('');
  const [loadingIPV6, setLoadingIPV6] = useState(true);

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
        setPublicIPV4(data.ip || data.ipv4 || 'Not available');
        setLoadingIPV4(false);
      } catch (e) {
        setPublicIPV4('Not available');
        setLoadingIPV4(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ip-worker.steplock.workers.dev/api/ip/v6');
        if (!response.ok) {
          setPublicIPV6('Not available');
          setLoadingIPV6(false);
          return;
        }
        const data = await response.json();
        setPublicIPV6(data.ipv6 || data.ip || 'Not available');
        setLoadingIPV6(false);
      } catch (e) {
        setPublicIPV6('Not available');
        setLoadingIPV6(false);
      }
    };
    fetchData();
  }, [publicIPV4]);

  function ScrollHint() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const onScroll = () => setIsVisible(window.scrollY < 100);
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return isVisible ? (
      <div className="scroll-hint fixed bottom-0 inset-x-0 max-w-max mx-auto flex flex-col mb-8">
        Scroll down to see previous results
        <div className="scroll-hint-arrow animate-bounce fixed inset-x-0 max-w-max mx-auto bottom-0">
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    ) : null;
  }

  const [lookupID, setLookupID] = useState('');
  const [DialogState, setDialogState] = useState(false);
  const LookupServerSide = async (e: any) => {
    e.preventDefault();
    const lookupType = await e.target.name;
    const lookupData = await e.target[0].value;

    // get the lookup type from the form name
    const result = await Lookup(lookupData, lookupType);
    // add the result to the database
    const id = await addDataToDB(result);
    console.log(result);
    setLookupID(String(id));
    setDialogState(true);
  }

  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen overflow-auto">
        {DialogState && <DialogResults id={lookupID} />}
        <Tabs className="w-full max-w-md" defaultValue="ip">
          <TabsList className="flex justify-center gap-4">
            {/* <TabsTrigger value="domain">Domain</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger> */}
            <TabsTrigger value="ip">IP</TabsTrigger>
          </TabsList>
          <TabsContent value="domain">
            <form className="flex flex-col gap-4" onSubmit={LookupServerSide} name="domain">
              <Input placeholder="Search by domain" type="submit" />
              <Button type="submit">Search</Button>
            </form>
          </TabsContent>
          <TabsContent value="email">
            <form className="flex flex-col gap-4" onSubmit={LookupServerSide} name="email">
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
                  <form className="flex flex-col gap-4" onSubmit={LookupServerSide} name="ip">
                    <IpAddressInput type="submit" />
                    <Button type="submit">Search</Button>
                  </form>
                </TabsContent>
                <TabsContent value="IPV4">
                  <form className="flex flex-col gap-4" onSubmit={LookupServerSide} name="ip">
                    <IpAddressInput value={publicIPV4} type="submit" />
                    <Button type="submit">Search</Button>
                  </form>
                </TabsContent>
                <TabsContent value="IPV6">
                  <form className="flex flex-col gap-4" onSubmit={LookupServerSide} name="ip">
                    <IpAddressInput value={publicIPV6} type="submit" />
                    <Button type="submit">Search</Button>
                  </form>
                </TabsContent>
              </Tabs>
            </section>
          </TabsContent>
        </Tabs>
      </main>
      <ScrollHint />
      <Results />
    </>
  )
}
