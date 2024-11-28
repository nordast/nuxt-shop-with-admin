import { h } from "vue";
import ActionMenu from "./CellAction.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import CellValue from "~/components/Admin/Color/CellValue.vue";
import { formatDateTime } from "~/lib/utils";

export interface Color {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}

export const columns: ColumnDef<Color>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      return h(CellValue, { colorCode: row.original.value });
    },
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
        h(ActionMenu, { color: row.original }),
      );
    },
  },
];
