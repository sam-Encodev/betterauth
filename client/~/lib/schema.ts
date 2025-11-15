import * as yup from "yup";

export const signup = yup
  .object({
    name: yup.string().required("*"),
    email: yup.string().required("*"),
    password: yup.string().required("*"),
    confirmpassword: yup.string().required("*"),
  })
  .required();

export const login = yup
  .object({
    email: yup.string().required("*"),
    password: yup.string().required("*"),
  })
  .required();
