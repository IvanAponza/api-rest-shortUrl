import { Router } from "express";
import { createLink, getLink, getLinks, removeLink, updateLink } from "../controllers/linkController.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";
const router = Router();



//GET /api/links      all the links
//GET /api/links/:id  single links
//POST /api/links     create links
// PATCH/PUT /api/links/:id update links - como solo se va actualizarel longlink utilizamos patch
//DELETE /api/links     create links

router.get('/', requireToken, getLinks);
router.get('/:id', requireToken, getLink);
router.post('/', requireToken, bodyLinkValidator, createLink);
router.delete('/:id', requireToken, paramLinkValidator, removeLink);
router.patch('/:id', requireToken, paramLinkValidator, bodyLinkValidator, updateLink)

export default router;