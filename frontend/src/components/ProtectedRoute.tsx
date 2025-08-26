import { JSX, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../contexts/ModalContext";
import { useGetUserInfoQuery } from "../generated/graphql-types";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: userData, loading } = useGetUserInfoQuery();
  const { setIsLoginModalOpen, setRedirectAfterLogin } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = userData?.getUserInfo?.id;

  useEffect(() => {
    if (!loading && !userId) {
      setRedirectAfterLogin(location.pathname); // mémoriser
      setIsLoginModalOpen(true);

      if (location.pathname !== "/") {
        navigate("/", { replace: true });
      }
    }
  }, [
    loading,
    userId,
    location.pathname,
    navigate,
    setIsLoginModalOpen,
    setRedirectAfterLogin,
  ]);

  if (loading) return <p>Chargement...</p>;
  if (!userId) return null;
  return children;
};

export default ProtectedRoute;