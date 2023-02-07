const LoginForm = ({handleLogin, username, password, onChangeUsername, onChangePassword}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username 
          <input
            type="text"
            value={username}
            name="Username"
            onChange={onChangeUsername}
          />
      </div>
      <div>
        password 
          <input
            type="text"
            value={password}
            name="Password"
            onChange={onChangePassword}
          />
      </div>
      <button>Login</button>
    </form>
  )
}

export default LoginForm