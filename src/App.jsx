import { Sphere } from "./Modules";

export default function App() {
  return (
    <div className="container">
      <Sphere></Sphere>
      <div className="nav-container">
        <div className="head">
          AweSome3DWeb
        </div>
        <ul>
          <li>Home</li>
          <li>Explore</li>
        </ul>
      </div>
      <div className="main-container">
        <span>Give</span>
        <span>It</span>
        <span>A</span>
        <span>Spin</span>
      </div>

      <div className="footer">
        @Copyright 2023
        <span>LeoDev, Inc</span>
      </div>
    </div>
  );
}
