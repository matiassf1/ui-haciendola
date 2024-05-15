// RegisterPage.js
import { useNavigate } from 'react-router-dom';
import { userFormType } from '../utils/formTypes';
import AuthForm from '../features/auth/AuthForm';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const notyf = new Notyf();

    const registerRequest = async (form: userFormType) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/user`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.log(errorResponse);

                let message = 'An error occurred';
                if (errorResponse && errorResponse.message) {
                    message = 'Invalid credentials';
                }
                return message
            }

            notyf.success(`User ${form.username} created`);
            navigate('/sign-in');
        } catch (error) {
            console.log(error);
            return 'An error occurred'
        }
    };

    return (
        <AuthForm
            title="Register"
            linkText="Already a member? "
            linkURL="/sign-in"
            onSubmit={registerRequest}
        />
    );
};
