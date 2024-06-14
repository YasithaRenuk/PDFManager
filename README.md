# PDFManager

## How to Run the Application

### Prerequisites

- Node.js
- MongoDB

### Steps

1. **Create .env file in the backend directory**:
    - Add the following environment variables:
      ```env
      MONGODB_URL=<your_mongodb_url>
      TOKEN_SECRET=<your_token_secret>
      SECRET_KEY=<your_secret_key>
      ```

2. **Create an "uploads" folder** in the backend directory.

3. **Run the backend server**:
    - Open a terminal and navigate to the `backend` directory:
      ```sh
      cd backend
      npm run start
      ```

4. **Run the frontend server**:
    - Open a new terminal and navigate to the `frontend` directory:
      ```sh
      cd frontend
      npm run dev
      ```

Your application should now be running, and you can access it in your browser.

---

Feel free to reach out if you have any questions or need further clarification.
