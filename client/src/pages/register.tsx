import { userApi } from "@/api/userApi";
import CInput from "@/components/custom/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Mail } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";

type userType = {
  email?: string;
  name?: string;
  picture?: string;
  birthday?: string;
  gender?: string;
  provider?: string;
  password?: string;
};

export default function Register() {
  const [userData, setUserData] = useState<userType>({
    email: "",
    name: "",
    picture: "",
    birthday: "",
    gender: "",
    provider: "",
    password: "",
  });

  const navigate = useNavigate();

  function onHandleChange(e: ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  }

  async function RegisterActions() {
    var formatedDated = userData.birthday?.split("-").reverse().join("/");
    var data = {
      email: userData.email,
      name: userData.name,
      picture: "",
      birthday: formatedDated,
      gender: userData.gender,
      provider: "",
      password: userData.password,
    };
    try {
      const req = await userApi.add1(data);
      const token = req.data.token;
      navigate(`/auth`, { state: { token } });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-[5%] w-full flex justify-center">
      <div className="xl:w-1/3 flex flex-col w-[50%] border rounded-2xl p-5 gap-5">
        <p className="text-xl text-center font-medium">
          Création de votre compte
        </p>
        <form
          className="flex flex-col gap-3"
          onSubmit={async (e: FormEvent) => {
            e.preventDefault();
            await RegisterActions();
          }}
        >
          <CInput
            placeholder="Nom"
            type="text"
            Icone={Mail}
            id="name"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onHandleChange(e);
            }}
          />
          <CInput
            placeholder="Email"
            type="email"
            Icone={Mail}
            id="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onHandleChange(e);
            }}
          />
          <div className="flex flex-col gap-3">
            <RadioGroup
              defaultValue="comfortable"
              className="w-fit flex gap-3"
              id="gender"
              required
              onValueChange={(e: string) => {
                setUserData({ ...userData, gender: e });
              }}
            >
              <p className="ms-2">Sexe</p>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="Male" id="r1" />
                <Label htmlFor="r1">Masculin</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="Female" id="r2" />
                <Label htmlFor="r2">Feminin</Label>
              </div>
            </RadioGroup>
          </div>

          <CInput
            placeholder="Date de naissance"
            type="date"
            Icone={Mail}
            id="birthday"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onHandleChange(e);
            }}
          />
          <CInput
            placeholder="Password"
            type="password"
            Icone={Mail}
            id="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onHandleChange(e);
            }}
          />
          <Button
            className="mt-3 py-5 cursor-pointer bg-[#065AD8]"
            type="submit"
          >
            Valider
          </Button>
        </form>
      </div>
    </div>
  );
}
