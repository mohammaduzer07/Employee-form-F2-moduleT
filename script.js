
// let username = document.querySelector('#name');
// let prof = document.querySelector('#prof');
// let age = document.querySelector('#age');
// let btn = document.querySelector('#addBtn');
// let error_msg = document.querySelector('.error-message');


// btn.addEventListener("click", checkEmployee);

// function checkEmployee(){

//     let userName = username.innerText;
//     let profName = prof.innerText;
//     let userAge = age.innerText;

//     if(userName === "" || profName === "" || userAge === ""){
//         error_msg.innerText = "Error: Please make sure All the fields are field before adding an employee!"
//         error_msg.style.color = "red";
//     }
// }

  // Array to store employee data
  let employees = [];

  // Generate a unique ID for new employee
  function generateId() {
      return employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
  }

  // Function to add employee to the list
  function addEmployee(name, profession, age) {
      employees.push({ id: generateId(), name, profession, age });
      updateEmployeeList();
      displayMessage("Success: Employee added!", "success");
  }

  // Function to update the list of employees visually
  function updateEmployeeList() {
      const employeeList = document.getElementById("employeeList");
      employeeList.innerHTML = ""; // Clear existing list items

      employees.forEach(employee => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `
               Name: ${employee.name}   Profession:${employee.profession}  Age: ${employee.age}
              <button data-employeeId="${employee.id}" class="deleteBtn">Delete</button>
          `;
          
          listItem.style.cssText = 'color: white; padding: 5px; border: 1px solid white; padding: 5px; justify-content: space-between; margin: 10px; width: 400px'
          employeeList.appendChild(listItem);
      });

      const deleteBtns = document.querySelectorAll(".deleteBtn");
      deleteBtns.forEach(btn => btn.addEventListener("click", handleDeleteEmployee));
      deleteBtns.style.cssText = 'background-color: black; border: 1px solid white; color: white;'
    }
    
    // Function to handle delete employee button click
    function handleDeleteEmployee(event) {
        const employeeId = event.target.dataset.employeeId;
        employeeId.style.cssText = 'background-color: white; color: black; border-radius: 5px;'
      employees = employees.filter(emp => emp.id !== parseInt(employeeId));
      updateEmployeeList();
      displayMessage("Employee deleted!", "success");
  }

  // Function to display a message
  function displayMessage(message, messageType) {
      const messageElement = document.getElementById("message");
      messageElement.className = messageType; // Set message type (success or error)
      messageElement.textContent = message;
      messageElement.style.display = "block"; // Show the message

      // Clear message after a few seconds
      setTimeout(() => {
          messageElement.style.display = "none";
      }, 3000);
  }

  // Add event listener to the form submit button
  const addEmployeeBtn = document.getElementById("addEmployeeBtn");
  addEmployeeBtn.addEventListener("click", function() {
      const name = document.getElementById("name").value;
      const profession = document.getElementById("profession").value;
      const age = document.getElementById("age").value;

      // Check if all fields are filled
      if (name && profession && age) {
          addEmployee(name, profession, age);
          // Clear the form after successful addition
          document.getElementById("employeeForm").reset();
      } else {
        let error_msg = "Please make sure All the fields are filled before adding in an employee!";
        //   error_msg.style.cssText = 'color: red'
          displayMessage(error_msg, "error");
      }
  });

  // Initialize the employee list (initially empty)
  updateEmployeeList();