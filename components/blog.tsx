import { Button } from "antd";
import Image from "next/image";
import blogImag from "../public/blogimage.jpg";
import author from "../public/author.jpeg";

import { BiArrowFromLeft } from "react-icons/bi";
import { FaArrowUp } from "react-icons/fa";
import AuthorCard from "./author-card";

const Blog = () => {
  return (
    <div className="px-4 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
      <div className="text-xs md:text-base flex items-center space-x-2 font-medium mb-2 md:mb-5">
        <p className=" uppercase px-2 py-1 rounded-md  shadow-md ">Category</p>
        <span className="w-5 h-[2px] bg-accent" />
        <span>Jan 12, 2024</span>
      </div>
      <div>
        <div className="py-2 mb-2 md:mb-4">
          <p className="text-xl sm:text-3xl  md:text-4xl lg:text-6xl font-serif ">
            The AGI hype train is running out of steam
          </p>
          <div className="text-xs md:text-base flex space-x-3 items-center font-medium  mt-5 px-2 text-slate-800">
            <Image className="rounded-md w-8 h-8" src={blogImag} alt="" />
            <p>Wali Ullah</p>
            <span className="w-2 h-2 bg-accent rounded-full" />
            <span>01 minute read</span>
          </div>
        </div>
        <Image
          className="w-full object-cover aspect-video  rounded-lg  "
          src={blogImag}
          alt=""
        />
        <div className="mt-5 mb-[5rem]">
          <p className="text-sm md:text-lg  text-justify">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis
            totam ipsam illum illo veniam voluptatum laudantium nulla similique
            cum minima fugiat, labore neque necessitatibus eveniet alias eos
            vero sint a autem libero beatae consequuntur perspiciatis. Incidunt
            quis doloremque adipisci amet, minus perferendis quam sed id qui
            doloribus! Deleniti dicta nulla iste, aperiam enim molestias ea
            adipisci veniam placeat, magnam voluptate, officiis ullam blanditiis
            sint iure porro quidem modi ut! Inventore tempora sunt quae maxime
            cum, expedita laborum veniam repudiandae quia optio nam voluptatibus
            fuga qui soluta quibusdam mollitia facilis eius aperiam
            necessitatibus at, repellendus obcaecati ea aliquid enim. Quisquam
            <br />
            ad, molestias consectetur fugit corrupti earum dolores illum maxime
            aperiam ratione eum dicta cum assumenda a quae iusto porro! Iure
            fugit, nam magnam iste, asperiores a, voluptatibus saepe alias
            ducimus voluptatum aspernatur iusto fuga accusantium repudiandae
            dolorum nemo libero inventore vel id commodi maxime! Aut quia quae
            repudiandae quibusdam laboriosam architecto optio. Porro saepe aut
            impedit natus doloribus iusto qui, debitis eius aliquid quisquam
            beatae, minima praesentium perferendis facilis rem libero
            exercitationem unde adipisci atque explicabo nesciunt odio! Id in
            eum nihil eveniet iure cum neque quasi fugiat tempora voluptas
            quibusdam, ex, suscipit modi autem laborum iusto tenetur. Vero,
            officiis consequatur?
          </p>
        </div>
        <AuthorCard
          id="a"
          imgsrc={author}
          name="Dummy Author"
          description="ducimus voluptatum aspernatur iusto fuga accusantium repudiandae
            dolorum nemo libero inventore vel id commodi maxime! Aut quia quae
            repudiandae quibusdam laboriosam architecto optio. Porro saepe aut
            impedit natus doloribus iusto qui, debitis eius aliquid quisquam
            beatae, minima praesentium perferendis facilis rem libero
            exercitationem unde adipisci atque explicabo nesciunt odio! Id in
            eum nihil eveniet iure cum neque quasi fugiat tempora voluptas
            quibusdam, ex, suscipit modi autem laborum iusto tenetur. Vero,
            officiis consequatur?"
        />
      </div>
    </div>
  );
};

export default Blog;
