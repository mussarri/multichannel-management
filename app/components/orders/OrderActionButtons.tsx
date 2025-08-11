// components/orders/OrderActions.tsx
"use client";

import { Menu, MenuItem, IconButton } from "@mui/material";
import { MoreVerticalIcon } from "lucide-react";
import { useState } from "react";

export default function OrderActions({ order }: { order }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = async (action: string) => {
    handleClose();

    // Backend'e istek at
    await fetch(`/api/orders/${order.id}/${action}`, {
      method: "POST",
    });
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVerticalIcon size={17} />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        {" "}
        <MenuItem onClick={() => handleAction("invoice")}>
          Faturalandır
        </MenuItem>
        <MenuItem onClick={() => handleAction("label")}>Kargo Etiketi</MenuItem>
        <MenuItem onClick={() => handleAction("ship")}>
          Kargoya Verildi
        </MenuItem>
        <MenuItem onClick={() => handleAction("cancel")}>İptal Et</MenuItem>
        {/* <Dialog
          open={open.deleteOrderId === order.id}
          onOpenChange={(v) =>
            setOpen((prev) => {
              return {
                ...prev,
                deleteOrderId: v ? order.id : null,
              };
            })
          }
        >
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
              <DialogTitle>{order.name + " silinsin mi?"}</DialogTitle>
            </DialogHeader>
            delete
          </DialogContent>
        </Dialog> */}
      </Menu>
    </>
  );
}
