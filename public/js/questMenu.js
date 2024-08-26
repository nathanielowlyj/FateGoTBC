// Nathaniel Low P2323428 DIT/FT/1B/05

document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");
    const questMenu = document.getElementById("questMenu");

    function filterCompletedTasks() {
        function retrieveAllQuests() {
            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

                const allQuests = responseData;

                // After retrieving all quests, retrieve completed quests
                retrieveAllCompletedQuests(allQuests);
            };
            fetchMethod(currentUrl + "/api/quest", callback);
        }

        function retrieveAllCompletedQuests(allQuests) {
            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

                const completedQuests = responseData;

                // Filter quests that are not completed
                const incompleteQuests = allQuests.filter(quest => 
                    !completedQuests.some(completedQuest => completedQuest.quest_id === quest.quest_id)
                );

                // Display the incomplete quests
                displayIncompleteQuests(incompleteQuests);
            };
            fetchMethod(currentUrl + `/api/questProgress/byUser/${userId}`, callback);
        }

        function displayIncompleteQuests(incompleteQuests) {
            incompleteQuests.forEach((quest) => {
                const displayItem = document.createElement("div");
                displayItem.className = "col-12 p-3 mx-auto";

                displayItem.innerHTML = `
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">${quest.title}</h5>
                            <p class="card-text">
                                Obtain x1 ${quest.requirements} <br>
                                Rewards: x${quest.saint_quartz} saint quartz <br>
                            </p>
                            <button class="btn btn-primary mx-auto claim-button">Claim Rewards</button>
                        </div>
                    </div>
                `;

                questMenu.appendChild(displayItem);

                const claimButton = displayItem.querySelector(".claim-button");
                claimButton.addEventListener("click", () => {
                    claimRewards(quest.quest_id,quest.requirements);
                });
            });
        }

        function claimRewards(questId,requirements) {
            console.log(`Claiming rewards for quest with ID: ${questId}`);

            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

                location.reload();
            };

            const data = {
                quest_id: questId,
                user_id: parseInt(userId, 10),
                requirements: requirements
            };

            fetchMethod(currentUrl + `/api/questProgress/`, callback, 'POST', data);
        }

        retrieveAllQuests();
    }

    filterCompletedTasks();
});
