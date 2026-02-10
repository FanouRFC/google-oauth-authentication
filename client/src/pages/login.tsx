import { Lock, Mail } from "lucide-react";
import CInput from "../components/custom/input";
import { Button } from "../components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { axiosInstance } from "@/api/axiosConfig";

export default function Login() {
  const [userData, setUserData] = useState<{ email: string; password: string }>(
    { email: "", password: "" },
  );

  const [error, setError] = useState<string>();

  const navigate = useNavigate();

  function onHandleChange(e: ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  }

  async function login() {
    try {
      const req = await axiosInstance.post("auth/login", userData);
      if (req.data) {
        navigate("/auth", { state: { token: req.data } });
      } else {
        setError("Informations incorrects");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function loginWithGoogle() {
    window.location.href = "http://localhost:3000/auth/google-redirect";
  }

  function loginWithFacebook() {
    window.location.href = "http://localhost:3000/auth/facebook-redirect";
  }

  return (
    <div className="mt-[5%] flex justify-center items-center gap-3">
      <div className="flex flex-col gap-3 border border-black p-6 rounded-lg xl:w-1/3 ">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-3xl">Connexion à votre compte</p>

          <p className="text-black/50 font-medium">
            Sélectionnez une méthode pour vous connecter :
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 ">
          {/* login button with google */}
          <div
            className=" border rounded-lg p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              loginWithGoogle();
            }}
          >
            <div className="flex items-center justify-center gap-5 ">
              <FcGoogle className="size-7" />
              <p>Google</p>
            </div>
          </div>
          {/* login button with google */}
          <div
            className=" border rounded-lg p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              loginWithFacebook();
            }}
          >
            <div className="flex items-center justify-center gap-5">
              <FaFacebook className="text-[#4267B2] size-7" />
              <p>Facebook</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 -translate-y-1/2 h-0.5 w-full bg-gray-300 z-0"></div>
          <div className="relative flex justify-center z-10">
            <p className=" text-center text-gray-700 bg-white w-fit px-3 py-1">
              ou continuez avec votre adresse e-mail
            </p>
          </div>
        </div>

        <form
          className="flex flex-col gap-3"
          onSubmit={async (e: FormEvent) => {
            e.preventDefault();
            await login();
          }}
        >
          {error && (
            <div className="bg-red-200 border rounded-md p-2 text-center">
              <p>{error}</p>
            </div>
          )}
          <CInput
            placeholder="Email"
            type="text"
            Icone={Mail}
            id="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onHandleChange(e);
            }}
          />
          <CInput
            placeholder="Mot de passe"
            type="password"
            Icone={Lock}
            id="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onHandleChange(e);
            }}
          />

          <Button
            type="submit"
            className="mt-3 py-5 cursor-pointer bg-[#065AD8] hover:bg-[#0e3877]"
          >
            Se connecter
          </Button>
          <Button
            type="button"
            className="mt-3 py-5 cursor-pointer border border-[#065AD8] bg-white text-black hover:bg-[#065AD8] hover:text-white"
            onClick={() => {
              navigate("/admin");
            }}
          >
            Se connecter en tant qu'admin (démo)
          </Button>

          <p>
            Vous n’avez pas de compte ?{" "}
            <span
              className="font-medium text-blue-500 cursor-pointer"
              onClick={() => {
                navigate("/register");
              }}
            >
              Créer un compte ?
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
