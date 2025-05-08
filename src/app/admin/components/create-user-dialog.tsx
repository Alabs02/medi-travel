"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";
import { Loader } from "lucide-react";
import { Motion } from "@/components/ui";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  loading: boolean;
  onSubmitCreate: (values: {
    name: string;
    email: string;
    password: string;
    roleId: string;
  }) => Promise<void>;
}

export const CreateUserDialog = ({
  open,
  onOpenChange,
  loading,
  onSubmitCreate
}: CreateUserDialogProps) => {
  const { getAllRoles } = useAuthStore();
  const [roles, setRoles] = useState(getAllRoles);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      roleId: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
      roleId: Yup.string().required("Role is required")
    }),
    onSubmit: async (values) => {
      await onSubmitCreate(values);
      setTimeout(() => {
        onOpenChange(false);
      }, 200);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Add New User</DialogTitle>
          <DialogDescription className="text-center">
            Provide user details and assign a role to grant access.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-2">
          {/* Name */}
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g. Jane Doe"
              className="!bg-background border-border"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-destructive mt-1">
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g. janedoe@email.com"
              className="!bg-background border-border"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-destructive mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Minimum 6 characters"
              className="!bg-background border-border"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-destructive mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <Label htmlFor="role">Role</Label>
            <Select
              value={formik.values.roleId}
              onValueChange={(value) => formik.setFieldValue("roleId", value)}
            >
              <SelectTrigger className="min-h-11">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem
                    key={role.id}
                    value={role.id}
                    className="uppercase"
                  >
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.roleId && formik.errors.roleId && (
              <p className="text-sm text-destructive mt-1">
                {formik.errors.roleId}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-center items-center gap-2 pt-4">
            <Motion.GhostButton
              type="button"
              onClick={() => onOpenChange(false)}
              className="py-2.5 px-5"
            >
              <span className="font-outfit">Cancel</span>
            </Motion.GhostButton>

            <Motion.Button
              type="submit"
              disabled={loading}
              variant="info"
              className="py-2.5 px-5"
            >
              {loading && (
                <Loader className="border-r-white border-l-white border-b-white border-t-accent-50" />
              )}
              <span className="font-outfit">
                {loading ? "Please Wait..." : "Create User"}
              </span>
            </Motion.Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
