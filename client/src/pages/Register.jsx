import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
// import Logo from "../assets/logo.svg"
import Logo2 from "../assets/logo2.svg"
//import styles from '../mystyle.module.css'

const handleSubmit = (event)=>{
    event.preventDefault();
    alert("form")
}
const handleChange = (event) => {};


export default function Register(){
    return <React.Fragment>
    <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
            <div className="nrand">
                <h1>snappy</h1>
            </div>
            <input 
            type="text" 
            placeholder="Username" 
            name="username" 
            onChange={e=>handleChange(e)}
            />
            <input 
            type="email" 
            placeholder="Email" 
            name="email" 
            onChange={e=>handleChange(e)}
            />
            <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            onChange={e=>handleChange(e)}
            />
            <input 
            type="password" 
            placeholder="Confirm Password" 
            name="confirmPassword" 
            onChange={e=>handleChange(e)}
            />
            <button type="submit">Create User</button>
            <span>Already have an account ? 
                <Link to="./login"> Login</Link>
            </span>
        </form>
        <LogoField>
          <img src={Logo2}/>
        </LogoField>
      </FormContainer>
  </React.Fragment>
}
const LogoField = styled.div`
  height:100%;
  width: 100%;
  background-color: #0094FF;
  justify-content: center;
  align-items: center;
  img{
    margin: 30vh;
  }
`;
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #white;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    width: 50vw;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #white;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #0094FF;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #0094FF;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: black;
    text-transform: uppercase;
    a {
      color: #blue;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
