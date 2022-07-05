import { useState, useEffect, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast } from 'react-bootstrap'; 
import { Pagination } from 'react-bootstrap';

import Registration from './Registration';
import Demonstration from './Demonstration';

function App() {
  const[users, setUsers] = useState([]);
  const[pagedUsers, setPagedUsers] = useState([]);
  const [show, setShow] = useState(false);
  let [message, setMessage] = useState("");
  let pageNumber = [];
  let pageRef = useRef(0);

  for(let i = 1; i <= Math.ceil((users.length) / 2); i++) {
    pageNumber.push(i);
  }

  console.log(pageNumber)

  const addPassedUser = user => {
    setUsers(prevUsers => {
      return [...prevUsers, { ...user, id: prevUsers.length }];
    });
    setMessage('User added successfuly');
    setPagedUsers(paginationHandler(0));
    setShow(true);
  };
  

  const deleteUser = (user) => {
    let newUsers = [...users];
    newUsers.splice(
      newUsers.indexOf(user), 1
    )
    setUsers(newUsers);
    setMessage('User deleted successfuly');
    setShow(true);
    setPagedUsers(paginationHandler(0));
  }

  const sort = sortBy => () => {
    let sortedArray = [...pagedUsers];
    console.log(sortBy)
    switch (sortBy) {
      case 'date':
        sortedArray = sortedArray.sort((a, b) => {
          return new Date(a.date).getTime() - 
                  new Date(b.date).getTime();
        });
        break;
      case 'name':
        sortedArray = sortedArray.sort((a, b) => {
          if(a.name > b.name) return 1;
          if(a.name < b.name) return -1;
          return 0;
          
        })
        break;
      case 'age':
        sortedArray = sortedArray.sort((a, b) => {
          return a.age - b.age;
        })
        break;
      case 'number':
        sortedArray = sortedArray.sort((a, b) => {
          return a.number - b.number;
        })
        break;

      default:
        break;
    }
    setPagedUsers(sortedArray);
  };

  let pagination = (page = 1) => () => {
    let pageUsers = [...users];
    console.log(users, 'copy')
    pageUsers = pageUsers.slice((page - 1) * 2, page * 2);
    console.log(pageUsers,'hy')
    setPagedUsers(pageUsers);
  }

  function paginationHandler(page = 0) {
    let pageUsers = [...users];
    pageUsers = pageUsers.slice(page * 2, (page + 1) * 2);
    setPagedUsers(pageUsers);
  }


  useEffect(() => {
    if(localStorage.getItem('users'))  {
      const users = JSON.parse(localStorage.getItem('users'));
      setUsers(users);
    }
  }, [])

  useEffect(() => {
    if (users.length) {
      localStorage.setItem("users", JSON.stringify(users));
    }
    paginationHandler(0);
  }, [users])

  useEffect(() => {
    if (show.length) {
      setMessage("");
    }
  }, [show])

  return (
    <>
      <Toast 
      className='toast'
      onClose={() => setShow(false)} 
      show={show} 
      delay={3000}
      autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Attention!</strong>
          </Toast.Header>
          <Toast.Body>
            { message }
          </Toast.Body>
        </Toast>
      <div
      className='registration'>
        <div class="container">
          <div class="row">
            <div class="col-md-6 ma-auto">
              <Registration
              onSubmit={addPassedUser}/>
            </div>
          </div>
        </div>
      </div>
      <div
      className='sort d-flex flex-row justify-content-center flex-wrap'>
        <button 
        type="button" 
        class="btn btn-primary me-2"
        onClick={sort('date')}>sort by date</button>
        <button 
        type="button" 
        class="btn btn-primary me-2"
        onClick={sort('name')}>sort by name</button>
        <button 
        type="button" 
        class="btn btn-primary me-2"
        onClick={sort('age')}>sort by age</button>
        <button 
        type="button" 
        class="btn btn-primary me-2"
        onClick={sort('number')}>sort by number</button>
      </div>
      <div
      className='container mt-5'>
        <div
        className='row'>
          <div
          className='col-md-6 ma-auto'>
            <Demonstration
            className='demo'
            users={pagedUsers}
            handleDeleteUser={deleteUser}
            />
          </div>
        </div>
      </div>
      <div
      className='pagination d-flex flex-row justify-content-center'>
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          {
            pageNumber.map((number, i) => {
              return <Pagination.Item 
                      onClick={pagination(number)}>
                        {number}
                      </Pagination.Item>
            })
          }
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </>
  );
}

export default App;
