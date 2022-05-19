const { ItemModel, CityModel, CommentModel } = require('../models');
const axios = require('axios');

exports.findAllItems = async (req, res) => {
  try {
    let items = await ItemModel.findAll({
      include: [{ model: CityModel, as: 'city' }],
    });

    const comments = await CommentModel.findAll();

    const promises = items.map(async (item) => {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${item.city.city_name}&aqi=no`
      );
      item.city.weather = `${response.data.current.temp_c} °C - ${response.data.current.condition.text}`;
      return new Promise((resolve, reject) => {
        resolve();
      });
    });

    Promise.all(promises).then(() => {
      res.render('../views/read.ejs', { items: items, comments: comments });
    });
  } catch {
    res.redirect('/error');
  }
};

exports.findAnItem = async (req, res) => {
  try {
    const item_id = req.params.id;
    const item = await ItemModel.findByPk(item_id, {
      include: [{ model: CityModel, as: 'city' }],
    });

    const cities = await CityModel.findAll();

    res.render('../views/edit.ejs', { item: item, cities: cities });
  } catch {
    res.redirect('/error');
  }
};

exports.createAnItem = async (req, res) => {
  try {
    const item = {
      item_name: req.body.name,
      item_description: req.body.description,
      item_quantity: req.body.quantity,
      item_status: 'active',
      city_id: req.body.city,
    };
    await ItemModel.create(item);
    res.redirect('/');
  } catch {
    res.redirect('/error');
  }
};

exports.editAnItem = async (req, res) => {
  try {
    const item_id = req.params.id;
    const item = await ItemModel.findByPk(item_id);
    item.item_name = req.body.name;
    item.item_description = req.body.description;
    item.item_quantity = req.body.quantity;
    item.city_id = req.body.city;
    await item.save();
    res.redirect('/');
  } catch {
    res.redirect('/error');
  }
};

exports.deleteAnItem = async (req, res) => {
  try {
    const item_id = req.params.id;

    const item = await ItemModel.findByPk(item_id);
    item.item_status = 'inactive';
    await item.save();

    const comment = {
      comment_text: req.body.comment,
      item_id: item_id,
    };

    await CommentModel.create(comment);
    res.redirect('/');
  } catch {
    res.redirect('/error');
  }
};

exports.unDeleteAnItem = async (req, res) => {
  try {
    const item_id = req.params.id;

    const item = await ItemModel.findByPk(item_id);
    item.item_status = 'active';
    await item.save();
    res.redirect('/');
  } catch {
    res.redirect('/error');
  }
};
