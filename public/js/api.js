// Reference from week9 -09.1-express-rest-api "api-async-await.js" file

(function(){
    const baseURL  = 'http://localhost:8086';

    async function testAPIs(){
        try{
            //READ: displays all trips
            let list = await callAPI('GET', '/api/trips', null, null );
            console.log('\n\n---------Return trip list------------\n');
            console.log(list);

            //creates a trip itinerary and uploads an image
            let newImage = document.querySelector('input[type="file"]');
            //creates a new FormData object
            let data = new FormData()
            data.append('image', newImage.files[0]);
            data.append('username', 'Demo API creates username')
            data.append('title', 'Demo API creates title');
            data.append('country', 'Demo API creates country');
            data.append('city', 'Demo API creates city');
            data.append('content', 'Demo API created content');

            //CREATE: create a new trip
            let newTrip = await callAPI('POST', '/api/trips', null, data);
            console.log(`\n\n-------- Create a new trip(trip Id:${newTrip._id})  results -----\n`);
            console.log(newTrip);

            //READ ONE: find the new created trip
            let fetchedNewTrip = await callAPI('GET', `/api/trips/${newTrip._id}`, null, null);
            console.log(`\n\n-------- Result of latest trip(trip Id:${newTrip._id}) -----\n`);
            console.log(fetchedNewTrip);

            //update trip itinerary's username/title/country/city/content by creating a new obj
            const updatedFields ={
                username: fetchedNewTrip.username + ' ➕ demo API append username:🐅',
                title: fetchedNewTrip.title + ' ➕ demo API append  title:🐉',
                country: fetchedNewTrip.country + ' ➕ demo API append country:🌆',
                city: fetchedNewTrip.city + ' ➕ demo API append city:🌁',
                content: fetchedNewTrip.content + ' ➕demo API append content:💬',
            }
            //UPDATE
            let updatedTrip = await callAPI('PUT', `/api/trips/${fetchedNewTrip._id}`, null, updatedFields);
            console.log('\n\n-------- Update results -----\n');
            console.log(updatedTrip);

            //READ ONE UPDATED TRIP
            let fetchedUpdatedTrip = await callAPI('GET', `/api/trips/${fetchedNewTrip._id}`, null, null);
            console.log('\n\n-------- Find updated results -----\n')
            console.log(fetchedUpdatedTrip);

            //DELETE 
            let deleteTrip = await callAPI('DELETE', `/api/trips/${fetchedNewTrip._id}`, null, null);
            console.log(deleteTrip);





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


