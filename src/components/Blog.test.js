import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

// ({ blog, addLike, removeBlog })
describe("<Blog />", () => {
  let blog
  let addLike
  let removeBlog

  beforeEach(() => {
    blog = {
      title: "test blog",
      author: "react-testing-library",
      url: "http://localhost:3001",
      likes: 10,
      id: "test"
    }
    addLike = jest.fn()
    removeBlog = jest.fn()
    render(<Blog blog={blog} addLike={addLike} removeBlog={removeBlog} />)
  })
  
  test("<Blog /> only shows title and author by default", () => {
    const titleElement = screen.getByText(blog.title)
    const authorElement = screen.queryByText(blog.author)
    const urlElement = screen.queryByText(blog.url)
    const likesElement = screen.queryByText(blog.likes)

    expect(titleElement).toBeInTheDocument()
    expect(authorElement).not.toBeInTheDocument()
    expect(urlElement).not.toBeInTheDocument()
    expect(likesElement).not.toBeInTheDocument()
  })

  test("<Blog /> shows all info after clicking the view button", async () => {
    const viewButton = screen.getByRole("button", { name: "view" })
    await userEvent.click(viewButton)

    const titleElement = screen.getByText(blog.title, { exact: false })
    const authorElement = screen.getByText(blog.author, { exact: false })
    const urlElement = screen.getByText(blog.url, { exact: false })
    const likesElement = screen.getByText(blog.likes, { exact: false })

    expect(titleElement).toBeInTheDocument()
    expect(authorElement).toBeInTheDocument()
    expect(urlElement).toBeInTheDocument()
    expect(likesElement).toBeInTheDocument()
  })

  test("<Blog /> calls addLike twice when like button is clicked twice", async () => {
    const viewButton = screen.getByRole("button", { name: "view" })
    await userEvent.click(viewButton)

    const likeButton = screen.getByRole("button", { name: "like" })
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(addLike).toHaveBeenCalledTimes(2)
  })
})
