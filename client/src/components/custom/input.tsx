import type { LucideIcon } from "lucide-react";
import { Input } from "../ui/input";

type CInputProps = {
  Icone?: LucideIcon;
  type: React.HTMLInputTypeAttribute | undefined;
  placeholder: string;
};

export default function CInput({ Icone, type, placeholder }: CInputProps) {
  return (
    <div className="relative">
      {Icone && (
        <Icone
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />
      )}
      <div className="absolute l-0 -translate-y-1/2 t-1/2"></div>
      <Input type={type} placeholder={placeholder} className="ps-10" />
    </div>
  );
}
