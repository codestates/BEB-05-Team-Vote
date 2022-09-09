import { Router } from "express";
const { editProfile } = require("../controller/profile_controller");

const router = Router();

router.put("/", editProfile);

module.exports = router;
