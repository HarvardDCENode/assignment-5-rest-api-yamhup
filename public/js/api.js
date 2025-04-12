
(function(){
    const baseURL  = 'http://localhost:8086';

    async function testAPIs(){
        try{
            // display all trips
            let list = await callAPI('GET', '/api/trips', null, null )
            console.log('\n---------Return trip list------------\n')
            console.log(list)
        } catch(err){
            console.error(`Error: ${err}}`)
        }
        
    };

    async function callAPI(method, uri, params, body){
        try{
            const response = await fetch(baseURL + uri, {
                method: method,
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


