window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // Extract the 'code' parameter from URL
    const accessToken = localStorage.getItem('access_token');

    if (code) {
        // If there is an OAuth code, prioritize exchanging it for a new token
        try {
            const response = await axios.get(`https://gulanova-auth.vercel.app/api/osuAuth?code=${code}`);
            if (response.data.access_token) {
                localStorage.setItem("access_token", response.data.access_token);
                window.location.href = '/'; // Redirect to clear the URL and reload with new token
            }
        } catch (error) {
            console.error('Error during OAuth token exchange:', error);
        }
    } else if (accessToken) {
        // If there is an access token and no OAuth code, proceed with fetching user data
        const avatar = document.getElementById('avatar');
        
        
        const cachedAvatarUrl = localStorage.getItem('avatar_url');
        // avatar.parentElement.href = "/"
        try {
            if (cachedAvatarUrl) {
                avatar.src = cachedAvatarUrl; // Use cached avatar
            } else {
                const userData = await callOsuApi('/me/osu'); // Await the API call
                avatar.src = userData.avatar_url; // Set the avatar src
                localStorage.setItem('avatar_url', userData.avatar_url); // Cache the avatar URL and everything else
                localStorage.setItem("username", userData.username)
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
        }

        // disable enable login button
        const login = document.getElementById('login');
        const logout = document.getElementById('logout');
        login.classList.add("hidden");
        logout.classList.remove("hidden");

        // change username
        const username = document.getElementById('username');
        username.innerHTML = localStorage.getItem("username")


    } else {
        // If neither an access token nor code is present, handle login initiation here
        console.error('No access token or OAuth code found');
    }
};

function testistwo() {
    console.log(callOsuApi('/me/osu'))

}


function deb() {
    var string = window.location.href
    part = string.match(/code=(.*$)/)[1];
    console.log(part)
}


$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-scrolled");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});

$("#staff-btn").click(function () {
    $(".section").addClass("hidden");
    $("#staff").removeClass("hidden"); 
});

$("#player-btn").click(function () {
    $(".section").addClass("hidden"); 
    $("#player").removeClass("hidden"); 
});

$("#mappool-btn").click(function () {
    $(".section").addClass("hidden"); 
    $("#mappool").removeClass("hidden"); 
});

$("#match-btn").click(function () {
    $(".section").addClass("hidden");
    $("#match").removeClass("hidden"); 
});

$("#challonge-btn").click(function () {
    $(".section").addClass("hidden");
    $("#challonge").removeClass("hidden"); 
});

// function createProfileCard(userId, displayName) {
//     var profileCard = `
//         <a href="https://osu.ppy.sh/users/${userId}" class="text-white m-4 font-bold bg-gulanova p-2 rounded-md hover:scale-110 transition duration-300">
//             <img class="w-20 h-20 rounded" src="https://a.ppy.sh/${userId}" alt="Large avatar">
//             ${displayName}
//         </a>
//     `;
//     return profileCard;
// }

// //placeholders
// $("#profile-host").append(createProfileCard("12424909", "Revv-"));
// $("#profile-host").append(createProfileCard("11184912", "danar"));
// $("#profile-sponsor").append(createProfileCard("12424909", "Revv-"));
// $("#profile-sponsor").append(createProfileCard("11184912", "danar"));



// $("#profile-player").append(createProfileCard("11184912", "danar"));
// $("#profile-player").append(createProfileCard("11184912", "danar"));
// $("#profile-player").append(createProfileCard("11184912", "danar"));
// $("#profile-player").append(createProfileCard("11184912", "danar"));
// $("#profile-player").append(createProfileCard("11184912", "danar"));
// $("#profile-player").append(createProfileCard("11184912", "danar"));
// $("#profile-player").append(createProfileCard("11184912", "danar"));
// $("#profile-player").append(createProfileCard("11184912", "danar"));
// $("#profile-player").append(createProfileCard("11184912", "danar"));
// $("#profile-player").append(createProfileCard("11184912", "danar"));

