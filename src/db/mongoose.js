const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://tricode:Tricode13@tricode.ojw5abw.mongodb.net/tricode?retryWrites=true&w=majority",
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
