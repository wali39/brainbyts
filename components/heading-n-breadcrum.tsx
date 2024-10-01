import Heading from "./heading";

import { Breadcrumb } from "antd";

interface HeadingBreadcrumpProps {
  title: string;
  items: object[];
}
const HeadingBreadcrump = ({ title, items }: HeadingBreadcrumpProps) => {
  return (
    <div className="text-center mb-[40px] mt-[100px] dark:text-white ">
      <Heading title={title} marginFix />
      <Breadcrumb
        className="flex justify-center font-bold  "
        separator="-"
        items={items}
      />
    </div>
  );
};

export default HeadingBreadcrump;
