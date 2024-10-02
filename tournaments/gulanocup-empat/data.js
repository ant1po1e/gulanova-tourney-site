function createProfileCard(userId, displayName) {
    var profileCard = displayName == localStorage.getItem("username") ? 
    `
<a href="https://osu.ppy.sh/users/${userId}" class="ring-2 ring-gulanova ring-offset-2 ring-offset-cyan-950 text-white m-4 font-bold bg-gulanova text-xs p-2 rounded-md hover:scale-110 transition duration-300" target="_blank">
    <img class="w-20 h-20 rounded" src="https://a.ppy.sh/${userId}" alt="${displayName}">
    ${displayName}
</a>
`
:
`
<a href="https://osu.ppy.sh/users/${userId}" class="text-white m-4 font-bold bg-gulanova text-xs p-2 rounded-md hover:scale-110 transition duration-300" target="_blank">
    <img class="w-20 h-20 rounded" src="https://a.ppy.sh/${userId}" alt="${displayName}">
    ${displayName}
</a>
`;
    return profileCard;
}

fetch('json/users-data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(row => {
            const userId = row.userId;
            const username = row.username;
            const roles = row.role;

            if (!roles) {
                document.getElementById('profile-player').innerHTML += createProfileCard(userId, username);
                return;
            }

            const roleList = roles.split(',').map(role => role.trim().toLowerCase());

            roleList.forEach(role => {
                switch (role) {
                    case 'host':
                        document.getElementById('profile-host').innerHTML += createProfileCard(userId, username);
                        break;
                    case 'sheeter':
                        document.getElementById('profile-sheeter').innerHTML += createProfileCard(userId, username);
                        break;
                    case 'mappooler':
                        document.getElementById('profile-mappooler').innerHTML += createProfileCard(userId, username);
                        break;
                    case 'mapper':
                        document.getElementById('profile-mapper').innerHTML += createProfileCard(userId, username);
                        break;
                    case 'playtester':
                        document.getElementById('profile-playtester').innerHTML += createProfileCard(userId, username);
                        break;
                    case 'referee':
                        document.getElementById('profile-referee').innerHTML += createProfileCard(userId, username);
                        break;
                    case 'streamer':
                        document.getElementById('profile-streamer').innerHTML += createProfileCard(userId, username);
                        break;
                    case 'commentator':
                        document.getElementById('profile-commentator').innerHTML += createProfileCard(userId, username);
                        break;
                    case 'gfx':
                        document.getElementById('profile-gfx').innerHTML += createProfileCard(userId, username);
                        break;
                    case 'player':
                        document.getElementById('profile-player').innerHTML += createProfileCard(userId, username);
                        break;
                    default:
                        console.warn(`Role tidak dikenali: ${role} untuk user ${username}`);
                }
            });
        });
    })
    .catch(error => console.error('Error fetching data:', error));


$(document).ready(function () {
    function loadStages() {
        fetch('json/stages.json')
            .then(response => response.json())
            .then(stages => {
                stages.forEach(stage => {
                    $('#stage-map-select').append(new Option(stage.name, stage.id));
                });
            })
            .catch(error => console.error('Error fetching stages:', error));
    }

    function loadMappool(stageId) {
        fetch('json/mappool.json')
            .then(response => response.json())
            .then(mappool => {
                $('#mappool-body').empty();

                if (mappool[stageId]) {
                    mappool[stageId].forEach(mappoolEntry => {
                        const row = `
                    <tr class="border-b bg-gray-800 border-gray-700">
                        <td class="px-1.5 py-2 md:px-2 md:py-3"><a href="${mappoolEntry.link}" target="_blank"><img class="hover:scale-105 transition duration-300" src="${mappoolEntry.cover}"></a></td>
                        <td class="px-1.5 py-2 md:px-6 md:py-3">${mappoolEntry.map}</td>
                        <td class="px-1.5 py-2 md:px-6 md:py-3">${mappoolEntry.artist}</td>
                        <td class="px-1.5 py-2 md:px-6 md:py-3">${mappoolEntry.mapper}</td>
                        <td class="px-1.5 py-2 md:px-6 md:py-3">${mappoolEntry.mod}</td>
                    </tr>
                `;
                        $('#mappool-body').append(row);
                    });
                }
            })
            .catch(error => console.error('Error fetching mappool:', error));
    }

    loadStages();

    $('#stage-map-select').change(function () {
        const stageId = $(this).val();
        loadMappool(stageId);
    });

    loadMappool('qualifiers');

});

$(document).ready(function () {
    function loadStages() {
        fetch('json/stages.json')
            .then(response => response.json())
            .then(stages => {
                stages.forEach(stage => {
                    $('#stage-match-select').append(new Option(stage.name, stage.id));
                });
            })
            .catch(error => console.error('Error fetching stages:', error));
    }

    function loadSchedule(stageId) {
        fetch('json/match.json')
            .then(response => response.json())
            .then(schedule => {
                $('#schedule-body').empty();

                if (schedule[stageId]) {
                    schedule[stageId].forEach(scheduleEntry => {
                        const row = `
                    <tr class="border-b bg-gray-800 border-gray-700">
                        <td class="px-1.5 py-2 md:px-6 md:py-4">${scheduleEntry.date}</td>
                        <td class="px-1.5 py-2 md:px-6 md:py-4">${scheduleEntry.time}</td>
                        <td class="px-1.5 py-2 md:px-6 md:py-4">${scheduleEntry.referee}</td>
                        <td class="px-1.5 py-2 md:px-6 md:py-4">${scheduleEntry.player_one} vs ${scheduleEntry.player_two}</td>
                        <td class="px-1.5 py-2 md:px-6 md:py-4">
                            <a class="py-1.5 px-3 text-white rounded-lg bg-gulanova hover:bg-gulanovaDark transition duration-300" href="${scheduleEntry.link}" target="_blank">Link</a>
                        </td>
                    </tr>
                `;
                        $('#schedule-body').append(row);
                    });
                }
            })
            .catch(error => console.error('Error fetching match:', error));
    }

    loadStages();

    $('#stage-match-select').change(function () {
        const stageId = $(this).val();
        loadSchedule(stageId);
    });

    loadSchedule('qualifiers');
});