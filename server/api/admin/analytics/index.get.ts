import {
  getGraphData,
  getSalesCount,
  getStockCount,
  getTotalRevenue,
} from "~/server/api/utils/analytics";

export default defineEventHandler(async () => {
  const totalRevenue = await getTotalRevenue();
  const stockCount = await getStockCount();
  const salesCount = await getSalesCount();
  const graphData = await getGraphData();

  return {
    totalRevenue,
    stockCount,
    salesCount,
    graphData,
  };
});
