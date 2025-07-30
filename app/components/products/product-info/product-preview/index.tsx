/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { HeartIcon, ShoppingBag } from "lucide-react";

function color(color: string) {
  const key = color
    .replaceAll("Ğ", "g")
    .replaceAll("Ü", "u")
    .replaceAll("Ş", "s")
    .replaceAll("I", "i")
    .replaceAll("İ", "i")
    .replaceAll("Ö", "o")
    .replaceAll("Ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .toLocaleLowerCase();

  switch (key) {
    case "kirmizi":
      return "red";
      break;

    case "mavi":
      return "blue";
      break;
    case "sari":
      return "yellow";
      break;
    case "siyah":
      return "black";
      break;
    case "beyaz":
      return "white";
      break;
    case "gri":
      return "gray";
      break;
    case "turuncu":
      return "orange";
      break;
    case "mor":
      return "purple";
      break;
    case "yeşil":
      return "green";
      break;
    case "pembe":
      return "pink";
      break;
    case "kahverengi":
      return "brown";
      break;
    case "turkuaz":
      return "turquoise";
      break;
    default:
      break;
  }
}
const plusMinuceButton =
  "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";

const Page = ({ data }: { data: any }) => {
  console.log(data);

  return (
    <>
      <h2 className="text-sm mt-4 flex items-center justify-between p-4 pb-3 font-bold text-foreground border-b  bg-background">
        Ürün Preview Örneği
      </h2>
      <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:gap-2 lg:py-10  bg-background">
        {/* image gallery */}
        <div className="container mx-auto px-4 border flex justify-center items-center">
          {/* /image gallery  */}
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + (data.images[0]?.url + "")}
            width={500}
            height={500}
            alt=""
          />
        </div>
        {/* description  */}

        <div className="mx-auto w-full px-5 lg:px-5 ">
          <h2 className="pt-3 text-2xl font-bold lg:pt-0">{data.title}</h2>
          <div className="mt-1">
            <div className="flex items-center">
              <p className="ml-3 text-sm text-gray-400">{data.sub_title}</p>
            </div>
          </div>
          <p className="mt-5 font-bold">
            Availability:{" "}
            {data.stock > 0 ? (
              <span className="text-green-600">In Stock </span>
            ) : (
              <span className="text-red-600">Expired</span>
            )}
          </p>
          <p className="font-bold">
            Brand: <span className="font-normal">{data.brand.name}</span>
          </p>
          <p className="font-bold">
            Cathegory: <span className="font-normal">{data.category.name}</span>
          </p>
          <p className="font-bold">
            SKU: <span className="font-normal">{data.sku}</span>
          </p>
          <p className="mt-4 text-4xl font-bold text-violet-900">
            ${data.salePrice}{" "}
            <span className="text-xs text-gray-400 line-through">
              ${data.listPrice}
            </span>
          </p>
          <p
            className="pt-5 text-sm leading-5 text-gray-500"
            dangerouslySetInnerHTML={{
              __html: data.description,
            }}
          />

          {data.variants.length > 0 &&
            data.variants[0].attributes.map((item, index) => (
              <div key={index} className="mt-6">
                <p className="pb-2 text-xs text-gray-500">
                  {item.attribute.name}
                </p>
                {item.attribute.name.toLowerCase() == "renk" && (
                  <div className="flex gap-2">
                    {item.attribute.values.map((value, index) => (
                      <div
                        className={
                          "rounded-lg w-12 h-8 text-white  p-2 text-[12px]"
                        }
                        style={{
                          background: color(value.value)
                            ? color(value.value)
                            : "unset",
                        }}
                        key={index}
                      >
                        {value.value}
                      </div>
                    ))}
                  </div>
                )}
                {item.attribute.name.toLowerCase() == "beden" && (
                  <div className="flex gap-2">
                    {item.attribute.values.map((value, index) => (
                      <div
                        className={
                          "border w-8 flex items-center justify-start p-2"
                        }
                        key={index}
                      >
                        {value.value}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

          <div className="mt-6">
            <p className="pb-2 text-xs text-gray-500">Quantity</p>
            <div className="flex">
              <button className={`${plusMinuceButton}`}>−</button>
              <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                1
              </div>
              <button className={`${plusMinuceButton}`}> +</button>
            </div>
          </div>
          <div className="mt-7 flex flex-row items-center gap-6">
            <button className="flex h-12 w-1/3 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800">
              <ShoppingBag size={20} className="mx-2" />
              Add to cart
            </button>
            <button className="flex h-12 w-1/3 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300">
              <HeartIcon size={20} className="mx-2" />
              Wishlist
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
