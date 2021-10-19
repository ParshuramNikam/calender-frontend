import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from "@fullcalendar/daygrid";
import Router from 'next/router';

const Calender = () => {

	const [eventsData, setEventsData] = useState([]);

	const fetchEvents = () => {
		const user_id = 1;
		return fetch(`http://localhost:5000/api/get-events/${user_id}`)
			.then((res) => res.json())
			.then((fetchData) => {
				console.log("fetched events data : ", fetchData);
				setEventsData(fetchData);
			})
			.catch((err) => console.log(err));
	} 

	useEffect(() => {
		console.log("Fetching data");
		fetchEvents();
	}, []);

	return (
		<FullCalendar
			plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
			events={eventsData}
			initialView="dayGridMonth"
			nowIndicator={true}
			editable={false} 	// to prevent drag and drop feature
			// eventColor="#2C3E50"
			headerToolbar={{
				center: "dayGridMonth,timeGridWeek,timeGridDay new",
			}}
			customButtons={{
				new: {
					text: "new",
					click: () => {
						return Router.push('/addEvent');
					}
				}
			}}
			dateClick={function (e) {
				console.log(e.dateStr);
			}}
			eventClick={(e) => {
				console.log( "title:",e.event.title,"	user_id:", e.event.extendedProps.user_id)
				console.log("event full data : ", e.event.extendedProps);
			}}
		/>
	)
}

export default Calender;