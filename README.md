---

# Node.js Redis API

This Node.js application demonstrates how to connect to a Redis database, establish a server, and handle API requests. You can use this as a starting point for building your own API with Redis integration. 🌟

## Prerequisites

Before getting started, make sure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Redis](https://redis.io/) (Make sure Redis is installed and running locally or on a remote server)

## Setup

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Nishit-Archive/Redis_Crud/
   cd Redis_Crud
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root directory with the following content:

   ```dotenv
   REDIS_PASSWORD=your_redis_password
   REDIS_HOST=your_redis_host
   ```

   Replace `your_redis_password` with your Redis password and `your_redis_host` with your Redis host (e.g., `localhost`).

## Usage

### Starting the Server

To start the Node.js server, run the following command:

```bash
npm run start/dev
```

The server will start on port 3000 by default.

### Making a GET Request

You can make a GET request to the root endpoint to test the server's connection to Redis:

```bash
curl http://localhost:3000
```

This should return a response with the message "Hello World!" and the value stored in the Redis database.

### Making a POST Request

To create a user, make a POST request to the `/createuser` endpoint. You can use tools like [Postman](https://www.postman.com/) or `curl` to make POST requests.

Example using `curl`:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "username": "your_username",
  "email": "your_email@example.com",
  "password": "your_password"
}' http://localhost:3000/createuser
```

Replace `"your_username"`, `"your_email@example.com"`, and `"your_password"` with the user information you want to create.



---

Feel free to customize this README to include additional information about your project or specific usage instructions.
