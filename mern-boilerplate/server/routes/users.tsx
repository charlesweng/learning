import * as express from "express";
let router = express.Router();

/* GET users listing. */
router.get("/", (req: express.Request, res: express.Response, next: any) => {
  res.send("respond with a resource");
});

export default router;
