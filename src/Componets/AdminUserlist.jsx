import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { userlist } from '../services/api/admin';

function AdminUserlist() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(Array(13).fill(false));

  const handleShow = (index) => {
    const updatedModals = [...show];
    updatedModals[index] = true;
    setShow(updatedModals);
  };

  const handleClose = (index) => {
    const updatedModals = [...show];
    updatedModals[index] = false;
    setShow(updatedModals);
  };

  useEffect(() => {
    userlist().then((res) => {
      setUsers(res.data);
    });
  }, [users]);

  return (
    <div className="flex justify-center items-center m-5">
  <div className="bg-slate-700  w-full shadow-md rounded my-6">
    <table className="min-w-max  w-full table-auto">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">Sl</th>
          <th className="py-3 px-6 text-left">Image</th>
          <th className="py-3 px-6 text-left">Full Name</th>
          <th className="py-3 px-6 text-left">Email</th>
          <th className="py-3 px-6 text-center">Action</th>
        </tr>
      </thead>
      <tbody className="text-white text-sm font-light">
        {users &&
          users.map((user, index) => {
            return (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                <td className="py-3 px-6 text-left">{index}</td>
                <td className="py-3 px-6 text-left">{user.name}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-center">
                 
                  <button className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded ml-2">Block</button>
                  <Modal show={show[index]} onHide={() => handleClose(index)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{/* <AdminUserEdit users={setUsers} user={user} id={user.id} /> */}</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => handleClose(index)}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default AdminUserlist;
