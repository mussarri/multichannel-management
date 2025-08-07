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
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const CategoryMapFunc = ({ open, setOpen, category, marketplaces }) => {
  const [state, formAction, isPending] = useActionState(categoryMap, null);

  useEffect(() => {
    if (state?.error) {
      toast.error("Kategoriler eslestirilirken bir hata oluştu.");
      setOpen(false);
    }
    if (state?.success) {
      toast.success("Kategoriler başarıyla eslestirildi.");
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded border px-3 p-1 text-xs">Eşle</button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kategori Eslestir</DialogTitle>
        </DialogHeader>

        {state?.error && <div>{state?.meessage}</div>}

        <form action={formAction} className="space-y-4 mt-2">
          <div className="mt-4 flex gap-2 text-sm">
            <div className="font-semibold">Smarthub Kategori:</div>
            <div>{category.name}</div>
          </div>
          {marketplaces.map((marketPlace) => {
            const mapped = category.MarketplaceCategoryMapping.find(
              (map) => map.marketplaceId === marketPlace.marketPlace.id
            );

            return (
              <div key={marketPlace.marketPlace.id} className="mt-4">
                <div className="">
                  <label htmlFor="remoteCategoryName">
                    {marketPlace.marketPlace.name + " Kategori adı:"}
                  </label>
                  <Input
                    id="remoteCategoryName"
                    type="text"
                    placeholder="Kategori adı"
                    name="remoteCategoryName"
                    defaultValue={mapped?.remoteCategoryName}
                    required
                  />
                </div>
                <input
                  type="hidden"
                  name="localCategoryId"
                  value={category.id}
                />
                <input
                  type="hidden"
                  name="marketplaceId"
                  value={marketPlace.marketPlace.id}
                />
                <input type="hidden" name="externalCategoryId" value={"test"} />
              </div>
            );
          })}

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

export default CategoryMapFunc;
