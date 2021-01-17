const { uri } = require('../../../config/config');
const axios = require('axios');

exports.getCities = async (req, res) => {
    try {
        let data = await axios.get(uri + '/v1/locations');
        res.status(200).send(data.data.results)
    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        });
    }
}
exports.getMeasurements = async (req, res) => {
    try {
        let data = await axios.get(uri + '/v1/measurements', { params: req.query });
        res.status(200).send(data.data.results)
    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        });
    }
}