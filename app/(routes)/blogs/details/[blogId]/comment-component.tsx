"use client";
import CommentCard from "@/components/comment-card";
import { Divider } from "antd";
import { useSession } from "next-auth/react";
interface CommentComponentProps {
  id: string;
  comments: {
    id: string;
    content: string;
    blogId: string;
    createdAt: Date;
    author: {
      name: string | null;
      profile: { imageUrl: string | null } | null;
    };
  }[];
}
const CommentComponent = ({ id, comments }: CommentComponentProps) => {
  const { data: session } = useSession();
  const commentData = {
    author: {
      id: session?.user?.id,
      name: session?.user?.name,
      profile: {
        imageUrl: session?.user?.imageUrl,
      },
    },
    editingState: true,
    createdAt: new Date(),
  };

  return (
    <div className="mt-20">
      <Divider
        orientation="left"
        className="border-stone-300 border-t-8"
        orientationMargin={10}
      >
        <h1 className="text-2xl  font-medium mb-0 dark:text-white">
          Comments{" "}
        </h1>
      </Divider>
      {session && session.user && (
        <CommentCard commentData={commentData} blogId={id} />
      )}
      {comments.length !== 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment.id} commentData={comment} blogId={id} />
        ))
      ) : (
        <div className="italic text-lg text-center mt-5 text-stone-300">
          No comments for this blog{" "}
        </div>
      )}
    </div>
  );
};

export default CommentComponent;
