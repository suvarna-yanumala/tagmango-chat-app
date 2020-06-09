
import getConnection from '../db'

export const addUser = async (req,res) => {
    console.log("request parameters ::::::",JSON.stringify(req.body))
    let json = JSON.parse (JSON.stringify(req.body))
    let db = await getConnection()
    db.collection('user').insert(json,{ unique: true }).then((result) => {
            console.log("Record added :- " + JSON.stringify(result));
            if(result!=null){
                res.json({status:"success",message:"record inserted successfully"})
                res.end()
            }else{
                res.json({status:"failed",message:"record not inserted"})
                res.end()
            }
        });
    
}
// export const signin = async(req,res) => {
//     console.log("request parameters ::::::",JSON.stringify(req.body))
//     let json = JSON.parse (JSON.stringify(req.body))
//     let db = await getConnection()
//     if(json.username != null && json.passwprd != null){
//         db.collection('user').find(json).then((result) => {
//             console.log("Record added :- " + JSON.stringify(result));
//             if(result!=null){
//                 res.json({status:"success",message:"login successfully"})
//                 res.end(); 
//             }else{
//                 res.json({status:"failed",message:"record not founded"})
//                 res.end();
//             }
//         });

//     }else{
//         res.json({status:"failed",message:"username and password should not be null"})
//         res.end(); 
//     }
    
// }

export const getUsers = async(req,res) => {
    let db = await getConnection()
    db.collection('user').find({}).toArray((err,result) => {
        console.log("Record added :- " + JSON.stringify(result));
        if (err) throw err;
        if(result){
            res.json({status:"success",message:result})
            res.end(); 
        }else{
            res.json({status:"failed",message:{}})
            res.end();
        }
    });
}
