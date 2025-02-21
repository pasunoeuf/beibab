# beibab
1. Регистрация пользователя
Отправь POST-запрос

URL: http://localhost:5000/api/auth/register Body (JSON, raw)

{ "name": "beibab", "email": "beibab@example.com", "password": "123456" }

2. Авторизация
Отправь POST-запрос

URL: http://localhost:5000/api/auth/login Body (JSON, raw)

{ "email": "beibab@example.com", "password": "123456" }

3. Создание товара 
Отправь POST-запрос

URL: http://localhost:5000/api/products Headers: Authorization: Bearer Body (JSON, raw)

{ "name": "T-shirt", "category": "clothes", "price": 20, "stock": 50, "description": "Cotton T-shirt", "images": ["image1.jpg"] }

4. Получение списка товаров
Отправь GET-запрос

URL: http://localhost:5000/api/products  

5. Создание заказа
Отправь POST-запрос

URL: http://localhost:5000/api/orders Headers: Authorization: Bearer Body (JSON, raw)

{ "products": [ { "productId": "65f2c3d456a7b5e8b9d4f124", "quantity": 2 } ], "totalPrice": 40 } 

6. Получение заказов пользователя 
Отправь GET-запрос

URL: http://localhost:5000/api/orders Headers: Authorization: Bearer

7. Удаление заказа
Отправь DELETE-запрос

URL: http://localhost:5000/api/orders/{order_id} Headers: Authorization: Bearer 
