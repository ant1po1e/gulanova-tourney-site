function createProfileCard(userId, displayName) {
    const isCurrentUser = displayName === localStorage.getItem("username");
    const profileCard = `
        <a href="https://osu.ppy.sh/users/${userId}"
                class="flex flex-col items-center bg-gradient-to-br from-[#4a76b8] to-[#2c4f8a] m-4 p-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 border border-[#729dd8]/30 ${isCurrentUser ? 'ring-2 ring-gulanova ring-offset-2 ring-offset-gulanovaDark' : ''}"
                target="_blank">

                <!-- User Avatar with Decorative Border -->
                <div class="relative mb-3">
                    <div
                        class="absolute inset-0 bg-gradient-to-tr from-[#9BC4FF] to-[#517fc1] rounded-full blur-sm -z-10">
                    </div>
                    <img class="w-28 h-28 rounded-full object-cover border-2 border-[#9BC4FF]"
                        src="https://a.ppy.sh/${userId}" alt="${displayName}" loading="lazy">
                </div>

                <!-- Username Display -->
                <div class="bg-[#153561] backdrop-blur-sm rounded-lg px-3 py-2 w-full text-center">
                    <p class="text-white font-medium text-sm truncate hover:overflow-visible hover:whitespace-normal">
                        ${displayName}
                    </p>
                </div>

                <!-- Subtle Indicator for Current User -->
                ${isCurrentUser ? '<div class="mt-2 text-xs text-[#9BC4FF] font-bold">• YOU •</div>' : ''}
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
                            <a href="${mappoolEntry.link}" class="w-full p-2 group hover:scale-105 transition-all duration-300 ease-out" target="_blank">
                                <div class="rounded-xl overflow-hidden backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl">
                                    <!-- Image Container -->
                                    <div class="relative h-40 w-full">
                                        <!-- Background Image -->
                                        <img class="h-full w-full object-cover" src="${mappoolEntry.cover}" alt="${mappoolEntry.map} " loading="lazy"/>
                                        
                                        <!-- Glass Effect Overlay -->
                                        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#3166a7]/80 backdrop-blur-sm transition-all duration-300 group-hover:backdrop-blur-none">
                                            <!-- Content Container -->
                                            <div class="flex items-center h-full p-4 gap-3">
                                                <!-- Mod Badge -->
                                                <span class="flex-shrink-0 px-3 py-2 text-sm font-bold ${modColorClass} rounded-lg shadow-md">
                                                    ${mappoolEntry.mod}
                                                </span>
                                                
                                                <!-- Map Details -->
                                                <div class="text-white text-start">
                                                    <div class="flex items-center">
                                                        <p class="text-base md:text-lg font-bold line-clamp-1">${mappoolEntry.map}</p>
                                                        <span class="inline-flex items-center rounded-md bg-yellow-200 px-2 py-1 ml-2 text-xs font-medium text-yellow-800 ${customMap}">Custom</span>
                                                    </div>
                                                    <p class="text-xs md:text-sm my-1 opacity-90 line-clamp-1">${mappoolEntry.artist}</p>
                                                    <p class="text-xs md:text-sm text-[#9BC4FF] line-clamp-1">Mapped by ${mappoolEntry.mapper}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <!-- Subtle Border Gradient -->
                                        <div class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#517fc1] via-[#9BC4FF] to-[#517fc1] group-hover:opacity-100 opacity-70 transition-opacity duration-300"></div>
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
                            <tr class="border-b border-white/20 hover:bg-white/20 transition duration-300">
                                <td class="px-4 py-3">${scheduleEntry.date}</td>
                                <td class="px-4 py-3">${scheduleEntry.time}</td>
                                <td class="px-4 py-3">${scheduleEntry.referee}</td>
                                <td class="px-4 py-3">
                                    <span class="text-white font-semibold">${scheduleEntry.player_one}</span> vs <span class="text-white font-semibold">${scheduleEntry.player_two}</span>
                                </td>
                                <td class="px-4 py-3">
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
                    const alignmentClass = isLeftAligned ? "md:items-end md:text-left md:pl-14" : "md:items-start md:text-right md:pr-14";
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