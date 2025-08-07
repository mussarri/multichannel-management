"use client";
import { deleteAttributeAction } from "@/app/action";
import { Trash2 } from "lucide-react";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const DeleteAttribute = ({ id }) => {
  const [message, formAction, isPending] = useActionState(
    deleteAttributeAction,
    null
  );
  useEffect(() => {
    if (message?.success) {
      toast.success(message?.message);
    }
    if (message?.error) {
      toast.error(message?.message);
    }
  }, [message]);
  return (
    <form action={formAction}>
      <input type="hidden" name="attributeId" value={id} />
      <button
        type="submit"
        disabled={isPending}
        className="hover:scale-110 transition-all duration-300"
      >
        <Trash2 size={15} color="var(--error)" />{" "}
      </button>
    </form>
  );
};

export default DeleteAttribute;
