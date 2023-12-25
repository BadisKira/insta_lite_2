export type IComment = {
    id: string,
    firstName: string,
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