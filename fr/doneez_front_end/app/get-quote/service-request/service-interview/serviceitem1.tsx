'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setStorage } from '@/app/utils/helper';

interface ServiceNode {
    name: string;
    subcategories?: ServiceNode[];
    services?: string[];
}

const autoServices: ServiceNode[] = [
    {
        name: 'Auto Repair',
        subcategories: [
            {
                name: 'Brakes',
                services: [
                    'Brake Inspection',
                    'Brake Pad Replacement',
                    'Brake Rotor Replacement',
                    'Brake Fluid Flush',
                    'Brake Caliper Repair',
                ],
            },
            {
                name: 'Electrical',
                services: [
                    'Battery Testing and Replacement',
                    'Alternator Repair',
                    'Starter Repair',
                    'Wiring and Electrical System Diagnosis',
                    'Lighting System Repair',
                ],
            },
            {
                name: 'Engine',
                services: [
                    'Engine Diagnostics',
                    'Engine Tune-Up',
                    'Engine Overhaul',
                    'Cylinder Head Repair',
                    'Timing Belt Replacement',
                ],
            },
            {
                name: 'Exhaust',
                services: [
                    'Exhaust System Inspection',
                    'Muffler Replacement',
                    'Catalytic Converter Replacement',
                    'Exhaust Pipe Repair',
                    'Emission System Repair',
                ],
            },
            {
                name: 'Heating and Air Conditioning',
                services: [
                    'HVAC System Inspection',
                    'AC Recharge and Repair',
                    'Heater Core Replacement',
                    'Blower Motor Repair',
                    'Thermostat Replacement',
                ],
            },
            {
                name: 'Diagnostic and Inspection',
                services: [
                    'Pre-Purchase Vehicle Inspection',
                    'Check Engine Light Diagnosis',
                    'Vehicle Starting Issues Diagnosis',
                    'Towing and Roadside Assistance',
                    'Emissions Testing (Smog Check)',
                ],
            },
            {
                name: 'Scheduled Maintenance',
                services: [
                    'Oil Change and Filter Replacement',
                    'Fluid Flush and Replacement',
                    'Tire Rotation and Balancing',
                    'Spark Plug Replacement',
                    'Air Filter Replacement',
                ],
            },                        
            {
                name: 'Steering & Suspension',
                services: [
                    'Wheel Alignment',
                    'Power Steering System Repair',
                    'Shock Absorber Replacement',
                    'Strut Replacement',
                    'Steering Rack Repair',
                ],
            },
            {
                name: 'Transmission & Drivetrain',
                services: [
                    'Transmission Fluid Change',
                    'Clutch Repair and Replacement',
                    'Differential Service',
                    'Driveshaft Repair',
                    'CV Joint Replacement',
                ],
            },
            {
                name: 'EV & Hybrid Services',
                subcategories: [
                    {
                        name: 'Maintenance Services',
                        services: [
                            'Routine inspections and maintenance', 
                            'Brake system checks', 
                            'Tire rotation and alignment', 
                            'Fluid checks (coolant, wiper fluid, etc.)'
                        ]
                    },
                    {
                        name: 'Software & Firmware Updates',
                        services: [
                            'Over-the-air updates', 
                            'Infotainment system upgrades', 
                        ]
                    },
                    {
                        name: 'Battery Services',
                        services: [
                            'Battery inspection and diagnostics', 
                            'Battery swaps',
                            'Battery recycling and disposal' 
                        ]
                    },
                    {
                        name: 'Hybrid Diagnostics',
                        services: [
                            'System diagnostics for hybrid components', 
                            'Performance assessments',
                        ]
                    },
                    {
                        name: 'Electric Motor & Powertrain Repairs',
                        services: [
                            'Repairs and replacements of electric motors', 
                            'Powertrain system diagnostics',
                        ]
                    },
                    {
                        name: 'Performance Tuning & Customization',
                        services: [
                            'Efficiency upgrades', 
                            'Custom software modifications',
                        ]
                    },
                ]
            }
        ],
    },

    {
        name: 'Auto Body',
        subcategories: [
            {
                name: 'Painting and Refinishing',
                services: [
                    'Full Vehicle Repainting',
                    'Spot Painting',
                    'Paint Chip Repair',
                    'Clear Coat Restoration',
                    'Custom Paint Jobs',
                ],
            },
            {
                name: 'Dent Repair',
                services: [
                    'Paintless Dent Removal (PDR)',
                    'Dent Filling and Sanding',
                    'Dent Pulling',
                    'Dent Removal with Heat and Pressure',
                ],
            },
            {
                name: 'Collision Repair',
                services: [
                    'Frame Straightening',
                    'Bumper Repair and Replacement',
                    'Fender Repair and Replacement',
                    'Panel Alignment',
                    'Structural Repair',
                ],
            },
            {
                name: 'Scratch and Chip Repair',
                services: [
                    'Scratch Buffing and Polishing',
                    'Touch-Up Paint Application',
                    'Scratch Filling and Sanding',
                    'Clear Coat Repair',
                ],
            },
            {
                name: 'Rust Repair',
                services: [
                    'Rust Removal',
                    'Surface Rust Treatment',
                    'Patch Panel Installation',
                    'Rust Prevention Coatings',
                ],
            },
            {
                name: 'Glass Repair and Replacement',
                services: [
                    'Windshield Repair and Replacement',
                    'Side and Rear Window Replacement',
                    'Sunroof Glass Repair and Replacement',
                    'Mobile Auto Glass Services',
                    'Window Tinting',
                ],
            },
            {
                name: 'Customization and Restoration',
                services: [
                    'Custom Body Kits Installation',
                    'Vehicle Restoration',
                    'Vinyl Wrapping',
                    'Decal Application',
                    'Hydrographic Dipping',
                    'Custom Vehicle Wraps', 
                    'Powder Coating'
                ],
            },
            {
                name: 'Auto Upholstery',
                services: [
                    'Leather Seat Repair',
                    'Vinyl Seat Repair',
                    'Cloth Seat Repair',
                    'Dashboard Repair',
                    'Center Console Repair',
                    'Headliner Replacement',
                    'Carpet Repair and Replacement',
                    'Steering Wheel Repair',
                    'Repairs for Rips, Tears, and Burns',
                ],
            },
        ],
    },

    {
        name: 'Auto Customization',
        subcategories: [
            {
                name: 'Exterior Modifications',
                subcategories: [
                    {
                        name: 'Body Kits',
                        services: ['Custom bumpers, side skirts, and spoilers']
                    },
                    {
                        name: 'Paint and Wraps',
                        services: ['Unique custom paint jobs and vinyl wraps']
                    },
                    {
                        name: 'Lighting',
                        services: ['Upgraded headlights, taillights and underglow lighting']
                    },
                    {
                        name: 'Wheels and Tires',
                        services: ['Custom rims and performance tires']
                    }
                ]
            },
            {
                name: 'Overland Accessories',
                subcategories: [
                    {
                        name: 'Roof Racks',
                        services: ['For additional cargo space']
                    },
                    {
                        name: 'Cargo Carriers',
                        services: ['Secure transportation solutions']
                    },
                    {
                        name: 'Storage Lockers',
                        services: ['Organized storage for gear and supplies']
                    },
                    {
                        name: 'Camping Supplies',
                        services: ['Equipment for outdoor adventures']
                    },
                    {
                        name: 'Tow Accessories',
                        services: ['Enhancements for towing capabilities', 'Trailers', 'Hitches']
                    },
                ]
            },
            {
                name: 'Suspension Upgrades',
                subcategories: [
                    {
                        name: 'Baja Kits',
                        services: ['Off-road suspension systems']
                    },
                    {
                        name: 'Solid Axle Kits',
                        services: ['Improved durability and performance']
                    },
                    {
                        name: 'Custom 3-4 Link Kits',
                        services: ['Enhanced suspension articulation']
                    },
                    {
                        name: 'Straight Axle',
                        services: ['For rugged off-road performance']
                    },
                    {
                        name: 'A-Arm Kits',
                        services: ['Improved handling and stability']
                    },
                    {
                        name: 'Air Springs',
                        services: ['Adjustable suspension for load leveling']
                    },
                    {
                        name: 'Leveling Kits',
                        services: ['To raise the front of the vehicle']
                    },
                    {
                        name: 'Coil Springs',
                        services: ['For better ride quality and handling']
                    },
                ]
            },
            {
                name: 'Interior Modifications',
                subcategories: [
                    {
                        name: 'Upholstery',
                        services: ['Custom seats, headliners, and door panels']
                    },
                    {
                        name: 'Sound Systems',
                        services: ['Upgraded audio systems, subwoofers, and speakers']
                    },
                    {
                        name: 'Dashboards and Consoles',
                        services: ['Custom gauges, screens, and control interfaces']
                    },
                    {
                        name: 'Flooring',
                        services: ['Custom mats and carpets']
                    }
                ]
            },
            {
                name: 'Performance Enhancements',
                subcategories: [
                    {
                        name: 'Engine Modifications',
                        services: ['Turbochargers, superchargers, and performance tuning']
                    },
                    {
                        name: 'Exhaust Systems',
                        services: ['Upgraded exhaust for improved sound and performance']
                    },
                    {
                        name: 'Suspension Upgrades',
                        services: ['Coilovers, lift kits, and lowering kits']
                    },
                    {
                        name: 'Braking Systems',
                        services: ['Upgraded brake pads, rotors, and calipers']
                    }
                ]
            },
            {
                name: 'Technology Upgrades',
                subcategories: [
                    {
                        name: 'Navigation Systems',
                        services: ['Installation of GPS and multimedia systems']
                    },
                    {
                        name: 'Bluetooth and Connectivity',
                        services: ['Hands-free and streaming capabilities']
                    },
                    {
                        name: 'Dash Cams',
                        services: ['Installation of cameras for safety and security']
                    },
                ]
            },
            {
                name: 'Protection and Maintenance',
                subcategories: [
                    {
                        name: 'Ceramic Coatings',
                        services: ['For paint protection and easy cleaning']
                    },
                    {
                        name: 'Window Tinting',
                        services: ['UV protection and privacy enhancements']
                    },
                    {
                        name: 'Clear Bra',
                        services: ['Protective film for high-impact areas']
                    },
                ]
            },
            {
                name: 'Restoration and Classics',
                subcategories: [
                    {
                        name: 'Classic Car Restoration',
                        services: ['Refurbishing vintage cars to their original glory']
                    },
                    {
                        name: 'Custom Builds',
                        services: ['Building unique vehicles from the ground up']
                    },
                    {
                        name: 'Electric Conversions',
                        services: ['Converting classic cars to electric power']
                    },
                ]
            },
        ],
    },

    {
        name: 'Auto Detail',
        subcategories: [
            {
                name: 'Exterior Detailing',
                services: [
                    'Hand Wash and Dry',
                    'Clay Bar Treatment',
                    'Paint Decontamination',
                    'Paint Correction (Polishing and Buffing)',
                    'Headlight Restoration',
                    'Trim Restoration',
                ],
            },
            {
                name: 'Interior Detailing',
                services: [
                    'Vacuuming and Shampooing',
                    'Stain Removal',
                    'Leather Cleaning and Conditioning',
                    'Dashboard and Console Cleaning',
                    'Odor Removal',
                    'Upholstery Cleaning',
                ],
            },
            {
                name: 'Engine Bay Detailing',
                services: [
                    'Engine Degreasing',
                    'Engine Compartment Cleaning',
                    'Dressing and Protecting Engine Components',
                    'Removing Grease and Grime Buildup',
                ],
            },
            {
                name: 'Wheel and Tire Detailing',
                services: [
                    'Tire Cleaning and Dressing',
                    'Rim Cleaning and Polishing',
                    'Wheel Well Cleaning',
                    'Tire Shine Application',
                ],
            },
            {
                name: 'Glass and Mirror Detailing',
                services: [
                    'Window Cleaning (Inside and Outside)',
                    'Mirror Polishing',
                    'Water Spot Removal',
                    'Glass Sealant Application',
                ],
            },
            {
                name: 'Trim and Plastic Detailing',
                services: [
                    'Plastic Trim Cleaning and Restoration',
                    'Door Jam Cleaning',
                    'Rubber Trim Conditioning',
                    'Plastic Trim Dressing',
                ],
            },
            {
                name: 'Paint Protection',
                services: [
                    'Waxing',
                    'Sealant Application',
                    'Ceramic Coating',
                    'Paint Protection Film (PPF) Installation',
                ],
            },
            {
                name: 'Specialized Detailing Services',
                services: [
                    'Convertible Top Cleaning and Conditioning',
                    'Vinyl and Plastic Restoration',
                    'Metal Polishing (Chrome, Aluminum, StainlessSteel)',
                    'Pet Hair Removal',
                ],
            },
        ],
        services: ['Car Wash Services'],
    },

    {
        name: 'Wheel and Tire',
        subcategories: [
            {
                name: 'Wheel Lug Stud Replacement',
                services: [
                    'Removal of damaged lug studs',
                    'Installation of new lug studs',
                    'Torquing lug nuts to manufacturer specifications',
                ],
            },
            {
                name: 'Tire Pressure Monitoring Sensor (TPMS) Replacement',
                services: [
                    'Diagnosis of faulty TPMS sensors',
                    'Replacement of malfunctioning TPMS sensors',
                    'Calibration and programming of new sensors',
                ],
            },
            {
                name: 'Tire Pressure Light Diagnosis',
                services: [
                    'Inspection of tire pressure monitoring system',
                    'Identification of issues causing the tire pressure warning light',
                    'Recommendations for necessary repairs or adjustments',
                ],
            },
            {
                name: 'Tire and Wheel Assembly Rotate and Balance',
                services: [
                    'Removal of tires from wheels',
                    'Rotation of tires to ensure even wear',
                    'Balancing of wheels to eliminate vibrations',
                    'Reinstallation of tires onto wheels',
                ],
            },
            {
                name: 'Tire Repair - Fix Flat',
                services: [
                    'Inspection of tire for punctures or leaks',
                    'Patching or plugging punctured tire',
                    'Reinflation of tire to proper pressure',
                    'Testing for leaks and ensuring proper sealing',
                ],
            },
            {
                name: 'Tire Rotation',
                services: [
                    'Moving tires to different positions on the vehicle',
                    'Promoting even tire wear and extending tire life',
                    'Adjustment of tire pressure as needed',
                    'Torquing lug nuts to specification after rotation',
                ],
            },
            {
                name: 'Wheel Alignment',
                services: [
                    'Inspection of wheel alignment angles (toe, camber, caster)',
                    'Adjustment of alignment angles to manufacturer specifications',
                    'Correction of steering pull or drif',
                    'Verification of proper alignment after adjustment',
                ],
            },
        ],
        services: ['Tire Replacement'],
    },
];

