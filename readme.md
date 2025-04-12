#### Assignment #5 - REST APIs




- After execute POST/PUT request in Postman to create or update a trip, visit http://localhost:8086/trips in the browser to see the new trip or the updated trip.
<BR>

![image](./public/images/browser.png)

---

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

<BR>

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
<br>
![image](./public/images/put_method.png)