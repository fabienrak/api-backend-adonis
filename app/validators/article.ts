import vine from '@vinejs/vine'

export const createArticleValidator = vine.compile(
    vine.object({
      nom: vine.string().trim().minLength(6).unique(
        async (query, field)  => {
            const nom_article = await query.from('articles').where('nom', field).first()
            return !nom_article
        }
      ),
      type: vine.string().trim().unique(
        async (query, field)  => {
            const type = await query.from('articles').where('type', field).first()
            return !type
        }
      ),
      nombre: vine.any()
    })
  )
  