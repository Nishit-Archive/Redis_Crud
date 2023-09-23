module.exports = (app, client,res,req) => {
    //app get route
    app.get("/", async (req, res) => {
      res.send("Hello World to Redis Now time to learn Redis");
    });
  
    app.post("/createuser", async (req, res) => {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
      }
  
      try {
        await client.connect();
  
        const allUsers = await client.get("allUsers");
        let userArray = [];
        if (allUsers) {
          userArray = JSON.parse(allUsers);
          const isUsernameTaken = userArray.some(
            (user) => user.username === username
          );
          if (isUsernameTaken) {
            return res.status(400).json({ error: "Username already taken" });
          }
  
          const newUser = {
            username,
            email,
            password,
            createdAt: new Date().toISOString(),
          };
  
          userArray.push(newUser);
          await client.set("allUsers", JSON.stringify(userArray));
          res.status(200).json({ message: "User Created Successfully", newUser });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } finally {
        client.disconnect();
      }
    });
  };
  