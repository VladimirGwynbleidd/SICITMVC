function CardStylesOne() {

    var cardOne = $("#cardOne").attr('class');
    var textCardOne = $("#textCardOne").attr('class');
    var cardTwo = $("#cardTwo").attr('class');
    var textCardTwo = $("#textCardTwo").attr('class');
    var cardThree = $("#cardThree").attr('class');
    var textThree = $("#textCardThree").attr('class');


    if (cardOne.includes('border-bottom-secondary')) {
        $('#cardOne').addClass('border-bottom-primary');
        $('#cardOne').removeClass('border-bottom-secondary');
        $('#cardOne').removeClass('bg-secondary text-white');

    }

    if (textCardOne.includes('text-gray-300')) {
        $('#textCardOne').addClass('text-gray-800');
        $('#textCardOne').removeClass('text-gray-300');
    }


    if (cardTwo.includes('border-bottom-success')) {
        $('#cardTwo').removeClass('border-bottom-success');
        $('#cardTwo').addClass('border-bottom-secondary');
        $('#cardTwo').addClass('bg-secondary text-white');

    }

    if (textCardTwo.includes('text-gray-800')) {
        $('#textCardTwo').removeClass('text-gray-800');
        $('#textCardTwo').addClass('text-gray-300');
    }


    if (cardThree.includes('border-bottom-info')) {
        $('#cardThree').removeClass('border-bottom-info');
        $('#cardThree').addClass('border-bottom-secondary');
        $('#cardThree').addClass('bg-secondary text-white');

    }

    if (textThree.includes('text-gray-800')) {
        $('#textCardThree').removeClass('text-gray-800');
        $('#textCardThree').addClass('text-gray-300');
    }


}

function CardStylesTwo() {

    var cardTwo = $("#cardTwo").attr('class');
    var textCardTwo = $("#textCardTwo").attr('class');
    var cardOne = $("#cardOne").attr('class');
    var textCardOne = $("#textCardOne").attr('class');
    var cardThree = $("#cardThree").attr('class');
    var textCardThree = $("#textCardThree").attr('class');



    if (cardTwo.includes('border-bottom-secondary')) {
        $('#cardTwo').addClass('border-bottom-success');
        $('#cardTwo').removeClass('border-bottom-secondary');
        $('#cardTwo').removeClass('bg-secondary text-white');

    }

    if (textCardTwo.includes('text-gray-300')) {
        $('#textCardTwo').addClass('text-gray-800');
        $('#textCardTwo').removeClass('text-gray-300');
    }


    if (cardOne.includes('border-bottom-primary')) {
        $('#cardOne').removeClass('border-bottom-primary');
        $('#cardOne').addClass('border-bottom-secondary');
        $('#cardOne').addClass('bg-secondary text-white');

    }

    if (textCardOne.includes('text-gray-800')) {
        $('#textCardOne').removeClass('text-gray-800');
        $('#textCardOne').addClass('text-gray-300');
    }

    if (cardThree.includes('border-bottom-info')) {
        $('#cardThree').removeClass('border-bottom-info');
        $('#cardThree').addClass('border-bottom-secondary');
        $('#cardThree').addClass('bg-secondary text-white');

    }

    if (textCardThree.includes('text-gray-800')) {
        $('#textCardThree').removeClass('text-gray-800');
        $('#textCardThree').addClass('text-gray-300');
    }

}

function CardStylesThree() {

    var cardTwo = $("#cardTwo").attr('class');
    var textCardTwo = $("#textCardTwo").attr('class');
    var cardOne = $("#cardOne").attr('class');
    var textCardOne = $("#textCardOne").attr('class');
    var cardThree = $("#cardThree").attr('class');
    var textCardThree = $("#textCardThree").attr('class');



    if (cardTwo.includes('border-bottom-success')) {
        $('#cardTwo').removeClass('border-bottom-success');
        $('#cardTwo').addClass('border-bottom-secondary');
        $('#cardTwo').addClass('bg-secondary text-white');

    }

    if (textCardTwo.includes('text-gray-800')) {
        $('#textCardTwo').removeClass('text-gray-800');
        $('#textCardTwo').addClass('text-gray-300');
    }


    if (cardOne.includes('border-bottom-primary')) {
        $('#cardOne').removeClass('border-bottom-primary');
        $('#cardOne').addClass('border-bottom-secondary');
        $('#cardOne').addClass('bg-secondary text-white');

    }

    if (textCardOne.includes('text-gray-800')) {
        $('#textCardOne').removeClass('text-gray-800');
        $('#textCardOne').addClass('text-gray-300');
    }

    if (cardThree.includes('border-bottom-secondary')) {
        $('#cardThree').addClass('border-bottom-info');
        $('#cardThree').removeClass('border-bottom-secondary');
        $('#cardThree').removeClass('bg-secondary text-white');

    }

    if (textCardThree.includes('text-gray-30')) {
        $('#textCardThree').addClass('text-gray-800');
        $('#textCardThree').removeClass('text-gray-300');
    }

}
