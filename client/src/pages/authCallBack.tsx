import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function AuthCallBack() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const token: string | null = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center h-screen ">
      <p className="text-center">En chargement ...</p>
    </div>
  );
}
