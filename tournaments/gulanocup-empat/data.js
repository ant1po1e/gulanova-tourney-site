function createProfileCard(userId, displayName) {
    var profileCard = displayName == localStorage.getItem("username") ?
        `
            <a href="https://osu.ppy.sh/users/${userId}" class="ring-2 ring-gulanova ring-offset-2 ring-offset-cyan-950 text-white m-4 font-bold bg-gulanova text-xs p-2 rounded-md hover:bg-[#15575c] hover:scale-110 transition duration-300" target="_blank">
                <img class="w-28 h-28 mb-2 rounded" src="https://a.ppy.sh/${userId}" alt="${displayName}">
                <p class="truncate hover:overflow-visible hover:whitespace-normal bg-[#15575c] rounded-lg px-2 py-1 font-normal text-xs max-w-[7rem]">${displayName}</p>
            </a>
            ` :
        `
            <a href="https://osu.ppy.sh/users/${userId}" class="text-white m-4 bg-gulanova p-2 rounded-md hover:bg-[#15575c] hover:scale-110 transition duration-300" target="_blank">
                <img class="w-28 h-28 mb-2 rounded" src="https://a.ppy.sh/${userId}" alt="${displayName}">
                <p class="truncate hover:overflow-visible hover:whitespace-normal bg-[#15575c] rounded-lg px-2 py-1 font-normal text-xs max-w-[7rem]">${displayName}</p>
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
                        let modType = mappoolEntry.mod.replace(/\d+/g, '');

                        let modColorClass = '';
                        switch (modType) {
                            case 'RC':
                                modColorClass = 'bg-[#bfe1f6] text-[#0a53a8]';
                                break;
                            case 'LN':
                                modColorClass = 'bg-[#ffe5a0] text-[#943846]';
                                break;
                            case 'HB':
                                modColorClass = 'bg-[#d4edbc] text-[#11734b]';
                                break;
                            case 'SV':
                                modColorClass = 'bg-[#ffcfc9] text-[#c5293c]';
                                break;
                            case 'GM':
                                modColorClass = 'bg-[#e6cff2] text-[#633986]';
                                break;
                            case 'TB':
                                modColorClass = 'bg-[#3d3d3d] text-white';
                                break;
                            default:
                                modColorClass = 'bg-gray-600 text-white';
                                break;
                        }

                        const card = `
                        <div class="w-full md:w-1/2 p-2 hover:scale-105 transition duration-300">
                            <div class="max-w-sm rounded-lg shadow bg-gulanova border-4 border-gulanova m-4">
                                <a href="${mappoolEntry.link}" target="_blank">
                                    <img class="rounded-t-lg w-full h-32 object-cover" src="${mappoolEntry.cover}" alt="${mappoolEntry.map}" />
                                </a>
                                <div class="p-5">
                                    <h5 class="truncate mb-2 text-lg font-bold tracking-tight text-white">${mappoolEntry.artist} - ${mappoolEntry.map}</h5>
                                    <p class="mb-3 font-normal text-white">Mapped by: ${mappoolEntry.mapper}</p>
                                    <span class="inline-flex items-center px-3 py-2 text-sm font-bold rounded-lg ${modColorClass}">
                                        ${mappoolEntry.mod}
                                    </span>
                                </div>
                            </div>
                        </div>
                    `;
                        $('#mappool-body').append(card);
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