// import type { HttpContext } from '@adonisjs/core/http'

import Article from "#models/article";
import { createArticleValidator } from "#validators/article";
import { HttpContext } from "@adonisjs/core/http";

export default class ArticlesController {

    public async getListArticle({ response }: HttpContext){
        try {
            const article = await Article.all()
            return response.ok({
                "status":200,
                "message":"ARTICLE DISPONIBLE",
                "data": {
                    article
                }
            })
        } catch(error){
            return response.internalServerError({
                "status":   500,
                "message":  error
            })
        }
    }

    public async addNewArticle({request, response}: HttpContext){
        // const new_article = request.all() as Partial<Article>
        // const new_article = request.all()
        try {
            const article_payload = await request.validateUsing(createArticleValidator)
            const article = await Article.create(article_payload)

            return response.created({
                "status":   201,
                "message":  "ARTICLE CREER",
                "data": {
                    article
                }
            })
        } catch(error){
            return response.internalServerError({
                "status":   500,
                "message":  error
            })
        }
    }

    public async findArticleById({params, response}: HttpContext){
        try {
            const article = await Article.find(params.id);
            if(!article){
                return response.notFound({
                    "status": 404,
                    "message":  "ARTICLE NON TROUVE"
                })
            }
            return response.ok({
                "status": 200,
                "message":  "ARTICLE TROUVER",
                "data": {
                    article
                }
            })
        } catch(error){
            return response.internalServerError({
                "status": 500,
                "message": error
            })
        }
    }

    public async deleteArticle({ params, response }: HttpContext){
        try {
            const article: any = await Article.find(params.id)
            if(!article){
                return response.notFound({
                    "status":   404,
                    "message":  "ARTICLE NON TROUVE",
                })
            }
            await article.delete()
            return response.ok({
                "status":   200,
                "message":  "ARTICLE SUPPRIMER"
            })
        } catch(error){
            return response.internalServerError({
                "status":   500,
                "message":  error
            })
        }
    }
}
