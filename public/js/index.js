$(document).ready(function () {
    initStatesDropdown();
});

function initStatesDropdown() {

    fetch('http://localhost:3000/api/states')
        .then((response) => {
            return response.json()
        })
        .then((states) => {
            let html = '';

            states.map((x, i) => {
                html += `<li key=${i}>${x}</li>`
            })

            $(".dropdown-menu").append(html);

            initDropdownEvent();
        })

}

function initDropdownEvent() {

    let currentIndex = -1;

    const dropdownSearch = $(".dropdown-search");
    const dropdownMenu = $(".dropdown-menu");
    const dropdownMenuItems = $(".dropdown-menu li").toArray();

    // show dropdown-menu
    $(dropdownSearch).on('click', () => {
        $(dropdownMenu).show();
        currentIndex = -1;
    })

    // handle dropdown-search input
    $(dropdownSearch).on('input', () => {
        $(dropdownMenu).show();

        dropdownMenuItems.forEach(item => {
            $(item).removeClass("active");
        });

        currentIndex = -1;

        const filter = dropdownSearch.val();
        let isMatch = false;

        dropdownMenuItems.forEach(item => {
            if (item.innerText.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
                $(item).css('display', '');
                isMatch = true;
            } else {
                $(item).css('display', 'none');
            }
        })

        if (!isMatch) {
            if ($("#dropdown-search-no-match").length) return;
            $(".dropdown-menu").append(`<span id="dropdown-search-no-match">No matches found.</span>`);
        } else {
            $("#dropdown-search-no-match").remove();
        }

        currentIndex = -1;
    })

    // handle ArrowDown & ArrowUp
    $(document).on('keydown', (e) => {
        if ($(".dropdown-search").is(":focus")) {

            const dropdownMenuItems = $(".dropdown-menu li:visible").toArray();

            if (e.key == "ArrowDown") {
                e.preventDefault();
                if (currentIndex < dropdownMenuItems.length - 1) {
                    currentIndex++;
                    dropdownMenuItems[currentIndex].className = "active";
                    $(".dropdown-search").val(dropdownMenuItems[currentIndex].innerText);
                }
            } else if (e.key == "ArrowUp") {
                e.preventDefault();
                if (currentIndex > 0) {
                    currentIndex--;
                    dropdownMenuItems[currentIndex].className = "active";
                    $(".dropdown-search").val(dropdownMenuItems[currentIndex].innerText);
                }
            } else if (e.key == "Enter") {
                $(dropdownMenu).hide();
            }

            const restItems = [...dropdownMenuItems]
            restItems.splice(currentIndex, 1);
            restItems.forEach(item => {
                $(item).removeClass("active");
            })
        }
    })

    // hide dropdown-menu when click outside dropdown-menu
    $(document).on('click', (e) => {
        const container = $(".dropdown");
        if (!container.is(e.target) && container.has(e.target).length == 0) {
            $(dropdownMenu).hide();
        }
    })

    // select item
    dropdownMenuItems.forEach((item) => {
        $(item).on('click', () => {
            $(dropdownMenu).hide();
            $(".dropdown-search").val(item.innerText);
            $(".dropdown-search")[0].focus();
        })
    })
}