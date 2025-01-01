# Notify

Notify is a lightweight JavaScript script that allows you to display customizable notifications on your website. Each notification can be set to automatically disappear after a defined delay or remain persistent, giving the user the option to manually close it. A dedicated CSS file makes it easy to integrate and customize the look and feel.

---

## Table of Contents
1. [Features](#features)  
2. [Installation](#installation)  
3. [Usage](#usage)  
4. [Configuration Options](#configuration-options)  
5. [CSS Customization](#css-customization)  
   - [Adding a new notification type](#adding-a-new-notification-type)  
6. [Function Call Examples](#function-call-examples)  
7. [Tips](#tips)  
8. [License](#license)  
9. [Contribute](#contribute)

---

## Features
- **Multiple notification types**: _default_, _error_, _success_, _warning_ (easily extendable).  
- **Adjustable display duration** or **persistent** notifications that require manual closing.  
- **Font Awesome icons** for each notification type.  
- **Close button** is automatically displayed for persistent notifications.  
- **Keyboard close option**: press Escape to dismiss the first visible notification.  
- **Scrolling text animation** for messages that exceed the container width.  
- **Easy integration**: create notifications with a single function call.

---

## Installation
1. Download or clone this GitHub repository.  
2. Copy the `script.js` (or rename it to `notify.js` if you want) and `style.css` files into your project.  
3. Include the CSS file in the `<head>` section of your HTML:

   ```html
   <link rel="stylesheet" href="style.css">  
   ```

4. Include the JavaScript file before the closing `</body>` tag:

   ```html
   <script src="script.js"></script>  
   ```

---

## Usage
Once the CSS and JavaScript files have been integrated, you can call the global `showNotification` function anywhere in your code (either in a separate JS file or inline in your HTML).

```javascript 
showNotification("Hello, world!");  
```

This function will automatically create a notification container if one does not already exist and display the requested notification.

---

## Configuration Options
The `showNotification` function can be called in two different ways:

### 1. Positional Parameters
```javascript 
showNotification(  
  "My message",  
  "error",   // notification type (optional, default is "default")  
  5000       // auto-close delay in milliseconds (optional, default is 0)  
);  
```

- **Parameter 1**: `message` (string)  
- **Parameter 2**: `typeOrDelayBeforeHide` (string or number)  
  - If it’s a string, it represents the notification type (e.g., "error", "success", "warning", "default").  
  - If it’s a number, it represents the auto-close delay in milliseconds.  
- **Parameter 3**: `delayBeforeHide` (number, optional, default `0`)  
  - `0` means no auto-close (persistent notification).

### 2. Options Object
```javascript
showNotification({  
  message: "Your notification message",  
  type: "success",  
  delayBeforeHide: 3000  
});  
```

- **message**: The notification text to display (string).  
- **type**: The notification type. Defaults to `"default"`.  
- **delayBeforeHide**: Duration in milliseconds before auto-close. `0` means the notification remains persistent.

---

## CSS Customization
The `style.css` file manages the look of the notifications. It is fully customizable thanks to CSS variables (defined in the `:root` section) and dedicated classes:

```css 
:root {  
  --n-error-bgd: rgb(255, 99, 71);  
  --n-success-bgd: rgb(50, 205, 50);  
  --n-warning-bgd: rgb(255, 215, 0);  
  --n-default-bgd: rgb(68, 68, 68);  

  --n-inside: #fafbfe;  
  --n-close-button-bgd: rgba(0, 0, 0, 0.2);  
  --n-close-button-hover-bgd: rgba(0, 0, 0, 0.3);  
  --n-blur: blur(5px);  
}  
```

- Background colors: `--n-error-bgd`, `--n-success-bgd`, `--n-warning-bgd`, `--n-default-bgd`  
- Text and button colors: `--n-inside`, `--n-close-button-bgd`, `--n-close-button-hover-bgd`  
- Blur effect: `--n-blur`

### Adding a new notification type
You can add a new type (for example, "info") by:

1. Updating the JavaScript code (the `notificationTypes` object in `script.js`):

   ```javascript
   info: { icon: "fas fa-info-circle", class: "info" }  
   ``

2. Adding the corresponding style in `style.css`:

   ```css
   .notification.info {  
     background-color: lightblue;  
   }  
   ```

---

## Function Call Examples
```javascript
// 1. Default notification (type "default"), persistent  
showNotification("This is a default notification!");  

// 2. Error notification, persistent  
showNotification("This is an error notification!", "error", 0);  

// 3. Success notification, auto-closes after 5 seconds  
showNotification("This is a success notification!", "success", 5000);  

// 4. Warning notification, persistent  
showNotification("This is a warning notification!", "warning", 0);  

// 5. Using an options object  
showNotification({  
  message: "Message from an options object",  
  type: "success",  
  delayBeforeHide: 4000  
});  
```

---

## Tips

- **Close via the Escape key**: The script is initially set to close the first visible notification when the user presses Escape. If you do not need this feature, comment out the corresponding line in `script.js`.

  ```javascript
  document.addEventListener("keydown", closeNotificationOnEscape);  
  ```

- **Forced close**: You can call `closeNotification(notificationElement)` directly if you have a reference to the element. In most cases, this is not necessary since the script already handles manual and automatic closures.

- **Text scrolling**: If the notification text is too long to fit on a single line, a scrolling animation (the `scroll-text` keyframes) is triggered. Adjust the animation duration in the CSS if necessary.

  ```css
  .notif.scrolling {  
    animation: scroll-text 10s linear infinite;  
  }  
  ```

---

## License
Notify is distributed under the MIT License. Feel free to use, modify, and redistribute it in your projects.

---

## Contribute
Contributions are welcome!  
To propose ideas, report bugs, or submit a pull request:

1. Fork the repository.  
2. Create a branch for your feature or fix.  
3. Test your changes locally.  
4. Submit a pull request describing your changes clearly.

Thank you for contributing to Notify!
