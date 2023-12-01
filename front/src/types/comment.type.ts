export type IComment = {
    id: string,
    userName: string,
    postId: string,
    createdAt: Date,
    content:string,
};

export type ICreateComment = {
  userId: number;
  postId: string;
  content: string;
};

export const queryKeyComment = "commentsFeed";