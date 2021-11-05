$(function(){
    //declare variables:
    var inputArray;
    var reading = false;
    var wordCounter;
    var action;
    var frequency = 60000/300; //default value for the reading speed
    var progress;
    //hide all elements, except text area and start button
    hideShow(arrayToHide = ["#new", "#resume", "#pause", "#controls", "#textDisplay", "#error"]);
    //click on start reading
    $("#startReading").click(function(){
        //get the text and split it to word array
        inputArray = $("#userInput").val().split(/[\n\r\s]+/);
        if(inputArray.length > 1)
        {
            reading = true;
            hideShow(["#startReading", "#error", "#userInput"], ["#controls","#new", "#pause"]);
            //set progress slider max
            $("#progressSlider").attr("max", inputArray.length - 1);
            //start word counter at 0
            wordCounter = 0;
            //show reading box with the first word
            $("#textDisplay").show();
            $("#textDisplay").text(inputArray[wordCounter]);
            action = setInterval(read, frequency);
        }
        else
        {
            $("#error").show();
        }
    });
    //click on new
    $("#new").click(function(){
        location.reload();
    });
    //click on pause
    $("#pause").click(function(){
        clearInterval(action);
        reading = false;
        $("#pause").hide();
        $("#resume").show();
    });
    //click of resume
    $("#resume").click(function(){
        action = setInterval(read, frequency);
        reading = true;
        $("#pause").show();
        $("#resume").hide();
    });
    //click of fontsize
    $("#fontsizeSlider").on("slidestop", function(event, ui){
        //refresh the slider
        $(this).slider("refresh");
        var fontsize = $(this).val();
        $("#fontsize").text(fontsize);
        $("#textDisplay").css("fontSize", parseInt(fontsize));
    });
    //click on speed
    $("#speedSlider").on("slidestop", function(event, ui){
        //refresh the slider
        $(this).slider("refresh");
        var speed = $(this).val();
        $("#speed").text(speed);
        clearInterval(action);
        frequency = 60000 / parseInt(speed);
        if(reading)
        {
            action = setInterval(read, frequency);
        }
    });
    //progress slider
    $("#progressSlider").on("slidestop", function(event, ui){
        //refresh the slider
        $(this).slider("refresh");
        wordCounter = parseInt($(this).val());
        clearInterval(action);
        progress = wordCounter / (inputArray.length - 1) * 100;
        $("#progress").text(Math.floor(progress));
        $("#textDisplay").text(inputArray[wordCounter]);
        if(reading)
        {
            action = setInterval(read, frequency);
        }
    });
    //functions
    function hideShow(arrayToHide = [], arrayToShow = [])
    {
        arrayToHide.forEach(element => {
            $(element).hide();
        });
        arrayToShow.forEach(element => {
            $(element).show();
        });
    }

    function read()
    {
        if(wordCounter == inputArray.length - 1)
        {
            clearInterval(action);
            reading = false;
            hideShow(arrayToHide = ["#pause"]);
        }
        else
        {
            wordCounter++;
            $("#textDisplay").text(inputArray[wordCounter]);
            $("#progressSlider").val(wordCounter).slider("refresh");
            progress = wordCounter / (inputArray.length - 1) * 100;
            $("#progress").text(Math.floor(progress));
        }
    }
});