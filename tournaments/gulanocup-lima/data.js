function createProfileCard(userId, displayName) {
    const isCurrentUser = displayName === localStorage.getItem("username");
    const profileCard = `
        <a href="https://osu.ppy.sh/users/${userId}" class="text-white m-4 ${isCurrentUser ? 'ring-2 ring-gulanova ring-offset-2 ring-offset-cyan-950 font-bold' : ''} bg-gulanova text-xs p-2 rounded-md hover:bg-[#15575c] hover:scale-110 transition duration-300" target="_blank">
            <img class="w-28 h-28 mb-2 rounded" src="https://a.ppy.sh/${userId}" alt="${displayName}">
            <p class="truncate hover:overflow-visible hover:whitespace-normal bg-[#15575c] rounded-lg px-2 py-1 font-normal text-xs max-w-[7rem]">${displayName}</p>
        </a>
    `;
    return profileCard;
}

function appendProfileCard(role, userId, username) {
    const roleMap = {
        host: 'profile-host',
        organizer: 'profile-organizer',
        sheeter: 'profile-sheeter',
        mappooler: 'profile-mappooler',
        mapper: 'profile-mapper',
        playtester: 'profile-playtester',
        referee: 'profile-referee',
        streamer: 'profile-streamer',
        commentator: 'profile-commentator',
        gfx: 'profile-gfx',
        programmer: 'profile-programmer',
        player: 'profile-player'
    };

    const elementId = roleMap[role];
    if (elementId) {
        document.getElementById(elementId).innerHTML += createProfileCard(userId, username);
    } else {
        console.warn(`Role tidak dikenali: ${role} untuk user ${username}`);
    }
}

fetch('json/users-data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(row => {
            const {
                userId,
                username,
                role
            } = row;
            if (!role) {
                document.getElementById('profile-player').innerHTML += createProfileCard(userId, username);
                return;
            }

            role.split(',').map(role => role.trim().toLowerCase()).forEach(role => appendProfileCard(role, userId, username));
        });
    })
    .catch(error => console.error('Error fetching data:', error));

$(document).ready(function () {
    function loadStages(selectId) {
        fetch('json/stages.json')
            .then(response => response.json())
            .then(stages => {
                stages.forEach(stage => {
                    $(`#${selectId}`).append(new Option(stage.name, stage.id));
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
                        const modType = mappoolEntry.mod.replace(/\d+/g, '');
                        const modColorClassMap = {
                            RC: 'bg-[#bfe1f6] text-[#0a53a8]',
                            LN: 'bg-[#ffe5a0] text-[#943846]',
                            HB: 'bg-[#d4edbc] text-[#11734b]',
                            SV: 'bg-[#ffcfc9] text-[#b10202]',
                            GM: 'bg-[#e6cff2] text-[#633986]',
                            TB: 'bg-[#3d3d3d] text-white'
                        };
                        const modColorClass = modColorClassMap[modType] || 'bg-gray-600 text-white';
                        const customMap = mappoolEntry.custom === "TRUE" ? '' : 'hidden';

                        const card = `
                            <a href="${mappoolEntry.link}" class="w-full p-2 group hover:scale-105 transition duration-300" target="_blank">
                                <div class="rounded-lg shadow border-2 bg-gulanova border-gulanova group-hover:bg-gulanovaDark group-hover:border-white transition duration-300">
                                    <div class="relative overflow-hidden rounded-lg bg-gulanovaDark shadow-lg">
                                        <img class="h-32 w-full object-cover" src="${mappoolEntry.cover}" alt="${mappoolEntry.map}" />
                                        <div class="absolute inset-0 bg-black bg-opacity-70 flex items-center gap-4 px-4 group-hover:bg-opacity-35 transition duration-300">
                                            <span class="flex-shrink-0 px-3 py-1 text-sm font-bold ${modColorClass} rounded-lg">
                                                ${mappoolEntry.mod}
                                            </span>
                                            <div class="text-white text-start">
                                                <p class="text-base md:text-lg my-1 font-bold line-clamp-1">${mappoolEntry.map} <span class="inline-flex items-center rounded-md bg-yellow-200 px-2 py-1 ml-2 text-xs font-medium text-yellow-800 ${customMap}">Custom</span></p>
                                                <p class="text-xs md:text-sm my-1 line-clamp-1">${mappoolEntry.artist}</p>
                                                <p class="text-xs md:text-sm my-1 line-clamp-1">Mapped by ${mappoolEntry.mapper}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        `;
                        $('#mappool-body').append(card);
                    });
                }
            })
            .catch(error => console.error('Error fetching mappool:', error));
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
                                <td class="px-1.5 py-2 md:px-6 md:py-4"><span class="text-white font-semibold">${scheduleEntry.player_one}</span> vs <span class="text-white font-semibold">${scheduleEntry.player_two}</span></td>
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

    function loadTimeline() {
        fetch('json/timeline.json')
            .then(response => response.json())
            .then(timeline => {
                const timelineContainer = document.querySelector("#timeline ol");
                timelineContainer.innerHTML = "";
                timeline.forEach((entry, index) => {
                    const isLeftAligned = index % 2 === 0;
                    const alignmentClass = isLeftAligned ? "md:items-end md:text-left md:pl-24" : "md:items-start md:text-right md:pr-24";
                    const timelineItem = `
                        <li class="mb-14 flex flex-col ${alignmentClass} relative md:mb-20">
                            <div class="absolute w-10 h-10 bg-white border-[10px] border-black rounded-full md:start-1/2 transform -translate-x-1/2 md:w-16 md:h-16 md:border-[20px]"></div>
                            <div class="ml-10 md:ml-0 md:w-1/2">
                                <h3 class="text-lg font-semibold text-white md:text-3xl">${entry.stage}</h3>
                                <time class="mb-1 text-sm font-normal leading-none text-[#51f1ff] md:text-lg">${entry.date}</time>
                            </div>
                        </li>
                    `;
                    timelineContainer.insertAdjacentHTML("beforeend", timelineItem);
                });
            })
            .catch(error => console.error('Error fetching timeline:', error));
    }

    loadStages('stage-map-select');
    loadStages('stage-match-select');

    $('#stage-map-select').change(function () {
        loadMappool($(this).val());
    });

    $('#stage-match-select').change(function () {
        loadSchedule($(this).val());
    });

    loadMappool('qualifiers');
    loadSchedule('qualifiers');
    loadTimeline();
});