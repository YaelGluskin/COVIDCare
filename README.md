# COVIDCare

A platform efficiently manages COVID-related information such as vaccine records and disease status alongside personal client details, ensuring comprehensive data management.

### Authors [@Yael Gluskin](https://github.com/YaelGluskin)

#### Visit the website: [COVIDCare](https://covidcare.onrender.com) (To get a username and password, contact me).
  
## Features

- **Manage users with different security approaches:** Implement varying levels of access and permissions for different user roles to ensure secure data management.
- **Manage clients whose details can be edited:** Allow authorized users to edit and update client information as needed, ensuring data accuracy and relevance.
- **Add vaccinations or diseases to clients:** Provide functionality to record and track vaccination history, disease diagnoses, and related health information for each client.
- **Manage four databases:** Efficiently organize and maintain four separate databases to store different types of information, ensuring streamlined access and management of diverse data sets.



Here's an organized overview of the system implementation using Node.js, React, and MongoDB, focusing on CRUD operations and database structure:


## Backend (Node.js with Express)
#### Backend Repository
- [Link to Backend Repository](https://github.com/YaelGluskin/covidcare.api)

1. **Server Setup**: 
   - Implemented using Node.js with Express framework.
   - Set up routes for handling CRUD operations for users, clients, diseases, and vaccinations.

2. **Database Management**:
   - Utilized MongoDB as the primary database.
   - Created four collections:
     - **Users**: Stores information about system users, such as login credentials and roles.
     - **Clients**: Contains details of individual clients, including personal information and health data.
     - **Diseases**: Stores information about various diseases.
     - **Vaccinations**: Contains vaccination data, including vaccine types and administration details.

3. **CRUD Operations**:
   - Implemented CRUD functionalities for each collection:
     - **Users**: 
       - Create, Read, Update, and Delete (CRUD) operations for managing user accounts and roles.
     - **Clients**: 
       - CRUD operations for managing client information.
     - **Diseases**: 
       - CRUD operations for managing disease data.
     - **Vaccinations**: 
       - CRUD operations for managing vaccination records.

4. **API Endpoints**:
   - Documented API endpoints using Postman or other API documentation tools to describe request and response formats.
   - Tested API endpoints using Postman to ensure functionality and data integrity.


## Frontend (React)
#### Frontend Repository

1. **User Interface**:
   - Developed a user-friendly interface using React components.
   - Organized components for user, client, disease, and vaccination management.

2. **Routing**:
   - Utilized React Router for client-side routing to navigate between different views/components.

3. **Forms and Input Handling**:
   - Implemented forms and input fields to capture user input for creating and updating data.
   - Validated user input to ensure data integrity and prevent errors.

4. **API Integration**:
   - Integrated with the backend API endpoints using asynchronous HTTP requests (e.g., Axios).
   - Made API calls to perform CRUD operations on users, clients, diseases, and vaccinations.

5. **State Management**:
   - Managed application state using React's built-in state and props mechanism or state management libraries like Redux, depending on the complexity of the application.

Following this structured approach, the system effectively manages user data, client information, disease records, and vaccination details while providing a seamless user experience through the React front end.

---

### Website Deployment

The website is hosted and deployed using the [Render platform](https://render.com/). It utilizes two separate repositories—one for the backend Repository [covidcare-api ](https://github.com/YaelGluskin/covidcare-api) and one for the front-end Repository [covidcare-frontend ](https://github.com/YaelGluskin/covidcare-frontend)—each containing the respective codebase for their functionalities. With this setup, any updates made to the local codebase will reflect on the live site after being pushed to the respective repository. Render automatically detects changes in the repositories and triggers the necessary build and deployment processes to update the running version of the site accordingly. This ensures that the website is always running the latest version of both the backend and frontend code, providing a seamless and up-to-date user experience.

--- 


**Server-side simulation by screenshots**
![Welco,](https://github.com/YaelGluskin/COVIDCare/blob/main/clientside/public/Public.png)

![NAvigate](https://github.com/YaelGluskin/COVIDCare/blob/main/clientside/public/Routing.png)

![Client List](https://github.com/YaelGluskin/COVIDCare/blob/main/clientside/public/clients.png)

![detail](https://github.com/YaelGluskin/COVIDCare/blob/main/clientside/public/client.png)

![new Disease](https://github.com/YaelGluskin/COVIDCare/blob/main/clientside/public/newDis.png)

![Cliant detail](https://github.com/YaelGluskin/COVIDCare/blob/main/clientside/public/createDis.png)




