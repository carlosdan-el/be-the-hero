const connection = require('../database/connection');

module.exports = {

    async login(request, response) {

        const id = request.headers.authorization;
        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();

        if(!ong) {

            return response.status(400).json({
                error: 'No ONG found with this ID'
            });

        }

        response.json(ong);

    }

};