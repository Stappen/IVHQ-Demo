// Show the disclaimer for the fees table
// selectedCountry: The json object of the selected country
function createDisclaimers(selectedCountry) {
    // In this demo there isn't more than one project, however if there were then
    // I might consider creating more than one table depending on the amount of data being displayed
    let project = selectedCountry && selectedCountry.projects && selectedCountry.projects[0];
    let disclaimerArr = project && project.fees_disclaimer;

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
}

// Create the table body to show the prices
// selectedCountry: The json object of the selected country
function createTable(selectedCountry) {
    // In this demo there isn't more than one project, however if there were then
    // I might consider creating more than one table depending on the amount of data being displayed
    let project = selectedCountry && selectedCountry.projects && selectedCountry.projects[0];
    let feesArr = project && project.fees;

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

        // Add the table to the container
        let dataTable = document.getElementById("data-table");
        if (dataTable) {
            // If there's a table body from a previously selected country, remove that before adding the new one
            clearTable();
            dataTable.appendChild(tableBody);
        }
    }
}

// Removes the tbody element inside of the fees table
function clearTable() {
    let dataTable = document.getElementById("data-table");
    let oldTbody = dataTable.getElementsByTagName("tbody")[0];
    oldTbody && dataTable.removeChild(oldTbody);
}