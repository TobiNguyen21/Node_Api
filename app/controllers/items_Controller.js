const main_Service = require('../services/items');

module.exports = {
    getListItems: async (req, res, next) => {
        let params = [];
        params.keyword = req.query.keyword || '';
        params.sortField = req.query.orderBy || '';
        params.sortType = req.query.orderDir || '';

        const data = await main_Service.listItems(params, { 'task': 'all' })
        res.status(200).json({
            success: true,
            data: data
        })
    },
    getItemById: async (req, res, next) => {
        const data = await main_Service.listItems({ 'id': req.params.id }, { 'task': 'one' })
        res.status(200).json({
            success: true,
            data: data
        })
    },
    addItem: async (req, res, next) => {
        let params = [];
        params.name = req.body.name;
        params.status = req.body.status;
        const data = await main_Service.create(params);

        res.status(201).json({
            success: true,
            data: data
        })
    },
    editItem: async (req, res, next) => {
        let body = req.body;
        const data = await main_Service.editItem({ 'id': req.params.id, 'body': body }, { 'task': 'edit' })
        res.status(200).json({
            success: true,
            data: data
        })
    },
    deleteItem: async (req, res, next) => {
        const data = await main_Service.deleteItem({ 'id': req.params.id }, { 'task': 'one' })
        res.status(200).json({
            success: true,
            data: data
        })
    }
}