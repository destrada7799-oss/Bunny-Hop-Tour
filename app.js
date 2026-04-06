// 1. USE A "MUTED" TILE SET (CartoDB Positron)
// This makes the map grey/white so your Green trail actually POPs.
const map = L.map('map', { 
    zoomControl: false,
    attributionControl: false 
}).setView([25.646, -80.313], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);

// 2. DATA WITH BRANDED HOOKS
const properties = [
    {
        name: "Stop 1: The Pinecrest Oasis",
        address: "6845 SW 129th Ter, Pinecrest",
        price: "$2,000,000",
        hook: "Backyard Oasis • Impact Windows",
        coords: [25.6515, -80.3044],
        url: "https://www.compass.com/app/listing/6845-SW-129th-Ter-Pinecrest-FL-33156/2068948077798514065"
    },
    {
        name: "Stop 2: The Modern Turnkey",
        address: "13800 SW 79th Ct, Palmetto Bay",
        price: "$1,849,000",
        hook: "Fully Renovated • Ensuite Bathrooms",
        coords: [25.6429, -80.3218],
        url: "https://www.compass.com/app/listing/13800-SW-79th-Ct-Palmetto-Bay-FL-33158/2000093879270748849"
    },
    {
        name: "Stop 3: The Expansive Corner",
        address: "7700 SW 139th Ter, Palmetto Bay",
        price: "$1,500,000",
        hook: "26,000+ SF Lot • 4BD + Office",
        coords: [25.6418, -80.3184],
        url: "https://www.compass.com/app/listing/7700-SW-139th-Ter-Palmetto-Bay-FL-33158/2043653531477940161"
    }
];

// 3. RENDER CUSTOM EGG MARKERS
properties.forEach((prop, i) => {
    // Deep Link for Navigation
    const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(prop.address)}`;
    
    // Custom Styled Egg Icon
    const eggIcon = L.divIcon({
        className: 'custom-egg-marker',
        html: `<div class="egg-shape"><span>${i + 1}</span></div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    });

    const popupHtml = `
        <div class="custom-popup">
            <div class="popup-header">
                <strong>${prop.name}</strong>
                <p>${prop.address}</p>
            </div>
            <div class="popup-body">
                <p class="price">${prop.price}</p>
                <p class="hook">${prop.hook}</p>
                <div class="button-group">
                    <a href="${prop.url}" target="_blank" class="btn-listing">DETAILS</a>
                    <a href="${navUrl}" target="_blank" class="btn-nav">NAVIGATE</a>
                </div>
            </div>
        </div>
    `;

    L.marker(prop.coords, { icon: eggIcon }).addTo(map).bindPopup(popupHtml);
});

// 4. THE ANIMATED TRAIL
const trail = L.polyline(properties.map(p => p.coords), {
    color: '#059669', // Emerald Green
    weight: 4,
    dashArray: '10, 15',
    className: 'animated-trail'
}).addTo(map);
