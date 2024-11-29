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
      return h(
        "div",
        { class: "relative" },
        h(ActionMenu, { category: row.original }),
      );
    },
  },
];
