import React from 'react'
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";


const PasswordVisibility = ({showPassword, setShowPassword}) => {
    return (
        <div
            className="absolute right-3 top-11 cursor-pointer text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
        >
            {showPassword ?  <MdVisibility /> : <MdVisibilityOff />}
        </div>
    )
}

export default PasswordVisibility
