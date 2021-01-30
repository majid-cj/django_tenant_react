import React from "react";

export const Header = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand text-black" href="/">
        DTR
      </a>
      <button
        class="navbar-toggler "
        type="button"
        data-toggle="collapse"
        data-target="#expandnavbar"
        aria-controls="expandnavbar"
        aria-expanded="false"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="expandnavbar">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
