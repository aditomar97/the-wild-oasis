import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import styled from "styled-components";

const FullPage = styled.div`
  height: "100vh";
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProtectedRoute = ({ children }) => {
  const { isLoading, data, isAuthenticated } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);
  if (isLoading)
    return (
      <FullPage>
        <Spinner></Spinner>
      </FullPage>
    );

  if (isAuthenticated) {
    return children;
  }
};

export default ProtectedRoute;
