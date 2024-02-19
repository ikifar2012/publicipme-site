import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getIndexedDBData } from "./save-data";
import { useState, useEffect } from "react";
interface ResultsCardProps {
  id: any;
}

export default function DialogResults(props: ResultsCardProps) {
  // Fetch the IndexedDB data based on the index id
  const [jsonData, setJsonData] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false); 
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getIndexedDBData(props.id);
      setJsonData(data);
      setIsOpen(true);
      setLoading(false);
      console.log(data);
    };
    fetchData();

  }, [props.id]);
  
  return (
    <>
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Results</DialogTitle>
          <DialogDescription>
            Results of your search
          <div>
            <h2>Location</h2>
            <p>Country: {loading ? 'Loading...' : jsonData.location.country}</p>
            <p>Region: {loading ? 'Loading...' : jsonData.location.region}</p>
            <p>City: {loading ? 'Loading...' : jsonData.location.city}</p>
            <p>Postal Code: {loading ? 'Loading...' : jsonData.location.postalCode}</p>
            <p>Latitude: {loading ? 'Loading...' : jsonData.location.lat}</p>
            <p>Longitude: {loading ? 'Loading...' : jsonData.location.lng}</p>
            <p>Timezone: {loading ? 'Loading...' : jsonData.location.timezone}</p>
            <p>Geoname ID: {loading ? 'Loading...' : jsonData.location.geonameId}</p>
          </div>
          <div>
            <p>ISP: {loading ? 'Loading...' : jsonData.isp}</p>
            <h2>AS</h2>
            <p>ASN: {loading ? 'Loading...' : jsonData.as.asn}</p>
            <p>Name: {loading ? 'Loading...' : jsonData.as.name}</p>
            <p>Route: {loading ? 'Loading...' : jsonData.as.route}</p>
            <p>Domain: {loading ? 'Loading...' : jsonData.as.type}</p>
          </div>
          <div>
            <h2>Map</h2>
            <iframe
              width="100%"
              height="300"
              style={{ border: 0 }}
              src={loading ? 'Loading...' : `https://openstreetmap.org/export/embed.html?bbox=${jsonData.location.lng},${jsonData.location.lat},${jsonData.location.lng},${jsonData.location.lat}&layer=mapnik&marker=${jsonData.location.lat},${jsonData.location.lng}`}
              allowFullScreen
            ></iframe>
          </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" variant="destructive">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}
