function createProfileCard(userId, displayName) {
    var profileCard = `
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
    // Function to load stages in dropdown
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

    // Function to load mappool for selected stage (using JSON)
    function loadMappool(stageId) {
        fetch('json/mappool.json')
            .then(response => response.json())
            .then(mappool => {
                // Clear existing table rows
                $('#mappool-body').empty();

                // Add new rows if mappool exists for the selected stage
                if (mappool[stageId]) {
                    mappool[stageId].forEach(mappoolEntry => {
                        const row = `
                    <tr class="border-b bg-gray-800 border-gray-700">
                        <td class="px-3 py-2 md:px-6 md:py-4">${mappoolEntry.map}</td>
                        <td class="px-3 py-2 md:px-6 md:py-4">${mappoolEntry.artist}</td>
                        <td class="px-3 py-2 md:px-6 md:py-4">${mappoolEntry.mapper}</td>
                        <td class="px-3 py-2 md:px-6 md:py-4">${mappoolEntry.mod}</td>
                        <td class="px-3 py-2 md:px-6 md:py-4 text-blue-600">
                            <a href="${mappoolEntry.link}" target="_blank">click</a>
                        </td>
                    </tr>
                `;
                        $('#mappool-body').append(row);
                    });
                }
            })
            .catch(error => console.error('Error fetching mappool:', error));
    }

    // Load stages into the dropdown
    loadStages();

    // Load mappool when a stage is selected
    $('#stage-map-select').change(function () {
        const stageId = $(this).val();
        loadMappool(stageId);
    });

    // Load the default stage (e.g., Qualifiers) on page load
    loadMappool('qualifiers');
});
