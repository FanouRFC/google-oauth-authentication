import { Mail } from "lucide-react";
import CInput from "../components/custom/input";
import { Button } from "../components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function Login() {
  function loginWithGoogle() {
    window.location.href = "http://localhost:3000/auth/google-redirect";
  }

  return (
    <div className="mt-[5%] flex justify-center items-center gap-3">
      <div className="flex flex-col gap-3 border border-black p-6 rounded-lg xl:w-1/3 ">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-3xl">Log in to your Account</p>
          <p className="text-black/50 font-medium">
            Welcome back! Select method to log in:
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 ">
          {/* login button with google */}
          <div
            className=" border rounded-lg p-2 cursor-pointer"
            onClick={() => {
              loginWithGoogle();
            }}
          >
            <div className="flex items-center justify-center gap-5">
              <FcGoogle className="size-7" />
              <p>Google</p>
            </div>
          </div>
          {/* login button with google */}
          <div className=" border rounded-lg p-2 cursor-pointer">
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
              or continue with email
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <CInput placeholder="Email" type="text" Icone={Mail} />
          <CInput placeholder="Password" type="password" Icone={Mail} />
          <p className="text-end me-5">Forgot password ?</p>

          <Button className="mt-3 py-5 cursor-pointer bg-[#065AD8]">
            Log in
          </Button>

          <p>
            Doesn't have an account ? <span>Create an account</span>
          </p>
        </div>
      </div>
    </div>
  );
}
