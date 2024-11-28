import { h } from "vue";
import ActionMenu from "./CellAction.vue";
import type { ColumnDef } from "@tanstack/vue-table";

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;

      return h("div", { class: "relative" }, h(ActionMenu, { category: item }));
    },
  },
  // {
  //   accessorKey: "amount",
  //   header: () => h("div", { class: "text-right" }, "Amount"),
  //   cell: ({ row }) => {
  //     const amount = Number.parseFloat(row.getValue("amount"));
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);
  //
  //     return h("div", { class: "text-right font-medium" }, formatted);
  //   },
  // },
];
