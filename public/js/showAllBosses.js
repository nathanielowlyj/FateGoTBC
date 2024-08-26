// Nathaniel Low P2323428 DIT/FT/1B/05

const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const bossList = document.getElementById("bossList");
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
                      ATK: ${boss.atk} <br>
                      HP: ${boss.hp} <br>
                      Class: ${boss.class} <br>
                  </p>
              </div>
          </div>
          `;
      bossList.appendChild(displayItem);
    });
  };
  
  fetchMethod(currentUrl + "/api/bosses", callback);
  