interface FlattenedService {
    name: string;
    path: string;
}

const getAllServices = (
    nodes: ServiceNode[],
    parentPath: string = ''
): FlattenedService[] => {
    let services: FlattenedService[] = [];

    nodes.forEach((node) => {
        const currentPath = parentPath
            ? `${parentPath} - ${node.name}`
            : node.name;

        if (node.services) {
            node.services.forEach((service) => {
                services.push({
                    name: service,
                    path: `${currentPath} - ${service}`,
                });
            });
        }

        if (node.subcategories) {
            services = services.concat(
                getAllServices(node.subcategories, currentPath)
            );
        }
    });

    return services;
};

const allServices = getAllServices(autoServices);

const ServiceItem1 = () => {
    const router = useRouter();
    const [selectedNode, setSelectedNode] = useState<ServiceNode | null>(null);
    const [nodePath, setNodePath] = useState<ServiceNode[]>([]);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredServices, setFilteredServices] = useState<
        FlattenedService[]
    >([]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredServices([]);
        } else {
            const query = searchQuery.toLowerCase();
            const results = allServices.filter((service) =>
                service.name.toLowerCase().includes(query)
            );
            setFilteredServices(results);
        }
    }, [searchQuery]);

    const handleServiceSelect = (service: FlattenedService) => {
        setStorage('service-services', service.path);
        router.replace('/get-quote/service-request/service-note');
    };

    const handleCategoryClick = (node: ServiceNode) => {
        setSelectedNode(node);
        setNodePath([node]);
        setIsPanelOpen(true);
    };

    const handleItemClick = (nodeOrService: ServiceNode | string) => {
        if (typeof nodeOrService === 'string') {
            // It's a service
            const selectedServicePath = [
                ...nodePath.map((node) => node.name),
                nodeOrService,
            ].join(' - ');
            setStorage('service-services', selectedServicePath);
            router.replace('/get-quote/service-request/service-note');
        } else {
            // It's a node
            setSelectedNode(nodeOrService);
            setNodePath([...nodePath, nodeOrService]);
        }
    };

    const handleBack = () => {
        if (nodePath.length > 1) {
            const newPath = nodePath.slice(0, nodePath.length - 1);
            setNodePath(newPath);
            setSelectedNode(newPath[newPath.length - 1]);
        } else {
            // Close the panel if at the top level
            setIsPanelOpen(false);
            setSelectedNode(null);
            setNodePath([]);
        }
    };

    return (
        <div className="relative overflow-hidden">
            {/* Search Input */}
            <div className="relative w-full sm:rounded-[4px] mb-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#788391] absolute z-[1] top-[49%] translate-y-[-55%] left-4 h-[1em]"
                    viewBox="0 0 24 24"
                    id="Search--Streamline-Ultimate"
                >
                    <path
                        d="M8.976 0.025248000000000003C6.649032 0.226632 4.422648 1.281192 2.8022400000000003 2.949552C1.594416 4.193112 0.731256 5.711208 0.324072 7.308C-0.319296 9.831 -0.003 12.344904 1.24008 14.588136000000002C2.464368 16.797504 4.564896 18.4896 6.9778080000000005 19.210248C9.115584 19.84872 11.367216 19.751592 13.44 18.931512C14.286287999999999 18.596688 15.361296 17.97036 15.984 17.449296C16.0566 17.388528 16.135584 17.323704 16.159512 17.305224000000003C16.199448 17.27436 16.475640000000002 17.543976 19.519512 20.585088C22.738176 23.800800000000002 22.840248000000003 23.900112 22.98 23.95164C23.585352 24.17484 24.17484 23.585352 23.95164 22.98C23.900112 22.840248000000003 23.800824000000002 22.7382 20.586216 19.520664C18.205344 17.137608 17.279376000000003 16.196136000000003 17.293416 16.172664C17.304144 16.154688 17.394984 16.0374 17.49528 15.912C18.283392 14.926608 18.882624 13.778328 19.223664 12.6C19.643208 11.150376 19.737744 9.632184 19.4976 8.200632C19.416096 7.7148 19.230936 6.975384000000001 19.11516 6.67332C19.097184000000002 6.6264 19.042896 6.48 18.994536 6.348C18.798864 5.813928000000001 18.426384 5.06652 18.097512000000002 4.548C17.42676 3.490512 16.535712 2.554416 15.493968 1.81284C14.102544 0.82236 12.640344 0.26952000000000004 10.824 0.04716C10.5468 0.013248000000000001 9.287376 -0.0017039999999999998 8.976 0.025248000000000003M9.576 1.505448C7.5559199999999995 1.559496 5.558256 2.3873040000000003 4.117368 3.767424C2.592528 5.227944 1.727472 7.022880000000001 1.5338640000000001 9.12804C1.498392 9.513672000000001 1.5191999999999999 10.544616 1.5695519999999998 10.896C1.711248 11.885088 1.974096 12.711744 2.435712 13.620000000000001C2.84736 14.43 3.3657600000000003 15.133704000000002 4.00284 15.74736C5.455488000000001 17.146608 7.15176 17.91408 9.197087999999999 18.097512000000002C9.6048 18.134088 10.45692 18.114864 10.86 18.060024C12.26952 17.868192 13.628808 17.322408000000003 14.751768000000002 16.497336C15.56436 15.900336000000001 16.35216 15.038447999999999 16.899192000000003 14.148C18.127368 12.148776 18.450072000000002 9.664344 17.77188 7.429032C17.507687999999998 6.55824 17.032896 5.598936 16.52412 4.908C15.670344000000002 3.74856 14.477088 2.78928 13.167504 2.20956C12.073056 1.725048 10.787544 1.4730480000000001 9.576 1.505448"
                        stroke="none"
                        fill="currentColor"
                        fillRule="evenodd"
                    />
                </svg>
                <input
                    className="focus:border-red-400 focus:border-solid focus:border-[2px] block w-full h-[calc(2.5rem+2px)] pl-10 p-[1.5rem_0.75rem] text-base font-normal leading-[1.5] text-[#495057] bg-white 
                                    bg-clip-padding border-[1px] max-sm:border-[1px] border-[#c5ccd3] rounded-[3px] shadow-[inset_0_1px_1px_rgba(51,51,51,.075)] transition-[border-color,box-shadow] 
                                    duration-150 ease-in-out outline-none"
                    placeholder="Search services"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* Suggestions Dropdown */}
                {filteredServices.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto">
                        {filteredServices.map((service, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleServiceSelect(service)}
                            >
                                {service.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Main Categories View */}
            <div className="w-full">
                <h1 className="text-2xl font-bold mb-4">Categories</h1>
                {autoServices.map((category, index) => (
                    <div
                        key={index}
                        className="p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleCategoryClick(category)}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-lg text-gray-800">
                                {category.name}
                            </span>
                            <svg
                                className="w-5 h-5 text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    fill="currentColor"
                                    d="M26.5 23.95L16.6 14.05L18.75 11.9L30.8 23.95L18.75 36L16.6 33.85L26.5 23.95Z"
                                    strokeWidth={1}
                                />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sliding Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg transform transition-transform duration-300 z-50 ${
                    isPanelOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {selectedNode && (
                    <div className="p-4 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={handleBack}
                                className="text-blue-500 hover:underline"
                            >
                                &lt; Back
                            </button>
                            <h1 className="text-2xl font-bold">
                                {selectedNode.name}
                            </h1>
                            <button
                                onClick={() => {
                                    setIsPanelOpen(false);
                                    setSelectedNode(null);
                                    setNodePath([]);
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {selectedNode.subcategories &&
                                selectedNode.subcategories.map(
                                    (subcategory, index) => (
                                        <div
                                            key={index}
                                            className="p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                                            onClick={() =>
                                                handleItemClick(subcategory)
                                            }
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg text-gray-800">
                                                    {subcategory.name}
                                                </span>
                                                <svg
                                                    className="w-5 h-5 text-gray-500"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M26.5 23.95L16.6 14.05L18.75 11.9L30.8 23.95L18.75 36L16.6 33.85L26.5 23.95Z"
                                                        strokeWidth={1}
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    )
                                )}
                            {selectedNode.services &&
                                selectedNode.services.map((service, index) => (
                                    <div
                                        key={index}
                                        className="p-4 border-b border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleItemClick(service)}
                                    >
                                        {service}
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceItem1;
