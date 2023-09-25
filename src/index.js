const express = require("express");
require("./db/mongoose");
const userRoutes = require("./routes/users");
const dealDataRouter = require("./routes/deals");



const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(dealDataRouter);



let server = app.listen(process.env.PORT || 3000, () => {
  let port = server.address().port
  console.log("listning on ", port);
});
