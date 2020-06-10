
import getConnection from '../db'
// let user = []

// export const addUser = async (req,res) => {
//     console.log("request parameters ::::::",JSON.stringify(req.body))
//     let json = JSON.parse (JSON.stringify(req.body))
//     let db = await getConnection()
//     db.collection('user').insert(json,{ unique: true }).then((result) => {
//             console.log("Record added :- " + JSON.stringify(result));
//             if(result!=null){
//                 res.json({status:"success",message:"record inserted successfully"})
//                 res.end()
//             }else{
//                 res.json({status:"failed",message:"record not inserted"})
//                 res.end()
//             }
//         });
    
// }

// export const getUsers = async(req,res) => {
//     let db = await getConnection()
//     db.collection('user').find({}).toArray((err,result) => {
//         console.log("Record added :- " + JSON.stringify(result));
//         if (err) throw err;
//         if(result){
//             res.json({status:"success",message:result})
//             res.end(); 
//         }else{
//             res.json({status:"failed",message:{}})
//             res.end();
//         }
//     });
// }

const users = [];

export const addUser = ({id,name,room})=>{ 

  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user)=> user.name === name && user.room === room);

  if(!name||!room) return {error: 'Username and room are required.'}
  
  if(existingUser){
    return {error: 'Username is taken'};
  }

  const user = { id,name,room };

  users.push(user);

  return {user}
}

export const removeUser = (id)=>{
  const index = users.findIndex((user)=> user.id===id);
  
  if(index!==-1){
    return users.splice(index,1)[0];
  }
}

export const getUser = (id)=>{
  let result = users.find(user=> user.id===id);
  return result;
}

export const getUserInRoom = (room)=> users.filter((user)=> user.room===room );
