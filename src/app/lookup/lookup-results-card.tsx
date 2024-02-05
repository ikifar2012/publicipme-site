/**
 * v0 by Vercel.
 * @see https://v0.dev/t/f90m6taM7FI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { TrashIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { ComponentProps } from "react"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"

export default function ResultsCard(props: ComponentProps<any>) {
  return (
<>
        <Card className="flex-col bg-zinc-900">
          <CardHeader>
            <CardTitle>{props.ip}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-white">Lookup Time: {props.lookupTime}</p>
            <p className="text-sm text-gray-500 dark:text-white">Location: {props.location}</p>
            <p className="text-sm text-gray-500 dark:text-white">ISP: {props.isp}</p>
          </CardContent>
          <CardFooter className="flex-1 flex space-x-2 items-center justify-between">
            <Button>Open Dialog</Button>
            <Button variant="destructive" className="ml-auto"><TrashIcon/>Delete</Button>
          </CardFooter>
        </Card>
</>
  )
}

