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
import { FaRegEdit } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CiCirclePlus } from "react-icons/ci";

type User = {
  id: number;
  email: string;
  name: string;
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
    const req = await userApi.getById(parseInt(value));
    setUsers([req.data]);
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
    <div className="flex justify-center">
      <div className="flex flex-col justify-center w-[75%]">
        <p className="text-2xl font-medium">List of all users</p>
        <AddModal setUsers={setUsers} users={users} />
        <Input
          type="text"
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onSearchChange(e);
          }}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Id</TableHead>
              <TableHead className="w-1/3">Name</TableHead>
              <TableHead className="w-1/3">Email</TableHead>
              <TableHead className="w-1/3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((el) => (
              <TableRow>
                <TableCell className="font-medium">{el.id}</TableCell>
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.email}</TableCell>
                <TableCell className="flex gap-2 justify-center items-center">
                  <EditModal
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
          <DialogFooter>
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

function EditModal({ user, setUsers, setIsOpen, users }: ModalProps) {
  const [id, setId] = useState<number>(user.id);
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function updateUser() {
    const userId = id;
    var userData = {
      name,
      email,
    };
    console.log(userData);
    try {
      await userApi.update(userId, userData);
      var newUsers: User[] = users.map((el) =>
        el.id == userId
          ? { id: userId, name: userData.name, email: userData.email }
          : el,
      );
      setUsers(newUsers);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FaRegEdit className="size-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={async (e: FormEvent) => {
            e.preventDefault();
            await updateUser();
          }}
        >
          <DialogHeader>
            <DialogTitle>Modification user</DialogTitle>
            <DialogDescription>
              Apportez vos modifications et cliquez sur Enregistrer.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p>Name</p>
              <Input
                className=""
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleNameChange(e);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p>Email</p>
              <Input
                className=""
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleEmailChange(e);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Annuler
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer bg-blue-500 hover:bg-blue-700"
            >
              Confirmer
            </Button>
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

function AddModal({ users, setUsers }: AddModalProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function addUser() {
    var userData = {
      name,
      email,
    };
    console.log(userData);
    try {
      const request = await userApi.add(userData);

      setUsers([
        ...users,
        {
          id: parseInt(request.data.id),
          email: userData.email,
          name: userData.name,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border rounded-lg p-2 flex gap-3 w-fit cursor-pointer">
          <CiCirclePlus className="size-5 cursor-pointer" />
          <p>New User</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Modification user</DialogTitle>
          <DialogDescription>
            Apportez vos modifications et cliquez sur Enregistrer.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async (e: FormEvent) => {
            e.preventDefault();
            await addUser();
          }}
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p>Name</p>
              <Input
                className=""
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleNameChange(e);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p>Email</p>
              <Input
                className=""
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleEmailChange(e);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Annuler
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer bg-blue-500 hover:bg-blue-700"
            >
              Confirmer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
