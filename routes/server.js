const router = require('express').Router();
const User = require('../models/signup');
const Slot = require('../models/slotlist');

//adding user data to mongodb
router.route('/adduser').post((req, res) => {
    const username = req.body.username;
    const dob = req.body.dob;
    const email = req.body.email;
    const password = req.body.password;
    const department = req.body.department;
    const year = req.body.year;
  
    const newUser = new User(
        {username,dob,email,password, department,year});
  
    newUser.save()
      .then(() => res.json('User added Successfully!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  //login check
  router.route('/usercheck').post((req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;
  
    User.find({"email":email,"password":password})
      .then((result) => 
      {
      
        if(result.length < 1)
           res.json({success:false,message:'User not found'});
        else
          res.json({success:true,message:'User Exist Successfully!',data:result});
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


//adding slot data to mongodb
router.route('/addslot').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const department = req.body.department;
  const year = req.body.year;
  const subject = req.body.subject;
  const date = req.body.date;
  const session = req.body.session;
  const venue = req.body.venue;

  const newSlot = new Slot(
      {username,email,department,year,subject,date,session,venue});

    newSlot.save()
    .then(() => res.json('Slot added Successfully!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//getting slotlist data
router.route('/getslotlist').get((req, res) => {
  Slot.find()
    .then(result =>{
      if(result.length < 1)
        res.json({success:false,message:'No slots Available'});
      else
        res.json({success:true,message:'slot exist!',data:result});
      })
    .catch(err => res.status(400).json('Error: ' + err));
});

//getting slotlist data based on year
router.route('/getyearslotlist').post((req, res) => {
  Slot.find({
    "year":req.body.year
  })
    .then(result =>{
      if(result.length < 1)
        res.json({success:false,message:'No slots Available'});
      else
        res.json({success:true,message:'slot exist!',data:result});
      })
    .catch(err => res.status(400).json('Error: ' + err));
});

//getting student data 
router.route('/getstudents').post((req, res) => {
  User.find({
    "year":req.body.year
  })
      .then((result) => 
      {
        if(result.length < 1)
           res.json('Data not found');
        else
          res.json(result);
      })
      .catch(err => res.status(400).json('Error: ' + err));
});


//getting student data based on username
router.route('/specificstudent').post((req, res) => {
  User.find({
    "username":req.body.username
  })
      .then((result) => 
      {
        if(result.length < 1)
           res.json('Data not found');
        else
          res.json(result);
      })
      .catch(err => res.status(400).json('Error: ' + err));
});


//getting student slot data based on username
router.route('/slotstudent').post((req, res) => {
  Slot.find({
    "email":req.body.email
  })
      .then((result) => 
      {
        if(result.length < 1)
           res.json({success:false,message:'No slots Available'});
        else
          res.json({success:true,message:'slot exist!',data:result});
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

//slot deleting
router.route('/slotdelete:id').delete((req, res) => {
  Slot.findByIdAndDelete(req.params.id)
    .then(() => res.json('Slot deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


//getting slot by id
router.route('/getslotbyid:id').get((req, res) =>{
  Slot.findById(req.params.id)
  .then((result)=>{
    res.json({success:true,message:'slot exist!',data:result})
  })
  .catch(err => res.status(400).json('Error: ' + err));
})

//updating slot data
router.route('/updateslot:id').post((req, res) => {
  Slot.findById(req.params.id)
    .then(result => {
      result.username = req.body.username;
      result.email = req.body.email;
      result.department = req.body.department;
      result.year = req.body.year;
      result.subject = req.body.subject;
      result.date = req.body.date;
      result.session = req.body.session;
      result.venue = req.body.venue;
    
      result.save()
        .then(() => res.json('slot updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});










module.exports = router;