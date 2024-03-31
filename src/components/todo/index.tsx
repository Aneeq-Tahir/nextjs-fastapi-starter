import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { type Todo } from "@/lib/types";
import { API_ENDPOINT } from "@/lib/utils";
import TodoDescription from "./todo-description";
import TodoInput from "./todo-input";

export default async function TodoCard() {
   const res = await fetch(`${API_ENDPOINT}/api/todo`, {
      headers: {
         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbmVlcUBlbWFpbC5jb20iLCJpZCI6MywiZXhwIjoxNzExNzExMjUyfQ.VFFyweZIhQAk7XGJzpnM1G2rFDlsaNFfeb37hEbkyMs`,
      },
   });
   const { todos }: { todos: Todo[] } = await res.json();
   console.log(todos);
   return (
      <Card className="w-[400px]">
         <CardHeader className="flex flex-col gap-1">
            <CardTitle className="text-2xl font-bold">Tasks</CardTitle>
            <CardDescription>What do you need to do today?</CardDescription>
         </CardHeader>
         <CardContent>
            <TodoInput />
         </CardContent>
         <CardContent className="border-t dark:border-gray-800 pt-4">
            {todos.map((todo) => (
               <TodoDescription todoId={todo.id} completed={todo.completed}>
                  {todo.description}
               </TodoDescription>
            ))}
         </CardContent>
      </Card>
   );
}
