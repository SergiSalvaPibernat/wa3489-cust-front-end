import React from 'react';

export function EventList(props) {

  let rows = props.events.map((item, index) => {
    let classes = "item";
    if (props.formObject && props.formObject.id === item.id) {
      classes += " selected";
    }
    return (
      <tr key={index} className={classes} onClick={() => props.handleListClick(item)}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.eventDate}</td>
        <td>{item.location}</td>
        <td>{item.currentRegistrations}/{item.maxCapacity}</td>
        <td>
          <button onClick={(e) => {
            e.stopPropagation();
            props.onRegisterClick(item);
          }}>
            Register
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h3>Available Events</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Location</th>
            <th>Capacity</th>
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