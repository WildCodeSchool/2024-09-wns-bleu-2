import fetch from "node-fetch";
/* export const calculateArrivalTime = (
  departureTime: string,
  duration: number
): string => {
  const [hours, minutes, seconds] = departureTime.split(":").map(Number);
  const departureDate = new Date();

  departureDate.setHours(hours, minutes, seconds);
  departureDate.setMinutes(departureDate.getMinutes() + duration);

  return departureDate.toTimeString().slice(0, 5);
};
 */
export const getTripInfos = async (
  from: [number, number],
  to: [number, number],
  departureTime: string,
  toll: boolean
): Promise<{ duration: number; arrival: string }> => {
  const apiKey = process.env.GEOPIFY_API_KEY;
  if (!apiKey) throw new Error("API key not found");

  const isToll = toll ? "" : "&avoid=tolls";
  const url = `https://api.geoapify.com/v1/routing?waypoints=${from[1]},${from[0]}|${to[1]},${to[0]}&mode=drive${isToll}&apiKey=${apiKey}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  if (!data.features?.length) {
    throw new Error("No route found");
  }
  const durationSeconds = data.features[0].properties.time;
  const durationMinutes = Math.round(durationSeconds / 60);

  const [h, m, s] = departureTime.split(":").map(Number);
  const departureDate = new Date();
  departureDate.setHours(h, m, s);
  departureDate.setMinutes(departureDate.getMinutes() + durationMinutes);

  const arrival = departureDate.toTimeString().slice(0, 5);

  return { duration: durationMinutes, arrival };
};
