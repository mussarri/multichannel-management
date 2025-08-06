/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CalculateDesi = ({
  open,
  setOpen,
  setDesi,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  setDesi;
}) => {
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<string>("");
  const onSubmit = () => {
    if (!data.en || !data.boy || !data.height) {
      setError("Lütfen tüm alanları doldurun.");
    }
    const en = parseFloat(data.en);
    const boy = parseFloat(data.boy);
    const height = parseFloat(data.height);
    setDesi((en * boy * height) / 3000);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="mx-2 rounded-md text-primary p-0 text-[10px]">
          Desi Hesapla
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Desi Hesapla</DialogTitle>
        </DialogHeader>

        <form id="desi" className="space-y-4 mt-2">
          <div>
            <label htmlFor="en">{" En:"}</label>
            <Input
              id="en"
              type="text"
              placeholder="cm"
              name="en"
              required
              value={data.en}
              onChange={(e) => {
                setData({ ...data, en: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="boy">{" Boy:"}</label>
            <Input
              id="boy"
              type="text"
              placeholder="cm"
              name="boy"
              value={data.boy}
              onChange={(e) => {
                setData({ ...data, boy: e.target.value });
              }}
              required
            />
          </div>
          <div>
            <label htmlFor="height">{" Yükseklik:"}</label>
            <Input
              id="height"
              type="text"
              placeholder="cm"
              value={data.height}
              onChange={(e) => {
                setData({ ...data, height: e.target.value });
              }}
              name="height"
              required
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  onSubmit();
                }
              }}
            />
          </div>
          {error && <div className="text-xs py-3 text-error">{error}</div>}
          <div className="flex justify-end">
            <Button type="button" onClick={onSubmit} form="desi">
              Hesapla
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CalculateDesi;
