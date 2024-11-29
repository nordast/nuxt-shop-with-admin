import { h } from "vue";
import ActionMenu from "./CellAction.vue";
import type { ColumnDef } from "@tanstack/vue-table";

export interface Size {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}

export const columns: ColumnDef<Size>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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
        h(ActionMenu, { size: row.original }),
      );
    },
  },
];
