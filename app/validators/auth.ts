import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
    vine.object({
        full_name:   vine.string().minLength(4).maxLength(65),
        username:   vine
            .string()
            .minLength(4)
            .maxLength(65)
            .unique(async (query, field)  => {
                const user = await query.from('users').where('username', field).first()
                return !user
            }),
        password:   vine.string().minLength(8).maxLength(35)    

    })
)

export const loginValidator = vine.compile(
    vine.object({
        username:  vine.string(),
        password:  vine.string()
            .minLength(8)
            .maxLength(35)
    })
)