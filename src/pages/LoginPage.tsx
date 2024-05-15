import { useNavigate } from 'react-router-dom';
import { userFormType } from '../utils/formTypes';
import AuthForm from '../features/auth/AuthForm';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const LoginPage = () => {
    const navigate = useNavigate();
    const notyf = new Notyf();

    const loginRequest = async (form: userFormType) => {
        try {
            const response = await fetch('http://localhost:3000/auth', {
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

            const result = await response.text();
            localStorage.setItem('token_access', result);
            navigate('/product');
            notyf.success(`Welcome again ${form.username}`);
        } catch (error) {
            console.log(error);
            return 'An error occurred'
        }
    };


    return (
        <AuthForm
            title="Login"
            linkText="Not a member?"
            linkURL="/sign-up"
            onSubmit={loginRequest}
        />
    );
};
