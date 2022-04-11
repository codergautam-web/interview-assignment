import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { getUserList } from "./request";

const Main = () => {
  const [user, setUser] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmationid, setConfirmationid] = useState(0);

  const [viewModal, setviewModal] = useState(false);
  const [viewuser, setViewuser] = useState("");

  const [editModal, seteditModal] = useState(false);
  const [edituser, setedituser] = useState("");
  const [editid, seteditid] = useState(0);
  const [editname, setEditname] = useState("");
  const [editusername, setEditusername] = useState("");
  const [editphone, setEditphone] = useState("");
  const [editemail, setEditemail] = useState("");
  const [editwebsite, setEditwebsite] = useState("");
  const [editcity, setEditcity] = useState("");
  const [editzipcode, setEditzipcode] = useState("");
  const [editstreet, setEditstreet] = useState("");
  const [editsuite, setEditsuite] = useState("");
  const [editcname, setEditcname] = useState("");
  const [editcatchpharse, setEditcatchpharse] = useState("");
  const [editbs, setEditbs] = useState("");

  const showConfirmationModal = (id) => {
    setConfirmationid(id);
    setConfirmationModal(true);
  };
  const closeConfirmationModal = () => {
    setConfirmationModal(false);
  };

  const showviewModal = (id) => {
    setviewModal(true);
    const viewdata = user.find((e) => {
      return e.id === id;
    });
    setViewuser(viewdata);
    console.log(viewdata);
  };
  const closeviewModal = () => {
    setviewModal(false);
  };

  const showeditModal = (id) => {
    seteditModal(true);
    const editdata = user.find((e) => {
      return e.id === id;
    });
    setedituser(editdata);
    setEditname(editdata.name);
    setEditusername(editdata.username);
    setEditphone(editdata.phone);
    setEditemail(editdata.email);
    setEditwebsite(editdata.website);
    setEditcity(editdata.address.city);
    setEditzipcode(editdata.address.zipcode);
    setEditstreet(editdata.address.street);
    setEditsuite(editdata.address.suite);
    setEditcname(editdata.company.name);
    setEditcatchpharse(editdata.company.catchPhrase);
    setEditbs(editdata.company.bs);
    seteditid(id);
  };
  const closeeditModal = () => {
    seteditModal(false);
  };

  useEffect(() => {
    getUser();
    //eslint-disable-next-line
  }, []);

  const getUser = () => {
    getUserList().then(async (result) => {
      setUser(result);
    });
  };

  const deleteData = (id) => {
    const alldata = user;
    const deleteData = alldata.filter((e) => e.id !== id);
    setUser(deleteData);
    setConfirmationid(0);
    setConfirmationModal(false);
  };

  const updateData = () => {
    edituser.name = editname;
    edituser.email = editemail;
    edituser.phone = editphone;
    edituser.username = editusername;
    edituser.website = editwebsite;
    edituser.address.city = editcity;
    edituser.address.zipcode = editzipcode;
    edituser.address.street = editstreet;
    edituser.address.suite = editsuite;
    edituser.company.name = editcname;
    edituser.company.bs = editbs;
    edituser.company.catchPhrase = editcatchpharse;
    closeeditModal();
  };

  return (
    <>
      <div className="col-12">
        <div className="card p-0 m-0">
          <Table className="mb-0" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City / Zipcode</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(user) && user.length > 0 ? (
                user.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      {item.address.city} / {item.address.zipcode}{" "}
                    </td>
                    <td>
                      <button
                        className="btn btn-info btn-sm mx-2"
                        onClick={() => showviewModal(item.id)}
                      >
                        <i className="fa fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-primary btn-sm mx-2"
                        onClick={() => showeditModal(item.id)}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm mx-2"
                        onClick={() => showConfirmationModal(item.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    height="180"
                    className="text-center"
                    colSpan="6"
                    style={{ verticalAlign: "middle" }}
                  >
                    No User FOund
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={confirmationModal} onHide={closeConfirmationModal} centered>
        <Modal.Body>
          <div className="row justify-content-center">
            <div className="col-lg-12 m-0 p-0">
              <div className="text-center">
                <img
                  src="https://st.depositphotos.com/3528133/5117/v/380/depositphotos_51179277-stock-illustration-single-flat-close-vector-icon.jpg?forcejpeg=true"
                  style={{ height: 150, width: 150, borderRadius: "50%" }}
                  alt="Delete Icon"
                />
                <h4>Are you Sure</h4>
                <p>Do you really want to delete this user</p>
              </div>

              <hr />

              <div className="float-right pr-4">
                <Button
                  variant="secondary"
                  onClick={() => closeConfirmationModal()}
                  className="mr-2"
                >
                  No
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteData(confirmationid)}
                >
                  Yes Confirm
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {viewuser !== "" && (
        <Modal show={viewModal} onHide={closeviewModal} centered size="lg">
          <Modal.Body>
            <div className="row justify-content-center">
              <div className="col-lg-12 m-0 p-0">
                <div className="p-3">
                  <div className="row">
                    <div className="col-12">
                      <h4>Personal Information</h4>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="name" className="m-0 p-0">
                          Name
                        </label>
                        <p>
                          <b>{viewuser.name}</b>
                        </p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="name" className="m-0 p-0">
                          Username
                        </label>
                        <p>
                          <b>{viewuser.username}</b>
                        </p>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="name" className="m-0 p-0">
                          Phone
                        </label>
                        <p>
                          <b>{viewuser.phone}</b>
                        </p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="name" className="m-0 p-0">
                          Email
                        </label>
                        <p>
                          <b>{viewuser.email}</b>
                        </p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="name" className="m-0 p-0">
                          Website
                        </label>
                        <span className="ml-3">
                          <b>{viewuser.website}</b>
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-3">
                    <div className="col-12">
                      <h4>Address</h4>
                      <p>
                        {viewuser.address.street}, {viewuser.address.suite},{" "}
                        {viewuser.address.city} ({viewuser.address.zipcode}){" "}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-3">
                    <div className="col-12">
                      <h4>Company</h4>
                      <p>
                        {viewuser.company.name}, <br />
                        {viewuser.company.catchPhrase}, <br />
                        {viewuser.company.bs}, <br />
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-3">
                    <div className="col-12">
                      <div className="float-right pr-4">
                        <Button
                          variant="danger"
                          onClick={() => closeviewModal()}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {edituser !== "" && (
        <Modal show={editModal} onHide={closeeditModal} centered size="lg">
          <Modal.Body>
            <div className="row justify-content-center">
              <div className="col-lg-12 m-0 p-0">
                <div className="p-3">
                  <div className="row">
                    <div className="col-12">
                      <h4>Personal Information</h4>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="name" className="m-0 p-0">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          defaultValue={edituser.name}
                          onChange={(e) => setEditname(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="name" className="m-0 p-0">
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          defaultValue={edituser.username}
                          onChange={(e) => setEditusername(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="name" className="m-0 p-0">
                          Phone
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          defaultValue={edituser.phone}
                          onChange={(e) => setEditphone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="name" className="m-0 p-0">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          name="name"
                          defaultValue={edituser.email}
                          onChange={(e) => setEditemail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="name" className="m-0 p-0">
                          Website
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          defaultValue={edituser.website}
                          onChange={(e) => setEditwebsite(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-3">
                    <div className="col-12">
                      <h4>Address</h4>
                    </div>
                    <div className="col-6">
                      <label htmlFor="name" className="m-0 p-0">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        defaultValue={edituser.address.city}
                        onChange={(e) => setEditcity(e.target.value)}
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="name" className="m-0 p-0">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="zipcode"
                        defaultValue={edituser.address.zipcode}
                        onChange={(e) => setEditzipcode(e.target.value)}
                      />
                    </div>

                    <div className="col-6">
                      <label htmlFor="name" className="m-0 p-0">
                        street
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="street"
                        defaultValue={edituser.address.street}
                        onChange={(e) => setEditstreet(e.target.value)}
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="name" className="m-0 p-0">
                        suite
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="suite"
                        defaultValue={edituser.address.suite}
                        onChange={(e) => setEditsuite(e.target.value)}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-3">
                    <div className="col-12">
                      <h4>Company</h4>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="name" className="m-0 p-0">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="cname"
                          defaultValue={edituser.company.name}
                          onChange={(e) => setEditcname(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="name" className="m-0 p-0">
                          Catch Phrase
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="catchPhrase"
                          defaultValue={edituser.company.catchPhrase}
                          onChange={(e) => setEditcatchpharse(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="name" className="m-0 p-0">
                          BS
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="bs"
                          defaultValue={edituser.company.bs}
                          onChange={(e) => setEditbs(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-3">
                    <div className="col-12">
                      <div className="float-right pr-4">
                        <Button
                          variant="danger"
                          onClick={() => closeeditModal()}
                          className="mr-2"
                        >
                          Close
                        </Button>

                        <Button
                          variant="info"
                          onClick={() => updateData(editid)}
                        >
                          Update Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Main;
