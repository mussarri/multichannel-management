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
import { createBrand } from "@/app/action";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

export function MarkaForm() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createBrand, null);

  useEffect(() => {
    if (state?.error) {
      toast.error("Marke eklenirken bir hata oluştu.");
      setOpen(false);
    }
    if (state?.success) {
      toast.success("Marka başarıyla eklendi.");
      setOpen(false);
    }
  }, [state]);

  const { id } = useParams();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild style={{ height: 34 }}>
        <button className="min-w-max mx-2 rounded-md text-primary-foreground border px-3 p-0 text-xs bg-primary">
          Marka Ekle
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni Marka Ekle</DialogTitle>
        </DialogHeader>

        {state?.error && <div>{state?.meessage}</div>}

        <form action={formAction} className="space-y-4 mt-2">
          <Input placeholder="Marka adı" name="name" required />
          <input type="hidden" name="id" value={id} />

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
