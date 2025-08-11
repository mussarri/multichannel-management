"use client";
import { editCategory } from "@/app/action";
import { Button } from "@/components/ui/button";
import TextInput from "@/app/components/settings/text-input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";

import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";

const CategoryDelete = ({ category }) => {
  const [state, formAction, isPending] = useActionState(editCategory, null);
  const [open, setOpen] = useState("");

  useEffect(() => {
    if (state?.success) {
      toast.success(state?.message);
      setOpen(false);
    }
    if (state?.error) {
      toast.success(state?.message);
      setOpen(false);
    }
  }, [state]);

  return (
    <div className="text-right">
      {category && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild style={{ height: 34 }}>
            <button className="text-amber-500 border border-amber-300 hover:bg-amber-50  rounded px-3 p-1 text-sm flex gap-2 items-center hover-no">
              <Pencil size={15} /> Düzenle
            </button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{category.name + " Kategorisi"} Duzenle</DialogTitle>
            </DialogHeader>

            {state?.error && <div>{state?.meessage}</div>}

            <form
              onSubmit={(e) => {
                console.log("submit");
                e.preventDefault(); // parent submit engellenir
                e.stopPropagation();
                const target = e.currentTarget;
                const formData = new FormData(target);
                startTransition(() => {
                  formAction(formData);
                });
              }}
              className="space-y-4 mt-2"
            >
              <input type="hidden" name="id" value={category.id} />
              <div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Kategori adı"
                  name="name"
                  label="Kategori adı"
                  vertical={true}
                  required
                  onChange={() => {}}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="ml-2" disabled={isPending}>
                  Kaydet
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CategoryDelete;
