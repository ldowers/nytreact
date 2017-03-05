import Article from "../models/Article";
import express from "express";

const router = express.Router();

function listArticles(req, res) {
    Article
        .list()
        .then(data => {
            res.json(data);
        });
}

function saveArticle(req, res) {
    Article
        .save(req.body.title, req.body.date, req.body.url)
        .then(data => {
            res.json(data);
        });
}

function removeArticle(req, res) {
    Article
        .remove(req.params.id)
        .then(data => {
            res.json(data);
        });
}

router
    .route("/")
    .get(listArticles);
router
    .route("/")
    .post(saveArticle);
router
    .route("/:id")
    .delete(removeArticle);

export default router;