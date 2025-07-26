import React from "react";

const index = () => {
  return (
    <div
      className="w-full py-[130px]"
      style={{
        background:
          "linear-gradient(178deg,rgba(249, 250, 251, 1) 0%, rgba(255, 255, 255, 1) 48%, rgba(255, 255, 255, 1) 100%)",
      }}
    >
      <div className="max-w-6xl px-8 lg:px-0 mx-auto py-10">
        <div className="flex justify-between gap-5">
          <div className="w-full flex flex-col gap-2 pr-3">
            <h1 className="mb-6 w-full leading-snug !text-2xl lg:max-w-3xl lg:!text-4xl">
              Kargo Entegrasyonlari
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
