import React from 'react';

const LogsData = () => {
    const events = [
        {
            time: '2023-01-01',
            icon: '🚀',
            heading: 'Launch Event',
            description: 'Our company successfully launched a new product.',
        },
        {
            time: '2023-03-15',
            icon: '🌐',
            heading: 'Global Expansion',
            description: 'Opened new offices in multiple countries.',
        },
        {
            time: '2023-06-30',
            icon: '💼',
            heading: 'Partnership Agreement',
            description: 'Formed a strategic partnership with a key industry player.',
        },
        // Add more events as needed
    ];

    return (
        <div className="container mx-auto mt-8 px-4 pb-6">
            <div className="relative">
                {events.map((event, index) => (
                    <div key={index} className="mb-6 flex items-center gap-4">
                        <div className="absolute left-[20px] sm:left-[118px] top-0 -ml-px h-[110%] w-[0.1px] sm:w-[0.8px] bg-gray-400 "></div>
                        <p className="text-gray-600 whitespace-nowrap hidden sm:block">{event.time}</p>
                        <div className="w-10 h-10 bg-blue-300 text-white rounded-full flex items-center justify-center z-20 ">
                            {event.icon}
                        </div>
                        <div className="ml-2 w-[80%] md:w-full">
                            <p className="text-gray-600 whitespace-nowrap sm:hidden">{event.time}</p>

                            <h3 className="text-lg font-semibold">{event.heading}</h3>
                            <p className="text-gray-800">{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogsData;
