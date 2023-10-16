import React from "react";

interface IDrawerRadioSection {
    title: string;
    options: string[];
    handleCheckChange?: any;
    underline?: boolean;
}

const DrawerRadioSection = ({
    title,
    options,
    handleCheckChange,
    underline,
}: IDrawerRadioSection) => {
    const [value, setValue] = React.useState(options[0]);

    return (
        <section>
            <h3 className="text-base sm:text-lg font-medium mb-4 ">{title}</h3>
            <div className="grid grid-cols-2">
                {options.map((option: string, index: number) => (
                    <div className="flex items-center mb-4" key={option}>
                        <input
                            id={`${title}-${option}`}
                            type="radio"
                            value={option}
                            name={`${title}`}
                            checked={option === value}
                            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={e => {
                                if (e.target.checked) {
                                    setValue(e.target.value);
                                    handleCheckChange(e.target.value);
                                }
                            }}
                        />
                        <label
                            htmlFor={`${title}-${option}`}
                            className="ml-2 text-sm sm:text-base font-light text-gray-900 dark:text-gray-300"
                        >
                            {option}
                        </label>
                    </div>
                ))}
            </div>
            {underline && <hr className="w-full h-[1px] bg-slate-200 mb-6" />}
        </section>
    );
};

export default DrawerRadioSection;
