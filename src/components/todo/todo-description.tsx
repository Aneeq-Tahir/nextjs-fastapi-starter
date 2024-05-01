"use client";
import { deleteTodo, editTodo } from "@/lib/actions";
import { Loader, TrashIcon } from "@/svgs";
import { CheckIcon, PencilIcon } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
   todoId: number;
   children: React.ReactNode;
   completed: boolean;
};

const Delete = () => {
   const { pending } = useFormStatus();

   return (
      <Button
         disabled={pending}
         className="ml-auto disabled:cursor-not-allowed disabled:opacity-70"
         size="icon"
      >
         {pending ? (
            <Loader className="h-4 w-4 text-transparent fill-gray-950 animate-spin" />
         ) : (
            <>
               <TrashIcon className="h-4 w-4" />
               <span className="sr-only">delete</span>
            </>
         )}
      </Button>
   );
};

const TodoDescription = ({ children, completed, todoId }: Props) => {
   const [isEditing, setIsEditing] = useState(false);

   const deleteTodoAction = deleteTodo.bind(null, todoId);
   const editTodoAction = editTodo.bind(null, todoId);

   return (
      <div className="flex items-center gap-4 py-2">
         {!isEditing ? (
            <p className="flex-1 text-sm text-balance">{children}</p>
         ) : (
            <form
               onSubmit={() => setIsEditing(false)}
               className="flex-1 flex"
               action={editTodoAction}
            >
               <Input
                  className="focus-visible:ring-0"
                  name="todo"
                  required
                  autoFocus
               />
               <Button className="flex-shrink-0" size="icon">
                  <CheckIcon className="w-4 h-4" />
               </Button>
            </form>
         )}

         <Button
            className="flex-shrink-0"
            onClick={() => setIsEditing(!isEditing)}
            size="icon"
         >
            <PencilIcon className="w-4 h-4" />
            <span className="sr-only">edit</span>
         </Button>
         <form action={deleteTodoAction}>
            <Delete />
         </form>
      </div>
   );
};

export default TodoDescription;
