# Referral System with User Authentication

This project implements a referral system coupled with user authentication. It allows users to refer others using a unique referral ID, granting both parties 20 points for the initial referral and 10 points for subsequent referrals.

## Features

- **Referral System:** Users receive a unique referral ID to invite others, earning 20 points for the initial referral and 10 points for subsequent referrals.
- **User Authentication:** Implemented using Google API for email verification, ensuring users verify their email before logging in.
- **Frontend:** Developed with Vite React for a responsive and interactive user interface.
- **Backend:** Built using Node.js, Express, and MongoDB for handling server-side operations and database management.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js installed on your machine
- MongoDB setup and running

### Installation

1. Clone this repository: `git clone Gagan20-vis/Referral-System-with-User-Authentication-Using-Google-API`
2. Navigate to the project directory: `Gagan20-vis/Referral-System-with-User-Authentication-Using-Google-API`
3. Install dependencies for both client and server:
   - client: `cd client && npm install`
   - server: `cd server && npm install`

### Configuration

1. server Configuration:
   - Create a `.env` file in the `client` directory and add `VITE_BASE_URL = http://localhost:8000/api/user` to it.
   - Create a `.env` file in the `server` directory and.
   - Set environment variables like `DB`, `HOST`, `USER`, `PASS`, `SERVICE`, `BASE_URL`, and any necessary API keys.
    
2. client Configuration:
   - Configure client settings if required (e.g., API endpoint URLs).

### Running the Application

1. Start the server server: `cd server && npm start`
2. Launch the client: `cd client && npm start`

Access the application by visiting `http://localhost:your_client_port` in your browser.

## Usage

- **User Registration:** Users register and receive a unique referral ID.
- **Email Verification:** Verification emails are sent using Google API. Users must verify their email to log in.
- **Referral Process:** Users can refer others using their unique ID, earning points for both parties.
- **Login and Dashboard:** Authenticated users can log in and access their dashboard to view points and manage referrals.

## Contributing

Feel free to contribute by opening issues or submitting pull requests. Follow the guidelines outlined in `CONTRIBUTING.md`.
