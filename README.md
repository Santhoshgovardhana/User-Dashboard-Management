SET UP:

-> Installed and Used react components like Route,BrowserRouter with following commands.

-> npx create-react-app myapp, npm install react-router-dom.

-> myapp folder contains all the details of the project.

-> The flow of components are myapp -> src -> components -> UserList -> UserForm.

-> The main wrapper of all components is App.js which is in src folder.

-> Fetched Data using API calls and methods like GET, POST, PUT, DELETE using https://jsonplaceholder.typicode.com/users/.

-> Added EventHandlers such as onChange,onClick for handling the events.

-> Added forms of Adduser,Edituser,deleteuser which takes data from users and delete's, edit's, add's user appropiately.

-> Raised errors such as "Please Enter Valid Details","Please Enter Valid id", when user enters other than text or numbers and Submiting form without filling complete details.

-> Added loader element from react-loader-spinner.

-> Added delete icon, which is used as action by user to delete a user from UI.

-> Added Search box, which user can find a user using his name.

-> When the data of usersList is empty displayed a friendly message "NO RESULTS FOUND".




CHALLENGES :

-> Raising errors when users fill with random data in forms and submitting form without filling details.

-> Error bounding and displaying friendly messages when API fetch fails.

-> Filtering the Data of users.

-> Improving the UI.



IMPROVEMENTS :

-> Displaying more suitable friendly messages when fetching fails.

-> Implementing Pagination.

-> Sorting the users based on user id's.

-> Using popup's instead of navigating to separate page when user clicks on add, edit, delete buttons.












