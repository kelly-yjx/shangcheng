const {router,pool,Result} = require('../connect')

//查询用户列表
router.get('/',(req,res)=>{
  pool.getConnection((err,conn)=>{
    conn.query('SELECT id,price FROM commodity',(e,r)=>res.json(new Result({data:r})))
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
router.patch('/',(req,res)=>{
  let {password,id} = req.body
  if(!password){
    res.json(new Result({msg:' password can not be empty'}))
    return
  }
  let sql1 = `SELECT * FROM user WHERE id=${id}`
  let sql = ` UPDATE user SET password = '${password}' WHERE id = ${id}`
  pool.getConnection((err,conn)=>{
    conn.query(sql1,function(e,r){
      if(r){
        if(r.length===0){
          return res.json(new Result({msg:'修改失败,未查询到当前id',code:500}))
        }else{
          conn.query(sql,function(e,r1){
            if(r1){
              return res.json(new Result({msg:'修改成功'}))
            }else{
              let msg = e.sqlMessage
              return res.json(new Result({msg}))
            }
          })
        }
      }
    })
    conn.release()
  })
})
//删除用户
router.delete('/',(req,res)=>{
  let {id} = req.query
  let sql = `DELETE FROM user WHERE id = '${id}'`
  pool.getConnection((err,conn)=>{
    conn.query(sql,function(e,r){
      if(e){
        return res.json(new Result({msg:'修改失败'}))
      }else{

        return res.json(new Result({data:r}))
      }
    })
    conn.release()
  })
})

module.exports = router;
