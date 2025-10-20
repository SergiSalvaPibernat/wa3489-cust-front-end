import React, { useState, useEffect } from 'react';
import { getAllEvents, postEvent, putEvent, deleteEventById, postRegistration, getRegistrationsByCustomer, deleteRegistrationById, checkRegistration } from './restdb.jsx';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { EventList } from './EventList.jsx';
import { EventAddUpdateForm } from './EventAddUpdateForm.jsx';
import { RegistrationList } from './RegistrationList.jsx';
import { Account } from './Account.jsx';

export function EventsPage(props) {
  let blankEvent = { "id": -1, "name": "", "description": "", "eventDate": "", "location": "", "maxCapacity": 0, "currentRegistrations": 0 };
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [formObject, setFormObject] = useState(blankEvent);
  const [currentView, setCurrentView] = useState('events'); // 'events' or 'registrations'
  const [customerId, setCustomerId] = useState(1); // This should come from logged-in user context
  
  let mode = (formObject.id >= 0) ? 'Update' : 'Add';

  const navigate = useNavigate();
  if(props.username === "") {
    navigate("/login");
  }

  useEffect(() => { 
    getEvents();
    if (currentView === 'registrations') {
      getMyRegistrations();
    }
  }, [formObject, currentView]);

  const getEvents = function () {
    getAllEvents(setEvents);
  }

  const getMyRegistrations = function () {
    getRegistrationsByCustomer(customerId, setRegistrations);
  }

  const handleListClick = function (item) {
    if (formObject.id === item.id) {
      setFormObject(blankEvent);
    } else {
      setFormObject(item);
    }
  }

  const handleInputChange = function (event) {
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = { ...formObject }
    newFormObject[name] = value;
    setFormObject(newFormObject);
  }

  let onCancelClick = function () {
    setFormObject(blankEvent);
  }

  let onDeleteClick = function () {
    let postopCallback = () => { setFormObject(blankEvent); }
    if (formObject.id >= 0) {
      deleteEventById(formObject.id, postopCallback);
    } else {
      setFormObject(blankEvent);
    }
  }

  let onSaveClick = function () {
    let postopCallback = () => { setFormObject(blankEvent); }
    if (mode === 'Add') {
      postEvent(formObject, postopCallback);
    }
    if (mode === 'Update') {
      putEvent(formObject, postopCallback);
    }
  }

  let onRegisterClick = async function (event) {
    // Check if already registered
    const isRegistered = await checkRegistration(customerId, event.id);
    if (isRegistered) {
      alert('You are already registered for this event!');
      return;
    }

    const registration = {
      customerId: customerId,
      eventId: event.id,
      registrationDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      status: 'ACTIVE'
    };

    let postopCallback = () => { 
      alert('Successfully registered for event!');
      getEvents(); // Refresh events to update registration count
    };
    postRegistration(registration, postopCallback);
  }

  let onUnregisterClick = function (registration) {
    let postopCallback = () => { 
      alert('Successfully unregistered from event!');
      getMyRegistrations();
      getEvents(); // Refresh events to update registration count
    };
    deleteRegistrationById(registration.id, postopCallback);
  }

  let pvars = {
    mode: mode,
    handleInputChange: handleInputChange,
    formObject: formObject,
    onDeleteClick: onDeleteClick,
    onSaveClick: onSaveClick,
    onCancelClick: onCancelClick
  }

  return ( 
    <div>
      <Account username={props.username} setUsername={props.setUsername}  />
      
      <div style={{ margin: '20px 0' }}>
        <button 
          onClick={() => setCurrentView('events')}
          style={{ backgroundColor: currentView === 'events' ? '#007bff' : '#f8f9fa', color: currentView === 'events' ? 'white' : 'black' }}
        >
          View All Events
        </button>
        <button 
          onClick={() => setCurrentView('registrations')}
          style={{ backgroundColor: currentView === 'registrations' ? '#007bff' : '#f8f9fa', color: currentView === 'registrations' ? 'white' : 'black', marginLeft: '10px' }}
        >
          My Registrations
        </button>
      </div>

      {currentView === 'events' && (
        <>
          <EventList
            events={events}
            formObject={formObject}
            handleListClick={handleListClick}
            onRegisterClick={onRegisterClick}
          />
          <EventAddUpdateForm {...pvars} />
        </>
      )}

      {currentView === 'registrations' && (
        <RegistrationList
          registrations={registrations}
          events={events}
          formObject={formObject}
          handleListClick={handleListClick}
          onUnregisterClick={onUnregisterClick}
        />
      )}
    </div>
  );
}

export default EventsPage;