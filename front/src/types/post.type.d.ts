

export interface IPost {
  id: string;
  title: string;
  description: string;
  userId: number;
  userFirstname: string;
  userLastname: string;
  isPublic: boolean;
  createdAt: string;
  commentsNumber: number;
  likedUserIds: number[];
}

export interface ICreatePost {
  title: string;
  description: string;
  userId: number; // ou peut etre juste le token
  isPublic: boolean;
  data: File | null;
  postType: "IMAGE" | "VIDEO";
}

