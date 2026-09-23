import React from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {

	const isLogged = localStorage.getItem("token") ? true : false;

	if (isLogged) {
		return children;
	}
	
	return <Navigate to="/" />
}