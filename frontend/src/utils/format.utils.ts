export const formatDate = (date: Date): string =>
    date.toISOString().split("T")[0];
  
  export const formatTime = (time: Date | null): string =>
    time?.toTimeString().split(" ")[0] ?? "00:00:00";
  
  export const formatTimeFromString = (time: string): string => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };