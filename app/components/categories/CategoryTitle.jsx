"use client";
import React from "react";
import CategoryAdd from "./CategoryAdd";

const CategoryTitle = ({ categories }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex justify-between">
      <h2 className="text-xl font-semibold mb-4">Kategoriler</h2>
      <CategoryAdd open={open} setOpen={setOpen} categories={categories} />
    </div>
  );
};

export default CategoryTitle;
