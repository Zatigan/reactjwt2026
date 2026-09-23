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

export function getRoles(token: string) {
   const splitJWT = token.split(".");

   if(splitJWT.length !== 3) {
      return "";
   }

   // En version décomposée
   // const decodedPayload = atob(splitJWT[1]);
   // const parsePayload = JSON.parse(decodedPayload);
   // const userRole = parsePayload.scope.split(" ");
   // return userRole[0];

   // En version synthétique
   const userRole = JSON.parse(atob(splitJWT[1]))
   .scope
   .split(" ");

   return userRole[0];
}

export function hasRole(role: string) {
   const userRole = role.split('_')[1];
   return userRole;
}