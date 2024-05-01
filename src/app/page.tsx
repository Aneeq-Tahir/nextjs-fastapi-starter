import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";

import type { Todo } from "@/lib/types";
import { API_ENDPOINT } from "@/lib/utils";

import { TodoDescription, TodoInput } from "@/components/todo";
import { cookies } from "next/headers";

export default async function Home() {
   const token = cookies().get("token")?.value!;

   const res = await fetch(`${API_ENDPOINT}/api/todo`, {
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });

   const { todos }: { todos: Todo[] } = await res.json();

   return (
      <Card className="max-w-[400px] w-full">
         <CardHeader className="flex flex-col gap-1">
            <CardTitle className="text-2xl font-bold">Tasks</CardTitle>
            <CardDescription>What do you need to do today?</CardDescription>
         </CardHeader>
         <CardContent>
            <TodoInput />
         </CardContent>
         <CardContent className="border-t dark:border-gray-800 py-4 overflow-auto">
            <div className="max-h-40">
               {todos ? (
                  todos.map((todo) => (
                     <TodoDescription
                        key={todo.id}
                        todoId={todo.id!}
                        completed={todo.completed}
                     >
                        {todo.description}
                     </TodoDescription>
                  ))
               ) : (
                  <h1 className="text-md font-bold text-center">
                     You Got No Tasks
                  </h1>
               )}
            </div>
         </CardContent>
      </Card>
   );
}
