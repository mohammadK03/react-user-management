import React from 'react'

export default function SingleUser(props) {
    const handleDeleteUser = (e) => {
        if(window.confirm('Are you sure you wanna delete this user ?')) {
            props.handleDelete(props.user);
        }
    }

  return (
    <div
    className='single-user-card'>
        <div
        className='container'>
            <div
            className='row'>
                <div
                className='d-flex flex-row mb-3'>
                    <img 
                    className='account-image'
                    src={require('../src/images/account.png')}></img>
                </div>
                <div
                className='col-12'>
                    <div
                    className='d-flex flex-row'>
                        <p
                        className='me-4'>Name: </p>
                        <p> {props.user.name} </p>
                    </div>
                    <div
                    className='d-flex flex-row'>
                        <p
                        className='me-4'>Age: </p>
                        <p> {props.user.age} </p>
                    </div>
                    <div
                    className='d-flex flex-row'>
                        <p
                        className='me-4'>Number: </p>
                        <p> {props.user.number} </p>
                    </div>
                    <div
                    className='d-flex flex-row'>
                        <p
                        className='me-4'>Date: </p>
                        <p> {(new Date(props.user.date)).toLocaleDateString('en-US')} </p>
                    </div>
                </div>
                <div
                className='d-flex flex-row justify-content-center'>
                    <button 
                    type="button" 
                    class="btn btn-danger"
                    onClick={handleDeleteUser}>Danger</button>
                </div>
            </div>
        </div>
    </div>
  )
}
