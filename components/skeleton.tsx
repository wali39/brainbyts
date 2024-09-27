import { cn } from "@/lib/utils";

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(`animate-pulse rounded-md bg-cardBg`, className)}
      {...props}
    />
  );
};

export default Skeleton;
