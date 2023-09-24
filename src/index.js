const express = require("express");
require("./db/mongoose");
const userRoutes = require("./routes/users");
const masterRoutes = require("./routes/master-data");
const expensesDataRouter = require("./routes/expense")


const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(masterRoutes);
app.use(expensesDataRouter);


let server = app.listen(process.env.PORT || 3000, () => {
  let port = server.address().port
  console.log("listning on ", port);
});
