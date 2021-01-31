

let Sentiment = require('sentiment');
let sentiment = new Sentiment();
let result = sentiment.analyze('Mint is Worst');
const test = ["MintChoco is best",
"I love MintChoco",
"Fuck MintChoco",
"I hate MintChoce",
"Get out MintChoce"]
let score = 0;
let comparative = 0;
let count =0;
test.forEach((element)=> {
    result = sentiment.analyze(element);
    score+= result.score;
    comparative+=result.comparative;
    count+=1;
    console.log(result)
}
);


console.log(`score: ${score}, Comparative: ${comparative}, Count: ${count}`);