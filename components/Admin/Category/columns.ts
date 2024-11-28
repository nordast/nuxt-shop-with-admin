import { h } from "vue";
import ActionMenu from "./CellAction.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { formatDateTime } from "~/lib/utils";

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
    cell: ({ row }) => {
      return formatDateTime(row.original.createdAt);
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return h(
        "div",
        { class: "relative" },
        h(ActionMenu, { category: row.original }),
      );
    },
  },
];
