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
            const tripId = newTrip._id;
            console.log(`\n\n---------Create a new trip Trip Id:${tripId}------------\n`);
            console.log(newTrip)

            //find the new created trip
            let fetchedNewTrip = await callAPI('GET', `/api/trips/${newTrip._id}`, null, null)
            console.log(newTrip._id, typeof newTrip._id)
            console.log('\n\n------Find latest created trip-----\n')
            console.log(fetchedNewTrip)




        } catch(err){
            console.error(`Error: ${err}}`)
        }
        
    };

    async function callAPI(method, uri, params, body){
        try{
            const response = await fetch(baseURL + uri, {
                method: method,
                ...(method == 'POST' ? {body:body}: {})
            });
            return response.json();
        }catch(err){
            console.error(`Error: ${err}`);
            
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


