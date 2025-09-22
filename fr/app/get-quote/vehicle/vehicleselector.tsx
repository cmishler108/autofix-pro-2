'use client';

import { useState, useEffect, useRef } from 'react';

const VehicleSelector = ({ onSelectionChange }: any) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(currentYear - 1959), (val, index) =>
        (1960 + index).toString()
    ).reverse();

    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedMake, setSelectedMake] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState<string>('');

    const [makeOptions, setMakeOptions] = useState<string[]>([]);
    const [modelOptions, setModelOptions] = useState<string[]>([]);

    const [makeInput, setMakeInput] = useState<string>('');
    const [modelInput, setModelInput] = useState<string>('');

    const [showMakeOptions, setShowMakeOptions] = useState<boolean>(false);
    const [showModelOptions, setShowModelOptions] = useState<boolean>(false);

    const makeInputRef = useRef<HTMLInputElement>(null);
    const modelInputRef = useRef<HTMLInputElement>(null);

    //  Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                makeInputRef.current &&
                !makeInputRef.current.contains(event.target as Node)
            ) {
                setShowMakeOptions(false);
            }
            if (
                modelInputRef.current &&
                !modelInputRef.current.contains(event.target as Node)
            ) {
                setShowModelOptions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Fetch Makes when Year is selected
    useEffect(() => {
        if (selectedYear) {
            // Reset downstream selections
            setSelectedMake('');
            setMakeInput('');
            setMakeOptions([]);
            setSelectedModel('');
            setModelInput('');
            setModelOptions([]);

            // Fetch Makes
            fetch(
                `https://api.nhtsa.gov/products/vehicle/makes?modelYear=${selectedYear}&issueType=r`
            )
                .then((response) => response.json())
                .then((data) => {
                    const makes = data.results.map((make: any) => make.make);
                    setMakeOptions(makes);
                })
                .catch((error) => {
                    console.error('Error fetching makes:', error);
                });
        } else {
            setMakeOptions([]);
        }
    }, [selectedYear]);

    // Fetch Models when Year and Make are selected
    useEffect(() => {
        if (selectedYear && selectedMake) {
            // Reset downstream selections
            setSelectedModel('');
            setModelInput('');
            setModelOptions([]);

            // Fetch Models
            fetch(
                `https://api.nhtsa.gov/products/vehicle/models?modelYear=${selectedYear}&make=${selectedMake}&issueType=r`
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.results.length > 0) {
                        console.log(data);
                        const models: string[] = Array.from(
                            new Set(data.results.map((item: any) => item.model))
                        );
                        setModelOptions(models);
                    } else {
                        setModelInput('No Model');
                        setSelectedModel('No Model');
                        setModelOptions([]);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching models:', error);
                    setModelInput('No Model');
                });
        } else {
            setModelOptions([]);
        }
    }, [selectedYear, selectedMake]);

    useEffect(() => {
        onSelectionChange(selectedYear, selectedMake, selectedModel);
    }, [selectedYear, selectedMake, selectedModel]);

    return (
        <div className="w-full">
            {/* Year Selection */}
            <div className="mb-4">
                <label
                    htmlFor="year"
                    className="block text-sm font-medium text-gray-700"
                >
                    Year
                </label>
                <select
                    id="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            {/* Make Selection */}
            {selectedYear && (
                <div className="relative mb-4" ref={makeInputRef}>
                    <label
                        htmlFor="make"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Make
                    </label>
                    <input
                        type="text"
                        id="make"
                        value={makeInput}
                        onChange={(e) => {
                            setMakeInput(e.target.value);
                            setShowMakeOptions(true);
                        }}
                        onFocus={() => setShowMakeOptions(true)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Type to search makes"
                    />
                    {showMakeOptions && makeOptions.length > 0 && (
                        <div className="absolute z-10 border border-gray-300 mt-1 max-h-60 overflow-auto bg-white rounded-md shadow-lg w-full">
                            {makeOptions
                                .filter((make) =>
                                    make
                                        .toLowerCase()
                                        .includes(makeInput.toLowerCase())
                                )
                                .map((make) => (
                                    <div
                                        key={make}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setSelectedMake(make);
                                            setMakeInput(make);
                                            setShowMakeOptions(false);
                                        }}
                                    >
                                        {make}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            )}

            {/* Model Selection */}
            {selectedMake && (
                <div className="relative mb-4" ref={modelInputRef}>
                    <label
                        htmlFor="model"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Model
                    </label>
                    <input
                        type="text"
                        id="model"
                        value={modelInput}
                        onChange={(e) => {
                            setModelInput(e.target.value);
                            setShowModelOptions(true);
                        }}
                        onFocus={() => setShowModelOptions(true)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Type to search models"
                    />
                    {showModelOptions && modelOptions.length > 0 && (
                        <div className="absolute z-10 border border-gray-300 mt-1 max-h-60 overflow-auto bg-white rounded-md shadow-lg w-full">
                            {modelOptions
                                .filter((model) =>
                                    model
                                        .toLowerCase()
                                        .includes(modelInput.toLowerCase())
                                )
                                .map((model) => (
                                    <div
                                        key={model}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setSelectedModel(model);
                                            setModelInput(model);
                                            setShowModelOptions(false);
                                        }}
                                    >
                                        {model}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VehicleSelector;
