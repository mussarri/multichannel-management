"use client";
import { createCategory } from "@/app/action";
import { Button } from "@/components/ui/button";
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
import { toast } from "react-toastify";
import SelectInput from "@/app/components/settings/select-input";

const AddProdutToWarehouse = ({ products, warehouseId }) => {
  const [state, formAction, isPending] = useActionState(createCategory, null);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    if (state?.error) {
      toast.error("Ürün eklenirken bir hata oluştu.");
      setOpen(false);
    }
    if (state?.success) {
      toast.success("Ürün başarıyla eklendi.");
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild style={{ height: 34 }}>
        <Button>Ürün Ekle</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ürün Ekle</DialogTitle>
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
          <input type="hidden" name="warehouseId" value={warehouseId} />
          <div>
            <SelectInput
              options={["Yok", ...products]}
              name={"product"}
              label={"Ürün"}
              required
              onChange={(v) => setProduct(v)}
              value={product}
              vertical={true}
            />
          </div>
          <div>
            <label htmlFor="">Miktar</label>
            <input
              type="number"
              placeholder={"miktar"}
              name={"miktar"}
              className={"border p-2 rounded-lg w-full outline-none text-sm "}
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
  );
};

export default AddProdutToWarehouse;
