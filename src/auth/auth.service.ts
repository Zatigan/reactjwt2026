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
   // En version décomposée
   // const splittedToken = token.split(".")[1];
   // const decodedPayload = atob(splittedToken);
   // const parsePayload = JSON.parse(decodedPayload);
   // const userRole = parsePayload.scope.split(" ");
   // return userRole[0];

   // En version synthétique
   const userRole = JSON.parse(atob(token.split('.')[1]).toString()).scope.split(" ");
   return userRole[0];
}

export function hasRole(role: string) {
   const userRole = role.split('_')[1];
   return userRole;
}