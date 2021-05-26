import React from 'react'

const fnc = ({ input, label, meta})=>{
    console.log(meta)
    return(
        <div>
            <label>{label}</label>
            <input {...input} className="form-control" />

                {meta.touched === true && meta.error !== undefined ?
                <div className="alert alert-danger">
                    {meta.error}
                </div> 
                :
                ""       
                }
        </div>
    )
}


export default fnc