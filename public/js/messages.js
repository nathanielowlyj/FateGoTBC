// Nathaniel Low P2323428 DIT/FT/1B/05

document.addEventListener("DOMContentLoaded", function () { 

    const newMessageInput = document.getElementById("newMessage");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const editMessageList = document.getElementById("editMessageList");
    const userId = localStorage.getItem("userId");

    function getUsers() {
        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
    
            // Store user information in a map for easy lookup
            const usersMap = new Map();
            responseData.forEach(user => {
                usersMap.set(user.user_id, user.username);
            });
    
            console.log(usersMap);
            // Call the function to display messages after retrieving user information
            displayAllMsgs(usersMap);
            getAndDisplayMessagesByUserId(usersMap);
        };
    
        fetchMethod(currentUrl + "/api/users", callback);
    }
    
    function displayAllMsgs(usersMap) {
        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
    
            const messageList = document.getElementById("messageList");
            responseData.forEach((message) => {
                const userName = usersMap.get(message.user_id) 

                const displayItem = document.createElement("div");
                displayItem.className =
                    "col-3 p-3 ";
                displayItem.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">created by ${userName}</h5>
                            <p class="card-text">
                                message: ${message.message_text} <br>
                                created on: ${message.created_at} 
                            </p>
                        </div>
                    </div>
                    `;
                messageList.appendChild(displayItem);
            });
        };
    
        fetchMethod(currentUrl + "/api/message", callback);
    }
    
    function inputNewMessage() {
        function sendNewMessage(message) {
            const data = {
                user_id: userId,
                message_text: message
            };
    
            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

                // Refresh the page after sending the message
                location.reload();
            };
    
            fetchMethod(currentUrl + "/api/message", callback, 'POST', data);
        }

        warningCard.classList.add("d-none");
    
        const sendMessageButton = document.getElementById("sendMessageButton");
        sendMessageButton.addEventListener("click", function () {
            const message = newMessageInput.value.trim();
    
            if (message === "") {
                warningCard.classList.remove("d-none");
                warningText.innerText = "Please enter a message before sending.";
            } else {
                warningCard.classList.add("d-none");
                warningText.innerText = "";
    
                sendNewMessage(message);
            }
        });
    }

    window.editAndRefreshMessages = function (messageId,userId) {
        const updatedMessage = prompt("Enter the updated message:");
        
        if (updatedMessage !== null) {
            const data = {
                message_text: updatedMessage,
                user_id: userId
            };
    
            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
    
                // Refresh the page after editing the message
                location.reload();
            };
    
            fetchMethod(currentUrl + `/api/message/${messageId}`, callback, 'PUT', data);
        }
    }
    
    window.deleteAndRefreshMessages = function (messageId) {
        const confirmation = confirm("Are you sure you want to delete this message?");
    
        if (confirmation) {
            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
    
                // Refresh the page after deleting the message
                location.reload();
            };
    
            fetchMethod(currentUrl + `/api/message/${messageId}`, callback, 'DELETE');
        }
    }    

    function getAndDisplayMessagesByUserId(usersMap) {
        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            // Clear the existing content
            editMessageList.innerHTML = '';

            responseData.forEach((message) => {
                const userName = usersMap.get(message.user_id);
                const displayItem = document.createElement("div");
                displayItem.className = "col-3 p-3";
                displayItem.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">created by ${userName}</h5>
                            <p class="card-text">
                                message: ${message.message_text} <br>
                                created on: ${message.created_at} 
                            </p>
                            <button class="btn btn-danger" onclick="deleteAndRefreshMessages(${message.id})">Delete</button>
                            <button class="btn btn-primary" onclick="editAndRefreshMessages(${message.id},${userId})">Edit</button>
                        </div>
                    </div>
                `;
                editMessageList.appendChild(displayItem);
            });
        };

        fetchMethod(currentUrl + `/api/message/byUser/${userId}`, callback);
    }

    getUsers();
    inputNewMessage();
});
