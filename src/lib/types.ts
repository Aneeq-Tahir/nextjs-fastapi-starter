export type Todo = {
   id?: number;
   description: string;
   user_mail?: string;
   completed: boolean;
};

export type PythonFetch = {
   method?: string;
   token: string;
   body?: { [x: string]: any };
   cache?: RequestCache;
};
