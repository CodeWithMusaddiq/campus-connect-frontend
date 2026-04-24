export const getFromStorage = (key) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  } catch {
    return null;
  }
};

export const setToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
};

export const statusColor = (status) => {
  switch (status) {
    case "approved": return "bg-green-100 text-green-700";
    case "pending": return "bg-yellow-100 text-yellow-700";
    case "rejected": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
};