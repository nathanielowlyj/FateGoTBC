// Nathaniel Low P2323428 DIT/FT/1B/05

document.addEventListener("DOMContentLoaded", function () {
    function inventory() {
        const userId = localStorage.getItem("userId");

        const callback = (responseStatus, responseData) => {

            const inventory = document.getElementById("inventory");
            const img_id = [6001, 6003, 6002, 6005, 6004, 6006, 6007, 6544, 6555, 6545, 6];

            inventory.innerHTML = `
            <div class="card">
                <div class="card-body" style="text-align: center;">
                    <h1 class="card-title">Inventory</h1>
                </div>
            </div>
            `;

            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            let i = 0; // Initialize i here
            for (const itemName in responseData) {
                // Skip non-item properties like "user_id", "username", etc.
                if (!responseData.hasOwnProperty(itemName) || itemName === "user_id" || itemName === "username") {
                    continue;
                }
                const itemQuantity = responseData[itemName];

                const displayItem = document.createElement("div");
                displayItem.className =
                    "col-2 p-3";
                displayItem.innerHTML = `
                    <div class="card">
                    <img src="https://static.atlasacademy.io/JP/Items/${img_id[i++]}.png"
                    class="card-img-top" alt="Item Image">
                        <div class="card-body" style="text-align: center;">
                            <p class="card-text">
                                ${itemName}: ${itemQuantity}
                            </p>
                        </div>
                    </div>
                `;
                inventory.appendChild(displayItem);
            }
        };

        fetchMethod(currentUrl + `/api/users/${userId}`, callback);
    }

    function servantsOwned() {
        const userId = localStorage.getItem("userId");
    
        const callback = (responseStatus, responseData) => {
    
            const inventory = document.getElementById("servantsOwned");
    
            inventory.innerHTML = `
                <div class="card">
                    <div class="card-body" style="text-align: center;">
                        <h1 class="card-title">Servants Owned</h1>
                    </div>
                </div>
            `;
    
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
    
            responseData.forEach((servant) => {
                const displayItem = document.createElement("div");
                displayItem.className =
                    "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
                displayItem.innerHTML = `
                    <div class="card">
                        <img src="https://static.atlasacademy.io/JP/CharaGraph/${servant.img_id}/${servant.img_id}b@2.png" class="card-img-top" alt="Servant Image">
                        <div class="card-body">
                            <h5 class="card-title">${servant.servant_name}</h5>
                            <p class="card-text">
                                ATK: ${servant.atk} <br>
                                HP: ${servant.hp} <br>
                                Class: ${servant.class} <br>
                            </p>
                        </div>
                    </div>
                `;
                inventory.appendChild(displayItem);
            });
        };
    
        fetchMethod(currentUrl + `/api/users/userServants/${userId}`, callback);
    }    

    function completedQuests() {
        const userId = localStorage.getItem("userId");
    
        const callback = (responseStatus, responseData) => {
    
            const completedQuests = document.getElementById("completedQuests");
    
            completedQuests.innerHTML = `
                <div class="card">
                    <div class="card-body" style="text-align: center;">
                        <h1 class="card-title">Quests Completed</h1>
                    </div>
                </div>
            `;
    
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            if (responseStatus == 200) {
                responseData.forEach((quest) => {
                    const displayItem = document.createElement("div");
                    displayItem.className =
                        "col-12 p-3 text-center";
                    displayItem.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">obtain x1 ${quest.requirements}</h5>
                                <p class="card-text">
                                    completion date: ${quest.completion_date}
                                </p>
                            </div>
                        </div>
                    `;
                    completedQuests.appendChild(displayItem);
                });
            } else if (responseStatus == 404) {
                completedQuests.innerHTML = `
                <div class="card">
                    <div class="card-body" style="text-align: center;">
                        <h1 class="card-title">${responseData.message}</h1>
                    </div>
                </div>
            `;
            }

        };
    
        fetchMethod(currentUrl + `/api/users/completedQuests/${userId}`, callback);
    }    
    inventory();
    servantsOwned();
    completedQuests() 
});