import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
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
      // if any props are missing, set them to 'not available' for each field
      if (!data.location) {
        data.location = {
          country: 'Not available',
          region: 'Not available',
          city: 'Not available',
          lat: 0,
          lng: 0,
          postalCode: 'Not available',
          timezone: 'Not available',
          geonameId: 0,
        };
      }
      if (!data.as) {
        data.as = {
          asn: 0,
          name: 'Not available',
          route: 'Not available',
          domain: 'Not available',
          type: 'Not available',
        };
      }
      if (!data.isp) {
        data.isp = 'Not available';
      }

      setJsonData(data);
      setIsOpen(true);
      setLoading(false);
      console.log(data);
    };
    fetchData();

  }, [props.id]);
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Results</DialogTitle>
            <DialogDescription>
              Results of your search
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <div>
                    <p className="text-slate-100 text-lg font-semibold">ISP: {loading ? 'Loading...' : jsonData.isp}</p>
                    <p className="text-slate-100 text-lg font-semibold">ASN: {loading ? 'Loading...' : jsonData.as.asn}</p>
                    <p className="text-slate-100 text-lg font-semibold">Name: {loading ? 'Loading...' : jsonData.as.name}</p>
                    <p className="text-slate-100 text-lg font-semibold">Route: {loading ? 'Loading...' : jsonData.as.route}</p>
                    <p className="text-slate-100 text-lg font-semibold">Domain: {loading ? 'Loading...' : jsonData.as.type}</p>
                  </div>
                </div>
                <div className="md:flex md:flex-col md:items-center md:justify-center">
                  <h2 className="text-slate-100 text-2xl font-semibold">Map</h2>
                  <iframe
                    className="w-full h-96"
                    style={{ border: 0 }}
                    src={loading ? 'Loading...' : `https://openstreetmap.org/export/embed.html?bbox=${jsonData.location.lng},${jsonData.location.lat},${jsonData.location.lng},${jsonData.location.lat}&layer=mapnik&marker=${jsonData.location.lat},${jsonData.location.lng}`}
                    allowFullScreen
                  ></iframe>
                  <div className="mt-5">
                    <p className="text-slate-100 text-lg font-semibold">Country: {loading ? 'Loading...' : jsonData.location.country}</p>
                    <p className="text-slate-100 text-lg font-semibold">Region: {loading ? 'Loading...' : jsonData.location.region}</p>
                    <p className="text-slate-100 text-lg font-semibold">City: {loading ? 'Loading...' : jsonData.location.city}</p>
                    <p className="text-slate-100 text-lg font-semibold">Postal Code: {loading ? 'Loading...' : jsonData.location.postalCode}</p>
                    <p className="text-slate-100 text-lg font-semibold">Latitude: {loading ? 'Loading...' : jsonData.location.lat}</p>
                    <p className="text-slate-100 text-lg font-semibold">Longitude: {loading ? 'Loading...' : jsonData.location.lng}</p>
                    <p className="text-slate-100 text-lg font-semibold">Timezone: {loading ? 'Loading...' : jsonData.location.timezone}</p>
                    <p className="text-slate-100 text-lg font-semibold">Geoname ID: {loading ? 'Loading...' : jsonData.location.geonameId}</p>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button type="button" variant="destructive">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );  
}
