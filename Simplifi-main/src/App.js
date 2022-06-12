import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import useCollapse from "react-collapsed";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const fetchEmployeeList = async (currentPage) => {
    let apiResponse = await axios.get(
      `https://mockrestapi.herokuapp.com/api/employee?pageNo=${currentPage}&limit=10`
    );
    
    getData(apiResponse.data.data);
    console.log(apiResponse);
  };
  

  const delEmployee = async (id) => {
    await axios
      .delete(`https://mockrestapi.herokuapp.com/api/employee/${id}`)
      .then((res) => console.log("DELETED", res))
      .catch((err) => console.log(err));
    fetchEmployeeList();
    window.alert("DATA DELETED!!!");
  };
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    console.log(currentPage);
    await fetchEmployeeList(currentPage);
  };

  const [Data, getData] = useState([]);
  useEffect(() => {
    fetchEmployeeList();
    console.log("hi");
  }, []);

  function saveUser() {
    console.warn(name, email, phone, age, address, country);
    console.log("bye");
    console.log(name);
    axios
      .post("https://mockrestapi.herokuapp.com/api/employee", {
        name: name,
        email:email,
        phone:phone,
        age:age,
        country:country,
        address:address
      }).then((res) => console.log("DELETED", res))
      .catch((err) => console.log(err));
    fetchEmployeeList();
    window.alert("USER ADDED!!!");
  }

  return (
    <div className="App">
      <table>
        <tr>
          <th>NAME</th>
          <th>PHONE</th>
          <th>EMAIL</th>
          <th>AGE</th>
          <th>COUNTRY</th>
          <th>ADDRESS</th>
          <th></th>
        </tr>
        {Data.map((item, i) => (
          <tr key={i}>
            <td>{item.name}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.age}</td>
            <td>{item.country}</td>
            <td>{item.address}</td>
            <td>
              <button onClick={(e) => delEmployee(item._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
      
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={5}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
      <div className="collapsible">
        <div className="header" {...getToggleProps()}>
          {isExpanded ? "BACK" : "ADD EMPLOYEE"}
        </div>
        <div {...getCollapseProps()}>
          <div className="content">
            <br />
            <form action="" className="f" onSubmit={saveUser}>
              <label htmlFor="">
                NAME{" "}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  name="name" required
                />
              </label>
              <label htmlFor="">
                EMAIL{" "}
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  name="email"
                  required
                />
              </label>
              <label htmlFor="">
                PHONE{" "}
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  name="phone"
                  required
                />
              </label>
              <label htmlFor="">
                AGE{" "}
                <input
                  type="number"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  name="age"
                  required
                />
              </label>
              <label htmlFor="">
                COUNTRY{" "}
                <input
                  type="text"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  name="country"
                  required
                />
              </label>
              <label htmlFor="">
                ADDRESS{" "}
                <input
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  name="address"
                  required
                />
              </label>
              <button type ="submit" className="btn">
                Save New User
              </button>
            </form>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
