import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";

export default function AuthCallBack() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tokenL = location?.state?.token;
    const token: string | null = searchParams.get("token");
    if (token || tokenL) {
      localStorage.setItem("token", token ?? tokenL);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate, location.state]);

  return (
    <div className="flex items-center h-screen ">
      <p className="text-center">En chargement ...</p>
    </div>
  );
}
