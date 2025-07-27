/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect, useState } from "react";
import { Pencil, PlusIcon, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "usehooks-ts";
import Image from "next/image";
import { deleteProduct } from "@/app/action";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

export function ProductTable({ products }: { products: any[] }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const mobile = useMediaQuery("(max-width: 840px)");
  const filtered = products?.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );
  const [message, formAction, isPending] = useActionState(deleteProduct, null);

  useEffect(() => {
    if (message?.error) {
      toast.error(message?.message);
    }
    if (message?.success) {
      toast.success(message?.message);
    }
  }, [message?.error, message?.message, message?.success]);

  return (
    <div
      className="space-y-4 box w-full"
      style={{
        width: "100%",
      }}
    >
      <div className="flex items-center justify-between border-b p-4 gap-3">
        <Input
          placeholder="Ürün adıyla ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <Link href="/dashboard/products/new" className="">
          <Button variant={"secondary"}>
            {mobile ? <PlusIcon size={16} /> : "Yeni Ürün Oluştur"}
          </Button>
        </Link>
      </div>
      <div className="p-4">
        <div className="overflow-x-auto  border rounded-lg">
          <table className="min-w-full shadow-sm text-sm product">
            <thead className="bg-inherit">
              <tr className="">
                <th className="text-left p-2 border-b"></th>
                <th className="text-left p-2 border-b">Adı</th>
                <th className="text-left p-2 border-b">SKU</th>
                <th className="text-left p-2 border-b">Fiyat</th>
                <th className="text-left p-2 border-b">Stok</th>
                <th className="text-right p-2 border-b">Platform Durumu</th>
                <th className="text-right p-2 border-b">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filtered &&
                filtered.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-muted/40">
                    <td className="p-2">
                      <Link href={`/dashboard/products/${product.id}`}>
                        <div className="w-[50px] h-[50px] rounded-md relative overflow-hidden">
                          <Image
                            src={product.images[0]?.url}
                            alt=""
                            fill
                            objectFit="contain"
                          />
                        </div>
                      </Link>
                    </td>
                    <td className="p-2">
                      <Link href={`/dashboard/products/${product.id}`}>
                        {product.title}
                      </Link>
                    </td>
                    <td className="p-2">{product.stock_code}</td>
                    <td className="p-2">
                      {product?.price?.toLocaleString()} ₺
                    </td>
                    <td className="p-2">{product.stock}</td>
                    <td className="p-2">{}</td>
                    <td className="p-2 text-right space-x-2">
                      <div className="flex gap-2 justify-end">
                        {" "}
                        <Link href={`/dashboard/products/${product.id}`}>
                          <Pencil
                            size={16}
                            className="hover:scale-110 duration-200 hover:cursor-pointer"
                            color="var(--warning)"
                          />
                        </Link>
                        <Dialog open={open} onOpenChange={setOpen}>
                          <DialogTrigger asChild>
                            <button type="button">
                              <Trash2
                                size={16}
                                className="hover:scale-110 duration-200 hover:cursor-pointer"
                                color="var(--error)"
                              />
                            </button>
                          </DialogTrigger>

                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                {product.title + " silinsin mi?"}
                              </DialogTitle>
                            </DialogHeader>

                            <form
                              action={formAction}
                              className="flex justify-end items-center gap-2"
                            >
                              <input
                                type="text"
                                name="id"
                                value={product.id}
                                hidden
                              />
                              <button
                                className="rounded border px-3 p-1 text-sm"
                                type="button"
                                onClick={() => setOpen(false)}
                              >
                                Iptal
                              </button>
                              <button
                                className="rounded border px-3 p-1 text-sm bg-error text-white"
                                type="submit"
                                disabled={isPending}
                              >
                                Evet
                              </button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}

              {filtered && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-4 text-muted-foreground"
                  >
                    Aramanıza uygun ürün bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
