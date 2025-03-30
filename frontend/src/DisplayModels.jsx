import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayModels = () => {
    const [models, setModels] = useState([]);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get('http://localhost:3001/models');
                setModels(response.data);
            } catch (error) {
                console.error('Error fetching models:', error);
            }
        };

        fetchModels();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
                <div key={model._id} className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">{model.name}</h2>
                    <p className="text-gray-600">📧 {model.email}</p>
                    <p className="text-gray-600">🎂 Age: {model.age}</p>
                    <p className="text-gray-600">⚥ Gender: {model.gender}</p>

                    {model.photo && (
                        <img 
                            src={`http://localhost:3001/${model.photo}`} 
                            alt="Model" 
                            className="w-full h-40 object-cover mt-4 rounded-lg"
                        />
                    )}
                    {model.certificate && (
                        <a href={`http://localhost:3001/${model.certificate}`} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-blue-500 hover:underline block mt-2">
                           View Certificate
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DisplayModels;
