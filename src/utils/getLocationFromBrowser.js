export const getLocationFromBrowser = async () => {
  if (!("geolocation" in navigator)) {
    throw new Error("Geolocation is not supported by this browser");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        console.log("Got position from browser:", pos);
        resolve(pos);
      },
      (err) => {
        console.error("Error getting geolocation:", err);
        reject(err);
      }
    );
  });
};
