export interface IPost {
    id: string, 
    title: string,
    description: string, 
    userId: number  , 
    userName:string , 
    public: boolean, 
    createdAt: string
}

export interface ICreatePost {
  title: string;
  description: string;
  userId: number; // ou peut etre juste le token
  isPublic: boolean;
  data: File | null;
  postType: "IMAGE" | "VIDEO";
}

