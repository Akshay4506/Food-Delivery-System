async function testOrder() {
    try {
        let loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'test@example.com', password: 'password' })
        });

        let loginText = await loginRes.text();
        console.log('Login response:', loginRes.status, loginText.substring(0, 100));

        if (!loginRes.ok) {
            loginRes = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: 'testuser', email: 'test@example.com', password: 'password' })
            });
            loginText = await loginRes.text();
            console.log('Register response:', loginRes.status, loginText.substring(0, 100));
        }

        const loginData = JSON.parse(loginText);
        const token = loginData.token;
        console.log('Got token:', token ? 'Yes' : 'No');

        const restsRes = await fetch('http://localhost:5000/api/restaurants');
        const restsText = await restsRes.text();
        const rests = JSON.parse(restsText);
        const rest = rests[0];

        const menuRes = await fetch(`http://localhost:5000/api/restaurants/${rest._id}/menu`);
        const menuText = await menuRes.text();
        const menu = JSON.parse(menuText);
        const item = menu[0];

        const orderData = {
            restaurantId: rest._id,
            items: [{
                menuItemId: item._id,
                name: item.name,
                quantity: 1,
                price: item.price
            }],
            totalAmount: item.price
        };

        const res = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(orderData)
        });

        const resText = await res.text();
        console.log('Order response text:', res.status, resText);
    } catch (err) {
        console.error('Error placing order:', err.message);
    }
}

testOrder();
