/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// Globals
const itemsPerPage = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   // Creating two variables to store the start index and the end index of the list items to be displayed
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;

   // Assigning the UL element with a class of 'student-list' to the variable 'studentList'
   const studentList = document.querySelector(".student-list");
   // Setting the innerHTNL of 'studentList' as empty, removing any students that may have previously been displayed
   studentList.innerHTML = "";

   // Looping over the list parameter
   for(let i = 0; i < list.length; i++) {
      // Conditional that checks if the current index is greater than or equal to 'startIndex' and less than 'endIndex'
      if(i >= startIndex && i < endIndex) {
          // Build the HTML used to insert into 'studentList'
          let studentHTML = `<li class="student-item cf">`;
          studentHTML += `<div class="student-details">`;
          studentHTML += `<img class="avatar" src=${list[i].picture.large} alt="Profile Picture">`;
          studentHTML += `<h3>${list[i].name.first} ${list[i].name.last}</h3>`;
          studentHTML += `<span class="email">${list[i].email}</span>`;
          studentHTML += `</div>`;
          studentHTML += `<div class="joined-details">`;
          studentHTML += `<span class="date">Joined ${list[i].registered.date}</span>`;
          studentHTML += `</div>`;
          studentHTML += `</li>`;
         // Inserting the 'studentHTML' string into to 'studentList' variable
         studentList.insertAdjacentHTML('beforeend', studentHTML);
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const addPagination = list => {
   // 'numOfPagButtons' stores the amount of pagination buttons needed
   const numOfPagButtons = list.length / itemsPerPage;

   // Assigning the UL element with a class of 'link-list' to the variable 'pagButtonList'
   const pagButtonList = document.querySelector(".link-list");
   // Setting the innerHTNL of 'pagButtonList' as empty, removing any pagination buttons that may have previously been displayed
   pagButtonList.innerHTML = "";

   // Loop through number of pagination buttons (numOfPagButtons) and for each one create the pagination button.
   for(let i = 0; i < numOfPagButtons; i++) {
      let pagButtonHTML = `<li>`;
      pagButtonHTML += `<button type="button">${i+1}</button>`;
      pagButtonHTML += `</li>`;
      pagButtonList.insertAdjacentHTML('beforeend', pagButtonHTML);
   }

   // Select the first pagination button
   const firstPagButton = pagButtonList.firstElementChild.children[0];
   firstPagButton.className = "active";

   // Adds an event listener on 'pagButtonList' to listen out for a click
   pagButtonList.addEventListener("click", (e) => {
      // Only carry out logic if the event is targeted on a button
      // console.log(pagButtonList);
      if(e.target.tagName == "BUTTON") {
         for(let i = 0; i < pagButtonList.children.length; i++) {
            pagButtonList.children[i].children[0].classList.remove("active");
         }
         // Add the active class to the button that the event was called on
         e.target.className = "active";

         // Call the 'showPage' function
         showPage(list, e.target.textContent);
      }
   });
}

// Call functions
showPage(data, 1);
addPagination(data);


/*
Extra Credit
*/

/*
`createSearchComponent` function
This function will create and insert/append the search component
*/
const createSearchComponent = () => {
   // Create the search label
   const searchLabel = document.createElement("label");
   searchLabel.setAttribute("for", "search");
   searchLabel.setAttribute("class", "student-search");

   // Create and append 'nameInput' to 'searchLabel'
   const nameInput = document.createElement("input");
   nameInput.setAttribute("id", "search");
   nameInput.setAttribute("placeholder", "Search by name...");
   searchLabel.appendChild(nameInput);

   // Create and append 'searchButton' to 'searchLabel'
   const searchButton = document.createElement("button");
   // Creating an ID for future reference
   searchButton.setAttribute("id", "search-button");
   searchButton.setAttribute("type", "button");
   searchLabel.appendChild(searchButton);

   // Create and append 'searchImg' to 'searchButton'
   const searchImg = document.createElement("img");
   searchImg.setAttribute("src", "img/icn-search.svg");
   searchImg.setAttribute("alt", "Search icon");
   searchButton.appendChild(searchImg);

   // Append 'searchLabel' to the end of the 'header' element
   const header = document.querySelector(".header");
   header.appendChild(searchLabel);
} 

createSearchComponent();


// Variables to referencing the input (searchInput) and the search button (searchSubmit)
const searchInput = document.querySelector("#search");
const searchSubmit = document.querySelector("#search-button");

const studentNames = [];

for(let i = 0; i < data.length; i++) {
   let concatNames = (data[i].name.first + " " + data[i].name.last).toLowerCase();
   studentNames.push(concatNames);
}

/*
`searchNames` function
This function will create an array of names to search through
*/
function searchNames(searchInput, names) {
   console.log(searchInput);
   // console.log(names);

   for(let i = 0; i < names.length; i++) {
      if( searchInput !== 0 && names[i].toLowerCase().includes(searchInput.toLowerCase()) ) {
         console.log("Match");
      }
   }
}


searchSubmit.addEventListener("click", (e) => {
   e.preventDefault();

   // Get the value of the input when 'searchSubmit' is clicked
   let submitValue = searchSubmit.previousElementSibling.value;


   searchNames(submitValue, studentNames);

});


// searchInput.addEventListener("keyup", (e) => {

//    // Get the value of the input when a keyup event is performed 'searchInput'
//    let inputValue = e.target.value;
   

//    searchNames(inputValue, studentNames);

// });