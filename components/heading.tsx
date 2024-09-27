const Heading = ({
  title,
  marginFix,
}: {
  title: string;
  marginFix?: boolean;
}) => {
  return (
    <p
      className={`text-2xl font-medium text-[#200a0a] text-center inline-block 
        relative p-1 border-b-accent ${marginFix ? "my-[10px]" : "my-[50px]"}`}
    >
      <span className="w-10 h-1 bg-primary absolute top-[50%] -right-10 rounded-md " />
      <span className="w-10 h-1 bg-primary absolute top-[50%] -left-10 rounded-md  " />
      {title}
    </p>
  );
};

export default Heading;
