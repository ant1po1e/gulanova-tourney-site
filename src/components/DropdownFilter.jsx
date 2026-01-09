import { useState } from "react";
import { twMerge } from "tailwind-merge";

const badges = [
    { value: "all", label: "All" },
    { value: "ranked", label: "Ranked" },
    { value: "tournaments", label: "Tournaments" },
    { value: "contest", label: "Contest" },
    { value: "hs", label: "Hitsound" },
    { value: "collab", label: "Collab" },
    { value: "gd", label: "Guest Difficulty" },
];

export const DropdownFilter = ({ selectedBadge, setSelectedBadge }) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (value) => {
        setSelectedBadge(value);
        setOpen(false);
    };

    const selectedLabel =
        badges.find((b) => b.value === selectedBadge)?.label || "Filter";

    return (
        <div className="relative inline-block text-left w-full max-w-[160px]">
            {/* Dropdown trigger */}
            <button
                onClick={() => setOpen(!open)}
                className={twMerge(
                    " bg-white border border-gray-300 text-sm text-black px-4 py-2 rounded-md shadow-sm flex justify-between items-center",
                    "focus:outline-none focus:ring-2 focus:ring-blue-400",
                    "transition duration-300 ease-in-out md:hover:shadow-md",
                    "min-w-[160px]"
                )}
            >
                <span className="truncate">{selectedLabel}</span>

                {/* Icon */}
                <svg
                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>

                {/* Invisible element to maintain button width */}
                <span className="absolute invisible pointer-events-none">
                    Guest Difficulty
                </span>
            </button>

            {/* Dropdown list */}
            {open && (
                <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-auto">
                    {badges.map((badge) => (
                        <li
                            key={badge.value}
                            onClick={() => handleSelect(badge.value)}
                            className="px-4 py-2 text-sm text-black cursor-pointer md:hover:bg-blue-100 transition"
                        >
                            {badge.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
