# Notify

Notify is a lightweight JavaScript script that allows you to display customizable notifications on your website. Each notification can be set to automatically disappear after a defined delay or remain persistent, giving the user the option to manually close it. A dedicated CSS file makes it easy to integrate and customize the look and feel.

---

## Table of Contents

1. [Features](#features)  
2. [Installation](#installation)  
3. [Usage](#usage)  
4. [Configuration Options](#configuration-options)  
5. [CSS Customization](#css-customization)  
6. [Function Call Examples](#function-call-examples)  
7. [Tips](#tips)  
8. [License](#license)  
9. [Contribute](#contribute)

---

## Features

- **Multiple notification types**: _default_, _error_, _success_, _warning_ (easily extendable).  
- **Adjustable display duration** or **persistent** notifications that require manual closing.  
- **Font Awesome icons** for each notification type.  
- **"Close" button** automatically shown for persistent notifications.  
- **Keyboard close option**: press `Escape` to dismiss the first visible notification.  
- **Scrolling text animation** for messages that exceed the container width.  
- **Easy to integrate**: create notifications with a single function call.

---

## Installation

1. **Download** or clone this GitHub repository.
2. **Copy** the `script.js` (or `notify.js` if you renamed it) and the `style.css` files into your project.
3. **Include** the CSS file in the `<head>` section of your HTML:

   ```html
   <link rel="stylesheet" href="style.css">
