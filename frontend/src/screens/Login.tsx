import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Doctor from "../assets/doctor.avif";
import { createRipple } from "../helper/HelperFunc";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const Login = () => {
    const navigate = useNavigate();

    const [visiblity, setVisibility] = useState(false);

    const [loading, setLoading] = useState(false);

    const [otpSent, setOtpSent] = useState(false);

    const { pathname } = useLocation();

    const login = (pathname === "/login");

    const [formData, setFormData] = useState({
        ...(!login) && { firstname: "" },
        ...(!login) && { lastname: "" },
        email: "",
        password: ""
    });

    useEffect(() => {
        setFormData((prevValues) => {
            return {
                ...(!login) && { firstname: "" },
                ...(!login) && { lastname: "" },
                ...prevValues
            }
        });
    }, [login]);

    const handleCurrentInput = (event: ChangeEvent<HTMLInputElement>) => {
        const currentInput = (event.target as HTMLInputElement);

        setFormData((prevValues) => {
            return { ...prevValues, [currentInput.name]: currentInput.value };
        });
    };

    const handleFormSubmit = async (event: FormEvent<HTMLButtonElement>) => {
        try {
            const form = document.getElementsByTagName("form")[0];

            if (form.checkValidity() === true) {
                event.preventDefault();
                setLoading(true);
            } else return false;

            let response = null;

            if (login) {
                response = await axios.post(`http://127.0.0.1:6969/login`, formData);

                navigate("/", { replace: true });
            } else {
                if (otpSent) {
                    response = await axios.post(`http://127.0.0.1:6969/signup`, formData);

                    navigate("/", { replace: true });
                } else {
                    response = await axios.post(`http://127.0.0.1:6969/sendOTP`, formData);

                    setOtpSent(true);

                    toast.success(response.data.message, {
                        id: "otp sent message",
                        position: "bottom-center",
                        style: {
                            marginBottom: "1.5rem"
                        }
                    });
                }
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                let errorMessage = "";

                if (error.response) {
                    errorMessage = error.response.data.message;
                }
                else if (error.request) {
                    errorMessage = `No response recieved from server`;
                } else {
                    errorMessage = error.message;
                }

                toast.error(errorMessage, {
                    id: "signup error",
                    position: "bottom-center",
                    style: {
                        marginBottom: "1.5rem"
                    }
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full flex flex-col lg:flex-row place-items-center place-content-between px-4 md:px-8 py-4">
            <section className="w-full">
                <img src={Doctor} alt="Doctor Image" className="w-[90%] mx-auto" />
            </section>

            <section className="w-full flex flex-col place-items-center place-content-center">
                <h2 className="text-medBlue text-2xl font-medium mb-8">
                    Welcome Doc
                </h2>
                <form className={`w-full max-w-lg flex flex-col gap-y-4 rounded-lg ${loading ? "pointer-events-none" : ""}`}>
                    {
                        !login
                        &&
                        <div className="w-full flex flex-col sm:flex-row gap-4">
                            <div className="w-full flex flex-col place-items-start place-content-center gap-y-0.5">
                                <div className={`w-full grid place-items-center place-content-start grid-cols-[auto,1fr] border border-slate-300 focus-within:border-medBlue rounded-lg focus-within:shadow-md`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} className="cursor-pointer mx-4" viewBox="0 0 448 512">
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" fill="#004077" />
                                    </svg>
                                    <input type="text" name="firstname" id="firstname" className="min-w-full min-h-full text-gray-700 text-base border-none outline-none rounded-lg bg-transparent py-4" placeholder="First Name" autoComplete="on" minLength={3} maxLength={15} readOnly={loading || otpSent} required onInput={handleCurrentInput} />
                                </div>
                            </div>

                            <div className="w-full flex flex-col place-items-start place-content-center gap-y-0.5">
                                <div className={`w-full grid place-items-center place-content-start grid-cols-[1fr] border border-slate-300 focus-within:border-medBlue rounded-lg focus-within:shadow-md`}>
                                    <input type="text" name="lastname" id="lastname" className="min-w-full min-h-full text-base border-none outline-none rounded-lg bg-transparent p-4" placeholder="Last Name" autoComplete="on" minLength={3} maxLength={15} readOnly={loading || otpSent} required onInput={handleCurrentInput} />
                                </div>
                            </div>
                        </div>
                    }

                    <div className={`w-full grid place-items-center place-content-start grid-cols-[auto,1fr] border border-slate-300 focus-within:border-medBlue rounded-lg focus-within:shadow-md`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} className="cursor-pointer mx-4" viewBox="0 0 512 512">
                            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" fill="#004077" />
                        </svg>
                        <input type="email" name="email" id="email" className="min-w-full min-h-full text-gray-700 text-base border-none outline-none rounded-lg bg-transparent py-4" inputMode="email" placeholder="Email" autoComplete="on" readOnly={loading || otpSent} required onInput={handleCurrentInput} />
                    </div>

                    <div className={`w-full grid place-items-center place-content-start grid-cols-[auto,1fr,auto] border border-slate-300 focus-within:border-medBlue rounded-lg focus-within:shadow-md`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} className="cursor-pointer mx-4" viewBox="0 0 448 512">
                            <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" fill="#004077" />
                        </svg>

                        <input type={visiblity ? "text" : "password"} name="password" id="password" className="min-w-full min-h-full text-base border-none outline-none rounded-lg bg-transparent py-4 placeholder:text-ellipsis" placeholder="Password (6+ characters)" minLength={6} maxLength={24} readOnly={loading || otpSent} required onInput={handleCurrentInput} />

                        <button type="button" className="rounded-full hover:bg-slate-200 p-2 mx-2" onClick={() => setVisibility(prev => !prev)}>
                            {
                                visiblity
                                    ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 640 512">
                                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" fill="#004077" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 576 512">
                                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" fill="#004077" />
                                    </svg>
                            }
                        </button>
                    </div>

                    {
                        !login
                        &&
                        otpSent
                        &&
                        <div className="w-full grid place-items-center place-content-start grid-cols-[auto,1fr] border border-slate-300 focus-within:border-medBlue rounded-lg focus-within:shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" className="cursor-pointer mx-4" viewBox="0 0 512 512">
                                <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" fill="#004077" fillRule="evenodd" fillOpacity={1} />
                            </svg>
                            <input type="text" name="otp" id="otp" className="min-w-full min-h-full text-gray-700 text-base border-none outline-none rounded-lg bg-transparent py-4" inputMode="text" placeholder="Enter OTP" minLength={6} maxLength={6} autoComplete="off" readOnly={loading} required onInput={handleCurrentInput} />
                        </div>
                    }

                    <button type="submit" className={`w-full min-h-[3.625rem] flex place-items-center place-content-center gap-x-2 rounded-lg px-2 py-4 ${loading ? "bg-slate-400 border-slate-400 cursor-not-allowed" : "bg-medBlue border border-medBlue active:scale-[0.99] cursor-pointer"} transition-all duration-200 my-2 relative overflow-hidden select-none`} onClick={(event) => {
                        createRipple(event);
                        handleFormSubmit(event);
                    }} disabled={loading}>
                        <span className="font-medium text-white">
                            {
                                login
                                    ? loading ? "Logging in" : "Login"
                                    : loading
                                        ? otpSent ? "Signing up" : "verifying"
                                        : otpSent ? "Sign up" : "Accept and Continue"
                            }
                        </span>

                        {
                            loading
                                ?
                                <div className="load"></div>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 448 512">
                                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="#ffffff" />
                                </svg>
                        }
                    </button>

                    <div className="w-full flex place-items-center place-content-center gap-x-2">
                        <span className="text-gray-500 text-sm">
                            {
                                login
                                    ? "Don't have an account?"
                                    : "Already have an account?"
                            }
                        </span>
                        <NavLink to={login ? "/signup" : "/login"} className="text-medBlue font-medium underline select-none">
                            {
                                login ? "Signup" : "Login"
                            }
                        </NavLink>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Login;