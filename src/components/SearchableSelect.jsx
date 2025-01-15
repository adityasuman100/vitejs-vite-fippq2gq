import React, { useState, useRef, useEffect } from 'react';

// SVG icons as components
const ChevronIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 text-gray-400"
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
);

const SearchIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
    >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
    </svg>
);

export default function SearchableSelect({
    options = [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'nextjs', label: 'Next.js' },
        { value: 'nuxtjs', label: 'Nuxt.js' },
        { value: 'gatsby', label: 'Gatsby' },
        { value: 'remix', label: 'Remix' },
        { value: 'solid', label: 'SolidJS' },
        { value: 'qwik', label: 'Qwik' },
    ],
    initialValue,
    onOptionChange = () => { },
    placeholder = 'Select an option...'
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef(null);
    const searchInputRef = useRef(null);
    const [value, setValue] = useState(initialValue);

    const onChange = (val) => {
        setValue(val);
        onOptionChange();
    }

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedOption = options.find(option => option.value === value);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen) {
            searchInputRef.current?.focus();
        }
    }, [isOpen]);

    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                setIsOpen(true);
                e.preventDefault();
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                setHighlightedIndex(prev =>
                    prev < filteredOptions.length - 1 ? prev + 1 : prev
                );
                e.preventDefault();
                break;
            case 'ArrowUp':
                setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
                e.preventDefault();
                break;
            case 'Enter':
                if (filteredOptions[highlightedIndex]) {
                    onChange(filteredOptions[highlightedIndex].value);
                    setIsOpen(false);
                    setSearchTerm('');
                }
                e.preventDefault();
                break;
            case 'Escape':
                setIsOpen(false);
                setSearchTerm('');
                e.preventDefault();
                break;
        }
    };

    return (
        <div
            className="relative w-full max-w-xs"
            ref={containerRef}
            onKeyDown={handleKeyDown}
        >
            <button
                type="button"
                className="w-full px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <div className="flex items-center justify-between">
                    <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <ChevronIcon />
                </div>
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                    <div className="p-2 border-b">
                        <div className="relative">
                            <SearchIcon />
                            <input
                                ref={searchInputRef}
                                type="text"
                                className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setHighlightedIndex(0);
                                }}
                            />
                        </div>
                    </div>

                    <ul
                        className="max-h-60 overflow-auto py-1"
                        role="listbox"
                    >
                        {filteredOptions.length === 0 ? (
                            <li className="px-4 py-2 text-gray-500">No options found</li>
                        ) : (
                            filteredOptions.map((option, index) => (
                                <li
                                    key={option.value}
                                    className={`px-4 py-2 cursor-pointer ${option.value === value
                                        ? 'bg-blue-100 text-blue-900'
                                        : index === highlightedIndex
                                            ? 'bg-gray-100'
                                            : 'hover:bg-gray-50'
                                        }`}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                        setSearchTerm('');
                                    }}
                                    role="option"
                                    aria-selected={option.value === value}
                                >
                                    {option.label}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}