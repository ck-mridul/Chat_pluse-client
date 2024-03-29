// import {bannerPageInputClass} from "../../styles.js";
import {useState} from "react";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";

export const PasswordField = (props) => {
    let touchTimer = null;

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(true);
    }
    const toggleHidePassword = () => {
        setShowPassword(false);
    }
    const handleTouchStart = () => {
        toggleShowPassword()
        touchTimer = setTimeout(() => {
            toggleHidePassword();
        }, 10000);
    };

    const handleTouchEnd = () => {
        clearTimeout(touchTimer);
        toggleHidePassword();
    };
    return (
        <div className="mb-4 border border-indigo-300 rounded-md"
             style={{padding: 0, display: "flex", flexDirection: "row", alignItems: "center"}}>
            <input {...props} type={showPassword ? 'text' : 'password'}
                   className={'w-full h-full  p-3 rounded-md'}
                   required
                   />
            <i onTouchStart={handleTouchStart}
               onTouchEnd={handleTouchEnd}
               onClick={(e) => e.preventDefault()}
               onMouseDown={toggleShowPassword}
               onMouseUp={toggleHidePassword}
               style={{paddingRight: ".75rem", outline: 'none', cursor: 'pointer'}}>
                {showPassword ? <AiFillEyeInvisible className={'text-grey-500'}/> : <AiFillEye className={'text-grey-500'}/>}
            </i>
        </div>
    )
}