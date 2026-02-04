import { useState } from 'react';
import MapChart from "../components/ui/MapChart";
import AddEventModal from "../components/modals/AddEventModal";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';

function EventsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveEvent = (eventData: any) => {
        console.log('New event:', eventData);
        // Add logic to save event
    };
    const upcomingEvents = [
        { id: 1, title: "Team Meeting", date: "2024-02-05", time: "09:00", location: "Conference Room A", expectedAttendees: 15, registeredAttendees: 12 },
        { id: 2, title: "Security Training", date: "2024-02-06", time: "14:00", location: "Training Hall", expectedAttendees: 30, registeredAttendees: 25 },
        { id: 3, title: "Fire Drill", date: "2024-02-07", time: "10:30", location: "Building Exit Points", expectedAttendees: 200, registeredAttendees: 150 }
    ];

    const recentEvents = [
        { id: 4, title: "Monthly Review", date: "2024-02-01", time: "15:00", location: "Main Hall", expectedAttendees: 50, actualAttendees: 48 },
        { id: 5, title: "Safety Briefing", date: "2024-01-30", time: "11:00", location: "Conference Room B", expectedAttendees: 20, actualAttendees: 18 },
        { id: 6, title: "New Employee Orientation", date: "2024-01-28", time: "09:00", location: "Training Center", expectedAttendees: 8, actualAttendees: 8 }
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="!text-2xl font-bold text-gray-800">Events & Activities</h1>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#1A3263] text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                >
                    Create Event
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Visitor Locations</h2>
                <MapChart/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4 text-blue-600">Upcoming Events</h2>
                    <div className="space-y-4">
                        {upcomingEvents.map(event => (
                            <div key={event.id} className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r">
                                <h3 className="font-medium text-gray-800">{event.title}</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
                                    <span className="flex items-center gap-1">
                                        <FaCalendarAlt size={12} />
                                        {event.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaClock size={12} />
                                        {event.time}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaMapMarkerAlt size={12} />
                                        {event.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaUsers size={12} />
                                        {event.registeredAttendees}/{event.expectedAttendees}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4 text-green-600">Recent Events</h2>
                    <div className="space-y-4">
                        {recentEvents.map(event => (
                            <div key={event.id} className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r">
                                <h3 className="font-medium text-gray-800">{event.title}</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
                                    <span className="flex items-center gap-1">
                                        <FaCalendarAlt size={12} />
                                        {event.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaClock size={12} />
                                        {event.time}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaMapMarkerAlt size={12} />
                                        {event.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaUsers size={12} />
                                        {event.actualAttendees}/{event.expectedAttendees}
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <div className="text-xs text-gray-500">
                                        Attendance: {Math.round((event.actualAttendees / event.expectedAttendees) * 100)}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600">24</div>
                    <div className="text-gray-600">Active Events</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <div className="text-3xl font-bold text-green-600">156</div>
                    <div className="text-gray-600">Total Attendees</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <div className="text-3xl font-bold text-orange-600">8</div>
                    <div className="text-gray-600">This Week</div>
                </div>
            </div>

            <AddEventModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEvent}
            />
        </div>
    );
}
export default EventsPage;