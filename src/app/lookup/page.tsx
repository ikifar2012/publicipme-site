import { Card, CardContent,CardTitle,CardDescription, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input";
async function getIP() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
    }
async function getIPV6() {
    const response = await fetch('https://api64.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
    }

export default function Page() {
    console.log("lookup page")
    return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <Tabs className="w-full max-w-md" defaultValue="domain">
        <TabsList className="flex justify-center gap-4">
          <TabsTrigger value="domain">Domain</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="ip">IP</TabsTrigger>
        </TabsList>
        <TabsContent value="domain">
          <form className="flex flex-col gap-4">
            <Input placeholder="Search by domain" type="text" />
            <Button>Search</Button>
          </form>
        </TabsContent>
        <TabsContent value="email">
          <form className="flex flex-col gap-4">
            <Input placeholder="Search by email" type="email" />
            <Button>Search</Button>
          </form>
        </TabsContent>
        <TabsContent value="ip">
          <form className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 justify-center">
      <Tabs className="w-full max-w-md" defaultValue="none">
        <TabsList className="flex justify-center gap-4">
          <TabsTrigger value="none">Custom</TabsTrigger>
          <TabsTrigger value="IPV4">Copy my IPV4</TabsTrigger>
          <TabsTrigger value="IPV6">Copy my IPV6</TabsTrigger>
        </TabsList>
        <TabsContent value="none">
          <form className="flex flex-col gap-4">
            <Input placeholder="Search by IP" type="text" />
            <Button>Search</Button>
          </form>
        </TabsContent>
        <TabsContent value="IPV4">
          <form className="flex flex-col gap-4">
            <Input placeholder="Search by IP" type="text" />
            <Button>Search</Button>
          </form>
        </TabsContent>
        <TabsContent value="IPV6">
          <form className="flex flex-col gap-4">
            <Input placeholder="Search by IP" type="text" />
            <Button>Search</Button>
          </form>
        </TabsContent>
      </Tabs>
            </div>
          </form>
        </TabsContent>
      </Tabs>
      <div className="w-full max-w-md mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400">Your search results will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </main>
          )
}
