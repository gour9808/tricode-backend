const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.get("Authorization");
  console.log(req, req.header);
  console.log(header,'header');

  if(!header) {
    return res.status(401).send("Unauthorized");
    
  }
  
  let decodedToken;

  try {
    if (!header) {
      return res.status(401).send("Unauthorized");
    }

    decodedToken = jwt.verify(header.split(' ')[1], "secret");
    console.log(decodedToken, "decoded");

    if (!decodedToken) {
      return res.status(401).send("Unauthorized");
    }
  } catch (e) {
    console.log(e);
    if (e.message === "jwt expired") {
      return res.status(401).send(e);
    }
    if (e.message === "invalid token") {
      return res.status(500).send(e);
    }
    return res.status(500).send(e);
  }
  req.userId = decodedToken.id;

  next();
};
