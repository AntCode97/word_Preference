






const get_word = (word) => {
    // 1. child-process모듈의 spawn 취득 
    const spawn = require('child_process').spawn; 

    // 2. spawn을 통해 "python 파이썬파일.py" 명령어 실행 
    const result_02 = spawn('python', ['tweepy.py', word]); 

    let words;
    result_02.stdout.on('data', (result)=>{ 
        console.log(result.toString()); 
        words = result.toString()
        return result.toString();
      });

      
      
};

module.exports ={
    get_word
};