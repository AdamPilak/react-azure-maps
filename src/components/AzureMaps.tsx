import * as atlas from "azure-maps-control";
import "azure-maps-control/dist/atlas.min.css";
import { MutableRefObject, useEffect, useRef } from "react";

const AzureMaps = ({
  subscriptionKey,
  parkings,
}: {
  subscriptionKey: string;
  parkings: any[];
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let map: atlas.Map;

    const loadMap = (mapRef: MutableRefObject<HTMLDivElement | null>) => {
      if (!mapRef) return;

      map = new atlas.Map(mapRef.current!, {
        authOptions: {
          authType: atlas.AuthenticationType.subscriptionKey,
          subscriptionKey: subscriptionKey,
        },
        center:
          parkings.length > 0
            ? [parkings[0].position[0], parkings[0].position[1]]
            : [0, 0],
        zoom: 10,
        view: "Auto",
      });

      map.events.add("ready", () => {
        parkings.forEach((parking) => {
          const marker = new atlas.HtmlMarker({
            markerColor: "DodgerBlue",
            text: "P",
            position: [parking.position[0], parking.position[1]],
          });

          const popup = new atlas.Popup({
            pixelOffset: [0, -30],
          });

          map.events.add("click", marker, () => {
            popup.setOptions({
              position: [parking.position[0], parking.position[1]],
              content: `<div style="padding:10px">${parking.name}<br>${parking.address}</div>`,
            });

            popup.open(map);
          });

          map.markers.add(marker);
          map.popups.add(popup);
        });
      });
    };

    loadMap(mapRef);

    return () => {
      if (map) map.dispose();
    };
  }, [subscriptionKey, parkings]);

  return (
    <div ref={mapRef} className="h-full w-full">
      AzureMaps
    </div>
  );
};

export default AzureMaps;
