'use client';
import { useState, useEffect } from 'react';
import './styles.css';
import { accordionsData } from './serviceslist';

interface Props {
    onSelectionChange: (selectedServices: string[]) => void;
    initialSelectedServices: string[];
}

const ServiceAccordions: React.FC<Props> = ({
    onSelectionChange,
    initialSelectedServices,
}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [openSubIndex, setOpenSubIndex] = useState<number | null>(null);
    const [selectedServices, setSelectedServices] = useState<Set<string>>(
        new Set(initialSelectedServices)
    );

    const toggleService = (serviceName: string) => {
        setSelectedServices((prev) => {
            const newSet = new Set(prev);
            newSet.has(serviceName)
                ? newSet.delete(serviceName)
                : newSet.add(serviceName);
            return newSet;
        });
    };

    const handleSelectAll = (services: { name: string }[]) => {
        setSelectedServices((prev) => {
            const newSet = new Set(prev);
            const allSelected = services.every((service) =>
                newSet.has(service.name)
            );

            services.forEach((service) => {
                allSelected
                    ? newSet.delete(service.name)
                    : newSet.add(service.name);
            });
            return newSet;
        });
    };

    useEffect(() => {
        onSelectionChange(Array.from(selectedServices));
    }, [selectedServices, onSelectionChange]);

    return (
        <>
            <h3 className="service-header">
                Select the Auto Services you offer
            </h3>
            <div className="service-interview-container">
                {accordionsData.map((accordion, index) => (
                    <div key={index} className="accordion-box">
                        <div
                            className="accordion-header"
                            onClick={() =>
                                setOpenIndex(openIndex === index ? null : index)
                            }
                        >
                            <div className="title-group">
                                <h3 className="main-title">
                                    {accordion.title}
                                </h3>
                            </div>
                            <span
                                className={`accordion-arrow ${
                                    openIndex === index ? 'open' : ''
                                }`}
                            ></span>
                        </div>

                        <div
                            className={`accordion-content ${
                                openIndex === index ? 'visible' : ''
                            }`}
                        >
                            {accordion.subItems.map((subItem, subIndex) => (
                                <div key={subIndex} className="sub-accordion">
                                    <div
                                        className="sub-accordion-header"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenSubIndex(
                                                openSubIndex === subIndex
                                                    ? null
                                                    : subIndex
                                            );
                                        }}
                                    >
                                        <div className="sub-box-icon">
                                            <svg
                                                className="plus-icon"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2"
                                            >
                                                <line
                                                    x1="12"
                                                    y1="5"
                                                    x2="12"
                                                    y2="19"
                                                />
                                                <line
                                                    x1="5"
                                                    y1="12"
                                                    x2="19"
                                                    y2="12"
                                                />
                                            </svg>
                                        </div>
                                        <div className="sub-content">
                                            <h4 className="sub-title">
                                                {subItem.title}
                                            </h4>
                                        </div>
                                        <span
                                            className={`sub-accordion-arrow ${
                                                openSubIndex === subIndex
                                                    ? 'open'
                                                    : ''
                                            }`}
                                        ></span>
                                    </div>

                                    <div
                                        className={`sub-accordion-content ${
                                            openSubIndex === subIndex
                                                ? 'visible'
                                                : ''
                                        }`}
                                    >
                                        <div
                                            className="service-checkbox-container select-all"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectAll(
                                                    subItem.services
                                                );
                                            }}
                                        >
                                            <div
                                                className={`custom-checkbox ${
                                                    subItem.services.every(
                                                        (service) =>
                                                            selectedServices.has(
                                                                service.name
                                                            )
                                                    )
                                                        ? 'checked'
                                                        : ''
                                                }`}
                                            >
                                                {subItem.services.every(
                                                    (service) =>
                                                        selectedServices.has(
                                                            service.name
                                                        )
                                                ) && (
                                                    <svg
                                                        className="check-icon"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            d="M20 6L9 17l-5-5"
                                                            stroke="white"
                                                            strokeWidth="2"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="service-name">
                                                Select All
                                            </span>
                                        </div>
                                        {subItem.services.map((service) => (
                                            <div
                                                key={service.name}
                                                className="service-checkbox-container"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleService(service.name);
                                                }}
                                            >
                                                <div
                                                    className={`custom-checkbox ${
                                                        selectedServices.has(
                                                            service.name
                                                        )
                                                            ? 'checked'
                                                            : ''
                                                    }`}
                                                >
                                                    {selectedServices.has(
                                                        service.name
                                                    ) && (
                                                        <svg
                                                            className="check-icon"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M20 6L9 17l-5-5"
                                                                stroke="white"
                                                                strokeWidth="2"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="service-name">
                                                    {service.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="selected-services-panel">
                    <h3>Selected Services ({selectedServices.size}):</h3>
                    <ul>
                        {Array.from(selectedServices).map((serviceName) => (
                            <li key={serviceName}>{serviceName}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ServiceAccordions;
