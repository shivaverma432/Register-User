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

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.age.trim()) {
      newErrors.age="Age is required"
    }
    else if (Number(formData.age) < 0) {
      newErrors.age = "Age cannot be less than 0.";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required"
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be atleast 8 digit"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log(formData);
    setLoading(true)
    const data = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setFormData(initialState)
    setLoading(false)
    alert("User registerd successfully")
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
            value={formData.name}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="inputField">
          <label className="label" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            placeholder="Enter Phone no."
            name="phone"
            value={formData.phone}
            onChange={handleChange}
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
            value={formData.age}
            onChange={handleChange}
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
              checked={formData.gender === "male"}
              onChange={handleChange}
            />
            <label htmlFor="male">Male</label>

            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>

            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              checked={formData.gender === "other"}
              onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
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
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>

        <button className="submit" type="submit">
          {loading?"Please wait":"Register"}
        </button>
        <button
          className="clear"
          type="reset"
          onClick={() => setFormData(initialState)}
        >
          Clear form
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
