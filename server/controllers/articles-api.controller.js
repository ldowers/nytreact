import Article from "../models/Article";
import express from "express";

const router = express.Router();

function findSpecificArticle(req, res){
    Article.findById(req.params.id).then(data => {
        res.json(data);
    });
}

function listArticles(req, res){
    Article.list().then(data => {
        res.json(data);
    });
}

router.route("/").get(listArticles);
router.route("/:id").get(findSpecificArticle);

export default router;