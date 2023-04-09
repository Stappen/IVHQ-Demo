let selectedCountryIdx = 0;

// Use fetch to simulate retrieving data from a server
// Get data from the local data file and parse it into a JavaScript object
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    createSideBar(data, 0);
    createTable(data[selectedCountryIdx]);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Populates the countries sidebar with all countries in data.json
// data: The fetched json data
// selectedIdx: Used to set the initially selected country
function createSideBar(data, selectedIdx) {
    let countries = document.getElementById("countries");
    if (data && countries) {
        for (let i = 0; i < data.length; i++) {
            let country = document.createElement("div");
            let p = document.createElement("p");

            p.innerHTML = data[i].name;

            // If the selectedIdx parameter is given, then select the right country and create the table
            if (selectedIdx == i) {
                country.classList.add('selected');

                selectedCountryIdx = i;
                createTable(data[selectedCountryIdx]);
            }

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

                selectedCountryIdx = i;
                createTable(data[selectedCountryIdx]);
            });

            country.appendChild(p);
            countries.appendChild(country);
        }
    }
}

// Create the disclaimer and table body to show the prices
// selectedCountry: The json object of the selected country
function createTable(selectedCountry) {
    // Check if data exists before attempting to create a table with it
    if (selectedCountry) {
        // In this demo there isn't more than one project, however if there were then
        // I might consider creating more than one table depending on the amount of data being displayed
        let project = selectedCountry && selectedCountry.projects && selectedCountry.projects[0];
        let disclaimerArr = project && project.fees_disclaimer;
        let feesArr = project && project.fees;

        if (disclaimerArr) {
            let disclaimerContainer = document.getElementById("disclaimer");

            // Remove any disclaimers from previously selected countries
            while (disclaimerContainer.firstChild) {
                disclaimerContainer.removeChild(disclaimerContainer.firstChild);
            }
            
            // Add the new disclaimers
            for (let i = 0; i < disclaimerArr.length; i++) {
                let disclaimerParagraph = document.createElement("p");
                disclaimerParagraph.textContent = disclaimerArr[i];
                disclaimerContainer.appendChild(disclaimerParagraph);
            }
        }

        if (feesArr) {
            // Create the tbody element we will put our data in
            let tableBody = document.createElement("tbody");

            for (let i = 0; i < feesArr.length; i++) {
                let row = tableBody.insertRow();
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                cell1.innerHTML = feesArr[i].duration;
                cell2.innerHTML = '$' + feesArr[i].costs.us;
                cell3.innerHTML = '$' + feesArr[i].costs.gb;
            }

            // add the table to the container
            let dataTable = document.getElementById("data-table");
            if (dataTable) {
                // Of there's a table body from a previously selected country, remove that before adding the new one
                let oldTbody = dataTable.getElementsByTagName("tbody")[0];
                oldTbody && dataTable.removeChild(oldTbody);
    
                dataTable.appendChild(tableBody);
            }
        }
    
    }
}