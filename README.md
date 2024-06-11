# CharityManagmentSystem-RecipientPanel-MERN

## Overview

This project is a Content Management System (CMS) built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The CMS is designed to help recipients manage their needs and interact with donors. The following features are included:

- **Login**: Allows recipients to log in to their accounts.
- **Register**: Enables new recipients to register in the CMS.
- **Manage Needs**: Recipients can add, update, and delete their needs.
- **Upload Documents**: Recipients can upload documents to their profiles for verification purposes.
- **Chat with Donor**: Provides a chat box for donors to interact with each other.
- **Send Request to Donor**: Allows recipients to send chat requests to donors.
- **Search**: Enables searching through the portal using keywords.
- **Manage Feedback**: Recipients can give and view feedback.

## Features

### 1. User Authentication

#### Login
- Recipients can log in to their accounts using their credentials.

#### Register
- New recipients can register by providing necessary details.

### 2. Needs Management

#### Add Needs
- Recipients can add new needs to their profile.

#### Update Needs
- Existing needs can be updated by the recipients.

#### Delete Needs
- Recipients can delete needs that are no longer relevant.

### 3. Document Upload

- Recipients can upload documents (e.g., identity proof, certificates) for verification.

#### Send Request to Donor
- Recipients can send requests to donors to initiate a chat.

### 5. Search Functionality

- The portal includes a search feature to find information using keywords.

### 6. Feedback Management

#### Give Feedback
- Recipients can provide feedback on their interactions and experiences.

#### See Feedback
- Recipients can view feedback given by others.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fatimaqurban/Charity_Managment-System_RecipientPanel-MERN
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

4. **Create a `.env` file in the server directory and add your environment variables**
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the development server**
   ```bash
   cd Backend
   npm start
   ```

6. **Run the client**
   ```bash
   cd Frontend
   npm start
   ```

## Usage

1. Navigate to the homepage.
2. Register a new account or log in with existing credentials.
3. Use the dashboard to manage needs, upload documents, interact with donors, and provide feedback.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Submit a pull request.

![CMS Screenshot](./Frontend/src/Images/aboutus.png)
![CMS Screenshot](./Frontend/src/Images/login.png)
![CMS Screenshot](./Frontend/src/Images/request to donor.png)
![CMS Screenshot](./Frontend/src/Imagesfeedback to donor/.png)
![CMS Screenshot](./Frontend/src/Images/pfp.png)
![CMS Screenshot](./Frontend/src/Images/edit need.png)
![CMS Screenshot](./Frontend/src/Images/register.png)



