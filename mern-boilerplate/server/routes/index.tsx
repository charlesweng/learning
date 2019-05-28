import * as express from "express";
let router = express.Router();

// var express = require("express");
// var router = express.Router();

/* GET home page. */
router.get("/", (req: express.Request, res: express.Response, next: any) => {
  res.render("index", { title: "Express" });
});

export default router;
