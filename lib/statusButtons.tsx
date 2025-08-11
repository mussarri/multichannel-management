import React from "react";

const StatusButtons = ({ status }: { status: string }) => {
  const style = {
    CREATED: "var(--warning)",
    PENDING: "var(--warning)",
    PICKING: "var(--success)",
    INVOICED: "var(--success)",
    SHIPPED: "var(--success)",
    CANCELLED: "var(--error)",
    DELIVERED: "var(--success)",
    UNDELIVERED: "var(--success)",
    RETURNED: "var(--warning)",
    ATCOLLECTIONPOINT: "var(--warning)",
    UNPACKED: "var(--warning)",
    UNSUPLIED: "var(--warning)",
  };
  const text = {
    CREATED: "Olusturuldu",
    PENDING: "Beklemede",
    PICKING: "Alindi",
    INVOICED: "Faturalandı",
    SHIPPED: "Kargoya Verildi",
    DELIVERED: "Teslim Edildi",
    CANCELLED: "İptal Edildi",
    UNSUPLIED: "Tedarik Edilemedi",
    UNDELIVERED: "Teslim Edilmedi",
    RETURNED: "Iade Edildi",
    ATCOLLECTIONPOINT: "Teslim Noktasında",
    UNPACKED: "Paketlenmedi",
  };
  return (
    <button
      style={{
        background: style[status],
        color: "var(--primary-foreground)",
        padding: "2px 10px",
        fontSize: 12,
        borderRadius: "10px",
      }}
    >
      {text[status]}
    </button>
  );
};

export default StatusButtons;
