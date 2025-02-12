export const getNearbyLocations = async (
  latitude: number,
  longitude: number,
  limit = 10
) => {
  try {
    const response = await fetch(
      `https://api.example.com/nearby?lat=${latitude}&lng=${longitude}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch nearby locations");
    }

    const data = await response.json();
    return data.locations;
  } catch (error) {
    console.error("Error fetching nearby locations:", error);
    return [];
  }
};
