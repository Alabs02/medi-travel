"use client";

import {
  CellContext,
  Column,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

import { Server, UI } from "@/models";
import { DataTableHeader } from "./data-table-header";
import { DataTableSpan } from "./data-table-span";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Loader,
  Motion,
  Label,
  Input
} from "@/components/ui";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { IconEditCircle } from "@tabler/icons-react";
import { useState } from "react";
import { useAuthStore } from "@/store/auth";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDisableUser, useEditUser, useEnableUser } from "@/hooks";

export const userExportColumns = [
  {
    id: "name",
    accessorKey: "name",
    title: "Full Name",
    accessorFn: (row: Server.IUser) => row.name
  },
  {
    id: "email",
    accessorKey: "email",
    title: "Email Address",
    accessorFn: (row: Server.IUser) => row.email
  },
  {
    id: "role",
    accessorKey: "role.name",
    title: "User Role",
    presentation: "badge",
    accessorFn: (row: Server.IUser) => row.role?.name
  },
  {
    id: "isActive",
    accessorKey: "isActive",
    title: "Access Status",
    presentation: "badge",
    accessorFn: (row: Server.IUser) => (row.isActive ? "enabled" : "disabled")
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    title: "Date Created",
    type: "date",
    accessorFn: (row: Server.IUser) => row.createdAt
  }
];

export const userColumns: ColumnDef<Server.IUser>[] = [
  {
    id: "serial-number",
    header: ({ column }) => <DataTableHeader column={column} title={"S/N"} />,
    cell: ({ row }) => <DataTableSpan value={row.index + 1} />
  },
  ...userExportColumns.map(
    ({ id, title, accessorKey, presentation, type, accessorFn }) => ({
      id,
      accessorFn,
      header: ({ column }: { column: Column<Server.IUser, unknown> }) => (
        <DataTableHeader column={column} title={title} />
      ),
      cell: (info: CellContext<Server.IUser, any>) => (
        <DataTableSpan
          value={info.getValue()}
          type={type as any}
          varaint={
            accessorKey === "isActive"
              ? info.getValue() === "enabled"
                ? "success"
                : "destructive"
              : "accent"
          }
          presentation={presentation as any}
        />
      )
    })
  ),
  {
    id: "actions",
    header: () => null,
    cell: ({ row }: { row: Row<Server.IUser> }) => <RowActions row={row} />
  }
];

