import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

describe("<BlogForm />", () => {
  test("calls createBlog when form is submitted", async () => {
    const mockFunction = jest.fn()
    render(<BlogForm createBlog={mockFunction} />)

    const titleInput = screen.getByLabelText("title")
    const authorInput = screen.getByLabelText("author")
    const urlInput = screen.getByLabelText("url")
    
    await userEvent.type(titleInput, "test title")
    await userEvent.type(authorInput, "test author")
    await userEvent.type(urlInput, "test url")
    
    const createButton = screen.getByRole("button", { name: "create" })
    await userEvent.click(createButton)

    expect(mockFunction).toHaveBeenCalledTimes(1)
    expect(mockFunction).toHaveBeenCalledWith({
      title: "test title",
      author: "test author",
      url: "test url"
    })
  })
})
