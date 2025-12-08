# FCA (Fellowship of Christian Athletes) Desktop App

## Project Overview

The **FCA Desktop App** is a fully functional desktop application built with **Electron, HTML/CSS/JavaScript, and Firebase**. It serves as a hub for athletes and coaches to access devotionals, events, messages, and user profiles. The app includes **admin and user roles**:

- **Admins**: Create/edit events, post devotionals, send messages, and update the mission statement.  
- **Users**: View devotionals, browse events, read messages, and manage their profile.  

The app is designed to be **professional, responsive, and user-friendly**. It also includes a lightweight “Bible Verse of the Day” widget via Node.js notifications.

---

## Features

### Admin Features
- **Dashboard** overview of events and messages  
- **Mission Statement** management  
- **Event Management**: Create, edit, delete events  
- **Devotionals Management**: Create, edit, delete devotionals  
- **Messaging**: Send messages and Bible verses to users  
- **Profile Management**: Update personal information  

### User Features
- **Home Screen**: Summary of upcoming events and latest devotionals  
- **Devotionals**: Browse and read daily devotionals  
- **Events**: View event details  
- **Messages**: Read messages sent by admins  
- **Profile Settings**: Manage personal information  

### Common Features
- **Authentication**: Login, signup, and persistent sessions  
- **Bible API Integration**: Fetch books, chapters, verses, and chapter verses  
- **Local Storage** for session persistence  
- **Professional UI** with clean design  

---


## How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)  
- npm (comes with Node.js)  
- Git  

### Steps
1. **Clone the repository**:
   ```bash
    git clone https://github.com/yourusername/fca-app.git
    cd fca-app
    npm install

2. Create an env file: 
    API_KEY=your_api_key
    AUTH_DOMAIN=your_project.firebaseapp.com
    PROJECT_ID=your_project_id
    STORAGE_BUCKET=your_project.appspot.com
    MESSAGING_SENDER_ID=your_sender_id
    APP_ID=your_app_id
    MEASUREMENT_ID=your_measurement_id
    BIBLE_API_KEY=your_bible_api_key

3. npm start

This is the link to my firebase 
https://console.firebase.google.com/project/fca-iuindy/overview 

this is the link to my web 4

https://in-info-web4.luddy.indianapolis.iu.edu/~joroper/n423/fca-app/


### IMPORTANT TO NOTE, not everything is working right now. 
- my message page is stuck with the modal on top
- not all pages have fonts
- My profile page does not work other than the logout button
- Save devotionals for user does not work.
- No persistent login (if you hit control r it will refresh back to the login)
- Some images somehow got messed up. 


