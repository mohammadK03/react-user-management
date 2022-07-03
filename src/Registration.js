import React, { useState } from 'react'
import { useRef } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Registration(props) {
    let nameRef = useRef("");
    let ageRef = useRef("");
    let numberRef = useRef("");
    const [startDate, setStartDate] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        let user = {
            name: '',
            age: null,
            number: null,
            date: null
        };
        if (nameRef.current.value && ageRef.current.value && numberRef.current.value) {
            user.name = nameRef.current.value;
            user.age = ageRef.current.value;
            user.number = numberRef.current.value;
            user.date = startDate;
            props.onSubmit(user);
            nameRef.current.value = null;
            ageRef.current.value = null;
            numberRef.current.value = null;
        } else {
            alert('fill all the inputs')
        }
    }

  return (
    <div
    className='registration-card ma-auto'>
        <form
        onSubmit={handleSubmit}>
            <h5
            className='title'> Sign Up </h5>
            <div class="mb-3">
                <label 
                for="name" 
                class="form-label">Name</label>
                <input 
                type="string" 
                class="form-control" 
                id="name" 
                placeholder="Name"
                ref={nameRef} />
            </div>
            <div class="mb-3">
                <label 
                for="name" 
                class="form-label">Age</label>
                <input 
                type="number" 
                class="form-control" 
                id="age" 
                placeholder="age"
                ref={ageRef} />
            </div>
            <div class="mb-3">
                <label 
                for="name" 
                class="form-label">Phone Number</label>
                <input 
                class="form-control" 
                id="number" 
                placeholder="number"
                ref={numberRef} />
            </div>
            <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
            <button 
            class="btn btn-primary add-btn mt-4"
            type="submit">Add User</button>
        </form>
    </div>
  )
}
