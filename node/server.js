const express = require('express');

const app = express();
app.get('/',(req,res)=>{
    const user = {
        name:'siddhu',
        lastname:'gelye',
        age:25
    }
    res.send(user);
})
app.get('/profile',(req,res)=>{
    res.send('<h1>this is </h1>');
})
app.listen(3000);