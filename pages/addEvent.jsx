import React, { useEffect, useState } from 'react'
import Router from 'next/router';
import Link from 'next/link'

const addEvent = () => {
    const [newEventData, setNewEventData] = useState({
        user_id: 1, // get this use_id from url params -> i take it as 1;
        title: "",
        description: "",
        startDate: "",
        startTime: "",
        endTime: "",
        endDate: "",
    });

    const dateTimeFormater = (inputDate, inputTime) => {
        const date = `${inputDate}T${inputTime}:00`;
        console.log(date);
        return date;
    }

    const checkValidDate = (inputDate) => {
        const date = new Date();
        const [yToday, mToday, dToday] = [date.getFullYear(), date.getMonth(), date.getDate()];
        const [yInput, mInput, dInput] = inputDate.split('-');

        console.log(inputDate);
        console.log(mToday, dToday, yToday);
        console.log(yInput, mInput, dInput);

        return (dInput >= dToday && mInput >= mToday && yInput >= yToday);
    }

    const sendData = async () => {
        let { user_id, title, description, startDate, startTime, endDate, endTime } = newEventData;

        if (user_id == "" || title == "" || description == "" || startDate == "" || endDate == "" || startTime == "" || endTime == "") {
            return alert("Please provide all the input values!");
        }

        if (checkValidDate(startDate) && checkValidDate(endDate)) {

            const start = dateTimeFormater(startDate, startTime);
            const end = dateTimeFormater(endDate, endTime);

            const event = { user_id, title, description, start, end }

            await fetch("http://localhost:5000/api/create-event", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event),
            }).then(function (response) {
                return response.json();
            }).then(function (fetchedData) {
                console.log(fetchedData);
                Router.push('/addEvent');
            }).catch((err) => console.log(err));

            Router.push('/');
        } else {
            alert("Please Enter Correct Dates!")
        }
    }


    return (
        <>
            <div className="m-2 md:m-4 p-3 md:p-6 border rounded">
                <div>
                    <span className="uppercase text-sm text-gray-600 font-bold">Title</span>
                    <input className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text" placeholder="" required onChange={(e) => setNewEventData({ ...newEventData, title: e.target.value })} />
                </div>
                <div className="mt-5">
                    <span className="uppercase text-sm text-gray-600 font-bold">Description</span>
                    <textarea className="w-full h-32 bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        required onChange={(e) => setNewEventData({ ...newEventData, description: e.target.value })}></textarea>
                </div>

                <div className="flex flex-wrap mt-5">
                    <div className="w-full md:w-1/2 pr-3">
                        <span className="uppercase text-sm inline w-100 md:w-1/2 text-gray-600 font-bold">Event Start Date</span>
                        <input className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            type="date" placeholder="" required onChange={(e) => setNewEventData({ ...newEventData, startDate: e.target.value })} />
                    </div>
                    <div className="w-full md:w-1/2 pl-3">
                        <span className="uppercase text-sm inline w-100 md:w-1/2 text-gray-600 font-bold">Event Start Time</span>
                        <input className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            type="time" placeholder="" required onChange={(e) => setNewEventData({ ...newEventData, startTime: e.target.value })} />
                    </div>
                </div>

                <div className="flex flex-wrap mt-5">
                    <div className="w-full md:w-1/2 pr-3">
                        <span className="uppercase text-sm inline w-100 md:w-1/2 text-gray-600 font-bold">End Start Date</span>
                        <input className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            type="date" placeholder="" required onChange={(e) => setNewEventData({ ...newEventData, endDate: e.target.value })} />
                    </div>
                    <div className="w-full md:w-1/2 pl-3">
                        <span className="uppercase text-sm inline w-100 md:w-1/2 text-gray-600 font-bold">End Start Time</span>
                        <input className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                            type="time" placeholder="" required onChange={(e) => setNewEventData({ ...newEventData, endTime: e.target.value })} />
                    </div>
                </div>

                <button className="mt-5 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
                    onClick={sendData}>
                    add event to Calender
                </button>
            </div>
        </>
    )
}

export default addEvent
