import { FaExclamationTriangle, FaCheck, FaTimes } from 'react-icons/fa';

interface AlertProps {
    type: 'error' | 'success' | 'warning',
    message: string;
    title?: string;
}

const Alert = ({ type, message, title }: AlertProps) => {
    return (<>
        <div className="mb-5">
            <div className="flex flex-col gap-7.5">
                {/* <!-- Alerts Item --> */}
                {type == "warning" && <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
                    <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
                        <FaExclamationTriangle className="text-warning" size={19} />
                    </div>
                    <div className="w-full">
                        <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                            Attention needed
                        </h5>
                        <p className="leading-relaxed text-[#D0915C]">
                            {message}
                        </p>
                    </div>
                </div>
                }
                {/* <!-- Alerts Item --> */}
                {type == "success" && <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
                    <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
                        <FaCheck className="text-white" size={16} />
                    </div>
                    <div className="w-full">
                        <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                            {title ? title : "Success"}
                        </h5>
                        <p className="text-base leading-relaxed text-body">
                            {message}
                        </p>
                    </div>
                </div>}
                {/* <!-- Alerts Item --> */}
                {type == "error" && <div className="flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
                    <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
                        <FaTimes className="text-white" size={13} />
                    </div>
                    <div className="w-full">
                        <h5 className="mb-3 font-semibold text-[#B45454]">
                            {title ? title : "There were errors with your submission"}
                        </h5>
                        <ul>
                            <li className="leading-relaxed text-[#CD5D5D]">
                                {message}
                            </li>
                        </ul>
                    </div>
                </div>}
            </div>
        </div>
    </>)
};

export default Alert;