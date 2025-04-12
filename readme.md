#### Assignment #5 - REST APIs

- Client-side test file for testing the REST APIs
    - visited http://localhost:8086/static/index.html 
   ![image](./public/images/cilent_side_testing.png)

- Week4 assignment HTML Interface (by using the /routes/trips.js) still functional and handy
    -visit http://localhost:8086/trips 
    ![image](./public/images/browser.png)

---

**GET method in Postman**
URL: http://localhost:8086/api/trips


**GET single trip in Postman**
URL: http://localhost:8086/api/trips/${trip_id}

**POST method In Postman**
URL: http://localhost:8086/api/trips
- Select 'form-data' in Body
- add keys
    - username (text)
    - title (text)
    - country (text)
    - city (text)
    - content (text)
    - image (File)
    - filename (text)
- add value as text and upload the imageFile from your local computer
![image](./public/images/post_method.png)


**PUT method In Postman**
URL: http://localhost:8086/api/trips/${trip_id}
- Select 'form-data' in Body
- add keys
    - username (text)
    - title (text)
    - country (text)
    - city (text)
    - content (text)
    - image (File)
    - filename (text)
- add value as text and upload the imageFile from your local computer
![image](./public/images/put_method.png)

**Delete method in Postman**
URL: http://localhost:8086/api/trips/${trip_id}