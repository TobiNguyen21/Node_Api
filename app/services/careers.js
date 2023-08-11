const MainModel = require('../models/careers');

module.exports = {
    listItems: (params, option) => {
        // Find
        let queryFind = { ...params };
        ['select', 'sort', 'page', 'limit'].forEach(param => delete queryFind[param]);
        let queryStr = JSON.stringify(queryFind);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, find => `$${find}`);
        const find = JSON.parse(queryStr);
        // .Find

        // Select
        const select = (params.select) ? params.select.split(',').join(' ') : '';
        // .Select

        // Sort
        const sort = (params.sort) ? params.sort.split(',').join(' ') : '';
        // .Sort

        // Pagination
        const page = parseInt(params.page) || 1;
        const limit = parseInt(params.limit) || null;
        const skip = (page - 1) * limit;
        // .Pagination

        if (option.task == 'all') {
            return MainModel
                .find(find)
                .select(select)
                .sort(sort).skip(skip).limit(limit);
        }
        if (option.task == 'one') {
            return MainModel
                .findById(params.id)
                .select({})
        }
    },
    create: (item) => {
        return new MainModel(item).save();
    },
    deleteItem: (params, option) => {
        if (option.task == 'one') {
            return MainModel
                .deleteOne({ _id: params.id })
        }
    },
    editItem: (params, option) => {
        if (option.task == 'edit') {
            return MainModel
                .updateOne({ _id: params.id }, params.body)
        }
    },
}