export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
};

export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h${minutes.toString().padStart(2, "0")}`;
};

export const formatDate = (departureDate: string): string => {
  const [year, month, day] = departureDate.split("-");
  return `${day}/${month}/${year}`;
};

export const formatLongDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};
