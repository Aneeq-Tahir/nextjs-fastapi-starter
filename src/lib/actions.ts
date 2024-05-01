"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_ENDPOINT, parseCookie } from "./utils";

export async function addTodo(formdata: FormData) {
   const todo = formdata.get("todo");
   const token = cookies().get("token")?.value!;

   try {
      const res = await fetch(`${API_ENDPOINT}/api/todo`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({ description: todo }),
      });

      const data = await res.json();

      revalidatePath("/", "page");
      return data;
   } catch (e) {
      throw new Error(e as string);
   }
}

export async function editTodo(todoId: number, formdata: FormData) {
   const todo = formdata.get("todo");
   const token = cookies().get("token")?.value!;

   try {
      const res = await fetch(`${API_ENDPOINT}/api/todo/${todoId}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({ description: todo }),
      });

      const data = await res.json();

      revalidatePath("/", "page");
      return data;
   } catch (e) {
      throw new Error(e as string);
   }
}

export const deleteTodo = async (todoId: number) => {
   const token = cookies().get("token")?.value!;

   try {
      const res = await fetch(`${API_ENDPOINT}/api/todo/${todoId}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });
      const data = await res.json();

      revalidatePath("/", "page");
      return data;
   } catch (e) {
      throw new Error(e as string);
   }
};

export async function signup(prevState: any, formdata: FormData) {
   const email = formdata.get("email");
   const password = formdata.get("password");

   const res = await fetch(`${API_ENDPOINT}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, hashed_password: password }),
   });

   let resMsg: any = await res.text();
   resMsg = JSON.parse(resMsg);

   if (!res.ok) {
      if (res.status === 400 && resMsg.detail === "email already exists") {
         return { message: "Email Already Exists" };
      } else {
         return { message: "Something went wrong, try again" };
      }
   } else {
      const tokenCookie = parseCookie(res.headers.get("Set-Cookie")!);

      cookies().set({
         name: "token",
         value: tokenCookie.token,
         expires: new Date(tokenCookie.expires),
         httpOnly: true,
         secure: true,
         path: tokenCookie.path!,
      });

      redirect("/");
   }
}

export async function login(prevState: any, formdata: FormData) {
   const email = formdata.get("email")!;
   const password = formdata.get("password")!;

   const res = await fetch(`${API_ENDPOINT}/api/auth/token`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
         username: email as string,
         password: password as string,
      }),
   });

   let resMsg: any = await res.text();
   resMsg = JSON.parse(resMsg);

   if (!res.ok) {
      if (res.status === 404 || res.status === 401) {
         return { message: resMsg.detail };
      } else {
         return { message: "Something went wrong, try again" };
      }
   } else {
      const tokenCookie = parseCookie(res.headers.get("Set-Cookie")!);

      cookies().set({
         name: "token",
         value: tokenCookie.token,
         expires: new Date(tokenCookie.expires),
         httpOnly: true,
         secure: true,
         path: tokenCookie.path!,
      });

      revalidatePath("/");
      redirect("/");
   }
}
