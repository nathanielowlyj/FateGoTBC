// Nathaniel Low P2323428 DIT/FT/1B/05

document.addEventListener("DOMContentLoaded", function () { 
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
        const servantList = document.getElementById("servantList");
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
        servantList.appendChild(displayItem);
      });
    };
    
    fetchMethod(currentUrl + "/api/servants", callback);
})

  