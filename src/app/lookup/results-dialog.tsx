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
interface ResultsCardProps {
  id: string;
}
export default async function DialogResults(props: ResultsCardProps) {
  // Fetch the IndexedDB data based on the index id
  const jsonData = await getIndexedDBData(props.id);
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Results</DialogTitle>
          <DialogDescription>
            Results of your search
          <div>
            <h2>Location</h2>
            <p>Country: {jsonData.location.country}</p>
            <p>Region: {jsonData.location.region}</p>
            <p>City: {jsonData.location.city}</p>
            <p>Postal Code: {jsonData.location.postalCode}</p>
            <p>Latitude: {jsonData.location.lat}</p>
            <p>Longitude: {jsonData.location.lng}</p>
            <p>Timezone: {jsonData.location.timezone}</p>
            <p>Geoname ID: {jsonData.location.geonameId}</p>
          </div>
          <div>
            <p>ISP: {jsonData.isp}</p>
            <h2>AS</h2>
            <p>ASN: {jsonData.as.asn}</p>
            <p>Name: {jsonData.as.name}</p>
            <p>Route: {jsonData.as.route}</p>
            <p>Domain: {jsonData.as.type}</p>
          </div>
          <div>
            <h2>Map</h2>
            <iframe
              width="100%"
              height="300"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://openstreetmap.org/export/embed.html?bbox=${jsonData.location.lng},${jsonData.location.lat},${jsonData.location.lng},${jsonData.location.lat}&layer=mapnik&marker=${jsonData.location.lat},${jsonData.location.lng}`}
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
  )
}
