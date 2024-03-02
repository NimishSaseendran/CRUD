var selectedRow = null;

// Show Alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main); // Insert alert before the main content
    setTimeout(() => div.remove(), 3000); // Use div instead of document.querySelector(".alert")
}

// Clear Field
function clearFields(){
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#employeeId").value = "";
    document.querySelector("#description").value = "";
}

// Create Data

document.querySelector("#employee-detail").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const employeeId = document.querySelector("#employeeId").value;
    const description = document.querySelector("#description").value;

    // Validate
    if (firstName === "" || lastName === "" || employeeId === "" || description === "") {
        showAlert("Please fill in all fields", "danger");
    }else{
        if(selectedRow == null){
            const list = document.querySelector("#employee-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${employeeId}</td>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${description}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.append(row);
            selectedRow = null;
            showAlert("Employee Details Added Successfully", "success");
        }else{
            selectedRow.children[0].textContent = employeeId;
            selectedRow.children[1].textContent = firstName;
            selectedRow.children[2].textContent = lastName;
            selectedRow.children[3].textContent = description;
            selectedRow = null;
            showAlert("Employee Details Edited", "info");
        }
        clearFields();
    }
});

//Edit data
document.querySelector("#employee-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#employeeId").value = selectedRow.children[0].textContent;
        document.querySelector("#firstName").value = selectedRow.children[1].textContent;
        document.querySelector("#lastName").value = selectedRow.children[2].textContent;
        document.querySelector("#description").value = selectedRow.children[3].textContent;
    }
});

// Delete Data

document.querySelector("#employee-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
})