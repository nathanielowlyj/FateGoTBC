// Nathaniel Low P2323428 DIT/FT/1B/05

document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");

    const summoningButton = document.getElementById("summoningButton");
    const summonResultsContainer = document.getElementById("summonResults");

    summoningButton.addEventListener("click", function () {
        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            summonResultsContainer.className = "mx-auto col-3 mt-2";

            if (responseStatus == 400) {
                summonResultsContainer.style.backgroundColor = "#FFFFFF"; 
                summonResultsContainer.style.padding = "20px"; 
                summonResultsContainer.style.borderRadius = "10px";
                summonResultsContainer.style.fontSize = "25px";
                summonResultsContainer.innerHTML = `${responseData.message}`;
            } else if (responseStatus == 409) {
                summonResultsContainer.innerHTML = `
                    <div class="card">
                        <img src="https://static.atlasacademy.io/JP/CharaGraph/${responseData.img_id}/${responseData.img_id}b@2.png" class="card-img-top" alt="Servant Image">
                        <div class="card-body">
                            <p class="card-text text-center">
                                ${responseData.message} <br>
                                x3 Saint quartz has been refunded
                                Name: ${responseData.name} <br>
                                Class: ${responseData.class} <br>
                                Atk: ${responseData.atk} <br>
                                Hp: ${responseData.hp} <br>
                            </p>
                        </div>
                    </div>
                `;
            } else if (responseStatus == 200) {
                if (responseData) {
                    summonResultsContainer.innerHTML = "";
                    summonResultsContainer.innerHTML = `
                        <div class="card mt-2">
                            <img src="https://static.atlasacademy.io/JP/CharaGraph/${responseData.img_id}/${responseData.img_id}b@2.png" class="card-img-top" alt="Servant Image">
                            <div class="card-body">
                                <p class="card-text text-center">
                                    ${responseData.message} <br>
                                    Name: ${responseData.name} <br>
                                    Class: ${responseData.class} <br>
                                    Atk: ${responseData.atk} <br>
                                    Hp: ${responseData.hp} <br>
                                </p>
                            </div>
                        </div>
                    `;
                } else {
                    console.error("Response data is undefined.");
                }
            }
        };
        fetchMethod(currentUrl + `/api/summoning/${userId}`, callback, 'PUT');
    });
});
