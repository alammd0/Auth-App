const expreess = require("express");

const app = expreess();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(expreess.json());

const user = require("./roters/user");
app.use("/api/v1", user);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

const dbConnect = require("./config/database");
dbConnect();