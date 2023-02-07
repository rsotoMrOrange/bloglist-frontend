const BlogForm = ({
  handleSubmit,
  title,
  onChangeTitle,
  author,
  onChangeAuthor,
  url,
  onChangeUrl,
  likes, 
  onChangeLikes
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={onChangeTitle}
        />
    </div>
    <div>
      author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={onChangeAuthor}
        />
    </div>
    <div>
      url
        <input
          type="text"
          value={url}
          name="Url"
          onChange={onChangeUrl}
        />
    </div>
    <div>
      likes
        <input
          type="number"
          value={likes}
          name="Likes"
          onChange={onChangeLikes}
        />
    </div>
    <button type="submit">save</button>
  </form>
)

export default BlogForm