import { httpClient } from "../api/http-client";

export async function loginUser(username: string, password: string) {

   const response = await httpClient.post("/auth/login", {
         username,
         password,
      });

      return response.data;
}

export function userLogout() {
   localStorage.removeItem("token");
}