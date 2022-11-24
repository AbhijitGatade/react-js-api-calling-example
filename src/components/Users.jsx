import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Spinner,
  Table,
} from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from "react-router-dom";

function Users() {
  let [loading, setLoading] = useState(true);
   let [id, setId] = useState(0);
  let [users, setUsers] = useState([]);
  let [confirm, setConfirm] = useState(false);
  
  useEffect(() => {
    bindData();
  }, []);

  function confirmDeleteUser(e, userid) {
    e.preventDefault();
    setId(userid);
    setConfirm(true);
  }

  function deleteUser() {
    if(id !== 0){
      axios
        .delete(
          "https://637f178f5b1cc8d6f93a43f1.mockapi.io/api/v1/users/" + id
        )
        .then((response) => {
          setConfirm(false);
          setId(0);
          bindData();
        });
      }
  }

  function bindData(){
    setLoading(true);
    axios
      .get("https://637f178f5b1cc8d6f93a43f1.mockapi.io/api/v1/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      });
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Users</Breadcrumb.Item>
      </Breadcrumb>
      {confirm && (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="primary"
          title="Are you sure?"
          onConfirm={(e) => {
            deleteUser(e);
          }}
          onCancel={(e) => {
            setConfirm(false);
          }}
          focusCancelBtn
        >
          You will not be able to recover this imaginary file!
        </SweetAlert>
      )}
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>No</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return (
              <tr key={ user.id }>
                <td>
                  <Link to={"/edit/" + user.id}>
                    <Button>
                      <i className="fa fa-edit"></i>
                    </Button>
                  </Link>
                  &nbsp;
                  <Button
                    onClick={(e) => {
                      confirmDeleteUser(e, user.id);
                    }}
                    variant="danger"
                  >
                    <i className="fa fa-trash"></i>
                  </Button>
                </td>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="img-thumbnail"
                    style={{ height: "50px" }}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobileno}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Users;
