"use client";
import { useFormStatus } from "react-dom";

export default function Submit({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  const status = useFormStatus();
  return (
    <button className={className + " capitalize"} disabled={status.pending}>
      {text}
    </button>
  );
}
