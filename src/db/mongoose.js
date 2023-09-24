const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Gour0992:Gour0992@cluster0.o7whp.mongodb.net/budget-manager?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => {
    console.log("connected");
  })
  .catch((e) => {
    console.log(e, "error");
  });
