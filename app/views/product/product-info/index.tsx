// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import React, { Suspense } from "react";
// import Link from "next/link";
// import { Pencil, PlusCircleIcon, Trash2 } from "lucide-react";
// import "rsuite/Steps/styles/index.css";
// import ProductCard from "../../../components/products/product-card";

// import ProductStatus from "@/app/views/product/product-info/product-status";
// import ProductPreview from "@/app/views/product/product-info/product-preview";
// import ProductImages from "@/app/views/product/product-info/product-images";
// import ProductDescription from "@/app/views/product/product-info/product-description";
// import AddVariantSection from "@/app/components/products/AddVariantSection";
// import VariantList from "@/app/components/products/VariantList";

// const Info = ({ product }: { product: any }) => {
//   const data = product;

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Ürün Bilgileri</h2>
//       <div className="max-w-[800px]">
//         <ProductStatus id={product.id} isActive={product.is_active} />
//         <ProductCard data={product} />
//         <ProductImages data={product} />
//         <ProductDescription description={product.description} id={product.id} />
//         {data.variants.length < 1 && <AddVariantSection id={data.id} />}

//         {data.variants && data.variants.length > 0 && (
//           <VariantList id={data.id} />
//         )}
//       </div>

//       <ProductPreview data={product} />
//     </div>
//   );
// };

// export default Info;
