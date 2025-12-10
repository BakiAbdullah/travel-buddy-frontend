/* eslint-disable @typescript-eslint/no-explicit-any */
export const getTravelTypeColor = (
  type: "FRIENDS" | "SOLO" | "FAMILY"
) => {
  const colors: Record<string, string> = {
    FRIENDS: "bg-blue-100 text-blue-700 border-blue-200",
    SOLO: "bg-purple-100 text-purple-700 border-purple-200",
    FAMILY: "bg-green-100 text-green-700 border-green-200",
    COUPLE: "bg-pink-100 text-pink-700 border-pink-200",
  };
  return colors[type] || "bg-gray-100 text-gray-700 border-gray-200";
};

export const calculateDuration = (start: any, end: any) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
