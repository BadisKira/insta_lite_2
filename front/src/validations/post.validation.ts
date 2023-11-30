import * as yup from "yup"

export const createPostSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  isPublic: yup.boolean().default(true),
  userId: yup.number(), // pas sur mais bon
  data: yup.object(),
  postType: yup.string() //"IMAGE" || "VIDEO"
});
