// Populates the countries sidebar with all countries in data.json
// data: The fetched json data
// selectedIdx: Used to set the initially selected country
function createSideBar(data, selectedIdx) {
    let countries = document.getElementById("countries");
    if (data && countries) {
        for (let i = 0; i < data.length; i++) {
            let country = createCountry(data[i]);

            // If the selectedIdx parameter is given, then select the right country and create the table
            if (selectedIdx == i) {
                country.dispatchEvent(new Event("click"));
            }

            countries.appendChild(country);
        }
    }
}

// Create a country element for the sidebar with mouse triggers
function createCountry(countryData) {
    let country = document.createElement("div");
    let p = document.createElement("p");

    p.innerHTML = countryData.name;

    country.addEventListener("mouseover", function() {
        country.classList.add('hover');
    });
    country.addEventListener("mouseout", function() {
        country.classList.remove('hover');
    });
    country.addEventListener("click", function() {
        // Remove the last selected country
        let allCountries = document.querySelectorAll('#countries > div');
        allCountries.forEach(el => el.classList.remove('selected'));
        country.classList.add('selected');

        createDisclaimers(countryData);
        createTable(countryData);
    });

    country.appendChild(p);
    return country;
}