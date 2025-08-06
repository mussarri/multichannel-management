"use client";
import { categoryMap } from "@/app/actions/marketplaceactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SelectInput from "@/app/components/settings/select-input";

const CategoryAdd = ({ open, setOpen, categories }) => {
  const [state, formAction, isPending] = useActionState(categoryMap, null);
  const [parent, setParent] = useState("");
  useEffect(() => {
    if (state?.error) {
      toast.error("Kategori eklenirken bir hata oluştu.");
      setOpen(false);
    }
    if (state?.success) {
      toast.success("Kategori başarıyla eklendi.");
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild style={{ height: 34 }}>
        <button className="min-w-max mx-2 rounded-md text-primary-foreground border px-3 p-0 text-xs bg-primary">
          Kategori Ekle
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kategori Ekle</DialogTitle>
        </DialogHeader>

        {state?.error && <div>{state?.meessage}</div>}

        <form action={formAction} className="space-y-4 mt-2">
          <div>
            <SelectInput
              options={["Yok", ...categories]}
              name={"parent"}
              label={"Üst Kategori"}
              required
              onChange={(v) => setParent(v)}
              value={parent}
              error={false}
            />
          </div>
          <div>
            <label htmlFor="name">{" Kategori adı:"}</label>
            <Input
              id="name"
              type="text"
              placeholder="Kategori adı"
              name="name"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              Kaydet
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryAdd;
