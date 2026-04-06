// Map Setup - Muted Tiles for better contrast
const map = L.map('map', { zoomControl: false }).setView([25.646, -80.313], 13);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

const properties = [
    {
        name: "Stop 1: The Pinecrest Oasis",
        address: "6845 SW 129th Ter, Pinecrest",
        price: "$2,000,000",
        hook: "Backyard Oasis • Impact Windows • Montserrat Medium",
        coords: [25.6515, -80.3044],
        url: "https://www.compass.com/app/listing/6845-SW-129th-Ter-Pinecrest-FL-33156/2068948077798514065"
    },
    {
        name: "Stop 2: The Modern Turnkey",
        address: "13800 SW 79th Ct, Palmetto Bay",
        price: "$1,849,000",
        hook: "Fully Renovated • Ensuite Bathrooms • New PVC/AC",
        coords: [25.6429, -80.3218],
        url: "https://www.compass.com/app/listing/13800-SW-79th-Ct-Palmetto-Bay-FL-33158/2000093879270748849"
    },
    {
        name: "Stop 3: The Expansive Corner",
        address: "7700 SW 139th Ter, Palmetto Bay",
        price: "$1,500,000",
        hook: "26,000+ SF Lot • 4BD + Office • Circular Driveway",
        coords: [25.6418, -80.3184],
        url: "https://www.compass.com/app/listing/7700-SW-139th-Ter-Palmetto-Bay-FL-33158/2043653531477940161"
    }
];

const pathPoints = [];

// 1. Plot Active Properties
properties.forEach((prop, i) => {
    pathPoints.push(prop.coords);
    const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(prop.address)}`;
    
    const icon = L.divIcon({
        className: 'egg-marker',
        html: `<span>${i + 1}</span>`,
        iconSize: [36, 36]
    });

    const popupHtml = `
        <div class="popup-card">
            <div class="bg-emerald-800 p-4 text-white">
                <h3 class="font-bold text-sm uppercase leading-tight">${prop.name}</h3>
                <p class="text-[10px] opacity-80 mt-1">${prop.address}</p>
            </div>
            <div class="p-4 bg-white">
                <p class="text-xl font-black text-emerald-700 leading-none">${prop.price}</p>
                <p class="text-[11px] text-stone-500 my-2 italic">"${prop.hook}"</p>
                <div class="grid grid-cols-2 gap-2 mt-4">
                    <a href="${prop.url}" target="_blank" class="text-center border-2 border-stone-800 text-stone-800 text-[10px] py-2 rounded-md font-bold hover:bg-stone-50">DETAILS</a>
                    <a href="${navUrl}" target="_blank" class="text-center bg-emerald-600 text-white text-[10px] py-2 rounded-md font-bold shadow-md hover:bg-emerald-700">NAVIGATE</a>
                </div>
            </div>
        </div>
    `;
    L.marker(prop.coords, { icon, zIndexOffset: 1000 }).addTo(map).bindPopup(popupHtml);
});

// 2. The "Coming Soon" Placeholder
const comingSoonCoords = [25.635, -80.315]; 
const soonIcon = L.divIcon({
    className: 'egg-marker opacity-40 grayscale',
    html: `<span>?</span>`,
    iconSize: [30, 30]
});
L.marker(comingSoonCoords, { icon: soonIcon })
    .addTo(map)
    .bindPopup("<div class='p-3 text-center'><p class='font-bold text-stone-500'>More stops being added soon!</p><p class='text-xs text-stone-400'>Check back Friday, April 10th</p></div>");

// 3. Animated Bunny Trail
const bunnyTrail = L.polyline(pathPoints, {
    color: '#059669',
    weight: 4,
    opacity: 0.5,
    dashArray: '10, 15',
    className: 'bunny-path'
}).addTo(map);

// 4. GPS Locate
document.getElementById('locate-btn').addEventListener('click', () => {
    map.locate({setView: true, maxZoom: 16});
});
map.on('locationfound', (e) => {
    L.circle(e.latlng, {radius: 40, color: '#059669', fillColor: '#059669', fillOpacity: 0.2}).addTo(map);
});
