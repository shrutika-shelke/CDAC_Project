document.addEventListener('DOMContentLoaded', function() {
    // Create a div element for the title and add it to the body
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('ti');
    const titleLink = document.createElement('a');
    titleLink.setAttribute('href', 'home.html');
    titleLink.setAttribute('id', 'p1');
    titleLink.textContent = 'Title';
    titleDiv.appendChild(titleLink);
    document.body.appendChild(titleDiv);

    // Create a style element for menu styling
    const style = document.createElement('style');
    style.textContent = `
        .menu {
            text-align: right;
            padding: 10px;
        }

        .menu a.button {
            background-color: #4CAF50;
            border: none;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            transition-duration: 0.4s;
            cursor: pointer;
            border-radius: 8px;
        }

        .menu a.button:hover {
            background-color: #45a049;
            color: white;
        }
    `;
    document.head.appendChild(style);

    // Create a div element for the menu and add it to the body
    const menuDiv = document.createElement('div');
    menuDiv.classList.add('menu');

    // Create and append anchor elements with button class for menu items
    const menuItems = [
        { href: 'home.html', text: 'Home' },
        { href: 'product.html', text: 'Device Details' },
        { href: 'contus.html', text: 'Contact Us' },
        { href: 'log.html', text: 'Login' },
        { href: 'Signup.html', text: 'Sign Up' }
    ];

    menuItems.forEach(item => {
        const menuItem = document.createElement('a');
        menuItem.setAttribute('href', item.href);
        menuItem.classList.add('button');
        menuItem.textContent = item.text;
        menuDiv.appendChild(menuItem);
    });

    document.body.appendChild(menuDiv);
});
