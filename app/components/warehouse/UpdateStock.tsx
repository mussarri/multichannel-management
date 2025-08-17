"use client";
import { updateStock } from "@/app/actions/stockactions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

const AddProdutToWarehouse = ({ product, warehouseId }) => {
  const [state, formAction, isPending] = useActionState(updateStock, null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (state?.error) {
      toast.error("Ürün stok guncellenirken bir hata oluştu.");
      setOpen(false);
    }
    if (state?.success) {
      toast.success("Ürün stok guncellendi.");
      setOpen(false);
    }
  }, [state]);
  const [stock, setStock] = useState(product.stock);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-xs text-secondary-foreground hover:text-primary">
          (Güncelle)
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name} Stok Güncelle</DialogTitle>
        </DialogHeader>

        {state?.error && <div>{state?.meessage}</div>}
        {warehouseId !== "0" && <p>Depo: {warehouseId} </p>}
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
          <input type="hidden" name="productId" value={product.id} />
          <div className="flex gap-2 items-end justify-between">
            <div>
              <input
                type="number"
                placeholder={"miktar"}
                name={"quantity"}
                className={"border p-2 rounded-lg w-full outline-none text-sm "}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 justify-center">
              <Button type="button" onClick={() => setStock(stock + 1)}>
                {" "}
                <ArrowUp />{" "}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  if (stock > 0) setStock(stock - 1);
                }}
              >
                {" "}
                <ArrowDown />{" "}
              </Button>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="ml-2" disabled={isPending}>
                Kaydet
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProdutToWarehouse;
