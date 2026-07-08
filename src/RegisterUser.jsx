import React, { useState } from "react";

const RegisterUser = () => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: e.target.validity.valid
        ? ""
        : e.target.validationMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) return;
    if (formData.confirmPassword !== formData.password) {
      setErrors((prev) => ({
        ...prev,
        ["confirmPassword"]:
          "Current password do not match with confirm password",
      }));
      return;
    }
    setLoading(true);
    const data = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`User registerd successfully id: ${data.id}`);
        console.log(data);
      });
    setFormData(initialState);

    setLoading(false);
  };



  return (
    <div className="register">
      <h2 className="title">Register User</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputField">
          <label className="label" htmlFor="name">
            Full Name*
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            required
            minLength={3}
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="inputField">
          <label className="label" htmlFor="email">
            Email*
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="inputField">
          <label className="label" htmlFor="phone">
            Phone*
          </label>
          <input
            type="text"
            placeholder="Enter Phone no."
            name="phone"
            required
            pattern="[0-9]{}"
            minLength={10}
            maxLength={15}
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div className="inputField">
          <label className="label" htmlFor="name">
            Age*
          </label>
          <input
            type="number"
            placeholder="Enter age"
            name="age"
            required
            min={0}
            max={120}
            value={formData.age}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>

        <div className="inputField">
          <label className="label">Gender*</label>

          <div className="gender">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              required
              checked={formData.gender === "male"}
              onChange={handleChange}
              disabled={loading}
            />
            <label htmlFor="male">Male</label>

            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              required
              checked={formData.gender === "female"}
              onChange={handleChange}
              disabled={loading}
            />
            <label htmlFor="female">Female</label>

            <input
              type="radio"
              id="other"
              name="gender"
              required
              value="other"
              checked={formData.gender === "other"}
              onChange={handleChange}
              disabled={loading}
            />
            <label htmlFor="other">Other</label>
          </div>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>

        <div className="inputField">
          <label className="label" htmlFor="password">
            Password*
          </label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            required
            minLength={8}
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            autoComplete="true"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="inputField">
          <label className="label" htmlFor="confirm-password">
            Confirm Password*
          </label>
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            autoComplete="true"
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>

        <button className="submit" type="submit" disabled={loading}>
          {loading ? "Please wait" : "Register"}
        </button>
        <button
          className="clear"
          type="reset"
          onClick={() => setFormData(initialState)}
          disabled={loading}
        >
          Clear form
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
