
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const spawn = require('child_process').spawn; 
const PORT = 4001;
const {get_word} = require("./python.js")
const handleListening = () => console.log(`🐶Listening on: http://localhost:${PORT}`);

app.set("view engine", "pug")


//쿠기 정보들을 이해하기 위해 사용
app.use(cookieParser());
//웹에서 데이터를 넘겨받을 때, 
//urlencoded와 json 형식의 객체를 서버가 이해할 수 있도록 하기위해 사용, 이거 없으면 req.body했을 때, 객체를 받아 올 수 없음..
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//logging하는 걸 도와주는 미들웨어 콘솔에 여러가지 로그를 띄워줌
app.use(morgan("dev"));


app.get("/", (req,res) => {
    res.render("home");
})



app.post("/", (req,res) => {

    console.log(req.body.word);
    // 2. spawn을 통해 "python 파이썬파일.py" 명령어 실행 
    const result_02 = spawn('python', ['tweepy.py',req.body.word.toString()]); 

    result_02.stdout.on('data', (result)=>{ 
        
        let words = []
        str = result.toString();

        str = str.substring(2, str.length-3);
        words = str.split("', '")

        console.log(words); 
        let Sentiment = require('sentiment');
        let sentiment = new Sentiment();
        let result2 ;
        let score = 0;
        let comparative = 0;
        let count =0;
        words.forEach( (element) => {
            result2 = sentiment.analyze(element);
            score+= result2.score;
            comparative+=result2.comparative;
            count+=1;
            console.log(result2)
        });
    
      
      console.log(`score: ${score}, Comparative: ${comparative}, Count: ${count}`);
    const word_result ={
        score:score,
        comparative:comparative,
        count:count

    }
    console.log(word_result);
    res.render("home", {word_result});
}
);



});



app.listen(PORT, handleListening);