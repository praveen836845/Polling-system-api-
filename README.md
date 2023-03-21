# POLLING_SYSTEM_API

# Introduction 

Creating a polling system api where anyone can create questions with options and also add votes to it. It is built
using Express, Nodejs, MongoDB.

<br/>

## Features

- Users can create questions (you can add as many questions as you want).
- Users can add options to a question.
- Users can add a vote to an option of question.
- Users can delete a question -> A question can't be deleted if one of it's options has votes.
- Users can delete an option -> An option can't be deleted if it has even one vote given to it.
- Users can view a question with it's options and all the votes given to it.

<br/>

## Routes & URL

- **/questions/create**
  <p> To create a new question hit the following URL with a post request:</p>
  http://localhost:8000/api/questions/create

- **/options/:id/create**
  <p>To create a new option for a question hit the following URL with a post request:</p>
  http://localhost:8000/api/questions/id/options/create

- **/options/:id/addVote**
  <p>To increment the count of votes on an option, hit the following URL with a get request:</p>
  http://localhost:8000/api/options/id/addVote

- **/questions/:id**
  <p> To view a question and it’s options, hit the following URL with a get request:</p>
  http://localhost:8000/api/questions/id

- **/options/:id/delete**
  <p> To delete an option, hit the following URL with a delete request: </p>
  http://localhost:8000/api/options/id/delete

- **/questions/:id/delete**
  <p> To delete a question, hit the following URL with a delete request: </p>
  http://localhost:8000/api/questions/id/delete
  <br/>


