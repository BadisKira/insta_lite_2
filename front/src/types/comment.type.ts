export type IComment = {
    id: string,
    userFirstname: string,
    userLastname: string,
    postId: string,
    createdAt: string,
    content:string,
};

export type ICreateComment = {
  userId: number;
  postId: string;
  content: string;
};

export const queryKeyComment = "commentsFeed";