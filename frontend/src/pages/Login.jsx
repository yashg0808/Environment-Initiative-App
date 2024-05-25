import { useState } from "react"


function Login() {
    const [formdata, setFormdata] = useState({
        username: '',
        password: ''
    })
    function handleSubmit(event) {
        event.preventDefault()
        console.log(formdata)
        setFormdata({
            username: '',
            password: ''
        })
    }
  return (
    <div>
        <form>
            <h1>Login</h1>
            <label>
                Username:
                <input 
                value={formdata.username}
                onChange={(e) => setFormdata({ ...formdata, username: e.target.value })}
                type="text" name="username" />
            </label>
            <br />
            <label>
                Password:
                <input 
                value={formdata.password}
                onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
                type="password" name="password" />
            </label>
            <br />
            <button 
            onClick={handleSubmit}
            type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login