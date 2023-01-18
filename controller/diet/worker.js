const mysql = require("mysql2");

const dbConnect = () => {
    const db = mysql.createConnection({  //db변수에 mysql변수에 있는 크리에이드커넥션 메소드를 호출(객체를 받음) 할당
        host    : '192.168.0.2',   //host객체 - 마리아DB가 존재하는 서버의 주소
        user    : 'root', //user객체 - 마리아DB의 계정
        password    : '1234',   //password객체 - 마리아DB 계정의 비밀번호
        database    : 'yammy'   //database객체 - 접속 후 사용할 DB명
    });

    const result = db.connect( async (err,req,res) => {
        if (err) return err;
        const user = req.query.userId  //쿼리로 userId 입력받기
        const sql = "CREATE TABLE " + user + "(mb_name VARCHAR(255), mb_level VARCHAR(255))";
        db.query(sql, (err, result) => {
            if (err) return err;
            return res.status(201).json({result:"success", data:result});
        })
    })
    return result;
}

self.onmessage = e => {
    postMessage(dbConnect());
};
