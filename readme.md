# Node js - Oauth2 - MongoDB

Blog Website Back-End Example to show oauth2 implementation using passportjs, expressjs and Oauth2orize libraries, It is REST API server implementation in Node Js.

# Prerequisite
   - node must be present on working machine.
   - mongodb server also must be present on working machine.

# Installation

  - Go to the directory path in terminal and run below command.
  - ```npm install```
  - it will install all the dependancies listed in ```package.json``` file.

# MongoDB setup
   - Create ```oauth2``` database in mongoDB.

# Run Server
- Open the terminal from the project location.
    # create Demo Data
    - now first fire ```node generateData.js``` command in terminal,
    - it will create default user with username & password and Register a client id and client secret in MongoDB Collection.
    
- Fire ```npm start``` commmand after creating Demo Data. It will start server runnig on ```http://localhost:7500/api``` or ```http://localhost:7500/```.

# Postman Api Testing
- To test the apis open the postman application
    # Generating Access and Refresh Token
    - To generate access token...
    - Set ```method = POST``` and pass the url ```http://localhost:7500/api/oauth/token```.
    - Now, go to ```Authorization``` setting, select ```oauth2.0```, and press ```Get new access token```, uptill now we do not have any Access Token so don't paste anything in Access Token Field.
    - One popup menu will occure, select ```grant type = password credentials```, and pass the required information press ```request token``` and  fire the api using ```send``` button.
    - It will generate AccessToken and RefreshToken.
    - Token's lifespan is ```3600 seconds```.
    - To get new token copy existing access token and pass it in ```Access Token``` field and Do as above.
    
    # Creating New Blog
    - To create new blog...
    - Set ```method = POST ``` and pass the url ```http://localhost:7500/api/blogs```.
    - Now, go to ```Autorization``` setting, select ```Bearer Token``` and passs ```Access Token``` which you have generated.
    - Now, go to body panel, select ```raw``` option and select ```JSON``` from drop down.
    ``` 
        {
            "title": "Hello World",
            "author": "Programming Bros",
            "discription": "This is testing Blog.",
            "image": "[ { "kind": "thumbnail", "url": "yourImageURL"}]"
        }
    ```
    - This will create a new blog, here title, author and discription are require option and image is not mendatory.
    
    # Updating Blog
    - To update existing blog...
    - Set ```method = PUT``` and pass the url ```http://localhost:7500/api/blogs/blogId```.
    - Change the ```blogId``` to ID of blog in given URL.
    - Now set the ```Authorization``` and ```raw``` panel setting as above.
    - It will update existing blog.
    
    # Get Your Information
    - To get your information...
    - Set ```method = GET``` and pass the url ```http://localhost:7500/api/users/info```.
    - Now, go to the ```Authorization``` setting, Select ```Bearer Token``` and pass Access Token.
    - This will give information of all the available users.
- In project there are more apis constructed, you can test all those apis.
- I have added Demo Screenshots in Screenshots Folder.

# Genereting and Running Docker Image using Docker file
- To generate docker image...
- ```docker build -t <your dockerhub username>/blog-oauth2-nodejs```
- To running docker image...
- ```docker run -p 49000:7500  -d <your docker username>/blog-oauth2-nodejs```
- This will run container on port 7500 and 49000 is docker container port
- Get Docker Container ID
- ```docker ps```
- Print output of app
- ```docker logs < container ID >```
- If you want to go inside the container
- ```docker exec -it < container ID > /bin/bash

# Module Used
- express [ Application Module ]
- mongoose [ For MongoDB Connection]
- nconf [ For Configuration ]
- passport [ For authrization ]
- winston [ For Logging ]
- faker [ For Generating Demo Data ]
- Oatuh2Orize [ For Oauth2 Implementation ]
- To Download modules fire  ``` npm install --save < module name >```

# Author
- D H R U V  P R A J A P A T I
# Thank You!