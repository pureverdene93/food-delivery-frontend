export const FoodCard = () => {
  return (
    <div className="w-[397px] h-[342px] p-4 bg-white rounded-xl flex flex-col justify-between">
      <div>
        <img
          src="/tsuivan3.png"
          className="w-[365px] h-[210px] object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-row items-center justify-between">
          <p className="text-red-500 text-[24px] font-semibold">Finger food </p>
          <p className="font-semibold text-[18px] text-black">$12.99</p>
        </div>
        <div>
          <p className="font-normal text-[14px] text-black">
            Fluffy pancakes stacked with fruits, cream, syrup, and powdered
            sugar.
          </p>
        </div>
      </div>
    </div>
  );
};
