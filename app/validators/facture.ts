import vine from '@vinejs/vine'

export const factureValidator = vine.compile(
    vine.object({
      reference_facture: vine.string().trim().minLength(8).unique(
        async (query, field)  => {
            const ref_facture = await query.from('factures').where('reference_facture', field).first()
            return !ref_facture
        }
      ),
      date_debut:   vine.date({
            formats:   ['DD/MM/YYYY','x']
        }
      ),
      date_fin: vine.date({
            formats:   ['DD/MM/YYYY','x']
        }
      ),
      montant_total: vine.number().decimal(2),
      taxes:    vine.number().decimal(2)
    })

    
  )
  