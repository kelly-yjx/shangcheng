const {router,pool,Result} = require('../connect')

//查询用户列表
router.get('/',(req,res)=>{
  pool.getConnection((err,conn)=>{
    conn.query('SELECT * FROM commodity',(e,r)=>res.json(new Result({data:r})))
    conn.release()
  })
})
//增加用户列表
router.post('/',(req,res)=>{
  let {userName,password} =  req.body
  if(!userName||!password){
    res.json(new Result({msg:'userName or password can not be empty'}))
    return
  }
  let sql = `INSERT INTO user (userName, password) VALUES ('${userName}', '${password}')`
  pool.getConnection((err,conn)=>{
    conn.query(sql,function(e,r){
      if(r){
        return res.json(new Result({data:{data:r},msg:'添加成功'}))
      }
      else{
        let msg = e.sqlMessage
        return res.json(new Result({msg}))
      }
      })
    conn.release()
  })
})
//修改用户列表
// router.patch()
//删除用户

module.exports = router;
