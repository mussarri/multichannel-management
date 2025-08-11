"use client";
import { deleteCategory } from "@/app/action";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { startTransition, useActionState, useState } from "react";

import { Trash } from "lucide-react";

const CategoryDelete = ({ category }) => {
  const [state, formAction, isPending] = useActionState(deleteCategory, null);
  const [open, setOpen] = useState("");

  return (
    <div className="text-right">
      {category && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild style={{ height: 34 }}>
            <button className="bg-error rounded px-3 p-1 text-white text-sm flex gap-2 items-center">
              <Trash size={15} /> Kategoriyi Sil
            </button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{category.name + " Kategorisi"} Sil</DialogTitle>
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
              <p>
                {category.name + " "} ve ilgili seçenekleri silmek istediğinize
                emin misiniz?
              </p>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="ml-2"
                  disabled={isPending}
                >
                  Vazgeç
                </Button>
                <Button
                  style={{
                    background: "var(--error)",
                  }}
                  type="submit"
                  className="ml-2"
                  disabled={isPending}
                >
                  Sil
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
