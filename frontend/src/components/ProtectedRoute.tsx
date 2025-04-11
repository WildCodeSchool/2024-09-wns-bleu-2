import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useGetUserInfoQuery } from "../generated/graphql-types";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: userData, loading } = useGetUserInfoQuery();
  const userId = userData?.getUserInfo?.id;

  loading && <p>Loading...</p>;
  if (!userId) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
