"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";
import { whileTapOptions } from "@/constants";
import { registerValidationSchema } from "@/validations";
import {
  AnimatedError,
  Checkbox,
  GradientText,
  Input,
  Label,
  Loader,
  Motion
} from "@/components/ui";
import { IconArrowNarrowRight, IconEye, IconEyeOff } from "@tabler/icons-react";
import { debounce } from "@/_";
import { useRegister } from "@/hooks";
import { useRouter } from "next/navigation";

const MotionIconEye = motion.create(IconEye);
const MotionIconEyeOff = motion.create(IconEyeOff);

const Register = () => {
  const router = useRouter();
  const [mask, setMask] = useState(true);
  const { mutateAsync } = useRegister();

  const toggleMask = () => {
    setMask((prevMask) => !prevMask);
  };

  return (
    <>
      <h1 aria-label="Join MediTravel Today">
        <GradientText
          text="Join MediTravel Today"
          className="font-plus-sans font-extrabold text-lg md:text-xl text-pretty text-center whitespace-nowrap"
        />
      </h1>

      <p className="font-geist-sans text-sm text-secondary/75 text-center mt-0.5 transition-all duration-300">
        Discover top-rated clinics and save on medical procedures.
      </p>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          agreeToTerms: false
        }}
        validationSchema={registerValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await mutateAsync({
              email: values.email,
              password: values.password,
              firstName: values.firstName,
              lastName: values.lastName
            });

            if (response?.email) router.push("/");
          } catch (error: any) {
            console.error(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          values,
          touched,
          isSubmitting,
          setFieldValue,
          setFieldTouched
        }) => (
          <Form className="grid grid-cols-1 gap-y-2.5 w-full mt-7">
            <div className="grid grid-cols-2 gap-x-2.5">
              <div className="grid grid-cols-1 gap-y-0.5">
                <Label
                  htmlFor="firstName"
                  className="font-plus-sans font-medium text-sm text-secondary/75 mx-1"
                >
                  First Name
                </Label>
                <Field
                  type="text"
                  name="firstName"
                  as={Input}
                  readOnly={isSubmitting}
                  placeholder="Enter your first name"
                  errors={errors.firstName && touched.firstName}
                />
                <AnimatedError name="firstName" />
              </div>

              <div className="grid grid-cols-1 gap-y-0.5">
                <Label
                  htmlFor="lastName"
                  className="font-plus-sans font-medium text-sm text-secondary/75 mx-1"
                >
                  Last Name
                </Label>
                <Field
                  type="text"
                  name="lastName"
                  as={Input}
                  readOnly={isSubmitting}
                  placeholder="Enter your last name"
                  errors={errors.lastName && touched.lastName}
                />
                <AnimatedError name="lastName" />
              </div>
            </div>

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

            <div className="grid grid-cols gap-y-0.5">
              <div className="flex items-center space-x-2.5">
                <Checkbox
                  id="agreeToTerms"
                  disabled={isSubmitting}
                  checked={values.agreeToTerms}
                  onCheckedChange={(e) =>
                    setFieldValue("agreeToTerms", e, true)
                  }
                  onBlur={() =>
                    debounce(
                      () => setFieldTouched("agreeToTerms", true, true),
                      300
                    )()
                  }
                />

                <Label
                  htmlFor="agreeToTerms"
                  className="font-plus-sans font-medium text-sm text-secondary/75 cursor-pointer" // Add cursor-pointer for better UX
                >
                  I agree to the terms and conditions
                </Label>
              </div>

              <AnimatedError name="agreeToTerms" />
            </div>

            <Motion.Button
              type="submit"
              disabled={isSubmitting}
              variant={
                errors.firstName ||
                errors.lastName ||
                errors.email ||
                errors.password
                  ? "destructive"
                  : "accent"
              }
              className="bg-gradient-to-br from-primary via-primary to-secondary/75 mt-2.5"
            >
              <div className="flex-1 flex items-center justify-center space-x-2.5">
                {isSubmitting && <Loader />}
                <span>
                  {isSubmitting
                    ? "Creating Account..."
                    : "Start Your Transformation"}
                </span>
                {!isSubmitting && <IconArrowNarrowRight />}
              </div>
            </Motion.Button>
          </Form>
        )}
      </Formik>

      <div className="flex items-center space-x-2.5 mt-2.5">
        <span className="font-geist-sans font-medium text-sm text-secondary/75">
          Already a member?
        </span>

        <Motion.Link size="sm" href="/auth/login" label="Log In" />
      </div>
    </>
  );
};

export default Register;
