let express = require('express');
let app = express();

app.use(express.static(__dirname+'/dist/volunteerproject'));
app.get('/*',(req,res)=>{
    res.sendFile(__dirname+'/dist/volunteerproject/index.html');
});
app.listen(process.env.PORT || 8080);