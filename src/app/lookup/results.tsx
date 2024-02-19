
import { getAllDataFromDB, clearAllDataFromDB } from "./save-data";
import { useEffect, useState } from "react";
import ResultsCard from "./lookup-results-card";
import { Card,CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import revalidateResults from "./revalidate-results";


export default function Results() {
    const [results, setResults] = useState<any[]>([]); // Update type annotation for results
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllDataFromDB();
            // sort the data descending 
            data.sort((a, b) => b.lookupTime - a.lookupTime);
            setResults(data);
            setLoading(false);
        };
        fetchData();
    }, []);
    return (
        <Card className="w-full rounded-none border-none min-h-2.5 bottom-0">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <Button variant="destructive" className="ml-auto" onPointerDown={
                async () => {
                    await clearAllDataFromDB();
                    setResults([]);
                    await revalidateResults();
                }
            }><TrashIcon className="mr-2 h-4 w-4"/>Clear All</Button>
          </CardHeader>
          <CardContent>
{           loading && <p>Loading...</p>}
              {!loading && results.length === 0 && <p>No results found</p>}
                {!loading && results.length > 0 && results.map((result) => (
                    <ResultsCard
                    key={result.id}
                    ip={result.ip}
                    lookupTime={result.lookupTime}
                    location={result.location}
                    isp={result.isp}
                    id={result.id}
                    />
                ))}
          </CardContent>
        </Card>
    );
}