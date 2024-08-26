// Nathaniel Low P2323428 DIT/FT/1B/05

document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const victoryCard = document.getElementById("victoryCard");
    const victoryText = document.getElementById("victoryText");
    const defeatCard = document.getElementById("defeatCard");
    const defeatText = document.getElementById("defeatText");

    function getOwnedServants(userId) {
        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
          
            const servantList = document.getElementById("ownedServant");
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
                              Servant Id: ${servant.servant_id} <br>
                              ATK: ${servant.atk} <br>
                              HP: ${servant.hp} <br>
                              Class: ${servant.class} <br>
                          </p>
                      </div>
                  </div>
                  `;
              servantList.appendChild(displayItem);
            });
          };
          
          fetchMethod(currentUrl + `/api/users/userServants/${userId}`, callback);
    }

    function getBosses() {
        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            const bossList = document.getElementById("bosses");
            responseData.forEach((boss) => {
              const displayItem = document.createElement("div");
              displayItem.className =
                "col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
              displayItem.innerHTML = `
                  <div class="card">
                      <img src="https://static.atlasacademy.io/JP/CharaGraph/${boss.img_id}/${boss.img_id}b@2.png" class="card-img-top" alt="Boss Image">
                      <div class="card-body">
                          <h5 class="card-title">${boss.name}</h5>
                          <p class="card-text">
                              Boss Id: ${boss.boss_id} <br>
                              ATK: ${boss.atk} <br>
                              HP: ${boss.hp} <br>
                              Class: ${boss.class} <br>
                          </p>
                      </div>
                  </div>
                  `;
              bossList.appendChild(displayItem);
            });
        }

        fetchMethod(currentUrl + `/api/bosses/`, callback);
    }

    function battle() {
        warningCard.classList.add("d-none");
        victoryCard.classList.add("d-none");
        defeatCard.classList.add("d-none");

        const servant_id = document.getElementById("servant_id").value || null;
        const boss_id = document.getElementById("boss_id").value || null;
    
        if (!servant_id || !boss_id) {
            // Display warning if either servant_id or boss_id is not filled
            warningCard.classList.remove("d-none");
            warningText.innerText = "Please fill in both Servant ID and Boss ID.";
            return;
        }
    
        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
    
            if (responseStatus == 409) {
                console.log("not successful");

                defeatCard.classList.remove("d-none");
                defeatText.innerHTML = `
                    Defeat! <br>
                    ${responseData.message}! <br>
                    tip: ${responseData.tip}
                `; 
            } else if (responseStatus == 201) {
                console.log("successful");
    
                // Display success card
                victoryCard.classList.remove("d-none");
                victoryText.innerHTML = `
                    Victory! <br>
                    ${responseData.message} <br>
                    You have obtained ${responseData.drops}
                `; 
            } else if (responseStatus == 400){
                warningCard.classList.remove("d-none");
                warningText.innerText = responseData.message;
            }
        };
    
        fetchMethod(currentUrl + `/api/bosses/${boss_id}/user/${userId}/servant/${servant_id}`, callback, 'PUT');
    }
    
    

    // Adding an event listener to the form
    const form = document.getElementById("battleForm"); 
    form.addEventListener("submit", function (event) {
        event.preventDefault(); 
        battle(); 
    });
    
    getOwnedServants(userId);
    getBosses();
})


