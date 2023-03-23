import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

// ({ blog, addLike, removeBlog })
describe("<Blog />", () => {
  test("<Blog /> only shows title and author by default", () => {
    const blog = {
      title: "test blog",
      author: "react-testing-library",
      url: "http://localhost:3001",
      likes: 10,
      id: "test"
    }

    render(<Blog blog={blog} />)

    const titleElement = screen.getByText(blog.title)
    const authorElement = screen.queryByText(blog.author)
    const urlElement = screen.queryByText(blog.url)
    const likesElement = screen.queryByText(blog.likes)

    expect(titleElement).toBeInTheDocument()
    expect(authorElement).not.toBeInTheDocument()
    expect(urlElement).not.toBeInTheDocument()
    expect(likesElement).not.toBeInTheDocument()
  })
})
