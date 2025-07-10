import { useAuth } from "@/contexts/AuthContext";
import { FullPageSkeletonLoader } from "./loader";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <FullPageSkeletonLoader />;
  }

  return <>{children}</>;
};

export default AuthGuard;
