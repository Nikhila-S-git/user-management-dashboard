User Management Dashboard

Overview

A simple User Management Dashboard built with React.js.
Allows viewing, adding, editing, and deleting users.
Fetches user data from JSONPlaceholder API.
Supports search, sorting, and pagination.
Fully styled using inline styles, no CSS files required.

Features

View Users: Display users in a responsive table.
Add User: Fill a form to add a new user.
Edit User: Update existing user details.
Delete User: Remove a user from the list.
Search & Filter: Search by first name, last name, email, or department.
Sorting: Click table headers to sort by any column.
Pagination: Choose rows per page and navigate between pages.

Installation

Clone the repository

git clone <repository_url>
cd <project_folder>

Install dependencies
npm install
Start the application
npm start
Opens in default browser at http://localhost:3000/.

Assumptions

Department: Not available in JSONPlaceholder → defaults to "General".
Persistence: Changes via POST, PUT, DELETE are simulated; JSONPlaceholder does not persist data.
Pagination, search, and sorting are implemented on the client-side.
Styling: Inline styles are used for simplicity and compatibility.

Dependencies
React.js
Fetch API (native)
No additional styling libraries or state management libraries are required.

Usage
Add User: Click “Add User” → fill form → submit
Edit User: Click “Edit” button next to a user → modify → submit
Delete User: Click “Delete” button next to a user
Sort: Click column headers
Search: Type in the search box
Pagination: Select rows per page and navigate with Prev/Next


Styling Approach and Challenges

Initially, CSS Modules were used for styling (`UserForm.module.css`, `UserTable.module.css`, `App.module.css`). 
However, during development, the project faced issues with CSS not being applied consistently due to module resolution problems in the React setup.

To ensure reliable styling and simplify the setup, all components were converted to inline styles. 
This approach guarantees that the dashboard looks consistent across all components without relying on external CSS files.
