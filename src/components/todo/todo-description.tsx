"use client";
import { API_ENDPOINT } from "@/lib/utils";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type Props = {
   todoId: number;
   children: React.ReactNode;
   completed: boolean;
};

const TodoDescription = ({ children, completed, todoId }: Props) => {
   // const [checked, setChecked] = useState(completed);

   const updateTodo = (isChecked: boolean) => {
      fetch(`${API_ENDPOINT}/api/todo/${todoId}`, {
         method: "PUT",
         headers: {
            Authorization:
               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbmVlcUBlbWFpbC5jb20iLCJpZCI6MywiZXhwIjoxNzExNzExMjUyfQ.VFFyweZIhQAk7XGJzpnM1G2rFDlsaNFfeb37hEbkyMs",
         },
         body: JSON.stringify({ completed: !isChecked }),
      });
   };

   const deleteTodo = () => {
      fetch(`${API_ENDPOINT}/api/todo/${todoId}`, {
         method: "DELETE",
         headers: {
            Authorization:
               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbmVlcUBlbWFpbC5jb20iLCJpZCI6MywiZXhwIjoxNzExNzExMjUyfQ.VFFyweZIhQAk7XGJzpnM1G2rFDlsaNFfeb37hEbkyMs",
         },
      });
   };

   return (
      <div className="flex items-center gap-4 py-2">
         <Checkbox
            defaultChecked={completed ? true : false}
            className="h-4 w-4"
            onChange={() => updateTodo(!completed)}
            id={todoId.toString()}
         />
         <Label className="flex-1" htmlFor={todoId.toString()}>
            {children}
         </Label>
         <Button onClick={deleteTodo} className="ml-auto" size="icon">
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
         </Button>
      </div>
   );
};

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

export default TodoDescription;
