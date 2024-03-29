import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "./todo-input";
import { Input } from "./ui/input";

export default function Todo() {
   return (
      <Card className="w-[400px]">
         <CardHeader className="flex flex-col gap-1">
            <CardTitle className="text-2xl font-bold">Tasks</CardTitle>
            <CardDescription>What do you need to do today?</CardDescription>
         </CardHeader>
         <CardContent>
            {/* <TodoInput /> */}
            <div className="flex gap-2">
               <Input
                  className="flex-1 min-w-0"
                  placeholder="Enter a new task"
                  type="text"
                  // onChange={(e) => setTodo(e.target.value)}
               />
               <Button
                  // onClick={() => addTodo(todo)}
                  size="icon"
               >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Add</span>
               </Button>
            </div>
         </CardContent>
         <CardContent className="border-t dark:border-gray-800 pt-4">
            {
               <div className="flex items-center gap-4 py-2">
                  <Checkbox className="h-4 w-4" id="task1" />
                  <Label className="flex-1" htmlFor="task1">
                     Add new tasks to the list
                  </Label>
                  <Button className="ml-auto" size="icon">
                     <TrashIcon className="h-4 w-4" />
                     <span className="sr-only">Delete</span>
                  </Button>
               </div>
            }
         </CardContent>
      </Card>
   );
}

function TrashIcon(props: React.ComponentProps<"svg">) {
   return (
      <svg
         {...props}
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round"
      >
         <path d="M3 6h18" />
         <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
         <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
   );
}
