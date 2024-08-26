// Nathaniel Low P2323428 DIT/FT/1B/05

document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
        const playerList = document.getElementById("playerList");
        console.log(responseData);
        responseData.forEach((user) => {
            const displayItem = document.createElement("div");
            displayItem.className =
                "col-xl-4 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body" style="text-align: center;>
                        <h5 class="card-title">${user.username}</h5>
                        <p class="card-text">
                            Saint quartz: ${user.saint_quartz}
                        </p>
                    </div>
                </div>
                `;
            playerList.appendChild(displayItem);
        });
    };
  
    fetchMethod(currentUrl + "/api/users", callback);
});