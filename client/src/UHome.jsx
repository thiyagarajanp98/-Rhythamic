import React, { useEffect, useState } from 'react';
import './UHome.css';
import { fetchLaunchData } from './LaunchData';
import AlbumContainer from './AlbumContainer';

const UHome = () => {
    const [loading, setLoading] = useState(true);
    const [launchData, setLaunchData] = useState([]);

    useEffect(() => {
        // Fetch launch data
        const fetchHomeData = async () => {
            try {
                const result = await fetchLaunchData();
                setLaunchData(result);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchHomeData(); // Call the fetchHomeData function
    }, []);


    return (
        <div className="Main-container">
            {loading && (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            )}
            {launchData && <>{Object.keys(launchData).map((key, index) => (
                <AlbumContainer key={index} titles={launchData[key].title} launchData={launchData[key]} />
            ))}</>}
        </div>
    );
};

export default UHome;
