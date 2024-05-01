"use client";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, PlusIcon } from "@/svgs";

import { addTodo } from "@/lib/actions";

const Submit = () => {
   const { pending } = useFormStatus();

   return (
      <Button
         disabled={pending}
         className="disabled:cursor-not-allowed disabled:opacity-70"
         size="icon"
      >
         {pending ? (
            <Loader className="animate-spin w-4 h-4 text-transparent fill-gray-950" />
         ) : (
            <>
               <PlusIcon className="h-4 w-4" />
               <span className="sr-only">Add</span>
            </>
         )}
      </Button>
   );
};

const TodoInput = () => {
   return (
      <form action={addTodo} className="flex gap-2">
         <Input
            className="flex-1 min-w-0"
            placeholder="Enter a new task"
            type="text"
            name="todo"
         />
         <Submit />
      </form>
   );
};

export default TodoInput;
