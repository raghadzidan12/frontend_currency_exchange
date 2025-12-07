import { useState } from "react";

export default function AddCurrency() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا ضع استدعاء API لإضافة العملة
    alert(`Currency Added: ${name} (${symbol})`);
    setName("");
    setSymbol("");
  };

  return (
    <div className="content-wrapper">
      <h2 className="title">Add New Currency</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Currency Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="text"
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
        />
        <button className="convert-btn" type="submit">Add Currency</button>
      </form>
    </div>
  );
}
