/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing users into DynamoDB. Please wait.");

var allMovies = JSON.parse(fs.readFileSync('userdata.json', 'utf8'));
allMovies.forEach(function(user) {
    var params = {
        TableName: "SampleLocalUserTable",
        Item: {
            "PersonID":  user.PersonID,
            "FullName": user.FullName,
            "info":  user.info
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add user", user.PersonID, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", user.PersonID);
       }
    });
});
