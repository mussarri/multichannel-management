/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { saveAttributeMappingAction } from "@/app/actions/marketplaceactions";
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
import { useParams } from "next/navigation";

const AttributeValueMap = ({ open, setOpen, attribute, marketplaces }) => {
  const [state, formAction, isPending] = useActionState(
    saveAttributeMappingAction,
    null
  );

  const { id } = useParams();

  const [marketData, setMarketData] = useState([]);

  const [form, setForm] = useState(
    marketplaces.map((market) => {
      return {
        marketplaceId: market.marketplaceId,
        remoteAttributeId: "1",
        remoteAttributeName: "",
        remoteCategoryId: "1",
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

  const initialValues = {
    localCategoryId: id,
    localAttributeId: attribute.id,
    mappings: marketplaces.map((m) => ({
      name: m.marketPlace.name,
      marketplaceId: m.id,
      remoteAttributeId: "",
      remoteAttributeName: "",
      remoteCategoryId: "",
    })),
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          style={{
            fontSize: 10,
            padding: "0px 5px!important",
            height: "1.4rem",
          }}
          type="button"
          variant="secondary"
          size="sm"
        >
          Düzenle
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle
            style={{
              textTransform: "capitalize",
            }}
          >
            {attribute.name + " Secenegi Eslestirme"}
          </DialogTitle>
        </DialogHeader>

        {state?.error && <div>{state?.meessage}</div>}

        <form action={formAction} method="post">
          <input type="hidden" name="localAttributeId" value={attribute.id} />
          <input type="hidden" name="localCategoryId" value={id} />
          <table className="w-full">
            <thead>
              <tr className="text-sm capitalize">
                <th className="py-2  text-left">
                  {process.env.NEXT_PUBLIC_BRAND_NAME + " Adı"}
                </th>
                <th>{attribute.name}</th>
              </tr>
            </thead>
            <tbody>
              {marketplaces.map((mapping, index) => {
                return (
                  <tr key={mapping.id}>
                    <td className="">
                      <div className="text-xs">
                        {mapping.marketPlace.name + " Deger adı:"}
                      </div>
                    </td>
                    <input
                      type="hidden"
                      name={`mappings[${index}][marketplaceId]`}
                      value={mapping.marketPlace.id}
                    />
                    <input
                      type="hidden"
                      name={`mappings[${index}][remoteAttributeId]`}
                      value={"1"}
                    />
                    <input
                      type="hidden"
                      name={`mappings[${index}][remoteCategoryId]`}
                      value={"1"}
                    />
                    <>
                      <td className="">
                        <SelectInput
                          options={["attribute1", "attribute2", "attribute3"]}
                          onChange={(e) =>
                            setForm((prev) => {
                              return prev.map((item, index) => {
                                if (index === index) {
                                  return {
                                    ...item,
                                    remoteAttributeName: e,
                                  };
                                }
                                return item;
                              });
                            })
                          }
                          name={`mappings[${index}][remoteAttributeName]`}
                          label={""}
                          minWidth={false}
                        />
                      </td>
                    </>
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
