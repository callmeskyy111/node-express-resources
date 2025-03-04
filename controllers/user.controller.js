import usersArr from "../data.json" with { type: "json" };
const users = usersArr.users; //for better readability

//! User - Controllers/Functions
export const createUser=(req,res)=>{
    const newUser = { _id: Date.now() , ...req.body};
    users.push(newUser);
    res.status(201).json({ success: true, message:'User Added Successfully ✅' ,user: newUser });
}

export const getAllUsers = (req,res)=>{
    res.json(users);
  }
export const getSingleUserById = (req, res) => {
  const userId = Number(req.params.id); // Convert to a number
  const user = users.find((u) => u._id === userId);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, user });
}  

export const updateUser = (req,res)=>{
    const userId = Number(req.params.id);
    const userIdx = users.findIndex((u) => u._id === userId);
    if(userIdx === -1){
        return res.status(404).json({ success: false, message: "User not found" });
    }
    users.splice(userIdx, 1, {_id: userId,...req.body});
    res.json({ success: true, message: "User updated successfully ✅", user: users[userIdx] });
}

export const editUser = (req,res)=>{
    const userId = Number(req.params.id);
    const userIdx = users.findIndex((u) => u._id === userId);
    const user = users[userIdx];
    if(userIdx === -1){
        return res.status(404).json({ success: false, message: "User not found" });
    }
    users.splice(userIdx, 1, {...user, ...req.body});
    res.json({ success: true, message: "User updated successfully ✅", user });
}

export const deleteUser = (req,res)=>{
    const userId = Number(req.params.id);
    const userIdx = users.findIndex((u) => u._id === userId);
    if(userIdx === -1){
        return res.status(404).json({ success: false, message: "User not found" });
    }
    const user = users[userIdx];
    users.splice(userIdx,1);
    res.status(201).json({ success: true, message: "User deleted successfully ✅", user });
  }