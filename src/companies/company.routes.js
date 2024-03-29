import { Router } from "express";
import { check } from "express-validator";
import { companyGet, companyPost, companyPut, generateCompanyReport, getCompanyByAcendent, getCompanyByCategory, getCompanyByDecendent, getCompanyByYearsTrayectory } from "./company.controller.js";
import { validateFilds } from '../middlewares/validate-filds.js'
import { validateJWT } from '../middlewares/validate-jwt.js'
import { hasRoleAuthorized } from '../middlewares/validate.role.js'
import { existsCompany } from "../helpers/db-validators.js";

const router = Router();

router.post(
    "/",
    [
        validateJWT,
        hasRoleAuthorized('ADMIN_ROLE'),
        check("name", "The name cannot be empty").not().isEmpty(),
        check("impactLevel", "Impact level must be a number between 1 and 10").isInt({ min: 1, max: 10 }),
        check("yearsTrayectory", "The yearsTrayectory cannot be empty").not().isEmpty(),
        check("category", "The category cannot be empty").not().isEmpty(),
        validateFilds
    ],
    companyPost
);

router.put(
    "/:id",
    [
        validateJWT,
        hasRoleAuthorized('ADMIN_ROLE'),
        check("id", "it is not valid id").isMongoId(),
        check("id").custom(existsCompany),
        validateFilds
    ],
    companyPut
)

router.get(
    "/",
    [
        validateJWT,
        hasRoleAuthorized('ADMIN_ROLE'),
    ],
    companyGet
)

router.get(
    '/yearsTrayectory/:yearsTrayectory',
    getCompanyByYearsTrayectory
)

router.get(
    '/category/:category',
    [
        validateJWT,
        hasRoleAuthorized('ADMIN_ROLE'),
    ],
    getCompanyByCategory
)

router.get(
    '/A_Z',
    [
        validateJWT,
        hasRoleAuthorized('ADMIN_ROLE'),
    ],
    getCompanyByAcendent
)

router.get(
    '/Z_A',
    [
        validateJWT,
        hasRoleAuthorized('ADMIN_ROLE'),
    ],
    getCompanyByDecendent
)

router.get(
    '/report',
    [
        validateJWT,
        hasRoleAuthorized('ADMIN_ROLE'),
    ],
    generateCompanyReport
)

export default router;