const RowActions: React.FC<{ row: Row<Server.IUser> }> = ({ row }) => {
  const userId = row.original.id;

  const isActive = row.original.isActive;

  const [edit, setEdit] = useState(false);
  const [enable, setEnable] = useState(false);
  const [disable, setDisable] = useState(false);

  const { mutate: onEdit, isPending: isEditing } = useEditUser();
  const { mutate: onEnable, isPending: isEnabling } = useEnableUser();
  const { mutate: onDisable, isPending: isDisabling } = useDisableUser();

  const handleEnableUser = async () => {
    onEnable(userId, {
      onSuccess: () => {
        setTimeout(() => {
          setEnable(false);
        }, 200);
      }
    });
  };

  const handleDisableUser = async () => {
    onDisable(userId, {
      onSuccess: () => {
        setTimeout(() => {
          setDisable(false);
        }, 200);
      }
    });
  };

  const handleEditUser = async (values: { name: string; roleId: string }) => {
    onEdit(
      { id: userId, payload: { ...values, photoUrl: "" } },
      {
        onSuccess: () => {
          setTimeout(() => {
            setEdit(false); // ! Redundant
          }, 200);
        }
      }
    );
  };

  return (
    <>
      <div className="flex items-center justify-start gap-2.5">
        <Motion.OutlinedButton
          type="button"
          variant="info"
          disabled={!isActive}
          onClick={() => setEdit(true)}
          className="py-1.5 px-3 rounded-full !shadow-info/35 hover:!shadow-info/35 !text-info disabled:opacity-65"
        >
          <IconEditCircle size={20} />
          <span className="font-outfit text-sm">Edit</span>
        </Motion.OutlinedButton>

        <Motion.OutlinedButton
          type="button"
          disabled={!isActive}
          onClick={() => setEnable(true)}
          className="py-1.5 px-3 rounded-full !shadow-accent/35 !text-accent disabled:opacity-65"
        >
          <ToggleRight size={20} />
          <span className="font-outfit text-sm">Enable</span>
        </Motion.OutlinedButton>

        <Motion.OutlinedButton
          type="button"
          variant="destructive"
          disabled={isActive}
          onClick={() => setDisable(true)}
          className="py-1.5 px-3 rounded-full !shadow-destructive/35 hover:!shadow-destructive/35 !text-destructive disabled:opacity-65"
        >
          <ToggleLeft size={20} />
          <span className="font-outfit text-sm">Disable</span>
        </Motion.OutlinedButton>
      </div>

      <Dialog open={disable} onOpenChange={setDisable}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Disable User Account
            </DialogTitle>
            <DialogDescription className="text-center">
              This action will revoke the user’s access to the system. You can
              re-enable the account later if needed. All changes are logged for
              audit purposes.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-center w-full gap-x-5">
            <Motion.GhostButton
              type="button"
              onClick={() => setDisable(false)}
              className="py-2.5 px-5"
            >
              <span className="font-outfit">Cancel</span>
            </Motion.GhostButton>

            <Motion.Button
              type="button"
              disabled={isDisabling}
              variant="destructive"
              onClick={handleDisableUser}
              className="py-2.5 px-5"
            >
              {isDisabling && (
                <Loader className="border-r-white border-l-white border-b-white border-t-accent-50" />
              )}

              <span className="font-outfit">
                {isDisabling ? "Please Wait..." : "Confirm & Disable"}
              </span>
            </Motion.Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={enable} onOpenChange={setEnable}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Enable User Account
            </DialogTitle>
            <DialogDescription className="text-center">
              This will restore the user’s access to the system. They’ll be able
              to log in and perform permitted actions based on their assigned
              role.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-center w-full gap-x-5">
            <Motion.GhostButton
              type="button"
              onClick={() => setEnable(false)}
              className="py-2.5 px-5"
            >
              <span className="font-outfit">Cancel</span>
            </Motion.GhostButton>

            <Motion.Button
              type="button"
              disabled={isEnabling}
              variant="success"
              onClick={handleEnableUser}
              className="py-2.5 px-5"
            >
              {isEnabling && (
                <Loader className="border-r-white border-l-white border-b-white border-t-accent-50" />
              )}

              <span className="font-outfit">
                {isEnabling ? "Please Wait..." : "Confirm & Enable"}
              </span>
            </Motion.Button>
          </div>
        </DialogContent>
      </Dialog>

      <EditUserDialog
        open={edit}
        onOpenChange={setEdit}
        row={row}
        loading={isEditing}
        onSubmitEdit={handleEditUser}
      />
    </>
  );
};

export const EditUserDialog = ({
  loading,
  open,
  onOpenChange,
  row,
  onSubmitEdit
}: UI.EditUserDialogProps) => {
  const { getAllRoles } = useAuthStore();

  console.log({ roles: getAllRoles() });

  const formik = useFormik({
    initialValues: {
      name: row.original.name || "",
      roleId: row.original.role?.id || ""
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      roleId: Yup.string().required("Role is required")
    }),
    onSubmit: async (values) => {
      await onSubmitEdit(values);

      setTimeout(() => {
        onOpenChange(false);
      }, 200);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Edit User</DialogTitle>
          <DialogDescription className="text-center">
            Update the user's name and assigned role.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="name">Full Name</Label>

            <Input
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="!bg-background border-border"
              placeholder="e.g. Jane Doe"
            />

            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-destructive mt-1">
                {formik.errors.name}
              </p>
            )}
          </div>

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
                {getAllRoles().map((role) => (
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
                {loading ? "Please Wait..." : "Update & Save"}
              </span>
            </Motion.Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
