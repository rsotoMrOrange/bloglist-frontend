import { useState, useEffect } from 'react'
import Blog from './components/blog.component'
import LoginForm from './components/login-form.component'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification/notification.component'
import BlogForm from './components/blog-form.component'

const ERROR = 'error'
const SUCCESS = 'success'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const setDisplayMessage = (display, className, timer) => {
    setMessage({ display, className });
    setTimeout(() => {
      setMessage(null);
    }, timer)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setDisplayMessage(`Welcome ${username}`, SUCCESS, 5000)
      setPassword('')
      setUsername('')
    } catch(e) {
      setDisplayMessage('Wrong credentials', ERROR, 5000)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      const newBlog = await blogService.create({
        author,
        title,
        url,
        likes
      })
      setBlogs([...blogs, newBlog])
      setDisplayMessage(`a new blog '${title}' by ${author} added`, SUCCESS, 5000)
      setAuthor('')
      setTitle('')
      setUrl('')
      setLikes(0)
    } catch(e) {
      setDisplayMessage(`Something went wrong ${e.message}`, ERROR, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <div>
          <h2>log in to application</h2>
          <LoginForm 
            handleLogin={handleLogin}
            username={username}
            password={password}
            onChangeUsername={({target}) => setUsername(target.value)}
            onChangePassword={({target}) => setPassword(target.value)}
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <div>
        <p>{user.name} logged in</p>
        <button
          onClick={() => {
            window.localStorage.clear()
            window.location.reload()
          }}
        >
          logout
        </button>
        <BlogForm
          handleSubmit={handleSubmit}
          title={title}
          onChangeTitle={({target}) => setTitle(target.value)}
          author={author}
          onChangeAuthor={({target}) => setAuthor(target.value)}
          url={url}
          onChangeUrl={({target}) => setUrl(target.value)}
          like={likes}
          onChangeLikes={({target}) => setLikes(target.value)}
        />
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App