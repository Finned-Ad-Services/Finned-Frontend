function validate(chart, data, prop) {
    if (data.hasOwnProperty(prop) && data[prop].length) {
        return true;
    }

    var ctx = chart.getContext("2d");
    ctx.font = "1em Arial";
    ctx.fillStyle = "gray";
    ctx.textAlign = "center";
    ctx.fillText("No Data", chart.width/2, chart.height/2);

    return false;
}

function createSorter(elem, data) {
    for (let week in data.weeks) { elem.innerHTML += `<option value="${week}">Week ${week}</option>` }

    elem.addEventListener('change', (event) => {
        var weekStart = event.target.value;
        var weekEnd = weekStart+5;

        getRevenueByWeek(chartsList.revenueOverview, data, weekStart, weekEnd);
    });
}

/**
 * 
 * @param {Element} chart - Element pointing to Chart Canvas
 * @param {Object} data - JSON Object for the chart info from API
 * @returns Chart object
 */
function getFinalWeekRevenues(chart, data) {
    var finalWeekRevenue = (validate(chart, data, "weeks")) ? data.weeks[data.weeks.length-1].revenue : null;
    if (!finalWeekRevenue) return false
    
    // generate config from finalWeek
    var formatted = {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
            datasets: [{
                label: 'Revenue (Estimated)',
                data: finalWeekRevenue,
                fill: true,
                backgroundColor: 'rgba(56,139,253,0.2)',
                borderColor: '#1f6feb',
                tension: 0.1
        }]
    };
    var config = {type: "line", data: formatted, options: { plugins: { title: { display: true, text: "Revenues this Week (Estimated)" } }, responsive: false, maintainAspectRatio: false} }

    // generate chart
    return new Chart(
        chart,
        config
    );
}

/**
 * 
 * @param {Element} chart - Element pointing to Chart Canvas
 * @param {Object} data - JSON Object for the chart info from API
 * @returns Chart object
 */
function getRevenueByWeek(chart, data, start, end) {
    // generate Data Labels for each week the use has been active 
    // with Finned FPE.
    if (!validate(chart, data, "weeks")) return false
    
    var labels = []
    for (let i=start; i<=end; i++) labels.push(`Week ${i+1}`)

    // total each week's revenues to find weekly earnings
    // to show in overview chart.
    var revenues = []
    for (let week of data.weeks) {
        var weekTotal = 0;
        for (let item of week.revenue) {
            weekTotal += item;
        }

        revenues.push(weekTotal)
    }

    revenues = revenues.slice(start,end)
    while (revenues.length%5 != 0) revenues.push(0)

    var formatted = {
        labels: labels,
            datasets: [{
                label: 'Revenues (Estimated)',
                data: revenues,
                fill: true,
                backgroundColor: 'rgba(56,139,253,0.2)',
                borderColor: '#1f6feb',
                tension: 0.1
        }]
    };
    var config = {type: "line", data: formatted, options: { plugins: { title: { display: true, text: `Estimated Revenues Weeks ${start+1}-${end+1}` } }, responsive: true, maintainAspectRatio: false} }

    // generate chart
    return new Chart(
        chart,
        config
    );
}

/**
 * 
 * @param {Element} chart - Element pointing to Chart Canvas
 * @param {Object} data - JSON Object for the chart info from API
 * @returns Chart object
 */
function getRevenuesOverview(chart, data) {
    // generate Data Labels for each week the use has been active 
    // with Finned FPE.
    if (!validate(chart, data, "weeks")) return false
    
    var labels = []
    for (let i in data.weeks) labels.push(`Week ${i+1}`)

    // total each week's revenues to find weekly earnings
    // to show in overview chart.
    var revenues = []
    for (let week of data.weeks) {
        var weekTotal = 0;
        for (let item of week.revenue) {
            weekTotal += item;
        }

        revenues.push(weekTotal)
    }

    var formatted = {
        labels: labels,
            datasets: [{
                label: 'Revenues All Time (Estimated)',
                data: revenues,
                fill: true,
                backgroundColor: 'rgba(56,139,253,0.2)',
                borderColor: '#1f6feb',
                tension: 0.1
        }]
    };
    var config = {type: "line", data: formatted, options: { plugins: { title: { display: true, text: `Estimated Revenues` } }, responsive: true, maintainAspectRatio: false} }

    // generate chart
    return new Chart(
        chart,
        config
    );
}

/**
 * 
 * @param {Element} chart - Element pointing to the Chart Canvas
 * @param {Object} fpe_db - FPE database of users from API
 * @returns Chart Object 
 */
function getAdInteractions(chart, fpe_db) {
    if (!validate(chart, fpe_db, "ads")) return false

    var clicks = []
    var labels = []
    for (let ad of fpe_db.ads) {
        clicks.push(ad.clicks);
        labels.push(ad.name);
    }

    var formatted = {
        labels: labels,
        datasets: [{
            label: 'Clicks',
            data: clicks,
            borderWidth: 3,
            borderColor: '#1f6feb',
            backgroundColor: 'rgba(56,139,253,0.2)',
            tension: 0.1
        }]
    };
    var config = {type: "bar", data: formatted, options: { plugins: { title: { display: true, text: `User Interactions By Ad` } }, responsive: true, maintainAspectRatio: false} }

    // generate chart
    return new Chart(
        chart,
        config
    );
}

/**
 * 
 * @param {Element} chart - Element pointing to the Chart Canvas
 * @param {Object} data - Advertiser Data from API
 * @returns Chart Object 
 */
function getSpendingByAd(chart, data) {
    if (!validate(chart, data, "ads")) return false

    var labels = [];
    var sales = [];
    for (let ad of data.ads) {
        labels.push(ad.name)
        sales.push(ad.views*ad.amount);
    }

    var formatted = {
        labels: labels,
        datasets: [{
            label: 'Spending By Ad (Views*Amount)',
            data: sales,
            borderWidth: 3,
            borderColor: '#1f6feb',
            backgroundColor: 'rgba(56,139,253,0.2)',
            tension: 0.1
        }]
    };
    var config = {type: "bar", data: formatted, options: { plugins: { title: { display: true, text: "Sales By Current Ads" } }, responsive: true, maintainAspectRatio: false} }

    // generate chart
    return new Chart(
        chart,
        config
    );
}