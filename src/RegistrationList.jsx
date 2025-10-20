import React from 'react';

export function RegistrationList(props) {

  let rows = props.registrations.map((item, index) => {
    let classes = "item";
    if (props.formObject && props.formObject.id === item.id) {
      classes += " selected";
    }
    
    // Find event name from events list
    const event = props.events.find(e => e.id === item.eventId);
    const eventName = event ? event.name : 'Unknown Event';
    
    return (
      <tr key={index} className={classes} onClick={() => props.handleListClick(item)}>
        <td>{item.id}</td>
        <td>{eventName}</td>
        <td>{item.registrationDate}</td>
        <td>{item.status}</td>
        <td>
          <button onClick={(e) => {
            e.stopPropagation();
            props.onUnregisterClick(item);
          }}>
            Unregister
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h3>My Registrations</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Name</th>
            <th>Registration Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}