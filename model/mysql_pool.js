const mysql=require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysqldb',
    port: 3306
});

let getByName = (name, callback) => {
    pool.getConnection(function(err, conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(`SELECT  firstName, lastName, image
                        FROM user WHERE firstName='${name}'`,
                        function(qerr,vals,fields){
                            conn.release();
                            callback(qerr,vals,fields);});        
        }
    });
}

let setPdf = (name, pdfFile, callback) => {
    pool.getConnection(function(err, conn){
        if(err){            
            callback(err,null,null);
        }else{
            conn.query(`UPDATE user SET pdf = ? WHERE firstName='${name}'`,
                        pdfFile.toString(), 
                        function(qerr,vals,fields){
                                conn.release();
                                callback(qerr,vals,fields);});   
        }
    });
}

module.exports = {
    getByName: getByName,
    setPdf: setPdf
};
