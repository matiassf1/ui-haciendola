import { ChangeEvent, useState } from 'react';
import { userFormType } from '../../utils/formTypes';
import { Link } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

interface AuthFormProps {
    title: string;
    linkText: string;
    linkURL: string;
    onSubmit: (form: userFormType) => Promise<string | undefined>;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, linkText, linkURL, onSubmit }) => {
    const [form, setForm] = useState<userFormType>({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState<Partial<userFormType>>({});
    const [errorMessage, _setErrorMessage] = useState<string>('');

    const notyf = new Notyf()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors: Partial<userFormType> = {};
        
        if (!form.username) {
            formErrors.username = 'Username is required';
        }

        if (!form.password) {
            formErrors.password = 'Password is required';
        }

        setErrors(formErrors);

        if (Object.keys(formErrors).length !== 0) {
            return console.log('Form is invalid:', formErrors);
        }

        const response = await onSubmit(form)

        if (response !== undefined) {
            notyf.error(response);
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center place-items-center">
            <div>
                <form
                    className="mx-auto my-auto p-10 bg-zinc-700 rounded-lg shadow-lg shadow-[#2B2A33] sm:w-[60vh]"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-6">
                        <h4 className="uppercase font-bold text-4xl text-white">{title}</h4>
                        {errorMessage && <p className="text-red-500 font-semibold uppercase">{errorMessage}</p>}

                        <div className="flex flex-col gap-2">
                            <label htmlFor="username" className="uppercase font-semibold text-lg text-white">Username</label>
                            <input
                                type="text"
                                className="border-none rounded-md p-2 bg-zinc-600 border-black focus:outline-none flex-shrink-0 text-white"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                            />
                            {errors.username && <p className="text-red-500">{errors.username}</p>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="uppercase font-semibold text-lg text-white">Password</label>
                            <input
                                type="password"
                                className="border-none rounded-md p-2 bg-zinc-600 border-black focus:outline-none flex-shrink-0 text-white"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className="text-red-500">{errors.password}</p>}
                            <div className='flex flex-col sm:flex-row justify-between'>
                                <Link to="/forgot-password" className='text-zinc-900 hover:text-zinc-800 w-fit underline font-semibold'>Forgot Password?</Link>
                                <p className='text-zinc-900 hover:cursor-default'>
                                    {linkText}
                                    <Link to={linkURL} className='text-zinc-900 hover:text-zinc-800 w-fit underline font-semibold'> Sign {linkText === "Sign Up" ? "Up" : "In"}</Link>
                                </p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-zinc-800 hover:opacity-70 text-white rounded-md px-4 py-2 uppercase font-semibold hover:border border-zinc-800"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
