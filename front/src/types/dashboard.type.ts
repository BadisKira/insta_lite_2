


export type IPostsDashboard = {
    weekPosts: number;
    monthPosts: number;
    todayPosts: number;
    allPosts: number;
}

export type ILikesDashboard = {
  mostLikesPost: number; 
  countAverageLikes: number;
  allLikes: number;
};

export type ICommentsDashboard = {
  mostCommentsPost: number;
    countAverageComments: number;
  allComments: number;
};

export type IUsersDashboard = {
  countAdmins: number;
  countUsers: number;
  countSuperUsers: number;
};


