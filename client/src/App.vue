<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div class="main">
    <form class="user_create_form" >
      <h2>Hello {{ name }}</h2><br>
      <h2>Your token:</h2><br>
      <p class="token">{{ token }}</p><br>
      <h3>Login</h3>
      <input class="input" v-model="UserName" type="text" name="UserName"  placeholder="Enter your username" />
      <input class="input" v-model="Email" type="text" name="Email"  placeholder="Enter email" />
      <input class="input" v-model="Password" type="text" name="Password"  placeholder="Enter password" />
      <button class="submit-button button" @click="Login">Sing in</button>
    </form>

    <form class="user_create_form" >
      <h3>Create user</h3>
      <input class="input" v-model="UserName" type="text" name="UserName" placeholder="Enter name" />
      <input class="input" v-model="Email" type="text" name="Email"  placeholder="Enter email" />
      <input class="input" v-model="PhoneNumber" type="text" name="PhoneNumber"  placeholder="Enter phone" />
      <input class="input" v-model="Password" type="text" name="Password"  placeholder="Enter password" />
      <button class="submit-button button" @click="addUser">Add Models</button>
    </form>
    <div class="button-wrap"><button class="open_form_btn button">Show form for creating user</button></div>

    <h3>Users List</h3>
    <div class="users-container">
      <ul>
        <li v-for="(user, i) in users" :key="user._id">
          <div class="users_list">
            <span class="user-description user-name" @click="showForm = !showForm">{{ user.UserName }}</span>
            <span class="user-description user-id">ID: {{ user._id }}</span>
            <span class="user-description user-email">Email: {{ user.Email }}</span>
            <span class="user-description user-tel">Phone number: {{ user.PhoneNumber }}</span>

              <div class="user-description" v-for="(event, j) in events.filter((x)=> x.user_id == user._id)" :key="event._id">
              <span class=" user-id">EVENT ID: {{ event._id }}</span><br>
              <span class=" user-id">USER ID: {{ event.user_id }}</span><br>
              <span class=" user-id">TITLE: {{ event.title }}</span><br>
              <span class=" user-id">DESCRIPTION: {{ event.description }}</span><br>
              <span class=" user-id">DATE START: {{ event.startDate }}</span><br>
              <span class=" user-id">DATE END: {{ event.endDate }}</span><br>
                <button  @click="removeEvent(event, j)">DELETE EVENT</button>
              </div>
            <button class="delete-btn button" @click="removeUser(user, i)">DELETE USER</button>

            <form class="form_box" v-if="showForm">
              <h3>Create Event</h3>
              <input class="input" v-model="user._id"  type="text" name="user_id" />
              <input class="input" v-model="title" type="text" name="title" placeholder="Enter title" />
              <input class="input" v-model="description" type="text" name="description" placeholder="Enter description" />
              <input class="input" v-model="startDate" type="text" name="startDate" placeholder="Enter startDate" />
              <input class="input" v-model="endDate" type="text" name="endDate" placeholder="Enter endDate" />
              <button class="submit-button button" @click="addEvents(user._id)">Add Event</button>
            </form>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery';



jQuery(document).ready(function($){
  $(".user_create_form").hide();
  $( ".open_form_btn" ).on( "click", function() {
    $('.user_create_form').toggle();
  })
});



import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      users: [],
      events: [],
      UserName : "",
      Email: "",
      PhoneNumber: "",
      Password: "",
      user_id: "",
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      showForm: false,
      token: "",
      name: ""
    };
  },
  async mounted() {
    const response = await axios.get("api");
    this.users = response.data;

    const response2 = await axios.get("http://localhost:3000/event");
    this.events = response2.data;
  },

  methods: {
    async addUser(e) {
      e.preventDefault();
      if(this.UserName != "" && this.Email != "" && this.PhoneNumber != "" && this.Password != ""){
        const response = await axios.post("api", {
          UserName: this.UserName,
          Email: this.Email,
          PhoneNumber: this.PhoneNumber,
          Password: this.Password
        });
        this.users.push(response.data);
        this.UserName = "";
        this.Email = "";
        this.PhoneNumber = "";
        this.Password = "";
      }
      else console.log("wrong data or empty")
    },

    async removeUser(item, i) {
      await axios.delete(`api/${item._id}`);
      this.users.splice(i, 1);
    },

    async removeEvent(item, i) {
      await axios.delete(`http://localhost:3000/event/${item._id}`);
      this.events.splice(i, 1);
    },

    async Login(e){
      this.token = ""
      this.name = ""
      e.preventDefault()
      if(this.UserName != "" && this.Email != "" && this.Password != ""){
        const answer = await axios.post(`http://localhost:3000/auth/login`,{
          UserName: this.UserName,
          Email: this.Email,
          Password: this.Password
        });

            this.UserName = "",
            this.Email = "";
            this.Password = "";
            this.name = answer.data.name,
            this.token = answer.data.token
      }
      else console.log("wrong data")
    },

    async addEvents(id){
      if(this.title != ""){
        await axios.post("http://localhost:3000/event", {
          user_id: id,
          title: this.title,
          description: this.description,
          startDate: this.startDate,
          endDate: this.endDate
        });
        this.events = [];
        this.title = "",
            this.description = "",
            this.startDate = "",
            this.endDate =  ""
      }
      else console.log("wrong data")
    },

  }
};

</script>

<style>

body{
  font-family: 'Poppins', sans-serif;
}

.main {
  margin: auto;
  margin-top: 3rem;
  padding: 0 140px;
}

.button-wrap{
  text-align: center;
}

.token{
  width: 400px;
  text-align: center;
  margin: 0 auto;
  word-break: break-all;
}

.user_create_form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3{
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}

input {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid black;
  padding: 10px 20px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
}

.open_form_btn{
  margin: 5px auto;
}

.users-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.users-container ul {
  width: 100%;
  list-style: none;
  padding: 0;
}

.users-container ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.users_list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  width: 100%;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
  transition: 0.2s linear;
}

.user-name:hover {
  cursor: pointer;
  background: #F4F4F4;
}

.user-description {
  max-width: 100%;
  width: 100%;
  font-size: 14px;
  padding: 10px;
  border: 1px solid black;
}


.button{
  color: white;
  background: #f44336;
  border-radius: 10px;
  padding: 10px 40px;
  border: 2px solid #f44336;
  transition: 0.2s linear;
}

.button:hover{
  background: white;
  color: #f44336;
  cursor: pointer;
}

.delete-btn{
  margin: 5px auto;
}


.form_box{
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form_box input {
  width: 240px;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid black;
  padding: 12px;
}


@media (max-width: 600px){
  .main{
    padding: 0 10px;
  }
}

</style>