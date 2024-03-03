import { Router } from 'express';
import { check } from 'express-validator';
import { existsMail } from '../helpers/db-validators.js';
import { validateFilds } from '../middlewares/validate-filds.js';
import { userPost } from './user.controller.js'; 

const router = Router();

router.post(
    "/",
    [
        check("name", "the name is required").not().isEmpty(),
        check("password", "the password must be more than 6 caracters").isLength({min:6}),
        check("mail", "it is not valid mail").isEmail(),
        check("mail").custom(existsMail),
        validateFilds
    ],
    userPost
)

export default router;