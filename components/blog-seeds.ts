import blogImage from "/public/blogimage.jpg";
import blogImage2 from "/public/blog2.jpg";
import blogImage3 from "/public/blog3.jpg";
import blogImage4 from "/public/blog4.jpg";
import blogImage5 from "/public/blog5.jpg";
import user1 from "@/public/author.jpeg";
import user2 from "@/public/user2.jpeg";
import user3 from "@/public/user3.jpeg";

export const blogs = [
  {
    id: "1",
    author: {
      id: "2",
      name: "Wali Ullah",
      imageUrl: user1,
    },
    imageUrl: blogImage,
    title: "The AGI hype train is running out of steam",
    description: `beatae, minima praesentium perferendis facilis rem libero
            exercitationem unde adipisci atque explicabo nesciunt odio! Id in
            eum nihil eveniet iure cum neque quasi fugiat tempora voluptas
            quibusdam, ex, suscipit modi autem laborum iusto tenetur. Vero,
            officiis consequatur?`,
    category: "AI",
    createdAt: new Date().toString().slice(0, 15),
  },
  {
    id: "2",
    author: {
      id: "author2",
      name: "Manik mia",
      imageUrl: user2,
    },
    imageUrl: blogImage2,
    title:
      "Gig startups want you to believe they can replace your job — don’t fall for it",
    description: `beatae, minima praesentium perferendis facilis rem libero
            exercitationem unde adipisci atque explicabo nesciunt odio! Id in
            eum nihil eveniet iure cum neque quasi fugiat tempora voluptas
            quibusdam, ex, suscipit modi autem laborum iusto tenetur. Vero,
            officiis consequatur?`,
    category: "Startup",
    createdAt: new Date().toString().slice(0, 15),
  },
  {
    id: "3",
    author: {
      id: "2",
      name: "Manik mia",
      imageUrl: user3,
    },
    imageUrl: blogImage3,
    title: "Everything you wanted to know about the metaverse",
    description: `beatae, minima praesentium perferendis facilis rem libero
            exercitationem unde adipisci atque explicabo nesciunt odio! Id in
            eum nihil eveniet iure cum neque quasi fugiat tempora voluptas
            quibusdam, ex, suscipit modi autem laborum iusto tenetur. Vero,
            officiis consequatur?`,
    category: "Metaverse",
    createdAt: new Date().toString().slice(0, 15),
  },
  {
    id: "4",
    author: {
      id: "2",
      name: "Manik mia",
      imageUrl: blogImage,
    },
    imageUrl: blogImage4,
    title:
      "How to hire a developer straight out of bootcamp — without getting burned",
    description: `beatae, minima praesentium perferendis facilis rem libero
            exercitationem unde adipisci atque explicabo nesciunt odio! Id in
            eum nihil eveniet iure cum neque quasi fugiat tempora voluptas
            quibusdam, ex, suscipit modi autem laborum iusto tenetur. Vero,
            officiis consequatur?`,
    category: "Startup",
    createdAt: new Date().toString().slice(0, 15),
  },
];
