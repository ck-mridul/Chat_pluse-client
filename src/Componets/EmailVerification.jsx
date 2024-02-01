import React from 'react'
import LoginPage from '../Pages/LoginPage'
import { useNavigate, useParams } from 'react-router-dom'
import { emailVerification } from '../services/api/auth'
import Swal from 'sweetalert2'


function EmailVerification() {
    const token  = useParams();
    const navigate = useNavigate();

        async function verifyEmail() {
            try {
                await emailVerification(token);
                handleSuccess();
            } catch (error) {
                handleError(error);
            }
        }
        if(token){

            verifyEmail();
        }
    

    const handleSuccess = () => {
        Swal.fire({
            title: 'Email Verification',
            text: 'Your email is verified',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
        });
        localStorage.clear()
        navigate('/login');
    };

    const handleError = (error) => {
        const errorMessage = error.response?.data || 'An error occurred';
        Swal.fire({
            title: errorMessage,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
        });
        navigate('/login');
    };

    return (
        <LoginPage />
    );
}

export default EmailVerification