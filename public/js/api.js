// Reference from week9 -09.1-express-rest-api "api-async-await.js" file

(function(){
    const baseURL  = 'http://localhost:8086';

    async function testAPIs(){
        try{
            // displays all trips
            let list = await callAPI('GET', '/api/trips', null, null );
            console.log('\n\n---------Return trip list------------\n');
            console.log(list);

            //creates a trip itinerary and uploads an image
            let newImage = document.querySelector('input[type="file"]');
            //creates a new FormData object
            let data = new FormData()
            data.append('image', newImage.files[0]);
            data.append('username', 'Testing API username')
            data.append('title', 'Testing API title');
            data.append('country', 'Testing API country');
            data.append('city', 'Testing API city');
            data.append('content', 'This is an AJAX API test');

            // create a new trip
            let newTrip = await callAPI('POST', '/api/trips', null, data)
            console.log(`\n\n---------Create a new trip Trip Id:${newTrip._id}  results------------\n`);
            console.log(newTrip)

            //find the new created trip
            let fetchedNewTrip = await callAPI('GET', `/api/trips/${newTrip._id}`, null, null);
            console.log('\n\n------Find obj results -----\n');
            console.log(fetchedNewTrip);

            //update trip itinerary's username/title/country/city/content by creating a new obj
            const updatedFields ={
                username: fetchedNewTrip.username + ' appended another username by AJAX API',
                title: fetchedNewTrip.title + ' appended another title by AJAX API',
                country: fetchedNewTrip.country + ' appended another country by AJAX API',
                city: fetchedNewTrip.city + ' appended another city by AJAX API',
                content: fetchedNewTrip.content + ' appended another content by AJAX API',
            }


            let updatedTrip = await callAPI('PUT', `/api/trips/${fetchedNewTrip._id}`, null, updatedFields);
            console.log('\n\n ------ Update results ------ \n');
            console.log(updatedTrip);





        } catch(err){
            console.error(`Error: ${err}}`)
        }
        
    };

    async function callAPI(method, uri, params, body){
        jsonMimeType = {
            'Content-type':'application/json'
           }
        try{
            const response = await fetch(baseURL + uri, {
                method: method,
                ...(method == 'POST' ? {body:body}: {}),
                ...(method == 'PUT' ?  {headers: jsonMimeType, body:JSON.stringify(body)} : {})
            });
            return response.json();
        }catch(err){
            console.error(`Error: ${err}`);
            return "{'status':'error'}";
            
        }
        
    }

    document.querySelector('#test-button').addEventListener("click", ()=> {
        console.log("Test API button been clicked.")
        let upload = document.querySelector('input[type="file"]')
        if (upload.value){
            testAPIs();
        } else {
            alert('Select an image file to test the REST APIs')
        }
    });
})();


