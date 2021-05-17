import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Profile = ()=>{
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const history = useHistory()

    useEffect(()=>{
        const profile =  JSON.parse(localStorage.getItem('compaign-user'))
        if(profile ===  null){
            history.push('/signin')
        }else{       
            setName(profile.name)
            setEmail(profile.email)    
        }
       
    }, [])


    const edit_profile = ()=>{
        history.push('/edit_profile')
    }

        return (
            <div className="container">
                    <div className="col-md-5 mx-auto">
                        <div className="text-center">      
                            <img src="./user.jpg" alt="personal-imagery" width="250" />

                            <table className="table table-striped">
                                <tr>
                                    <th><i className="fa fa-user"></i> Name</th>
                                    <td>{name? name: ""}</td>
                                </tr>

                                <tr>
                                    <th><i className="fa fa-envelope"></i> Email</th>
                                    <td>{email? email: ""}</td>
                                </tr>

                            </table>
                            <button onClick={()=>edit_profile()} className="btn btn-success btn-block"><i className="fa fa-pencil"></i> Edit Profile</button>
                        </div>
                    </div>
                          
            </div>
        )
}


export default Profile