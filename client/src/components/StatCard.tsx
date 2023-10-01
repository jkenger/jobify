function StatCard({
  labelText = "Stats",
  value = "3",
}: {
  labelText: string;
  value: string | number;
}) {
  return (
    <div className=" h-24  w-full px-4 py-3 flex flex-col justify-center ">
      <span className="text-primary capitalize">{labelText}</span>
      <span className="text-3xl">{value}</span>
    </div>
  );
}

export default StatCard;
