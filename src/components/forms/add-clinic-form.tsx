"use client";

import { useDropzone } from "react-dropzone";
import React, { useEffect, useRef, useState } from "react";

import { cn, formatNumber } from "@/lib";
import { useMediaQuery, useSpoolCountries, useSpoolStates } from "@/hooks";

import Image from "next/image";

import {
  Label,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DialogFooter,
  Motion,
  Input,
  AnimatedError,
  Textarea
} from "@/components/ui";

import { useQueryStore } from "@/store/query";
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import { getAllProcedures } from "@/db";
import ReactSlider from "react-slider";
import { motion } from "framer-motion";
import { clinicFormValidationSchema } from "@/validations";
import { Field, FieldArray, Form, Formik } from "formik";
import { size } from "@/_";

export type AddClinicDialogFormprops = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MAX_SELECTION = 3;

export type FormValues = {
  name: string;
  description: string;
  gallery: File[] | any[];
  location: string;
  usEstimatedCost: number;
  clinicEstimatedCost: number;
  procedures: Array<{ name: string; amount: string }>;
};

const AddClinicDialogForm: React.FC<AddClinicDialogFormprops> = ({
  open,
  setOpen
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const initialValues = {
    name: "",
    description: "",
    gallery: [],
    location: "",
    usEstimatedCost: "",
    clinicEstimatedCost: "",
    procedures: [{ name: "", amount: "" }]
  };

  const {
    query,
    setQuery,
    resetLocations,
    resetPriceRanges,
    resetTreatmentTypes
  } = useQueryStore();

  const { isFetching: isFetchingStates } = useSpoolStates();
  const { isFetching: isFetchingCountries } = useSpoolCountries();

  const onReset = () => {
    resetLocations();
    resetPriceRanges();
    resetTreatmentTypes();
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] md:min-w-[50vw] 2xl:!min-w-[40vw] min-h-[50vh] max-h-[90vh] overflow-y-auto !p-0">
          <DialogHeader className="rounded-t-lg p-5 bg-background/50 backdrop-blur-sm backdrop-filter sticky z-40 top-0 border-b border-hairline/15 !h-14">
            <DialogTitle className="font-font-plus-sans tracking-wide text-left !text-base text-primary/85">
              Add a Clinic to MediTravel
            </DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>

          <ClinicForm open={open} setOpen={setOpen} className="px-4" />

          {/* <DialogFooter className="flex items-center lg:!justify-between !p-5 rounded-b-lg bg-background backdrop-blur-sm backdrop-filter border-t border-hairline/15 sticky bottom-0 z-40 !h-14">
            <Motion.GhostButton
              type="button"
              onClick={onReset}
              className="!py-2 !px-4"
            >
              <span className="font-outfit text-normal !text-sm">
                Clear all
              </span>
            </Motion.GhostButton>

            <Motion.Button
              onClick={() => setOpen(!open)}
              className="!py-2 !px-4"
            >
              <span className="font-outfit !text-sm">Apply</span>
            </Motion.Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-font-plus-sans tracking-wide text-left !text-base text-primary/85">
            Add a Clinic to MediTravel
          </DrawerTitle>
          <DrawerDescription className="hidden"></DrawerDescription>
        </DrawerHeader>

        <ClinicForm open={open} setOpen={setOpen} className="px-4" />

        {/* <DrawerFooter className="flex items-center lg:!justify-between !p-5 rounded-b-lg bg-background backdrop-blur-sm backdrop-filter border-t border-hairline/15">
            <Motion.GhostButton
              type="button"
              onClick={onReset}
              className="!py-2 !px-4"
            >
              <span className="font-outfit text-normal !text-sm">
                Clear all
              </span>
            </Motion.GhostButton>

            <Motion.Button
              onClick={() => setOpen(!open)}
              className="!py-2 !px-4"
            >
              <span className="font-outfit !text-sm">Apply</span>
            </Motion.Button>
          </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
};

const ClinicForm = ({
  className,
  open,
  setOpen
}: React.ComponentProps<"form"> & {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { getTreatmentTypes } = useQueryStore();

  const initialValues = {
    name: "",
    description: "",
    gallery: [],
    location: "",
    usEstimatedCost: 50000,
    clinicEstimatedCost: 1000,
    procedures: [{ name: "", amount: "" }]
  };

  const handleSubmit = (values: FormValues) => {
    console.log("Form Submitted:", values);
  };

  return (
    <>
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={clinicFormValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
          <Form
            className={cn("grid grid-cols-1 gap-y-4 w-full mb-8", className)}
          >
            <div className="grid grid-cols-1 gap-y-0.5">
              <Label htmlFor="name" className="font-medium text-sm">
                Clinic Name
              </Label>

              <Field
                type="text"
                name="name"
                as={Input}
                placeholder="Enter clinic name"
                errors={errors.name && touched.name}
              />

              <AnimatedError name="name" />
            </div>

            <div className="grid grid-cols-1 gap-y-0.5">
              <Label htmlFor="description" className="font-medium text-sm">
                About the Clinic
              </Label>

              <Field
                as={Textarea}
                name="description"
                placeholder="Provide a short description of the clinic and its specialties"
                className="resize-none"
                maxLength={250}
                errors={errors.description && touched.description}
              />
              <div className="flex w-full justify-end">
                <small className="text-xs font-geist-sans font-light text-secondary/75">
                  Maximum of 250 Characters
                </small>
              </div>

              <AnimatedError name="description" />
            </div>

            <div className="grid grid-cols-1 gap-y-0.5">
              <Label htmlFor="gallery" className="font-medium text-sm">
                Upload Clinic Images
              </Label>

              <MediaUpload
                name="gallery"
                id="gallery"
                required={true}
                errors={errors}
                touched={touched}
                values={values}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />

              <p className="text-sm text-gray-500">
                Add at least 3 high-quality images of the clinic
              </p>
              <AnimatedError name="gallery" />
            </div>

            <div className="grid grid-cols-1 gap-y-0.5">
              <Label htmlFor="location" className="font-medium text-sm">
                Location
              </Label>
              <Field
                type="text"
                name="location"
                as={Input}
                placeholder=" Country, City"
                errors={errors.location && touched.location}
              />
              <AnimatedError name="location" />
            </div>

            <PriceRangeInput
              errors={errors}
              values={values}
              setFieldValue={setFieldValue}
            />

            <div className="grid grid-cols-1 gap-y-0.5">
              <Label htmlFor="procedures" className="font-medium text-sm">
                Procedures & Pricing
              </Label>

              <FieldArray name="procedures">
                {({ push, remove }) => (
                  <div className="space-y-2 transition-all duration-300">
                    {values.procedures.map((procedure, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 gap-y-1.5 w-full transition-all duration-300"
                      >
                        <div className="flex w-full justify-end gap-x-2">
                          {size(values.procedures) > 1 && (<Motion.OutlinedButton
                            type="button"
                            onClick={() => remove(index)}
                            variant="destructive"
                            className="!px-2.5 !py-[5px] !text-destructive !shadow-destructive/50 hover:!shadow-destructive"
                          >
                            <IconMinus size={18} />
                            <span className="font-outfit font-medium text-sm">
                              Remove
                            </span>
                          </Motion.OutlinedButton>)}

                          {index + 1 === size(values.procedures) && (
                            <Motion.OutlinedButton
                              type="button"
                              onClick={() => push({ name: "", amount: "" })}
                              className="!px-2.5 !py-[5px]"
                            >
                              <IconPlus size={18} />
                              <span className="font-outfit font-medium text-sm">
                                Add
                              </span>
                            </Motion.OutlinedButton>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div className="md:col-span-2 grid grid-cols-1">
                            <Field
                              type="text"
                              name={`procedures.${index}.name`}
                              as={Input}
                              placeholder="e.g., Knee Replacement"
                            />
                          </div>

                          <div className="grid grid-cols-1">
                            <Field
                              type="number"
                              name={`procedures.${index}.amount`}
                              as={Input}
                              placeholder="e.g 10000"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
              <AnimatedError name="procedures" />
            </div>

            <Motion.Button
              type="submit"
              variant={
                Object.keys(errors).length > 0 ? "destructive" : "accent"
              }
              className="bg-gradient-to-br from-primary via-primary to-secondary/75 mt-4"
            >
              <div className="flex-1 flex items-center justify-center space-x-2.5">
                <span>Add Clinic to MediTravel</span>
              </div>
            </Motion.Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

const PriceRangeInput: React.FC<{
  errors: any;
  values: FormValues;
  setFieldValue: any;
}> = ({ errors, values, setFieldValue }) => {
  const handlePriceChange = (value: [number, number]) => {
    setFieldValue("clinicEstimatedCost", value[0]);
    setFieldValue("usEstimatedCost", value[1]);
  };

  return (
    <div className="w-full grid grid-cols-1 gap-y-2.5 p-5 bg-background rounded-md !shadow-[0_0_0_1px] !shadow-hairline/25 relative overflow-hidden">
      <Label
        htmlFor="price-range-input"
        className="font-plus-sans text-sm text-secondary/75 font-semibold mb-10 z-20"
      >
        Compare the estimated cost at this clinic with typical U.S. prices.
      </Label>

      <div className="space-y-6 z-20">
        <ReactSlider
          className="w-full rounded h-2 relative bg-accent/20 horizontal shadow-[0_0_1px_0] shadow-accent/65"
          thumbClassName="thumb"
          trackClassName="track"
          value={[values.clinicEstimatedCost, values.usEstimatedCost]}
          onChange={handlePriceChange}
          min={1000}
          max={50000}
          step={500}
          pearling
          minDistance={5000}
          renderThumb={({ key, ...rest }, state) => (
            <div {...rest} key={key} className="thumb">
              <div
                className={cn(
                  "tooltip absolute top-[-30px] left-1/2 -translate-x-1/2  bg-accent/20 text-accent font-medium font-outfit text-xs whitespace-nowrap tracking-wide brightness-105 p-1 rounded",
                  state.index === 0 && "ml-1",
                  state.index === 1 && "-translate-x-9"
                )}
              >
                ${state.valueNow}
              </div>
            </div>
          )}
        />

        <div className="flex justify-between text-sm text-secondary/75 bg-transparent">
          <div className="flex flex-col gap-y-2.5">
            <span className="font-plus-sans text-xs">
              Clinic estimated cost
            </span>

            <span className="block p-2 text-center rounded-md border-none outline-none font-outfit text-sm shadow-[0_0_0_1px] shadow-hairline/25">
              {formatNumber(values.clinicEstimatedCost, {
                currency: "USD",
                decimals: 0
              })}
            </span>
          </div>

          <div className="flex flex-col gap-y-2.5">
            <span className="font-plus-sans text-xs">
              Typical cost in the U.S.
            </span>

            <span className="block p-2 text-center rounded-md border-none outline-none font-outfit text-sm shadow-[0_0_0_1px] shadow-hairline/25">
              {formatNumber(values.usEstimatedCost, {
                currency: "USD",
                decimals: 0
              })}
            </span>
          </div>
        </div>
      </div>

      <Dots className="h-40" />
    </div>
  );
};

const MediaUpload = (props: any) => {
  const {
    required,
    name,
    errors,
    touched,
    values,
    setFieldValue,
    setFieldTouched
  } = props;

  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (values[name] && previews.length === 0) {
      const incomingFiles = values[name];
      const newPreviews = incomingFiles.map((file: File) =>
        URL.createObjectURL(file)
      );
      setPreviews(newPreviews);
    }
  }, [values[name]]);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: (incomingFiles: File[]) => {
      if (previews.length + incomingFiles.length > 6) {
        return alert("You can only upload up to 6 images.");
      }

      const newPreviews = incomingFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews((prev) => [...prev, ...newPreviews]);

      setFieldValue(name, [...(values[name] || []), ...incomingFiles]);
    },
    maxFiles: 6,
    maxSize: 500 * 1024,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/jpg": [],
      "image/svg": []
    }
  });

  const handleRemove = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    setFieldValue(
      name,
      values[name].filter((_: File, i: number) => i !== index)
    );
  };

  return (
    <div className="w-full transition-all duration-300 will-change-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 transition-all duration-300 will-change-auto">
        {previews.map((preview, index) => (
          <div
            key={index}
            className="relative w-full h-32 bg-muted rounded-md overflow-hidden transition-all duration-300 will-change-auto"
          >
            <Image
              src={preview}
              alt={`Uploaded Preview ${index + 1}`}
              priority
              fill
              quality={100}
              className="object-cover object-center"
            />
            <motion.button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1.5 right-1.5 size-7 grid place-items-center p-px border-none outline-none focus:outline-none rounded-full text-sm text-destructive hover:underline shadow-[0_0_0_1px] shadow-destructive/25 hover:shadow-destructive/10 bg-destructive-foreground backdrop-filter"
            >
              <IconX className="stroke-destructive" size={20} />
            </motion.button>
          </div>
        ))}
      </div>

      {previews.length < 6 && (
        <div
          {...getRootProps({
            className: cn(
              "w-full min-h-20 bg-muted hover:bg-background focus:bg-background focus-within:bg-background p-2 rounded-md place-items-center relative text-md leading-[23px] border-1 border-transparent hover:border-accent/50 focus:border-accent/50 focus-within:border-accent/50 focus:outline-none transition-all duration-300",
              isDragActive
                ? "bg-accent/20 border-accent/25 shadow-[inset_0px_0px_16px] shadow-accent/50"
                : "bg-muted hover:bg-background focus:bg-background focus-within:bg-background text-secondary/85",
              errors?.[name] && touched?.[name] && "!border-destructive/50"
            )
          })}
          onBlurCapture={() => setFieldTouched(name, true, true)}
        >
          <input
            type="file"
            name={name}
            required={required}
            style={{ opacity: 0 }}
            ref={hiddenInputRef}
          />

          <input {...getInputProps()} />

          {isDragActive ? (
            <p className="font-geist-sans text-sm text-secondary/75 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              Drop your file here...
            </p>
          ) : (
            <p className="font-geist-sans text-sm text-secondary/75 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              Drag & drop a file here, or click to select a file
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const Dots: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        "absolute top-0 h-32 left-0 w-full bg-background bg-dot-black/[0.2] grid grid-cols-1 z-0",
        className
      )}
    >
      <div className="relative w-full h-full flex place-items-center bg-transparent">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </div>
  );
};

ClinicForm.displayName = "ClinicForm";
AddClinicDialogForm.displayName = "AddClinicDialogForm";

export { AddClinicDialogForm, ClinicForm };
