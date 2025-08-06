/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { saveAttributeValueMappingAction } from "@/app/actions/marketplaceactions";
import { Button } from "@/components/ui/button";
import SelectInput from "@/app/components/settings/select-input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { MarketplaceAccount } from "@prisma/client";

const AttributeValueMap = ({ open, setOpen, attribute, marketplaces }) => {
  const [state, formAction, isPending] = useActionState(
    saveAttributeValueMappingAction,
    null
  );

  const [marketData, setMarketData] = useState([]);
  const [remoteValueName, setRemoteValueName] = useState("");

  const [form, setForm] = useState(
    marketplaces.map((market) => {
      return {
        marketplaceId: market.marketplaceId,
        localAttributeValueId: "",
        remoteValueId: "",
        remoteValueName: "",
      };
    })
  );

  useEffect(() => {
    if (state?.error) {
      toast.error(state?.message);
      setOpen(false);
    }
    if (state?.success) {
      toast.success(state?.message);
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
          <DialogTitle
            style={{
              textTransform: "capitalize",
            }}
          >
            {attribute.name + " Degerleri"}
          </DialogTitle>
        </DialogHeader>

        {state?.error && <div>{state?.meessage}</div>}

        <form action="">
          <table className="w-full">
            <thead>
              <tr className="text-sm capitalize">
                <th className="py-2  text-left">
                  {process.env.NEXT_PUBLIC_BRAND_NAME + " Adı"}
                </th>
                {attribute.values.map((item) => (
                  <th key={item.id}>{item.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {marketplaces.map((i) => {
                return (
                  <tr key={i.id}>
                    <td className="">
                      <div className="text-xs">
                        {i.marketPlace.name + " Deger adı:"}
                      </div>
                    </td>
                    {attribute.values.map((item) => (
                      <>
                        <td key={item.id} className="">
                          <SelectInput
                            options={[]}
                            onChange={() => {}}
                            name={"remoteValueName"}
                            value={form.remoteValueName}
                            label={""}
                            minWidth={false}
                          />
                        </td>
                      </>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="text-right">
            <Button className="mt-3 ml-auto" type="submit">
              Kaydet
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AttributeValueMap;
