/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export function TrendyolIntegration() {
  const [supplierId, setSupplierId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [secret, setSecret] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/trendyol/products", {
        params: { supplierId, apiKey, secret },
      });
      setProducts(res.data.content);
    } catch (err: any) {
      alert("Veri alınamadı.");
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Input
          placeholder="Supplier ID"
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
        />
        <Input
          placeholder="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <Input
          placeholder="Secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
      </div>

      <Button onClick={fetchProducts}>Ürünleri Getir</Button>

      <ul className="mt-4 space-y-1 text-sm">
        {products.map((p) => (
          <li key={p.id} className="border p-2 rounded">
            {p.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
