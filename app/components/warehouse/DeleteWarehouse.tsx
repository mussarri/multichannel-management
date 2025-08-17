"use client";
import { deleteWarehouse } from "@/app/actions/stockactions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

const AddProdutToWarehouse = ({ warehouse }) => {
  const [state, formAction, isPending] = useActionState(deleteWarehouse, null);
  const [open, setOpen] = useState(false);
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
      <DialogTrigger asChild>
        <button>
          <Trash2
            size={16}
            className="hover:scale-110 duration-200 hover:cursor-pointer"
            color="var(--error)"
          />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{warehouse.name}`u Silmek İstiyor musunuz?</DialogTitle>
        </DialogHeader>

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
          <input type="hidden" name="warehouseId" value={warehouse.id} />

          <div className="flex justify-end">
            <Button
              type="button"
              className="ml-2 bg-secondary text-secondary-foreground"
              disabled={isPending}
            >
              Vazgeç
            </Button>
            <Button
              color="var(--error)"
              type="submit"
              className="ml-2 bg-error"
              disabled={isPending}
            >
              Evet
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProdutToWarehouse;
