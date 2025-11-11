export const LetsGo = (props) => {
  const { nextStep, title } = props;
  return (
    <button
      className={`w-[416px] h-9 rounded-xl border border-zinc-300
          text-[14px] font-medium text-white bg-zinc-300 cursor-pointer hover:bg-black`}
      onClick={nextStep}
    >
      {title}
    </button>
  );
};
