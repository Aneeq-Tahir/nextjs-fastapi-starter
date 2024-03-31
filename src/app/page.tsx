import Todo from "@/components/todo";

export default function Home() {
   // const res = await fetch(`${API_ENDPOINT}/api/python`, { cache: "no-store" });
   // const data = await res.json();

   return (
      <main className="flex justify-center items-center min-h-screen">
         {/* @ts-expect-error Server Component */}
         <Todo />
      </main>
   );
}
