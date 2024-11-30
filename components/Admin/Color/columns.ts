import { h } from "vue";
import ActionMenu from "./CellAction.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import ColorValue from "~/components/Admin/Color/ColorValue.vue";

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
      return h(ColorValue, { colorCode: row.original.value });
    },
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
        h(ActionMenu, { color: row.original }),
      );
    },
  },
];
