const { sendResponse } = require("../helper/helper");
const studentModel = require("../models/studentModel");   
const express = require("express");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const result = await studentModel.find()
    if (!result) {
      res.send(sendResponse(true, null, 'Data Not Found')).status(404)
    } else {
      res.send(sendResponse(true, result)).status(200)
    }
  } catch (e) {
    console.log(e)
    res.send(sendResponse(true, null, 'Internal error')).status(400)

  }
});
route.get("/search", async (req, res) => {
  let {firstName,lastName} = req.body
    try {
      if(firstName){
      const result = await studentModel.find({
      firstName:firstName,
      lastName:lastName,
    })
    if (!result) {
      res.send(sendResponse(true, null, 'Data Not Found')).status(404)
    } else {
      res.send(sendResponse(true, result)).status(200)
    }
  }    
 
  } catch (e) {
    console.log(e)
    res.send(sendResponse(true, null, 'Internal error')).status(400)

  }
});
route.get("/:id", async (req, res) => {
  let id = req.params.id
  try {
    const result = await studentModel.findById(id)
    if (!result) {
      res.send(sendResponse(true, null, 'Data Not Found')).status(400)
    } else {
      res.send(sendResponse(true, result)).status(200)
    }
  } catch (e) {
    console.log(e)
    res.send(sendResponse(true, null, 'Internal error')).status(400)
  }
});
route.post("/", async (req, res) => {
  let errArr = []
  try {
    let { firstName, lastName, contact, course } = req.body
    if (!firstName) {
      errArr.push('Required : First Name')
    }
    if (!lastName) {
      errArr.push('Required : Last Name ')
    }
    if (!contact) {
      errArr.push('Required : Contact')
    }
    if (!course) {
      errArr.push('Required : Course ')
    }
    if (errArr.length > 0) {
      res.send(sendResponse(false, null, 'Required All Fields')).status(400)
      return;
    } else {
      let obj = { firstName, lastName, contact, course };
      let student = new studentModel(obj)
      await student.save()
      if (!student) {
        res.send(sendResponse(true, null, 'internal error')).status(400)
      } else {
        res.send(sendResponse(true, student, 'successfully send data')).status(200)
      }
    }
  } catch (e) {
    console.log(e)
  }
});
route.put("/:id", async (req, res) => {
  let id = req.params.id;
  let result = await studentModel.findById(id)
  try {
    if (!result) {
      res.send(sendResponse(false, null, 'Data Not Found')).status(404)
    } else { 
      let UpdateResult = await studentModel.findByIdAndUpdate(id,req.body,{
        new:true,
      })

      if (!UpdateResult) {
        res.send(sendResponse(false, null, 'Data Not Found')).status(400)
      } else {
        res.send(sendResponse(true, UpdateResult, "Data deleted successfuly")).status(200)
      }

    }
  } catch (e) {
    console.log(e)
    res.send(sendResponse(false, null, 'internal Error')).status(400)
  }

});
route.delete("/:id", async (req, res) => {
  let id = req.params.id
  let result = await studentModel.findById(id)
  try {
    if (!result) {
      res.send(sendResponse(false, null, 'Data Not Found')).status(404)
    } else {
      let deleteResult = await studentModel.findByIdAndDelete(id)
      if (!deleteResult) {
        res.send(sendResponse(false, null, 'Data Not Found')).status(400)
      } else {
        res.send(sendResponse(true, result, "Data deleted successfuly")).status(200)
      }
    }
  } catch (e) {
    console.log(e)
    res.send(sendResponse(false, null, 'internal Error')).status(400)
  }

});

module.exports = route;
