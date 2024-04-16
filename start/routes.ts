/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import ArticlesController from '#controllers/articles_controller'
import AutoSwagger from "adonis-autoswagger";
import swagger from "#config/swagger";
import UserProfilsController from '#controllers/user_profils_controller';

//  Auth
router.group(() =>  {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])
}).prefix('/api/v1/auth/')

router.get('me', async ({ auth, response }) => {
  const user = await auth.authenticate()
  return response.ok(user)
}).use(middleware.auth()).prefix('/api/v1/')

//  Article
router.get('article', [ArticlesController, 'getListArticle']).use(middleware.auth()).prefix('/api/v1/')
router.post('article', [ArticlesController, 'addNewArticle']).use(middleware.auth()).prefix('/api/v1/')
router.get('article/:id', [ArticlesController, 'findArticleById']).use(middleware.auth()).prefix('/api/v1/')
router.delete('article/:id', [ArticlesController, 'deleteArticle']).use(middleware.auth()).prefix('/api/v1/')

//  user profil
router.post('profil', [UserProfilsController, 'createProfil']).use(middleware.auth()).prefix('/api/v1/users')


//  API DOC
router.get("/swagger", async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger);
});

// Renders Swagger-UI and passes YAML-output of /swagger
router.get("/docs", async () => {
  return AutoSwagger.default.ui("/swagger", swagger);
  // return AutoSwagger.default.rapidoc("/swagger", swagger); to use RapiDoc instead
});