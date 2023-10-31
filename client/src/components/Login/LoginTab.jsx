import React from 'react'

function Login() {
  return (
    <div>
      <h2>Login</h2>
      <div>
      <div>
        <TextField id="standard-basic" label="Username" variant="standard" />
      </div>
      <div>
        <TextField id="standard-basic" label="Password" variant="standard" />
      </div>
      </div>
      <Button variant="contained" disableElevation>
        Login
      </Button>
    </div>
  )
}

export default Login