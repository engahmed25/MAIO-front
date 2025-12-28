import { useState } from "react"

function Navbar(){
  const [open, setOpen] = useState(false)
  return
  <nav>
    <div>
      Your <span>Logo</span>
    </div>
    {/* Desktop */}
    <ul>
      <li><a href="#">Find a Doctor</a></li>
      <li><a href="#">Find a Hospital</a></li>
      <li><a href="#">Health A to Z</a></li>
    </ul>
    <div>
      <button>Login</button>
      <button>Sign Up</button>
    </div>
    {/* mobile */}
    <button
      onClick={()}></button>
  </nav>
}