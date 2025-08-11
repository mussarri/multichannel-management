import React from "react";

const PageCard = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title;
}) => {
  return (
    <div className="overflow-y-auto">
      <div className="pb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold capitalize">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default PageCard;
