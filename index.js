const express = require('express');

const port = 3336;

const app = express();

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    return res.render('team', {
      list: todo  
    })
})


let todo = [
    {
        srNo: 1,
        team: "Dribbling"
    },
    {
        srNo: 2,
        team: "Sprint 2Km-3Km"
    },
    {
        srNo: 3,
        team: "Shooting-Practice"
    }
]

app.post('/insertteam', (req, res) => {
    const obj = {
        srNo: req.body.teamId,
        team: req.body.team
    };

    todo.push(obj);
    return res.redirect('back')
});

app.get('/deleteteam', (req, res) => {
    let teamId= req.query.srNo;

    let filteredList = todo.filter((list) => {
        return list.srNo != teamId;
    });

    todo = filteredList;

    return res.redirect('back');
})

app.get('/editteam', (req, res) => {
    let teamId = req.query.srNo;

    let filteredList = todo.filter((user)=>{
        return user.srNo == teamId
    })

    return res.render('edit' , {
        data: filteredList[0]
    })
})

app.post('/editteam' , (req,res)=>{
 
    let filteredList = todo.filter((user)=>{
        if(user.srNo == req.body.editId){
            user.team = req.body.team
        }
        return user
    })

    res.redirect('/')
})

app.listen(port, (err) => {
    if (err) {
        console.log("Server not started in Port.");
        return false;
    }
    console.log("server started at http://localhost:" + port);
})

