import React from "react";

function FormInput({ label, type, name, onChange }) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text capitalize">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        required
        placeholder="Type here"
        className="input input-bordered w-full "
        onChange={onChange}
      />
    </label>
  );
}

export default FormInput;
