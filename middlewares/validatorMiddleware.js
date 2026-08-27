import { validationResult } from "express-validator";

const validatorMiddleware = (req , res , next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}!`);
  }

  res.send({ errors: result.array() });
  next();
}

export default validatorMiddleware;