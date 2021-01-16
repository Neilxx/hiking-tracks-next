import L from 'leaflet';

const iconUrlMap = {
  red: '/marker-red.png',
  blue: '/marker-blue.png',
}

const sizeMap = {
  md: [50, 50],
  xs: [32, 32],
}

const anchorMap = {
  md: [25, 50],
  xs: [16, 30],
}

const popupMap = {
  md: [0, -35],
  xs: [0, -25],
}

// const bluePin = () => {
//   return L.icon({
//     iconUrl: 'pin-blue.png',
//     iconSize: [96, 96], // size of the icon
//     shadowSize: [50, 64], // size of the shadow
//     iconAnchor: [45, 94], // point of the icon which will correspond to marker's location
//     shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
//   });
// }

// const redPin = () => {
//   return L.icon({
//     iconUrl: 'pin-red.png',
//     iconSize: [96, 96], // size of the icon
//     shadowSize: [50, 64], // size of the shadow
//     iconAnchor: [45, 94], // point of the icon which will correspond to marker's location
//     shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
//   });
// }

const markerTemplate = {
  iconUrl: 'marker-blue.png',
  iconSize: [50, 50], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
                        // [右 -> 左, 下 -> 上]
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [-50, -35], // point from which the popup should open relative to the iconAnchor
}

// const redMarker = L.icon(
//   {
//     ...markerTemplate,
//     iconUrl: '/marker-red.png',
//   }
// )

// const blueMarker = L.icon(
//   {
//     ...markerTemplate,
//     iconUrl: '/marker-blue.png',
//   }
// );

const CustomMarker = props => {
  return L.icon(
    {
      ...markerTemplate,
      ...props.icon && iconUrlMap[props.icon] ? { iconUrl: iconUrlMap[props.icon] } : {},
      ...props.size && sizeMap[props.size]
        ? { iconSize: sizeMap[props.size], iconAnchor: anchorMap[props.size], popupAnchor: popupMap[props.size] }
        : {},
    }
  )
};

export default CustomMarker;
