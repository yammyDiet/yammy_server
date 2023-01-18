const {createWorker} = require("tesseract.js");
const mysql = require("mysql2")

const dietEvent = {
    getAutoDiet: async (req, res, next) => {
        const imageWorker = await createWorker({
            logger: m => console.log(m)
          });
          //이미지에 Text 추출 tessaract 함수
          (async () => {
            await imageWorker.loadLanguage('kor');
            await imageWorker.initialize('kor');
            const { data: { text } } = await imageWorker.recognize(__dirname + "/IMG_2345.jpg");
            let arr = [];
            let result="";
            for(let txt of text){
                result+=txt.trim();
               if(txt === "\n") {
                arr.push(result); //이미지 텍스트 추출 배열로 삽입
                result="";
        }
               }
               // 이미지에서 추출한 텍스트를 배열에 저장해서
               //저장한 데이터를 순회하여 DB 탐색
               //let dietResult = {};
               const connection = mysql.createConnection({  //db변수에 mysql변수에 있는 크리에이드커넥션 메소드를 호출(객체를 받음) 할당
                host    : '192.168.0.2',   //host객체 - 마리아DB가 존재하는 서버의 주소
                user    : 'root', //user객체 - 마리아DB의 계정
                password    : '1234',   //password객체 - 마리아DB 계정의 비밀번호
                database    : 'yammy'   //database객체 - 접속 후 사용할 DB명
            });
            arr.forEach(food=>{
                let result = [];
                connection.query('SELECT * FROM food WHERE foodName = ?',food, function(err, results, fields) {
                    if (err) throw err;
                        // DB에서 추출한 텍스트를 모두 보여주기
                        if(results.length===0){
                            return result.push(null);
                        }else{
                            return result.push(results);
                        }
                });
                req.session.food = result;
                console.log(req.session);
            })
            res.status(200).json({result:"Success"})
            //req.session.diet = JSON.stringify(dietResult);
            await imageWorker.terminate();
            //console.log(req.session);
          })();
        // user id
          
    },
    postAutoDiet: async (req,res)=>{
        //동적 테이블 생성
          //const tableWork = new Worker('./worker.js');
          //tableWork.postMessage(변수);
          // dietResult[식품명] 으로 접근해서 사용
          const db = mysql.createConnection({  //db변수에 mysql변수에 있는 크리에이드커넥션 메소드를 호출(객체를 받음) 할당
            host    : '192.168.0.2',   //host객체 - 마리아DB가 존재하는 서버의 주소
            user    : 'root', //user객체 - 마리아DB의 계정
            password    : '1234',   //password객체 - 마리아DB 계정의 비밀번호
            database    : 'yammy'   //database객체 - 접속 후 사용할 DB명
        });
        db.connect((err,req,res) => {
            if (err) throw new Error(err);
            
            const user = res.locals.user.userId;
            let tableSQL = `SHOW TABLES IN yammy LIKE '${user}'`;
            if(tableSQL != null){
                let insertSQL = `INSERT INTO ${user} VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`;
                if(tableSQL){
                    db.query(insertSQL, (err, result) => {
                        if(err) throw new Error("삽입 오류");
                        res.status(201).json({rersult:"Success", data:result})
                    })
                }
                let data;
                db.query(insertSQL, (err, result) => {
                if(err) throw new Error('삽입 오류'+err)
                        data = result;
                    });
                data = result;
                res.status(201).json({result:"Success", data})

            }else{
                let createSQL = `CREATE TABLE ${user} ( 
                    userId varchar(100) NOT NULL,
                    userFoodId INT NOT NULL AUTO_INCREMENT,
                    foodName VARCHAR(300) NOT NULL,
                    calorie INT,
                    carbonhydrate INT,
                    protein INT,
                    natrium INT,
                    fat INT,
                    sugar INT,
                    calcium INT,
                    createDate DATETIME,
                    PRIMARY KEY (userFoodId),
                    CONSTRAINT fk_userid FOREIGN KEY (userId) REFERENCES USER (Userid) ON DELETE CASCADE)`;
                    let insertSQL = `INSERT INTO ${user} VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`;
                    if(tableSQL){
                        db.query(insertSQL, (err, result) => {
                            if(err) throw new Error("삽입 오류");
                            res.status(201).json({rersult:"Success", data:result})
                        })
                    }
                    
                    
                    db.query(createSQL, (err, result) => {
                        if(err) throw new Error('테이블 생성 오류'+err);
                        let data;
                        db.query(insertSQL, (err, result) => {
                            if(err) throw new Error('삽입 오류'+err)
                            data = result;
                        });
                        data = result;
                        res.status(201).json({result:"Success", data})
                    })
            }
            
        })
    },
    DeleteAutoDiet:(req, res) => {
        
    },
    UpdateAutoDiet:(req,res) => {
        
    },
    getSortSearchDiet: async(req,res,next) =>{
        let foodname = req.query.search.trim(); // 검색어에 따라 판단 기준
        //const input_user_id = req.query.user_id;
        //let biggroup = req.query.대분류;
        //let smallgroup = req.query.소분류;
        if(foodname.length === 0){
            res.redirect('/sortdiet'+"검색어를 입력해주세요");
        }
        const result = await sortdiet.findAll({
            where: {
                [and] : [{private: false}],[or]:[{식품명 : { [like]: `%${foodname}`}}]
            }
        })
        if(!result){
            res.status(403).json({result:"Fail", data:"검색 결과가 없습니다"});
        }
                res.status(200).json({
                message: "Search results",
                status: 'success',
                data:{
                    foodname:result.foodname,
                    calorie:result.calorie,
                    fat:result.fat,
                    carbonhydrate:result.carbonhydrate,
                    protein:result.protein,
                    calcium:result.calcium,
                    natrium:result.natrium                    
                }
            }) 
        },
    postSortSearchDiet: async(req,res) => {
        const foodname = req.query.search.trim();
        let body = req.body.data;
        let user_id = req.query.user_id;
        let reuslt = await sortdiet.findOne({
            where:{
                userId: user_id
            }
        })

        req.session.data = body;
        req.session.save(function(){
            res.redirect('/sortdiet'+ "검색어를 입력해주세요.")
        })
        
    }
}




module.exports = dietEvent;