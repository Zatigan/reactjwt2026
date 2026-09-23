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

export function getRoles() : string[] {
   const token = localStorage.getItem("token");

   if (token) {
      const splitJWT = token.split(".");

      if (splitJWT.length !== 3) {
         return [];
      }

      // En version décomposée
      // const decodedPayload = atob(splitJWT[1]);
      // const parsePayload = JSON.parse(decodedPayload);
      // const userRole = parsePayload.scope.split(" ");
      // return userRole;

      // En version synthétique
      const userRole = JSON.parse(atob(splitJWT[1]))
         .scope
         .split(" ");

      return userRole;
   }

   return [];
}

export function hasRole(role: string) : boolean {
   const userScope = getRoles();
   const userRole = userScope[0];

   return userRole.includes(role);
}