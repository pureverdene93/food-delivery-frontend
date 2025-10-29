export const FoodOrder = () => {
  return (
    <div className="flex flex-col gap-6">
      <button className="w-full flex justify-end">
        <img src="/me.jpg" className="object-cover w-9 h-9 rounded-full" />
      </button>
      <div className="w-[1171px] min-h-32 bg-white border border-zinc-300 rounded-2xl">
        <div
          className="w-[1171px] h-[76px] flex flex-row justify-between items-center pl-4 pr-4
        border-b"
        >
          <div>
            <p className="text-[20px] text-black font-bold">Orders</p>
            <p className="text-[12px] font-medium text-zinc-300">32 items</p>
          </div>
          <div className="flex gap-3">
            <input type="date" />
            <button
              className={`w-[179px] h-9 rounded-[80px] cursor-pointer bg-zinc-300 text-[14px]
          font-medium content-center`}
            >
              Change delivery state
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center h-[52px] pl-4 pr-4">
          <input type="checkbox" className="cursor-pointer" />
          <p>№</p>
          <p>Customer</p>
          <p>Food</p>
          <div>Date</div>
          <p>Total</p>
          <p>Delivery Adress</p>
          <div>Delivery State</div>
        </div>
      </div>
    </div>
  );
};
