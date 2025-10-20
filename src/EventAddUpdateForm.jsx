import React from 'react';

export function EventAddUpdateForm(props) {

  let { mode, formObject, handleInputChange, onDeleteClick, onSaveClick, onCancelClick } = props;

  return (
    <div className='boxed'>
      <h3>{mode} Event</h3>
      Event Name:<br />
      <input type="text" name="name" value={formObject.name} onChange={handleInputChange} />
      <br />
      Description:<br />
      <textarea name="description" value={formObject.description} onChange={handleInputChange} rows="3" cols="50" />
      <br />
      Event Date:<br />
      <input type="text" name="eventDate" value={formObject.eventDate} onChange={handleInputChange} placeholder="YYYY-MM-DD" />
      <br />
      Location:<br />
      <input type="text" name="location" value={formObject.location} onChange={handleInputChange} />
      <br />
      Max Capacity:<br />
      <input type="number" name="maxCapacity" value={formObject.maxCapacity} onChange={handleInputChange} />
      <br />
      Current Registrations:<br />
      <input type="number" name="currentRegistrations" value={formObject.currentRegistrations} onChange={handleInputChange} disabled={mode === 'Add'} />
      <br /><br />
      <button type="button" onClick={onSaveClick}>{mode}</button>
      <button type="button" onClick={onDeleteClick}>Delete</button>
      <button type="button" onClick={onCancelClick}>Cancel</button>
    </div>
  );
}