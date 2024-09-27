"use client";
import { Input, Form, List, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import getSearchedBlogs from "@/actions/get-searched-blog";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
type Listtype = {
  id: string;
  title: string;
  description: string | null;
  imageUrl?: string;
};
const Search = () => {
  const [listData, setListData] = useState<Listtype[]>([]);
  const [loadingSpin, setLoadingSpin] = useState(false);
  const [IsSearch, SetIsSearch] = useState(false);
  const handleSearch = async (e: any) => {
    e.preventDefault();
    // console.log("search params", e.target.value);
    try {
      SetIsSearch(true);
      setLoadingSpin(true);
      if (e.target.value) {
        const blogs = await axios(`/api/blogs/search/${e.target.value}`);

        setListData(blogs.data);
        console.log("blogs", blogs.data);
      } else {
        SetIsSearch(false);
        const emptyBlogs = await axios(`/api/blogs/search/${undefined}`);
        setListData(emptyBlogs.data);
      }
    } catch (error) {
    } finally {
      setLoadingSpin(false);
    }
  };

  return (
    <>
      <Input
        placeholder="search..."
        onKeyUp={handleSearch}
        prefix={<SearchOutlined />}
      />
      <div
        className={`absolute top-16 left-0  md:max-w-screen-lg w-full  bg-gray-50 p-3 rounded-md overflow-y-scroll max-h-72 z-50 ${
          IsSearch ? "visible" : "hidden"
        }`}
      >
        {/* <Spin tip="loading..." spinning={loadingSpin}> */}
        <List
          loading={loadingSpin}
          className="max-w-screen-sm mx-auto"
          itemLayout="vertical"
          dataSource={listData}
          renderItem={(item, index) => (
            <List.Item
              extra={
                <Image
                  src={item.imageUrl || ""}
                  width={300}
                  height={200}
                  className="aspect-video"
                  alt="blog image"
                />
              }
            >
              <List.Item.Meta
                // avatar={
                //   <Avatar
                //     src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                //   />
                // }
                title={
                  <Link
                    onClick={() => SetIsSearch(false)}
                    className="hover:text-red-600"
                    href={`/blogs/details/${item.id}`}
                  >
                    {item.title}
                  </Link>
                }
                description={
                  <div className="ql-snow">
                    <div
                      className=" line-clamp-3 text-lg "
                      dangerouslySetInnerHTML={{
                        __html: item.description || "",
                      }}
                    />
                  </div>
                }
              />
              {/* {item.description} */}
            </List.Item>
          )}
        />
        {/* </Spin> */}
      </div>
    </>
  );
};

export default Search;
