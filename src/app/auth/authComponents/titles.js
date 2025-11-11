export const Titles = ({ big, small }) => {
  return (
    <div className="flex flex-col">
      <p className="text-[24px] text-black font-semibold">{big}</p>
      <p className="font-normal text-[16px] text-[#71717A]">{small}</p>
    </div>
  );
};
