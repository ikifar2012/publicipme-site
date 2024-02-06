/**
 * v0 by Vercel.
 * @see https://v0.dev/t/f90m6taM7FI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { TrashIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
interface ResultsCardProps {
  ip: string;
  lookupTime: string;
  location: {
    city: string;
  };
  isp: string;
}
export default function ResultsCard(props: ResultsCardProps) {
  return (
<>
<div className="mt-6">
        <Card className="flex-col bg-zinc-900">
          <CardHeader>
            <CardTitle>{props.ip}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-gray-500 dark:text-white"><b>Lookup Time:</b> {props.lookupTime}</p>
            <p className="text-base text-gray-500 dark:text-white"><b>Location:</b> {props.location.city}</p>
            <p className="text-base text-gray-500 dark:text-white"> <b>ISP:</b> {props.isp}</p>
          </CardContent>
          <CardFooter className="flex-1 flex space-x-2 items-center justify-between">
            <Button>Open Dialog</Button>
            <Button variant="destructive" className="ml-auto" ><TrashIcon className="mr-2 h-4 w-4"/>Delete</Button>
          </CardFooter>
        </Card>
      </div>
</>
  )
}

