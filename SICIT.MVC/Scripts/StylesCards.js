function CardStylesOne() {

    var cardOne = $("#cardOne").attr('class');
    var textCardOne = $("#textCardOne").attr('class');
    var cardTwo = $("#cardTwo").attr('class');
    var textCardTwo = $("#textCardTwo").attr('class');
    var cardThree = $("#cardThree").attr('class');
    var textThree = $("#textCardThree").attr('class');


    if (cardOne.includes('border-bottom-light')) {
        $('#cardOne').addClass('border-bottom-primary');
        $('#cardOne').removeClass('border-bottom-light');
        $('#cardOne').removeClass('bg-light text-white');

    }

    if (textCardOne.includes('text-gray-600')) {
        $('#textCardOne').addClass('text-gray-800');
        $('#textCardOne').removeClass('text-gray-600');
    }


    if (cardTwo.includes('border-bottom-success')) {
        $('#cardTwo').removeClass('border-bottom-success');
        $('#cardTwo').addClass('border-bottom-light');
        $('#cardTwo').addClass('bg-light text-white');

    }

    if (textCardTwo.includes('text-gray-800')) {
        $('#textCardTwo').removeClass('text-gray-800');
        $('#textCardTwo').addClass('text-gray-600');
    }


    if (cardThree.includes('border-bottom-info')) {
        $('#cardThree').removeClass('border-bottom-info');
        $('#cardThree').addClass('border-bottom-light');
        $('#cardThree').addClass('bg-light text-white');

    }

    if (textThree.includes('text-gray-800')) {
        $('#textCardThree').removeClass('text-gray-800');
        $('#textCardThree').addClass('text-gray-600');
    }


}

function CardStylesTwo() {

    var cardTwo = $("#cardTwo").attr('class');
    var textCardTwo = $("#textCardTwo").attr('class');
    var cardOne = $("#cardOne").attr('class');
    var textCardOne = $("#textCardOne").attr('class');
    var cardThree = $("#cardThree").attr('class');
    var textCardThree = $("#textCardThree").attr('class');



    if (cardTwo.includes('border-bottom-light')) {
        $('#cardTwo').addClass('border-bottom-success');
        $('#cardTwo').removeClass('border-bottom-light');
        $('#cardTwo').removeClass('bg-light text-white');

    }

    if (textCardTwo.includes('text-gray-600')) {
        $('#textCardTwo').addClass('text-gray-800');
        $('#textCardTwo').removeClass('text-gray-600');
    }


    if (cardOne.includes('border-bottom-primary')) {
        $('#cardOne').removeClass('border-bottom-primary');
        $('#cardOne').addClass('border-bottom-light');
        $('#cardOne').addClass('bg-light text-white');

    }

    if (textCardOne.includes('text-gray-800')) {
        $('#textCardOne').removeClass('text-gray-800');
        $('#textCardOne').addClass('text-gray-600');
    }

    if (cardThree.includes('border-bottom-info')) {
        $('#cardThree').removeClass('border-bottom-info');
        $('#cardThree').addClass('border-bottom-light');
        $('#cardThree').addClass('bg-light text-white');

    }

    if (textCardThree.includes('text-gray-800')) {
        $('#textCardThree').removeClass('text-gray-800');
        $('#textCardThree').addClass('text-gray-600');
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
        $('#cardTwo').addClass('border-bottom-light');
        $('#cardTwo').addClass('bg-light text-white');

    }

    if (textCardTwo.includes('text-gray-800')) {
        $('#textCardTwo').removeClass('text-gray-800');
        $('#textCardTwo').addClass('text-gray-600');
    }


    if (cardOne.includes('border-bottom-primary')) {
        $('#cardOne').removeClass('border-bottom-primary');
        $('#cardOne').addClass('border-bottom-light');
        $('#cardOne').addClass('bg-light text-white');

    }

    if (textCardOne.includes('text-gray-800')) {
        $('#textCardOne').removeClass('text-gray-800');
        $('#textCardOne').addClass('text-gray-600');
    }

    if (cardThree.includes('border-bottom-light')) {
        $('#cardThree').addClass('border-bottom-info');
        $('#cardThree').removeClass('border-bottom-light');
        $('#cardThree').removeClass('bg-light text-white');

    }

    if (textCardThree.includes('text-gray-30')) {
        $('#textCardThree').addClass('text-gray-800');
        $('#textCardThree').removeClass('text-gray-600');
    }

}
