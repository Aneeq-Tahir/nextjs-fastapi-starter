"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_ENDPOINT } from "@/lib/utils";
import { useState } from "react";

const TodoInput = () => {
   const [todo, setTodo] = useState("");

   const addTodo = (description: string, token: string) => {
      fetch(`${API_ENDPOINT}/api/todo`, {
         method: "POST",
         headers: {
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({ description }),
      });
   };

   return (
      <div className="flex gap-2">
         <Input
            className="flex-1 min-w-0"
            placeholder="Enter a new task"
            type="text"
            onChange={(e) => setTodo(e.target.value)}
         />
         <Button onClick={() => addTodo(todo, "")} size="icon">
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Add</span>
         </Button>
      </div>
   );
};

export function PlusIcon(props: React.ComponentProps<"svg">) {
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
         <path d="M5 12h14" />
         <path d="M12 5v14" />
      </svg>
   );
}

export default TodoInput;
