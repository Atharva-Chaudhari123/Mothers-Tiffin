document.addEventListener("DOMContentLoaded", () => {
    // Fetch the current location of the client
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Call a function to update the location details on the page
            updateLocationDetails(lat, lon);
        }, (error) => {
            console.error("Error getting location:", error);
            alert("Unable to retrieve your location.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    // Function to update the location in the UI
    function updateLocationDetails(lat, lon) {
        const locationElement = document.querySelector(".location-details");
    
        // Update the location details with latitude and longitude for now
        locationElement.innerHTML = `<p>Latitude: ${lat}</p><p>Longitude: ${lon}</p>`;
    
        // Use Geoapify Reverse Geocoding API to fetch the human-readable address
        const apiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=98ce63fee65544d5a668dbc0a362176c`;
    
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Check if a valid address is found
                if (data.features && data.features.length > 0) {
                    const address = data.features[0].properties.formatted;
                    locationElement.innerHTML = `<p>Address: ${address}</p>`;
                } else {
                    locationElement.innerHTML = `<p>Address not found. Latitude: ${lat}, Longitude: ${lon}</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching address:", error);
                locationElement.innerHTML = `<p>Error fetching address. Latitude: ${lat}, Longitude: ${lon}</p>`;
            });
    }
    
    // Simulate fetching nearby mothers' data
    // This can later be replaced with an actual fetch request from your server
    const mothers = [
        { name: "Mrs. chaudhari", rating: "2.2", reviews: 90, specialty: "Maharashtrian" },
        { name: "Mrs. Singhania", rating: "3.7", reviews: 150, specialty: "Punjabi" },
        { name: "Mrs. Darve", rating: "4.1", reviews: 80, specialty: "Italian" },
    ];

    const mothersGrid = document.querySelector(".mothers-grid");
    
    // Add nearby mothers to the grid dynamically
    mothers.forEach(mother => {
        const motherCard = document.createElement("div");
        motherCard.classList.add("mother-card"); 
        

        motherCard.innerHTML = `
            <img src="https://placehold.co/100x100" alt="Mother's Profile" class="mother-image">
            <div class="mother-details">
                <h3>${mother.name}</h3>
                <p>⭐ ${mother.rating} (${mother.reviews} reviews)</p>
                <p>Speciality: ${mother.specialty}</p>
                <button class="subscribe-btn">Subscribe</button>
            </div>
        `;
        
        mothersGrid.appendChild(motherCard);
    });
});
