import { userApi } from "@/api/userApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type User = {
  id: number;
  email: string;
  name: string;
  gender?: "male" | "female";
  birthday?: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  async function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    var value = e.target.value;
    setSearch(value);
    if (!value) {
      const usersRequest = await userApi.getAll();
      setUsers(usersRequest.data);
      return;
    }
    const req = await userApi.getBySearch(value);
    setUsers(req.data);
  }

  useEffect(() => {
    async function getUsers() {
      try {
        const usersRequest = await userApi.getAll();
        setUsers(usersRequest.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  return (
    <div className="flex justify-center mt-[2%]">
      <div className="flex flex-col justify-center w-[75%] gap-5">
        <p className="text-2xl font-medium">Liste des utilisateurs</p>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2" />
          <Input
            className="ps-10 w-60"
            type="text"
            placeholder="Rakoto"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onSearchChange(e);
            }}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Nom d'utilisateur</TableHead>
              <TableHead>Sexe</TableHead>
              <TableHead>Date naissance</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((el) => (
              <TableRow>
                <TableCell className="font-medium">{el.id}</TableCell>
                <TableCell>{el.name}</TableCell>
                <TableCell>
                  {el.gender == "male" ? "masculin" : "feminin"}
                </TableCell>
                <TableCell>{el.birthday}</TableCell>
                <TableCell>{el.email}</TableCell>
                <TableCell className="flex gap-2 items-center">
                  <ViewModal
                    user={el}
                    users={users}
                    setUsers={setUsers}
                    setIsOpen={setIsOpen}
                  />
                  <DeleteModal
                    user={el}
                    users={users}
                    setUsers={setUsers}
                    setIsOpen={setIsOpen}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

type ModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  users: User[];
  user: User;
};

function DeleteModal({ user, setUsers, users, setIsOpen }: ModalProps) {
  async function deleteUser() {
    try {
      await userApi.delete(user.id);
      var newUsers: User[] = users.filter((el) => el.id !== user.id && el);
      setUsers(newUsers);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FaRegTrashAlt className="size-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={async (e: FormEvent) => {
            e.preventDefault();
            await deleteUser();
          }}
        >
          <DialogHeader>
            <DialogTitle>Supprimer User</DialogTitle>
            <DialogDescription>
              Etes vous sûr de vouloir supprimer cet utilisateur {user.id}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Annuler
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-700 cursor-pointer"
            >
              Supprimer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ViewModal({ user, setUsers, setIsOpen, users }: ModalProps) {
  // async function updateUser() {
  //   const userId = id;
  //   var userData = {
  //     name,
  //     email,
  //   };
  //   console.log(userData);
  //   try {
  //     await userApi.update(userId, userData);
  //     var newUsers: User[] = users.map((el) =>
  //       el.id == userId
  //         ? {
  //             id: userId,
  //             name: userData.name,
  //             email: userData.email,
  //             birthday: user.birthday,
  //             gender: user.gender,
  //           }
  //         : el,
  //     );
  //     setUsers(newUsers);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MdOutlineRemoveRedEye className="size-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm ">
        <form>
          <DialogHeader>
            <DialogTitle>Informations de l'utilisateur</DialogTitle>
            <DialogDescription>
              Visualisez les données utilisateurs
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-5">
            <div className="flex flex-col gap-2">
              <p>Name</p>
              <Input className="" value={user.name} readOnly />
            </div>
            <div className="flex flex-col gap-2">
              <p>Sexe</p>
              <Input
                className=""
                value={user.gender == "male" ? "masculin" : "feminin"}
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <p>Date naissance</p>
              <Input className="" value={user.birthday} readOnly />
            </div>
            <div className="flex flex-col gap-2">
              <p>Email</p>
              <Input className="" value={user.email} readOnly />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Retour
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type AddModalProps = {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  users: User[];
};
