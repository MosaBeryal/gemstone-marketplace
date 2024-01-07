import React, { useContext, useState } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import { FaHeart} from 'react-icons/fa';
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextStore/AuthContext";
import Search from "../Search/Search";
import { logoutUser } from "../../apis/Auth";
import DataContext from "../../contextStore/DataContext";
import toast from "react-hot-toast";
function Header() {
  const handleEmptyClick = () => {
    alert("No items found.., please search by product name");
  }
  const { user, setUser } = useContext(AuthContext);

  console.log(user)

  const handleLogout = () => {
    logoutUser()
      .then(res => {
        console.log(res)
        toast.success("Logout Successfully")
        setUser("")
      })
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#002f34",
              fontWeight: "bold",
            }}
          >
            <OlxLogo></OlxLogo>

          </Link>

        </div>
        {/* <div className="placeSearch">
          <input type="text"
            placeholder="Search specific product..."
            value={wordEntered}
            onChange={handleFilter}
          />{filteredData.length === 0 ? (
            <div onClick={handleEmptyClick}> <SearchIcon /> </div>
          ) : (
            <div id="clearBtn" onClick={clearInput} > <Arrow></Arrow></div>
          )}
          {filteredData.length !== 0 && (
            <div className="dataResult-header">
              {filteredData.slice(0, 15).map((value, key) => {
                return (
                  <div key={key} className="dataItem-header" onClick={() => handleSelectedSearch(value)}>
                    <p>{value.name} </p>
                  </div>
                );
              })}
            </div>
          )}

        </div> */}

        {/* <div>

          <select id="location"
            style={{
              width: "200px",
              height: "40px",
              border: "1px solid #002f34",
              borderRadius: "4px",
              outline: "none",
              padding: "0px 10px",
              color: "#002f34",
              fontWeight: "bold",
            }}
          >
            <option value="location1"
              selected
              style={{
                color: "#002f34",
                fontWeight: "bold",
              }}
            >Select Location</option>
            <option value="location2">Location 2</option>
            <option value="location3">Location 3</option>
                  </select>
        </div> */}

        <div className="productSearch">
          <Search />
        </div>

        {/* <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div> */}
        {/* wishlist */}
        <div className="wishlist">
          <Link to={user?"/wishlist":"/login"}>
            <FaHeart
              style={{
                fontSize: "25px",
                color: "#002f34",
                fontWeight: "bold",
              }}
            />
          </Link>
        </div>
        <div className="loginPage">
          {user ? (
            user.data.name
          ) : (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
          <hr />
        </div>
        {user && (
          <span onClick={handleLogout} className="logout-span">
            Logout
          </span>
        )}

        <Link to="/create">
          {" "}
          <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
