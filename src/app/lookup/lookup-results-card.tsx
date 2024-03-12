/**
 * v0 by Vercel.
 * @see https://v0.dev/t/f90m6taM7FI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { TrashIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { clearDataFromDB } from "./save-data";
import { useState, useContext } from "react";
import { ResultsContext } from "./context/results-context";
import { getAllDataFromDB } from "./save-data";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
interface ResultsCardProps {
  ip: string;
  lookupTime: string;
  location: {
    city: string;
  };
  isp: string;
  id: any;
}
import DialogResults from "./results-dialog";
export default function ResultsCard(props: ResultsCardProps) {
  const [DialogState, setDialogState] = useState(false);
  const { results, setResults } = useContext(ResultsContext);
  const [lookupID, setLookupID] = useState('');

  const openDialog = (id: any) => {
    setLookupID(String(id));
    setDialogState(true);
  }
  const deleteResult = async (id: any) => {
    clearDataFromDB(id);
    const data = await getAllDataFromDB();
    // sort the data descending 
    data.sort((a, b) => b.lookupTime - a.lookupTime);
    setResults(data);
  }
  // const clearandRefresh = (id: any) => {
  //   clearDataFromDB(id);
  // }
  return (
<>
<div className="mt-6">
  {
    DialogState && <DialogResults id={lookupID}/>
  }
          <Card className="flex-col bg-zinc-900 bg-opacity-45 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>{props.ip}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-gray-500 dark:text-white"><b>Lookup Time:</b> {props.lookupTime}</p>
            <p className="text-base text-gray-500 dark:text-white"><b>Location:</b> {props.location.city}</p>
            <p className="text-base text-gray-500 dark:text-white"> <b>ISP:</b> {props.isp}</p>
          </CardContent>
          <CardFooter className="flex-1 flex space-x-2 items-center justify-between">
            <Button onPointerDown={() => openDialog(props.id)}>Open Dialog</Button>
            <Button onPointerDown={() => deleteResult(props.id)} variant="destructive" className="ml-auto" ><TrashIcon className="mr-2 h-4 w-4"/>Delete</Button>
          </CardFooter>
        </Card>
      </div>
</>
  )
}

