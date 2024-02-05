
import { getAllDataFromDB } from "./save-data";
import { useEffect, useState } from "react";
import ResultsCard from "./lookup-results-card";
import { Card,CardHeader, CardTitle, CardContent } from "@/components/ui/card";


export default function Results() {
    const [results, setResults] = useState<any[]>([]); // Update type annotation for results
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllDataFromDB();
            setResults(data);
            setLoading(false);
        };
        fetchData();
    }, []);
    return (
        <Card className="w-full mt-8 rounded-none border-none min-h-2.5">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
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
                    />
                ))}
          </CardContent>
        </Card>
    );
}