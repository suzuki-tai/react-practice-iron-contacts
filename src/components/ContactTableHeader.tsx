import React from 'react';

/**
 * contact table header component
 * @return {React.Component}
 */
const ContactTableHeader = () => {
  return (
    <tr>
      <th scope="col">
        <h2>Picture</h2>
      </th>
      <th scope="col">
        <h2>Name</h2>
      </th>
      <th scope="col">
        <h2>Popularity</h2>
      </th>
      <th scope="col">
        <h2>
          Won
          <br />
          Oscar
        </h2>
      </th>
      <th scope="col">
        <h2>
          Won
          <br />
          Emmy
        </h2>
      </th>
      <th scope="col">
        <h2>Actions</h2>
      </th>
    </tr>
  );
};

export default ContactTableHeader;
