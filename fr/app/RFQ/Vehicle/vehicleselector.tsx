'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <div className="w-full space-y-6">
            {/* Year Selection */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Year</label>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-lg transition-all"
                >
                    <option value="">Select Vehicle Year</option>
                    {years.map((year) => (
                        <option key={year} value={year} className="text-lg">
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            {/* Make Selection */}
            {selectedYear && (
                <div className="space-y-2 relative" ref={makeInputRef}>
                    <label className="text-sm font-medium text-gray-700">Make</label>
                    <input
                        type="text"
                        value={makeInput}
                        onChange={(e) => {
                            setMakeInput(e.target.value);
                            setShowMakeOptions(true);
                        }}
                        onFocus={() => setShowMakeOptions(true)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-lg placeholder-gray-400 transition-all"
                        placeholder="Search vehicle make..."
                    />
                    
                    <AnimatePresence>
                        {showMakeOptions && makeOptions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden"
                            >
                                <div className="max-h-60 overflow-y-auto">
                                    {makeOptions
                                        .filter(make => make.toLowerCase().includes(makeInput.toLowerCase()))
                                        .map((make) => (
                                            <motion.div
                                                key={make}
                                                whileHover={{ scale: 1.02 }}
                                                className="px-6 py-3 hover:bg-emerald-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                                                onClick={() => {
                                                    setSelectedMake(make);
                                                    setMakeInput(make);
                                                    setShowMakeOptions(false);
                                                }}
                                            >
                                                {make}
                                            </motion.div>
                                        ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Model Selection */}
            {selectedMake && (
                <div className="space-y-2 relative" ref={modelInputRef}>
                    <label className="text-sm font-medium text-gray-700">Model</label>
                    <input
                        type="text"
                        value={modelInput}
                        onChange={(e) => {
                            setModelInput(e.target.value);
                            setShowModelOptions(true);
                        }}
                        onFocus={() => setShowModelOptions(true)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-lg placeholder-gray-400 transition-all"
                        placeholder="Search vehicle model..."
                    />
                    
                    <AnimatePresence>
                        {showModelOptions && modelOptions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden"
                            >
                                <div className="max-h-60 overflow-y-auto">
                                    {modelOptions
                                        .filter(model => model.toLowerCase().includes(modelInput.toLowerCase()))
                                        .map((model) => (
                                            <motion.div
                                                key={model}
                                                whileHover={{ scale: 1.02 }}
                                                className="px-6 py-3 hover:bg-emerald-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                                                onClick={() => {
                                                    setSelectedModel(model);
                                                    setModelInput(model);
                                                    setShowModelOptions(false);
                                                }}
                                            >
                                                {model}
                                            </motion.div>
                                        ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default VehicleSelector;
