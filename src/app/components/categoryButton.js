export const CategoryButton = (props) => {
  const { categoryName } = props;
  return (
    <button
      className="h-9 border-zinc-300 border rounded-[50px]
        cursor-pointer flex justify-center gap-2 items-center text-[14px]
         font-medium text-black pl-4 pr-4"
    >
      {categoryName}
      <span
        className="h-5 bg-black text-white text-[12px] font-semibold
          flex justify-center items-center pl-2.5 pr-2.5 rounded-[50px]"
      >
        112
      </span>
    </button>
  );
};
