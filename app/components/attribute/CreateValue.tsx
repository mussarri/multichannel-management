/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addValueToAttribute } from "@/app/action";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";

export default function CreateAttribute({
  attribute,
  category,
  open,
  setOpen,
}) {
  const [state, formAction, isPending] = useActionState(
    addValueToAttribute,
    null
  );

  useEffect(() => {
    if (state?.error) {
      toast.error("Secenek kategoriye eklenirken bir hata oluştu.");
      setOpen(false);
    }
    if (state?.success) {
      toast.success("Secenek kategoriye başarıyla eklendi.");
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild style={{ height: 14 }}>
        <button className="flex gap-1 text-xs items-center cursor-pointer  hover:scale-105 transition-all duration-300">
          <div>
            <PlusCircleIcon size={13} />
          </div>
          <span className=" font-[500] text-[12px]">Yeni Deger</span>
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{attribute.name}`e Yeni Deger Ekle</DialogTitle>
        </DialogHeader>

        {state?.error && <div>{state?.meessage}</div>}

        <form action={formAction} className="space-y-4 mt-2">
          <Input placeholder="Secenek adı" name="attributeName" required />
          <input type="hidden" name="attributeId" value={attribute.id} />

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              Kaydet
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
