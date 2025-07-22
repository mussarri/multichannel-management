import { ProductTable } from "@/app/components/products/product-table";

export default function ProductsPage() {
  const initialProducts = [
    {
      id: "1",
      name: "Apple Iphone 13 256 GB",
      sku: "PHN-123",
      price: 7999,
      stock: 42,
    },
    {
      id: "2",
      name: "Apple Macbook Pro M4 Pro 24GB RAM 512GB SSD",
      sku: "LPT-456",
      price: 15999,
      stock: 12,
    },
    {
      id: "3",
      name: "Logitech G502 HERO Gaming Mouse ",
      sku: "KEY-789",
      price: 399,
      stock: 78,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Ürünler</h1>
      </div>
      <ProductTable products={initialProducts} />
    </div>
  );
}