$(document).ready(function () {
    // Placeholder for stages API
    const stages = [
        { id: 'qualifiers', name: 'Qualifiers' },
        { id: 'ro64', name: 'Round of 64' },
        { id: 'ro32', name: 'Round of 32' },
        { id: 'ro16', name: 'Round of 16' },
        { id: 'quarterfinals', name: 'Quarterfinals' },
        { id: 'semifinals', name: 'Semifinals' },
        { id: 'finals', name: 'Finals' },
        { id: 'grandfinals', name: 'Grandfinals' },
    ];

    // Function to load stages in dropdown
    function loadStages() {
        stages.forEach(stage => {
            $('#stage-map-select').append(new Option(stage.name, stage.id));
        });
    }

    // Function to load schedule for selected stage (API example)
    function loadMappool(stageId) {
        // Sample data, replace with actual API call
        const mappool = {
            qualifiers: [
                { mapTitle: 'Tagatame [Lining up what was taken]', artist:'TK from Ling tosite sigure', mapper:'Antipole', mod:'HB1', link:'https://osu.ppy.sh/beatmapsets/2203071#mania/4663017'},
                { mapTitle: 'Tagatame [Lining up what was taken]', artist:'TK from Ling tosite sigure', mapper:'Antipole', mod:'HB1', link:'https://osu.ppy.sh/beatmapsets/2203071#mania/4663017'},
                { mapTitle: 'Tagatame [Lining up what was taken]', artist:'TK from Ling tosite sigure', mapper:'Antipole', mod:'HB1', link:'https://osu.ppy.sh/beatmapsets/2203071#mania/4663017'},
                { mapTitle: 'Tagatame [Lining up what was taken]', artist:'TK from Ling tosite sigure', mapper:'Antipole', mod:'HB1', link:'https://osu.ppy.sh/beatmapsets/2203071#mania/4663017'},
            ],
            ro64: [
                { mapTitle: 'Triumph & Regret [Regret]', artist:'typeMars', mapper:'[ A v a l o n ]', mod:'RC1', link:'https://osu.ppy.sh/beatmapsets/347650#mania/767046'},
                { mapTitle: 'Triumph & Regret [Regret]', artist:'typeMars', mapper:'[ A v a l o n ]', mod:'RC1', link:'https://osu.ppy.sh/beatmapsets/347650#mania/767046'},
                { mapTitle: 'Triumph & Regret [Regret]', artist:'typeMars', mapper:'[ A v a l o n ]', mod:'RC1', link:'https://osu.ppy.sh/beatmapsets/347650#mania/767046'},
                { mapTitle: 'Triumph & Regret [Regret]', artist:'typeMars', mapper:'[ A v a l o n ]', mod:'RC1', link:'https://osu.ppy.sh/beatmapsets/347650#mania/767046'},
            ]
        };

        // Clear existing table rows
        $('#mappool-body').empty();

        // Add new rows
        if (mappool[stageId]) {
            mappool[stageId].forEach(mappool => {
                const row = `
                    <tr class="border-b bg-gray-800 border-gray-700">
                        <td class="px-3 py-2 md:px-6 md:py-4">${mappool.mapTitle}</td>
                        <td class="px-3 py-2 md:px-6 md:py-4">${mappool.artist}</td>
                        <td class="px-3 py-2 md:px-6 md:py-4">${mappool.mapper}</td>
                        <td class="px-3 py-2 md:px-6 md:py-4">${mappool.mod}</td>
                        <td class="px-3 py-2 md:px-6 md:py-4 text-blue-600"><a href="${mappool.link}" target="_blank">click</a></td>
                    </tr>
                `;
                $('#mappool-body').append(row);
            });
        }
    }

    // Load stages into the dropdown
    loadStages();

    // Load schedule when a stage is selected
    $('#stage-map-select').change(function () {
        const stageId = $(this).val();
        loadMappool(stageId);
    });

    // Load the default stage (e.g., Qualifiers) on page load
    loadMappool('qualifiers');
});


$(document).ready(function () {
    // Placeholder for stages API
    const stages = [
        { id: 'qualifiers', name: 'Qualifiers' },
        { id: 'ro64', name: 'Round of 64' },
        { id: 'ro32', name: 'Round of 32' },
        { id: 'ro16', name: 'Round of 16' },
        { id: 'quarterfinals', name: 'Quarterfinals' },
        { id: 'semifinals', name: 'Semifinals' },
        { id: 'finals', name: 'Finals' },
        { id: 'grandfinals', name: 'Grandfinals' },
    ];

    // Function to load stages in dropdown
    function loadStages() {
        stages.forEach(stage => {
            $('#stage-select').append(new Option(stage.name, stage.id));
        });
    }

    // Function to load schedule for selected stage (API example)
    function loadSchedule(stageId) {
        // Sample data, replace with actual API call
        const schedules = {
            qualifiers: [
                { date: '12 July 2024', time: '12:00', referee: 'ElinLYPK', player: "jakads", mpLink: '#' },
                { date: '13 July 2024', time: '10:00', referee: 'Reihynn', player: 'dressurf', mpLink: '#' }
                // More rows...
            ],
            ro64: [
                { date: '20 July 2024', time: '14:00', referee: 'IDK', player: 'mrekk', mpLink: '#' }
                // More rows...
            ]
        };

        // Clear existing table rows
        $('#schedule-body').empty();

        // Add new rows
        if (schedules[stageId]) {
            schedules[stageId].forEach(schedule => {
                const row = `
                    <tr class="border-b bg-gray-800 border-gray-700">
                        <td class="px-3 py-2 md:px-6 md:py-4">${schedule.date}</td>
                        <td class="px-3 py-2 md:px-6 md:py-4">${schedule.time}</td>
                        <td class="px-3 py-2 md:px-6 md:py-4">${schedule.referee}</td>
                        <td class="px-3 py-2 md:px-6 md:py-4">${schedule.player}</td>
                        <td class="px-3 py-2 md:px-6 md:py-4 text-blue-600"><a class="underline" href="${schedule.mpLink}" target="_blank">click</a></td>
                    </tr>
                `;
                $('#schedule-body').append(row);
            });
        }
    }

    // Load stages into the dropdown
    loadStages();

    // Load schedule when a stage is selected
    $('#stage-select').change(function () {
        const stageId = $(this).val();
        loadSchedule(stageId);
    });

    // Load the default stage (e.g., Qualifiers) on page load
    loadSchedule('qualifiers');
});
