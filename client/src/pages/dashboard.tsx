import { axiosInstance } from "@/api/axiosConfig";
import { userApi } from "@/api/userApi";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

type User = {
  id: number;
  email: string;
  name: string;
  gender?: "male" | "female";
  birthday?: string;
};

export default function Dashboard() {
  const [id, setId] = useState<number>();
  const [userData, setUserData] = useState<User | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    var token = localStorage.getItem("token");
    async function getId() {
      try {
        var req = await axiosInstance.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setId(req.data.userId);
        var req = await userApi.getById(req.data.userId);
        setUserData({
          email: req.data.email,
          id: req.data.id,
          name: req.data.name,
          birthday: req.data.birthday,
          gender: req.data.gender,
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (token) {
      getId();
    } else {
      navigate("/login");
    }
  }, [userData]);

  useEffect(() => {});

  function logout() {
    localStorage.removeItem("token");
    setUserData(undefined);
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <p className="text-center text-3xl font-medium">Bienvenue</p>
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 border rounded-2xl p-5 w-[80%]">
          <p className="text-[#A6A6A8] font-medium text-xl text-center">
            Informations personnelles
          </p>
          <div className="my-3 h-0.5 bg-[#A6A6A8] w-full"></div>
          <div className="grid grid-cols-2 place-content-center gap-5 ">
            <div className="justify-self-center w-1/2">
              <p className="text-[#A6A6A8]">Nom</p>
              <p>{userData?.name.split(" ")[0]}</p>
            </div>
            <div className="justify-self-center w-1/2">
              <p className="text-[#A6A6A8]">Prenom</p>
              <p>{userData?.name.split(" ")[1]}</p>
            </div>
            <div className="justify-self-center w-1/2">
              <p className="text-[#A6A6A8]">Email</p>
              <p>{userData?.email}</p>
            </div>
            <div className="justify-self-center w-1/2">
              <p className="text-[#A6A6A8]">Sexe</p>
              <p>{userData?.gender}</p>
            </div>
            <div className="justify-self-center w-1/2">
              <p className="text-[#A6A6A8]">Date de naissance</p>
              <p>{userData?.birthday}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          className="cursor-pointer"
          onClick={() => {
            logout();
          }}
        >
          Se déconnecter
        </Button>
      </div>
    </div>
  );
}
