
import { getAllDataFromDB, clearAllDataFromDB } from "./save-data";
import { useEffect, useState, useContext } from "react";
import ResultsCard from "./lookup-results-card";
import { Card,CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { ResultsContext } from "./context/results-context";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default function Results() {
    const { results, setResults } = useContext(ResultsContext);
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
    }, [setResults]);
    return (
        <Card className="w-full rounded-3xl border-none min-h-2.5 bottom-0 bg-opacity-45 backdrop-blur-xl bg-stone-950">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <Button variant="destructive" className="ml-auto" onPointerDown={
                async () => {
                    await clearAllDataFromDB();
                    setResults([]);
                }
            }><TrashIcon className="mr-2 h-4 w-4"/>Clear All</Button>
          </CardHeader>
          <CardContent>
{           loading && <p>Loading...</p>}
              {!loading && results.length === 0 && <p>No results found</p>}
                {!loading && results.length > 0 && results.map((result) => (
                    // from now
                    <ResultsCard
                    key={result.id}
                    ip={result.ip ? result.ip : 'Not available'}
                    lookupTime={dayjs.unix(result.lookupTime).fromNow() ? dayjs.unix(result.lookupTime).fromNow() : 'Not available'}
                    location={result.location ? result.location : 'Not available'}
                    isp={result.isp ? result.isp : 'Not available'}
                    id={result.id ? result.id : 'Not available'}
                    />
                ))}
          </CardContent>
        </Card>
    );
}