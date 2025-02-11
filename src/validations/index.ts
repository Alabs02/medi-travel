import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password is required")
    .required("Password is required")
});

export const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First name must be at least 3 characters")
    .max(10, "First name cannot exceed 10 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(3, "Last name must be at least 3 characters")
    .max(10, "Last name cannot exceed 10 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password cannot exceed 16 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .required("Password is required"),
  agreeToTerms: Yup.boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("You must agree to the terms and conditions")
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref("password")], "Passwords must match")
  //   .required("Confirm Password is required"),
});
