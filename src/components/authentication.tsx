"use client";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { login, signup } from "@/lib/actions";
import { Loader } from "@/svgs";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

function Submit({ loggingIn }: { loggingIn: boolean }) {
   const { pending } = useFormStatus();

   return (
      <Button
         disabled={pending}
         className="w-full disabled:cursor-not-allowed disabled:opacity-70"
         type="submit"
      >
         {pending ? (
            <Loader className="h-4 w-4 text-transparent fill-gray-950 animate-spin" />
         ) : loggingIn ? (
            "Login"
         ) : (
            "Sign up"
         )}
      </Button>
   );
}

export default function Authentication({ loggingIn }: { loggingIn: boolean }) {
   const [loginState, loginAction] = useFormState(login, { message: "" });
   const [signupState, signupAction] = useFormState(signup, { message: "" });

   return (
      <Card className="max-w-sm w-full">
         <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
               {loggingIn ? "Login" : "Sign up"}
            </CardTitle>
            <CardDescription>
               Enter your email & password to {loggingIn ? "login" : "sign up"}
            </CardDescription>
         </CardHeader>
         <CardContent>
            <form
               action={loggingIn ? loginAction : signupAction}
               className="space-y-4"
            >
               <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                     id="email"
                     placeholder="m@example.com"
                     required
                     name="email"
                     type="email"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                     name="password"
                     id="password"
                     required
                     type="password"
                  />
                  <Submit loggingIn={loggingIn} />
                  <p className="text-red-600 text-xs">
                     {loggingIn ? loginState?.message : signupState?.message}
                  </p>
               </div>
            </form>
            <div className="mt-4 text-center text-sm">
               {loggingIn ? (
                  <>
                     Don't have an account?{" "}
                     <Link className="underline" href="/signup">
                        Sign up
                     </Link>
                  </>
               ) : (
                  <>
                     Already have an account?{" "}
                     <Link className="underline" href="/login">
                        Login
                     </Link>
                  </>
               )}
            </div>
         </CardContent>
      </Card>
   );
}
