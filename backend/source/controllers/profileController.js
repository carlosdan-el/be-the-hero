const connection = require('../database/connection');

module.exports = {

    async profile(request, response) {

        const user_id = request.headers.authorization;
        const incidents = await connection('incidents')
        .where('ong_id', user_id)
        .select('*');

        response.json(incidents);

    }

};