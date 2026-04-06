// Map Initialization
const map = L.map('map', {
    zoomControl: false,
    attributionControl: false
}).setView([25.646, -80.313], 14);

// Clean, Minimalist Tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

// Property Data
const properties = [
    {
        name: "Stop 1: The Pinecrest Oasis",
        price: "$2,000,000",
        coords: [25.6515, -80.3044],
        url: "https://www.compass.com/app/listing/6845-SW-129th-Ter-Pinecrest-FL-33156/2068948077798514065"
    },
    {
        name: "Stop 2: The Modern Turnkey",
        price: "$1,849,000",
        coords: [25.6429, -80.3218],
        url: "https://www.compass.com/app/listing/13800-SW-79th-Ct-Palmetto-Bay-FL-33158/2000093879270748849"
    },
    {
        name: "Stop 3: The Expansive Corner",
        price: "$1,500,000",
        coords: [25.6418, -80.3184],
        url: "https://www.compass.com/app/listing/7700-SW-139th-Ter-Palmetto-Bay-FL-33158/2043653531477940161"
    }
];

// Create Markers & Trail
const pathPoints = [];

properties.forEach((prop, index) => {
    pathPoints.push(prop.coords);
    
    const icon = L.divIcon({
        className: 'egg-marker',
        html: `<span>${index + 1}</span>`,
        iconSize: [32, 32]
    });

    const popupHtml = `
        <div class="flex flex-col">
            <div class="bg-emerald-900 p-3 text-white">
                <p class="text-[10px] uppercase opacity-70">Property Intel</p>
                <h3 class="font-bold leading-tight">${prop.name}</h3>
            </div>
            <div class="p-3">
                <p class="text-xl font-black text-emerald-700">${prop.price}</p>
                <a href="${prop.url}" target="_blank" class="mt-3 block w-full text-center bg-stone-900 text-white text-xs py-2 rounded-lg font-bold">VIEW FULL LISTING</a>
            </div>
        </div>
    `;

    L.marker(prop.coords, { icon }).addTo(map).bindPopup(popupHtml);
});

// Draw Animated Trail
L.polyline(pathPoints, {
    color: '#059669',
    weight: 3,
    className: 'bunny-path'
}).addTo(map);

// Geolocate Functionality
document.getElementById('locate-btn').addEventListener('click', () => {
    map.locate({setView: true, maxZoom: 16});
});

map.on('locationfound', (e) => {
    L.circle(e.latlng, {radius: 50, color: '#059669'}).addTo(map);
});
