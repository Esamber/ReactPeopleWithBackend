# ReactPeopleWithBackend

A React application to manage a list of people in the database. Uses C# backend (with Entity Framework) called via axios. 

Page displays three textboxes: First Name, Last Name and Age, and "Add" button.

Beneath that is a table that displays the list of people from the database. When the add button on top is clicked, the textboxes are cleared out, and a new person is added to the table. 

Each row of the table displays their First Name, Last Name and Age, along with two buttons: "Edit" and "Delete". When Edit is clicked, the textboxes on top are reuse and prepopulated. The Add button changes to "Update" instead of Add. When update is clicked, the person on the backend is updated and the table refreshes. The three textboxes  get cleared out, and the Update button goes back to saying "Add". Additionally, when the delete button is clicked, that person is deleted and the table refreshes.
