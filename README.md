# Arch Linux Installation And Configuration Tutorial

The book is created by **`mdbook`**.

- How to install **`mdBook`**

    Install via cargo:

    ```bash
    cargo install mdBook
    ```

- How to view the book in your browser

  Make sure you're in the repo root folder and run:

    ```bash
    # Clean the prev build
    mdbook clean installation-tutorial-book

    # Serve it via HTTP server
    mdbook serve --open installation-tutorial-book
    ```
It will build the book into `installation-tutorial-book/book` 
folder and open it your browser.

How do I export the book into **`PDF`** format?

Thta's pretty easy, in the browser, click on the print icon on the right-top to save as **`PDF`**.
