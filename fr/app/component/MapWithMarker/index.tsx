import React, { useEffect, useRef, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { UserLocationMapProps } from '@/app/utils/types';
 
const UserLocationMap: React.FC<UserLocationMapProps> = ({
    addressInput,
    addressfnc,
}) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(
        null
    );
    const [marker, setMarker] = useState<google.maps.Marker | null>(null);
    const [verifiedAddress, setVerifiedAddress] = useState<string>('');
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [latestAddress, setLatestAddress] = useState<string>('');
    const [prevAddress, setPrevAddress] = useState('');

    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    // Initialize map and geocoder
    useEffect(() => {
        if ((window as any).google) {
            initializeMap();
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}`;
        script.async = true;
        script.defer = true;
        script.onload = initializeMap;
        document.body.appendChild(script);

        return () => {
            script.remove();
            if (mapInstance) {
                mapInstance.unbindAll();
            }
        };
    }, []);

    // Handle address verification and marker updates
    useEffect(() => {
        if (!mapInstance || !addressInput?.fullAddress) return;

        const currentAddress = addressInput.fullAddress.trim();
        if (currentAddress === prevAddress) return;

        const handler = setTimeout(async () => {
            try {
                setLoading(true);
                const geocoder = new google.maps.Geocoder();
                const response = await geocoder.geocode({
                    address: currentAddress,
                });

                if (response.results.length > 0) {
                    const result = response.results[0];
                    const location = result.geometry.location;

                    // Update map view
                    mapInstance.setCenter(location);
                    mapInstance.setZoom(15);

                    // Clear existing marker
                    if (marker) {
                        marker.setMap(null);
                    }

                    // Create new marker
                    const newMarker = new google.maps.Marker({
                        position: location,
                        map: mapInstance,
                        title: result.formatted_address,
                        animation: google.maps.Animation.DROP,
                    });

                    // Add info window
                    const infoWindow = new google.maps.InfoWindow({
                        content: `<strong>${result.formatted_address}</strong>`,
                    });

                    newMarker.addListener('click', () => {
                        infoWindow.open(mapInstance, newMarker);
                    });

                    setMarker(newMarker);
                    infoWindow.open(mapInstance, newMarker);
                    setVerifiedAddress(result.formatted_address);
                    setIsVerified(true);
                    setPrevAddress(currentAddress);
                } else {
                    throw new Error('Address not found');
                }
            } catch (error) {
                setVerifiedAddress(
                    'Invalid address - please check and try again'
                );
                setIsVerified(false);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [addressInput?.fullAddress, mapInstance]);

    //Initialize the map
    const initializeMap = () => {
        if (mapRef.current && (window as any).google?.maps) {
            const map = new google.maps.Map(mapRef.current, {
                center: { lat: 37.0902, lng: -95.7129 },
                zoom: 4,
                disableDefaultUI: true,
                zoomControl: true,
            });
            setMapInstance(map);
        }
    };

    //Keep the address updated
    const handleUpdateAddress = () => {
        if (!loading) {
            addressfnc();
        }
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                }}
            >
                <Button
                    className="action-button bg-green-200 text-white px-4 py-2 rounded"
                    onClick={handleUpdateAddress} // Call function that updates latestAddress first
                    style={{
                        background: '#5786F0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                    disabled={loading} // Disable button when loading
                >
                    {loading && <Spinner animation="border" size="sm" />}{' '}
                    {/* Show spinner when loading */}
                    Update Address
                </Button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                {isVerified ? (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>
                        ✅ Your address is verified: {verifiedAddress}
                    </span>
                ) : (
                    <span style={{ color: '#F92F60', fontWeight: 'bold' }}>
                        ❌ Your address is not verified. Please enter a correct
                        address.
                    </span>
                )}
            </div>

            <div
                style={{
                    position: 'relative',
                    height: '100vh',
                    width: '100%',
                    marginBottom: '4rem',
                }}
            >
                <div
                    ref={mapRef}
                    style={{ height: '100%', width: '92%', margin: 'auto' }}
                />
            </div>
        </>
    );
};

export default UserLocationMap;
