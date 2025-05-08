"use client";

import React, { useEffect, useState } from "react";
import {
  Input,
  Loader,
  Motion,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton
} from "@/components/ui";
import { GradientText } from "@/components/ui/gradient-text";
import {
  IconArrowNarrowLeft,
  IconCalendarCheck,
  IconCalendarEvent,
  IconExternalLink,
  IconFolderOpen,
  IconLogs,
  IconSearch,
  IconUserPlus,
  IconUsersGroup
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import {
  type ColumnFiltersState,
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

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import * as XLSX from "xlsx";

import { Server } from "@/models";
import {
  userColumns,
  userExportColumns
} from "@admin/components/data-table/user-columns";
import { AnimatePresence, motion } from "framer-motion";
import { cn, formatDate, formatTotalCount } from "@/lib";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { routes, successCodes, whileTapOptions } from "@/constants";
import { CreateUserDialog } from "@admin/components";
import { DataTableEmptyState } from "@admin/components/data-table/data-table-empty-state";
import { DataTableLoadingState } from "@admin/components/data-table/data-table-loading-state";
import { DataTableColumnControl } from "@admin/components/data-table/data-table-column-control";
import { useAuthStore } from "@/store/auth";
import { useAnalyticStore } from "@/store/analytics";
import {
  toast,
  useCreateUser,
  useSpoolAnalytics,
  useSpoolRoles,
  useSpoolUsers
} from "@/hooks";
import { useUserStore } from "@/store/users";
import { http } from "@/services";
import { isEmpty } from "@/_";

const MotionIconCalendarCheck = motion.create(IconCalendarCheck);
const MotionIconCalendarEvent = motion.create(IconCalendarEvent);

const Content = () => {
  useSpoolRoles();
  const router = useRouter();

  const [to, setTo] = useState<Date | undefined>();
  const [from, setFrom] = useState<Date | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [isExporting, setIsExporting] = useState(false);
  const [open, setOpen] = useState(false);

  const payload = {
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    isActive: null,
    search: searchQuery,
    to: to ? to.toISOString() : null,
    from: from ? from.toISOString() : null
  };

  const { isFetching: isSpoolingUsers } = useSpoolUsers(payload);
  const { getUsers } = useUserStore();

  const { mutateAsync: createUser, isPending: loading } = useCreateUser();

  const table = useReactTable({
    data: getUsers(),
    columns: userColumns,
    state: {
      columnVisibility,
      columnFilters,
      pagination
    },
    getRowId: (row) => row.id.toString(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  const exportDataToExcel = async () => {
    try {
      setIsExporting(true);

      const params = {
        ...payload,
        page: 1,
        limit: 100
      };

      const response = await http.get<Server.PaginatedResponse<Server.IUser[]>>(
        routes.internal.SPOOL_USERS(params)
      );

      if (!successCodes.includes(response.status)) {
        toast({
          variant: "destructive",
          title: "Oops! Something Went Wrong",
          description: "Couldn’t fetch data. Try again later."
        });
        return [];
      }

      const { results } = response.data.data;

      const formatted = results.map((row) => {
        const record: Record<string, string> = {};

        userExportColumns.forEach((col) => {
          let value = col.accessorFn(row);

          if (col.type === "date" && value) {
            value = formatDate(value);
          }

          record[col.title] = value ?? "";
        });

        return record;
      });

      // Create worksheet and workbook
      const worksheet = XLSX.utils.json_to_sheet(formatted);

      // Style the headers
      const headerStyle = {
        font: { bold: true },
        fill: { fgColor: { rgb: "EDEDED" } }
      };

      const range = XLSX.utils.decode_range(worksheet["!ref"]!);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
        if (!worksheet[cellAddress]) continue;
        worksheet[cellAddress].s = headerStyle;
      }

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

      XLSX.writeFile(workbook, "users_export.xlsx");

      toast({
        title: "Export Successful 🎉",
        description: "Users exported to Excel successfully."
      });
    } catch (error: any) {
      console.error("Export error", error);
      toast({
        variant: "destructive",
        title: "Oops! Something Went Wrong",
        description: "Couldn’t export the data. Try again later."
      });
    } finally {
      setIsExporting(false);
    }
  };

  const { isFetching: isSpoolingAnalytics } = useSpoolAnalytics();
  const { getAllUsersAnalytics } = useAnalyticStore();
  const { getProfile } = useAuthStore();

  // ! Remember to use Next Js Middleware Mechamism
  const isAdmin = () => {
    const profile = getProfile();

    if (!profile || isEmpty(profile)) return false;

    const roleName = profile?.role?.name;
    if (typeof roleName !== "string") return false;

    return roleName.trim().toLowerCase() === "admin";
  };

  useEffect(() => {
    if (!isAdmin()) {
      router.replace("/");
    }
  }, []);

  return (
    <>
      <section className="w-full flex flex-col md:flex-row md:items-center md:justify-between px-5">
        <h1 aria-label="User Management">
          <GradientText
            text="User Management"
            className="font-plus-sans font-extrabold text-lg md:text-xl text-pretty whitespace-nowrap"
          />
        </h1>

        <Motion.OutlinedButton
          type="button"
          onClick={() => router.replace("/")}
        >
          <IconArrowNarrowLeft />
          <span className="font-outfit">Return</span>
        </Motion.OutlinedButton>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-5 gap-5">
        <div className="w-full flex flex-col items-start gap-y-2.5">
          <Motion.OutlinedButton
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full !text-accent !shadow-accent/50"
          >
            <IconUserPlus />
            <span className="font-outfit">Add New User</span>
          </Motion.OutlinedButton>

          <p className="text-secondary/75 font-geist-sans text-sm text-pretty">
            Add new users and assign roles to grant the right access from day
            one.
          </p>
        </div>

        <div className="relative w-full h-full flex flex-col gap-y-1.5 rounded-md shadow-[0_0_0_1px] shadow-border bg-background/35 p-5 pb-2.5">
          <h4
            aria-label="Users Onboarded"
            className="flex items-center gap-x-2.5"
          >
            <IconFolderOpen className="text-secondary/50" />

            <GradientText
              text="Users Onboarded"
              className="font-plus-sans font-semibold text-base opacity-75 text-pretty whitespace-nowrap"
            />
          </h4>
          <div className="pt-1">
            {isSpoolingAnalytics ? (
              <Skeleton className="w-24 h-6 rounded-2xl" />
            ) : (
              <GradientText
                text={formatTotalCount(getAllUsersAnalytics().totalUsers)}
                gradient="bg-gradient-to-b from-destructive to-accent transition-all duration-500"
                className="font-plus-sans font-extrabold text-2xl md:text-3xl lg:text-[34px] !leading-[1.2] text-pretty whitespace-nowrap transition-all duration-300"
              />
            )}
          </div>

          <p className="text-[13px] text-secondary/65">All Registered Users</p>
        </div>

        <div className="relative col-span-1 md:col-span-2 w-full h-full flex flex-col gap-y-2.5 rounded-md shadow-[0_0_0_1px] shadow-border bg-background/35 p-5 pb-2.5">
          <h4 aria-label="Total Users" className="flex items-center gap-x-2.5">
            <IconUsersGroup className="text-secondary/50" />

            <GradientText
              text="User Access Status"
              className="font-plus-sans font-semibold text-base opacity-75 text-pretty whitespace-nowrap"
            />
          </h4>

          <div className="flex items-center justify-between gap-5 w-full">
            <div className="flex flex-col gap-y-1.5">
              {isSpoolingAnalytics ? (
                <Skeleton className="w-24 h-6 rounded-2xl" />
              ) : (
                <div>
                  <GradientText
                    text={formatTotalCount(getAllUsersAnalytics().activeUsers)}
                    gradient="bg-gradient-to-b from-destructive to-accent transition-all duration-500"
                    className="font-plus-sans font-extrabold text-2xl md:text-3xl lg:text-[34px] !leading-[1.2] text-pretty whitespace-nowrap transition-all duration-300"
                  />
                </div>
              )}

              <p className="text-[13px] text-secondary/65">Active User</p>
            </div>

            <div className="flex flex-col gap-y-1.5">
              {isSpoolingAnalytics ? (
                <Skeleton className="w-24 h-6 rounded-2xl" />
              ) : (
                <div>
                  <GradientText
                    text={formatTotalCount(
                      getAllUsersAnalytics().inactiveUsers
                    )}
                    gradient="bg-gradient-to-b from-destructive to-accent transition-all duration-500"
                    className="font-plus-sans font-extrabold text-2xl md:text-3xl lg:text-[34px] !leading-[1.2] text-pretty whitespace-nowrap transition-all duration-300"
                  />
                </div>
              )}

              <p className="text-[13px] text-secondary/65">Inactive User</p>
            </div>

            <div className="flex flex-col gap-y-1.5">
              {isSpoolingAnalytics ? (
                <Skeleton className="w-24 h-6 rounded-2xl" />
              ) : (
                <div>
                  <GradientText
                    text={formatTotalCount(getAllUsersAnalytics().deletedUsers)}
                    gradient="bg-gradient-to-b from-destructive to-accent transition-all duration-500"
                    className="font-plus-sans font-extrabold text-2xl md:text-3xl lg:text-[34px] !leading-[1.2] text-pretty whitespace-nowrap transition-all duration-300"
                  />
                </div>
              )}

              <p className="text-[13px] text-secondary/65">
                Users Access Revoked
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-5 relative z-[11]">
        <div className="w-full rounded-md flex flex-col gap-y-2.5 shadow-[0_0_0_1px] shadow-border p-5">
          <h5 aria-label="Users Directory" className="">
            <GradientText
              text="Users Directory"
              className="font-plus-sans font-bold text-lg text-pretty whitespace-nowrap"
            />
          </h5>

          <nav className="w-full flex flex-col md:flex-row gap-2.5 md:items-center md:justify-between">
            <div className="flex items-center gap-2.5">
              <Popover>
                <PopoverTrigger asChild>
                  <motion.button
                    type={"button"}
                    className="flex items-center rounded h-9 p-2.5 text-sm font-medium space-x-2.5 shadow-[0_0_0_1px] shadow-border transition-all duration-200 will-change-auto"
                  >
                    <span>From</span>
                    <span
                      className={cn(
                        from ? "text-secondary/75" : "text-secondary/50"
                      )}
                    >
                      {from ? format(from as Date, "PPP") : "Select Date"}
                    </span>

                    {from ? (
                      <AnimatePresence mode={"wait"}>
                        <MotionIconCalendarCheck
                          key={"from-calendar-check"}
                          initial={{ opacity: 0, y: -6, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.95 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          size={20}
                        />
                      </AnimatePresence>
                    ) : (
                      <AnimatePresence mode={"wait"}>
                        <MotionIconCalendarEvent
                          key={"from-calendar-event"}
                          initial={{ opacity: 0, y: -6, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.95 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          size={20}
                        />
                      </AnimatePresence>
                    )}
                  </motion.button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={from}
                    onSelect={setFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <motion.button
                    type={"button"}
                    className="flex items-center rounded h-9 p-2.5 text-sm font-medium space-x-2.5 shadow-[0_0_0_1px] shadow-border transition-all duration-200 will-change-auto"
                  >
                    <span>To</span>
                    <span
                      className={cn(
                        to ? "text-secondary/75" : "text-secondary/50"
                      )}
                    >
                      {to ? format(to as Date, "PPP") : "Select Date"}
                    </span>

                    {to ? (
                      <AnimatePresence mode={"wait"}>
                        <MotionIconCalendarCheck
                          key={"to-calendar-check"}
                          initial={{ opacity: 0, y: -6, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.95 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          size={20}
                        />
                      </AnimatePresence>
                    ) : (
                      <AnimatePresence mode={"wait"}>
                        <MotionIconCalendarEvent
                          key={"to-calendar-event"}
                          initial={{ opacity: 0, y: -6, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.95 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          size={20}
                        />
                      </AnimatePresence>
                    )}
                  </motion.button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={to}
                    onSelect={setTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center gap-2.5">
              <motion.button
                {...whileTapOptions}
                type={"button"}
                disabled={isExporting}
                onClick={exportDataToExcel}
                className="flex items-center h-9 p-0.5 rounded text-sm font-medium shadow-[0_0_0_1px] shadow-border bg-border/75 hover:bg-border/35 transition-colors duration-200"
              >
                <div className="bg-white h-full rounded-[3px] px-[5px] grid place-items-center">
                  {isExporting ? (
                    <Loader className="!border-t-secondary-foreground/90 border-secondary/75" />
                  ) : (
                    <IconLogs
                      size={20}
                      className="transition-all duration-200 will-change-auto"
                    />
                  )}
                </div>

                <div className="flex items-center space-x-1 px-2.5">
                  <IconExternalLink size={20} className="rotate-180" />
                  <span className="transition-all duration-200 will-change-auto">
                    {isExporting ? "Exporting..." : "Export"}
                  </span>
                </div>
              </motion.button>

              <DataTableColumnControl table={table} />
            </div>
          </nav>

          <div className="w-full relative">
            <IconSearch
              size={20}
              className="absolute text-secondary/50 left-2.5 top-1/2 -translate-y-1/2"
            />

            <Input
              type="text"
              placeholder={"Search by name, email, or access status..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded w-full h-12 text-sm bg-background/50 hover:bg-background focus:bg-background pl-10 pr-16 border border-border/75 focus:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-accent/50 transition-all duration-200 will-change-auto"
            />

            {searchQuery.length > 3 && (
              <div className="absolute top-1/2 -translate-y-1/2 right-2.5">
                <Motion.OutlinedButton className="py-1 px-3 rounded-full !shadow-border">
                  <span className="font-outfit text-sm">Search</span>
                </Motion.OutlinedButton>
              </div>
            )}
          </div>

          <div className="w-full h-full grid grid-cols-1 shadow-[0_0_0_1px] shadow-border rounded">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length && !isSpoolingUsers
                  ? table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : null}

                {isSpoolingUsers ? (
                  <TableRow className="hover:bg-background">
                    <TableCell
                      colSpan={userColumns.length}
                      className="h-auto w-full"
                    >
                      <DataTableLoadingState className="!shadow-transparent border-none" />
                    </TableCell>
                  </TableRow>
                ) : null}

                {table.getRowModel().rows?.length === 0 && !isSpoolingUsers ? (
                  <TableRow className="hover:bg-background">
                    <TableCell
                      colSpan={userColumns.length}
                      className="h-auto w-full"
                    >
                      <DataTableEmptyState className="!shadow-transparent border-none" />
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>

          <AnimatePresence mode="wait">
            <motion.section
              key={"data-table-pagination"}
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex flex-col lg:flex-row items-center justify-between px-2.5 w-full mt-2.5 space-y-4 lg:space-y-0"
            >
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-5 w-full lg:w-auto">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-foreground/75">
                    Rows per page
                  </p>
                  <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value));
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue
                        placeholder={table.getState().pagination.pageSize}
                      />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {[10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1 text-sm text-muted-foreground">
                  Showing{" "}
                  {table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    1}{" "}
                  to{" "}
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) *
                      table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length
                  )}{" "}
                  of {table.getFilteredRowModel().rows.length} entries
                </div>
              </div>

              <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex w-[100px] items-center justify-center text-sm font-medium text-foreground/75">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeft />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight />
                  </Button>
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRight />
                  </Button>
                </div>
              </div>
            </motion.section>
          </AnimatePresence>
        </div>
      </section>

      <div className="h-10 w-full" />

      <CreateUserDialog
        open={open}
        onOpenChange={setOpen}
        loading={loading}
        onSubmitCreate={createUser}
      />
    </>
  );
};

export { Content };
