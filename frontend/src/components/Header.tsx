import { useState } from "react";
import MedCare from "../assets/medcare.png";

const Header = () => {
    const [showNav, setShowNav] = useState(false);

    const navLinks = ["Home", "About", "Doctors", "Medicines", "ContactUs", "Latest News"];

    return (
        <header className="w-full flex flex-col lg:flex-row bg-medBlue rounded-b-lg px-4 md:px-8 py-4 shadow-lg">
            <div className="w-full flex place-items-center place-content-between">
                <div className="inline-block lg:hidden">
                    <button type="button" className="rounded-full hover:bg-slate-400 p-2 cursor-pointer" onClick={() => setShowNav(prev => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" fill="#ffffff" fillRule="evenodd" fillOpacity={1} />
                        </svg>
                    </button>
                </div>

                <div className="flex place-items-center place-content-center gap-x-2">
                    <img src={MedCare} alt="MedCare Logo" className="w-8 aspect-square" />
                    <h1 className="text-white text-2xl font-medium">
                        MedCare
                    </h1>
                </div>
            </div>

            <nav className={`w-full ${showNav ? "flex" : "hidden"} lg:flex flex-col lg:flex-row place-items-center place-content-end gap-x-4 gap-y-2 transition-all`}>
                {
                    navLinks.map((element, index) => {
                        return (
                            <button type="button" className="text-white hover:text-slate-100 hover:underline text-base font-medium border-none outline-none bg-transparent p-2 cursor-pointer whitespace-nowrap" key={index}>
                                {
                                    element
                                }
                            </button>
                        );
                    })
                }
            </nav>
        </header>
    );
};

export default Header;