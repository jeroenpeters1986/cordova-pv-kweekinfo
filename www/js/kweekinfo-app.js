// Initialize your app
var pvKweekApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add views
var eggcalendar_view = pvKweekApp.addView('#eggcalendar-view');
var age_view = pvKweekApp.addView('#birdies-age-view', { dynamicNavbar: true }); // Because we use fixed-through navbar we can enable dynamic navbar
var view3 = pvKweekApp.addView('#view-3');

(function () {
    if (Framework7.prototype.device.android) {
        Dom7('head').append('<link rel="stylesheet" href="css/framework7.material.min.css">');
    }
})();

// Some quite handy date prototyping
Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

Date.prototype.subtractDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() - days);
    return dat;
}

Date.prototype.toNLString = function() {
    var monthNames = ["Januari", "Februari", "Maart", "April", "Mei", "Juni",
        "Juli", "Augustus", "September", "Oktober", "November", "December"
    ];

    return [("0" + this.getDate()).slice(-2), monthNames[this.getMonth()], this.getFullYear()].join(' ');
}

/**
 * Return a list of dates between a start and stopdate
 * @param startDate
 * @param endDate
 * @returns {Array}
 */
function getDates(startDate, endDate)
{
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= endDate)
    {
        dateArray.push(currentDate)
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

/**
 *
 * @param startDate
 * @param endDate
 * @returns {number}
 */
function getDifferenceInDays(startDate, endDate) {
    return Math.round((startDate-endDate)/(1000*60*60*24));
}


var dateArray = getDates((new Date()).subtractDays(1), (new Date()).addDays(18));
var hatchdates = [];
for (i = 0; i < dateArray.length; i ++ )
{
    hatchdates.push({
        'hatch_date': dateArray[i].toNLString(),
        'lay_date': dateArray[i].subtractDays(18).toNLString(),
        'selected': dateArray[i].toNLString() == (new Date).toNLString()
    });
}


var compiledEggCalendarTemplate = Template7.compile($$('script#eggcalendar_template').html());
var egg_list = compiledEggCalendarTemplate({days: hatchdates, today: (new Date()).toNLString});
$$('#eggcalendar-list').html(egg_list);



var birdieAgeArray = getDates((new Date()).subtractDays(30), (new Date()).addDays(5));
var ageDates = [];
for (i = 0; i < birdieAgeArray.length; i ++ )
{
    ageDates.push({
        'hatch_date': birdieAgeArray[i].toNLString(),
        'age_in_days': getDifferenceInDays((new Date()), birdieAgeArray[i])
    });
}

var compiledBirdieAgeTemplate = Template7.compile($$('script#birdie_age_template').html());
var age_list = compiledBirdieAgeTemplate({ages: ageDates});
$$('#birdie-age-list').html(age_list);
