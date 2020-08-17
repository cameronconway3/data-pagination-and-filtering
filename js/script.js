/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// Global Variables

// Assigning the UL element with a class of 'student-list' to a variable 'studentListUL'
const studentListItems = document.querySelector(".student-list");
// Define how many items are to be used per page
const itemsPerPage = 9;
// Assigning the UL elment with the class of 'link-list' to a variable 'linkListUL'
const paginationLink = document.querySelector(".link-list");

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   // Setting up the variables to store the start index and the end index of the list items to be displayed
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;

   // Setting the innerHTML of 'studentListUL' to an empty string. Makeing sure any previously displayed students are removed
   studentListItems.innerHTML = "";

   // Looping over the list parameter (dataList)
   for(let i = 0; i < list.length; i++) {
      if(i >= startIndex && i < endIndex) {
         // Build the HTML used to insert into 'studentListUL'
         let studentHTML = "";
         studentHTML += `<li class="student-item cf">`;
         studentHTML += `<div class="student-details">`;
         studentHTML += `<img class="avatar" src=${list[i].picture.large} alt="Profile Picture">`;
         studentHTML += `<h3>${list[i].name.first} ${list[i].name.last}</h3>`;
         studentHTML += `<span class="email">${list[i].email}</span>`;
         studentHTML += `</div>`;
         studentHTML += `<div class="joined-details">`;
         studentHTML += `<span class="date">Joined ${list[i].registered.date}</span>`;
         studentHTML += `</div>`;
         studentHTML += `</li>`;
   
         studentListItems.insertAdjacentHTML('beforeend', studentHTML);
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const addPagination = list => {
   const numOfPagButtons = list.length / itemsPerPage;
   
   // Setting the innerHTML of 'paginationLink' to an empty string. Makeing sure any previously displayed buttons are removed
   paginationLink.innerHTML = "";

   for(let i = 0; i < numOfPagButtons; i++) {
      let pagButtonHTML = "";
      pagButtonHTML += `<li>`;
      pagButtonHTML += `<button type="button">${i+1}</button>`;
      pagButtonHTML += `</li>`;
      paginationLink.insertAdjacentHTML('beforeend', pagButtonHTML);
   }

   // Selecting the first pagination button using the firstElementChild method and giving it a class of active
   const firstPagButton = paginationLink.firstElementChild;
   firstPagButton.className = "active";

   const paginationButtons = paginationLink.children;


   for(let i = 0; i < paginationButtons.length; i++) {

      // Creating an event listener to listen for clicks on the 'paginationLink' variable
      paginationButtons[i].addEventListener("click", (e) => {
         if(e.target.tagName = "BUTTON") {

            for(let i = 0; i < paginationButtons.length; i++) {
               paginationButtons[i].classList.remove("active");
               e.target.className = "";
            }
            
            paginationButtons[i].className = "active";

            e.target.className = "active";

            // Get the current page number
            showPage(list, e.target.textContent);

         }
         console.log(paginationButtons);
      });
   }


}


// Call functions
showPage(data, 1);

addPagination(data);