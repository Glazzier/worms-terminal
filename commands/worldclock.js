export default async function worldclock(args) {
  const timeZones = [
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
    "Australia/Sydney",
    "America/Los_Angeles",
  ];

  const currentTimes = timeZones.map((zone) => {
    const time = new Date().toLocaleString("en-US", { timeZone: zone });
    return `${zone}: ${time}`;
  });

  return currentTimes.join("\n");
}
