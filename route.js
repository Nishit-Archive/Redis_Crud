module.exports = (app, client) => {
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
      let usersArray = [];
      if (allUsers) {
        usersArray = JSON.parse(allUsers);
        const isUsernametaken = usersArray.some(
          (user) => user.username === username,
        );
        if (isUsernametaken) {
          res.status(400).json({ error: "username is already taken" });
          return;
        }
      }

      const newUser = {
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      };

      usersArray.push(newUser);

      await client.set("allUsers", JSON.stringify(usersArray));
      res.json({ message: "User created successfully", user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      client.disconnect();
    }
  });
};
