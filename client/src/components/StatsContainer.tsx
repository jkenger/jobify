import React from "react";

const gridColsVariant: { [key: number]: string } = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
  7: "sm:grid-cols-7",
  8: "sm:grid-cols-8",
  9: "sm:grid-cols-9",
  10: "sm:grid-cols-10",
  11: "sm:grid-cols-11",
  12: "sm:grid-cols-12",
};

type Props = {
  children: React.ReactNode;
  col?: keyof typeof gridColsVariant;
};

function StatsContainer({ children, col = 3 }: Props) {
  const defaultBorderClass =
    "[&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md";
  const smScreenBorderClass =
    "sm:[&>*:first-child]:rounded-l-md sm:[&>*:first-child]:rounded-tr-none sm:[&>*:last-child]:rounded-r-md sm:[&>*:last-child]:rounded-bl-none";
  const setBorderClass = "bg-border [&>*]:bg-background rounded-md";

  // If remainder is 0, then the number is even

  return (
    // grid grid-cols-1 sm:grid-cols-3 border rounded-lg [&>*:nth-child(2)]:border-y sm:[&>*:nth-child(2)]:border-y-0 sm:[&>*:nth-child(2)]:border-x
    <div
      className={` p-[1px] gap-[1px] grid grid-cols-1 ${gridColsVariant[col]}  ${setBorderClass} ${defaultBorderClass} ${smScreenBorderClass}`}
    >
      {children}
    </div>
  );
}

export default StatsContainer;
