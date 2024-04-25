import vine from '@vinejs/vine'

export const createArticleValidator = vine.compile(
    vine.object({
      reference_facture: vine.string().trim().minLength(8).unique(
        async (query, field)  => {
            const ref_facture = await query.from('factures').where('reference_facture', field).first()
            return !ref_facture
        }
      )
    })
  )
  