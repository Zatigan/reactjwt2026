import { Navigate } from "react-router";
import { getRoles, hasRole } from "../auth/auth.service";

interface RoleRouteProps {
 roles: string[];
 children: React.ReactNode;
}

export default function RoleRoute ( { roles : authorizedRoles, children }: RoleRouteProps) {

if(authorizedRoles.some((role) => hasRole(role))) {
 return children;
}

   return <Navigate to="/" />
}