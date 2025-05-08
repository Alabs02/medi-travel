"use client";

import { cn } from "@/lib";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { loginValidationSchema } from "@/validations";
import { motion } from "framer-motion";
import { whileTapOptions } from "@/constants";
import {
  AnimatedError,
  GradientText,
  Input,
  Label,
  Loader,
  Motion
} from "@/components/ui";
import { IconArrowNarrowRight, IconEye, IconEyeOff } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks";

const MotionIconEye = motion.create(IconEye);
const MotionIconEyeOff = motion.create(IconEyeOff);

const Login = () => {
  const router = useRouter();
  const [mask, setMask] = useState(true);
  const { mutateAsync } = useLogin();

  const toggleMask = () => {
    setMask((prevMask) => !prevMask);
  };

  return (
    <>
      <h1 aria-label="Welcome Back!">
        <GradientText
          text="Welcome Back!"
          className="font-plus-sans font-extrabold text-lg md:text-xl text-pretty text-center whitespace-nowrap"
        />
      </h1>

      <p className="font-geist-sans text-sm text-secondary/75 text-center mt-0.5 transition-all duration-300">
        Log in to access world-class healthcare options.
      </p>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const response = await mutateAsync(values);

            if (response?.email) {
              setTimeout(() => {
                router.push("/");
              }, 200);
            }
          } catch (error: any) {
            console.log({ error });
            setErrors({
              email: "Invalid credentials",
              password: "Invalid credentials"
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="grid grid-cols-1 gap-y-2.5 w-full mt-7">
            <div className="grid grid-cols-1 gap-y-0.5">
              <Label
                htmlFor="email"
                className="font-plus-sans font-medium text-sm text-secondary/75 mx-1"
              >
                Email
              </Label>

              <Field
                type="email"
                name="email"
                as={Input}
                readOnly={isSubmitting}
                placeholder="Enter your email"
                errors={errors.email && touched.email}
              />

              <AnimatedError name="email" />
            </div>

            <div className="grid grid-cols-1 gap-y-0.5">
              <Label
                htmlFor="password"
                className="font-plus-sans font-medium text-sm text-secondary/75 mx-1"
              >
                Password
              </Label>

              <div className="grid grid-cols-1 relative">
                <Field
                  name="password"
                  as={Input}
                  readOnly={isSubmitting}
                  type={mask ? "password" : "text"}
                  placeholder="Enter your password"
                  errors={errors.password && touched.password}
                  className={cn("")}
                />

                <div className="absolute top-1/2 -translate-y-1/2 right-2.5">
                  <motion.button
                    {...whileTapOptions}
                    onClick={toggleMask}
                    type="button"
                    className="size-6 rounded-full text-primary/75 grid place-items-center border-none bg-transparent hover:bg-primary/5 transition-colors duration-200"
                  >
                    {mask ? (
                      <MotionIconEyeOff
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        size={22}
                      />
                    ) : (
                      <MotionIconEye
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        size={22}
                      />
                    )}
                  </motion.button>
                </div>
              </div>

              <AnimatedError name="password" />
            </div>

            <Motion.Button
              type="submit"
              variant={
                errors.email || errors.password ? "destructive" : "accent"
              }
              disabled={isSubmitting}
              className="bg-gradient-to-br from-primary via-primary to-secondary/75 mt-2.5"
            >
              <div className="flex-1 flex items-center justify-center space-x-2.5">
                {isSubmitting && <Loader />}
                <span>{isSubmitting ? "Hang in tight..." : "Sign In"}</span>
                {!isSubmitting && <IconArrowNarrowRight />}
              </div>
            </Motion.Button>
          </Form>
        )}
      </Formik>

      <div className="flex items-center space-x-2.5 mt-2.5">
        <span className="font-geist-sans font-medium text-sm text-secondary/75">
          Don't have an account?
        </span>
        <Motion.Link size="sm" href={"/auth/register"} label="Sign Up" />
      </div>
    </>
  );
};

export default Login;
