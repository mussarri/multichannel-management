/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createAttributeAction } from "@/app/action";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";
import {
  Autocomplete,
  Box,
  Chip,
  createFilterOptions,
  TextField,
  Typography,
} from "@mui/material";
import { IoIosAdd } from "react-icons/io";

export function CreateAttribute({ attributes, category, open, setOpen }) {
  const [state, formAction, isPending] = useActionState(
    createAttributeAction,
    null
  );

  const [form, setForm] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      toast.error("Secenek kategoriye eklenirken bir hata oluştu.");
      setOpen(false);
    }
    if (state?.success) {
      toast.success("Secenek kategoriye başarıyla eklendi.");
      router.refresh();
      setOpen(false);
    }
  }, [state]);

  const { id } = useParams();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild style={{ height: 34 }}>
        <button className="flex gap-1 text-xs items-center cursor-pointer hover:scale-105 transition-all duration-300">
          <div>
            <PlusCircleIcon size={13} />
          </div>
          <span className=" font-[500] text-[12px]">Yeni Secenek</span>
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category.name}`e Yeni Secenek Ekle</DialogTitle>
        </DialogHeader>

        {state?.error && <div>{state?.meessage}</div>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            // formdata gets modified by the formdata event
            formData.set("attributeName", formData.get("attributeName"));
            formData.set("categoryId", formData.get("categoryId"));
            formData.append("values", JSON.stringify(form));

            formAction(formData);
          }}
          className="space-y-4 mt-2"
        >
          <Input placeholder="Secenek adı" name="attributeName" required />
          <input type="hidden" name="categoryId" value={category.id} />
          <Autocomplete
            id="values"
            multiple
            fullWidth
            autoHighlight
            freeSolo
            disableCloseOnSelect
            options={[]}
            value={form}
            getOptionLabel={(option) => option.label}
            onKeyDown={function (e) {
              if (e.code == "Backspace") {
                setForm((prev) => prev.slice(0, -1));
              }
              if (e.code == "Enter") {
                return;
              }
            }}
            onChange={(item) => {
              if ((item.target as HTMLInputElement)?.value === "") return;

              setForm((prev) => [
                ...prev,
                (item.target as HTMLInputElement)?.value,
              ]);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="secenek degerleri"
                sx={{
                  outline: "none",
                  fontSize: 12,
                }}
                //   error={formik.touched.skills && Boolean(formik.errors.skills)}
                //   helperText={TagsError}
              />
            )}
            renderValue={(values, getItemProps) =>
              values.map((option, index) => {
                //   let error = false;
                //   if (formik.touched.skills && formik.errors.skills && typeof formik.errors.skills !== 'string') {
                //     if (typeof formik.errors.skills[index] === 'object') error = true;
                //   }

                return (
                  <Chip
                    {...getItemProps({ index })}
                    key={index}
                    color={false ? "error" : "primary"}
                    label={<Typography variant="caption">{option}</Typography>}
                    deleteIcon={
                      <IoIosAdd
                        style={{
                          fontSize: "0.875rem",
                          transform: "rotate(45deg)",
                        }}
                      />
                    }
                    onDelete={() => {
                      setForm((prev) => prev.filter((_, i) => i !== index));
                    }}
                    size="small"
                  />
                );
              })
            }
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              Kaydet
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
