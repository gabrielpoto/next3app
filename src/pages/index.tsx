import { api } from "~/utils/api";
import {useState} from "react";

export default function Home() {

  const [name, setname  ] = useState("");
  const [email, setEmail  ] = useState("");
  const [nameToUpdate, setNameToUpdate  ] = useState("");
  const [emailToUpdate, setEmailToUpdate  ] = useState("");
  const [userIds, setUserIds  ] = useState("");
  const [userIdToUpdate, setUserIIdToUpdate  ] = useState("");
  const [userIdToDelete, setUserIdToDelete  ] = useState("");

  //fetch fonctions
  const fetchAllUsers = api.example.getAllUser.useQuery();
  const fetchUserById = api.example.getUserById.useQuery({id: userIds });
  const fetchCreateUser = api.example.createUser.useMutation();
  const fetchUpdateUser = api.example.updateUser.useMutation();
  const fetchDeleteUser = api.example.deleteUser.useMutation();


  // add handler
    const handleAddUser = async () => {
        try {
            await fetchCreateUser.mutateAsync({
                name,
                email
            });
            setname("");
            setEmail("");
             await fetchAllUsers.refetch();
        }catch (e) {
            console.log(e);
        }
    }

    const handleUpdateUser = async () => {
        try {
            await fetchUpdateUser.mutateAsync({
                id: userIdToUpdate,
                name: nameToUpdate,
                email: emailToUpdate
            });
            setNameToUpdate("");
            setEmailToUpdate("");
            setUserIIdToUpdate("");
            await fetchAllUsers.refetch();
        }catch (e) {
            console.log(e);
        }
    }

    const handleDeleteUser = async () => {
        try {
            await fetchDeleteUser.mutateAsync({
                id: userIdToDelete
            });
            setUserIdToDelete("");
            await fetchAllUsers.refetch();
        }catch (e) {
            console.log(e);
        }
    }


  return (
   <div className="mx-auto p-8">
     <div className='mb-8'>
       <h2 className='mb-4 text-2xl font-bold text-gray-700'>
         Get All Users
       </h2>
         <button
             className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
             onClick = { () =>  fetchAllUsers.refetch()}
         >

             Fetch All Users
         </button>


         <div className="relative overflow-x-auto mt-4">
             <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                 <tr>
                     <th scope="col" className="px-6 py-3">
                         id
                     </th>
                     <th scope="col" className="px-6 py-3">
                         Name
                     </th>
                     <th scope="col" className="px-6 py-3">
                         Email
                     </th>
                     <th scope="col" className="px-6 py-3">
                         createdAt
                     </th>
                 </tr>
                 </thead>
                 {fetchAllUsers.data &&  fetchAllUsers.data.map((user) => (
                     <tbody>
                     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                         <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                             {user.id}
                         </th>
                         <td className="px-6 py-4">
                             {user.name}
                         </td>
                         <td className="px-6 py-4">
                             {user.email}
                         </td>
                         <td className="px-6 py-4">
                             {user.createdAt.getFullYear()}-{user.createdAt.getMonth()}-{user.createdAt.getDate()}
                         </td>
                     </tr>
                     </tbody>
                 ))}
             </table>
         </div>

     </div>



       //Get User By Id
       <div className='mb-8'>
           <h2 className='mb-4 text-2xl font-bold text-gray-700'>
               Get User By Id
           </h2>
           <div className='mb-4 flex'>
               <input type="text"
                      className='w-1/2 mr-2 p-2 border-2 border-gray-300 rounded-md'
                      placeholder='User Id'
                      value={userIds || ""}
                      onChange={(e) => setUserIds(e.target.value)}
               />
               <button
                   className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                   onClick = { () =>  fetchUserById.refetch()}
               >

                   Fetch User By Id
               </button>

           </div>

           {fetchUserById.data && (
               <div>
                   <p>Name: {fetchUserById.data.name}</p>
                   <p>Email: {fetchUserById.data.email}</p>
               </div>
           )}
       </div>



       //Create User
       <div className='mb-8'>

           <h2 className='mb-4 text-2xl font-bold text-gray-700'>
               create User
           </h2>
           <div className='mb-4 flex'>
               <input type="text"
                      className='w-1/2 mr-2 p-2 border-2 border-gray-300 rounded-md'
                      placeholder='name'
                      value={name}
                      onChange={(e) => setname(e.target.value)}

               />
               <input type="text"
                      className='w-1/2 mr-2 p-2 border-2 border-gray-300 rounded-md'
                      placeholder='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
               />

           </div>


           <button
               className='bg-green-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
               onClick = {handleAddUser}
           >

               Create User
           </button>
       </div>

       //Update User
       <div className='mb-8'>

           <h2 className='mb-4 text-2xl font-bold text-gray-700'>
               create User
           </h2>
           <div className='mb-4 flex'>
               <input type="text"
                      className='w-1/2 mr-2 p-2 border-2 border-gray-300 rounded-md'
                      placeholder='name'
                      value={nameToUpdate}
                      onChange={(e) => setNameToUpdate(e.target.value)}

               />
               <input type="text"
                      className='w-1/2 mr-2 p-2 border-2 border-gray-300 rounded-md'
                      placeholder='email'
                      value={emailToUpdate}
                      onChange={(e) => setEmailToUpdate(e.target.value)}
               />
               <input type="text"
                      className='w-1/2 mr-2 p-2 border-2 border-gray-300 rounded-md'
                      placeholder='user id'
                      value={userIdToUpdate || ""}
                      onChange={(e) => setUserIIdToUpdate(e.target.value)}
               />

           </div>

           <button
               className='bg-orange-500 text-white font-bold py-2 px-4 rounded'
               onClick = {handleUpdateUser}
           >

               Delete users
           </button>
       </div>


       <div className='mb-8'>

           <h2 className='mb-4 text-2xl font-bold text-gray-700'>
               create User
           </h2>
           <div className='mb-4 flex'>
               <input type="text"
                      className='w-1/2 mr-2 p-2 border-2 border-gray-300 rounded-md'
                      placeholder='enter user id to delete'
                      value={userIdToDelete}
                      onChange={(e) => setUserIdToDelete(e.target.value)}

               />
           </div>

           <button
               className='bg-red-700 text-white font-bold py-2 px-4 rounded'
               onClick = {handleDeleteUser}
           >

               Delete users
           </button>
       </div>

   </div>
  );
}
