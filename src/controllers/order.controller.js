const Order = require('../models/Order.js')
const moment = require('moment')
const router = require('express').Router()

//GET ORDERS

const ordenes = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
};

//GET RECENT ORDERS
const lastOrders = async (req, res) => {

  const query = req.query.new
  try {

    const orders = query ? await Order.find().sort({_id: -1}).limit(4) :
    await Order.find().sort({_id: -1})

    res.status(200).send(orders)
    
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

//GET ORDERS STATS

const getOrders = async (req, res) =>{
    const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss")
  
    try {
      const orders = await Order.aggregate([
        {
          $match: {createdAt : {$gte: new Date(previousMonth)}}
        },
        {
          $project:{
            month: {$month: "$createdAt"}
          }
        },
        {
          $group:{
            _id: "$month",
            total: {$sum: 1}
          }
        }
      ])
  
      res.status(200).send(orders)
    } catch (err) {
      res.status(500).send(err)
    }
  }


  //GET INCOME STATS 

  const getIncome = async (req, res) =>{
    const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss")
  
    try {
      const income = await Order.aggregate([
        {
          $match: {createdAt : {$gte: new Date(previousMonth)}}
        },
        {
          $project:{
            month: {$month: "$createdAt"},
            sales: "$total_price"
          }
        },
        {
          $group:{
            _id: "$month",
            total: {$sum: "$sales"}
          }
        }
      ])
  
      res.status(200).send(income)
    } catch (err) {
      res.status(500).send(err)
    }
  }

  
  //VENTAS 1 SEMANA

  const getWeek = async (req, res) =>{
    const last7days = moment()
    .day(moment().day() - 7)
    .format("YYYY-MM-DD HH:mm:ss")
  
    try {
      const income = await Order.aggregate([
        {
          $match: {createdAt : {$gte: new Date(last7days)}}
        },
        {
          $project:{
            day: {$dayOfWeek: "$createdAt"},
            sales: "$total_price"
          }
        },
        {
          $group:{
            _id: "$day",
            total: {$sum: "$sales"}
          }
        }
      ])
  
      res.status(200).send(income)
    } catch (err) {
      res.status(500).send(err)
    }
  }

  //UPDATE ORDER

  const statusOrder = async (req, res) => {
    const { id } = req.params
    try {
      const updating = await Order.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true}
      );
      res.status(200).send(updating)
      
    } catch (error) {
      res.status(500).send(error)
    }
  }

  

  module.exports = {
    getOrders,
    ordenes,
    getIncome,
    getWeek,
    lastOrders,
    statusOrder
  }