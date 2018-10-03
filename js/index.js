//JS goes here
$(document).ready(function(){

	$('#start_button').click(reset_game);
	//main programme flow
	

	//initialise the game
	function reset_game(){
		
		if (document.getElementsByTagName('main')[0].style.display == 'none') {
			$('main').slideToggle();
		}

		set_cards = 0;
		dude = 0;
		number_cards = 0;
		$('#deck').html('');
		$('#playfield').html('');
		number_cards = prompt('How many cards you want to play?');
		
		if (number_cards > 10 || number_cards <= 0) {
			alert('You can only play between 1 and 10 cards, dude!');
			window.location.reload(true);
		}else{
			$('header').css('display', 'none');
			init_game(number_cards);
		}
	}		
	
	function init_game(number_cards){
		var deck = new Array();
		number_cards++;
		//populate playfield and create deck
		for (var i = 1; i < number_cards; i++) {
			$('#playfield').append('<div class="cards card_slot"><p>'+i+'</p><img src="img/ace_of_diamonds.png"></div>');
			deck.push(i);
		}
		
		//mix deck
		shuffle_array(deck);
		for (var i = 0; i < deck.length; i++) {
			$('#deck').append('<div class="cards deck_cards"><p>' + deck[i] + '</p><img src="img/ace_of_diamonds.png"></div>');
		}

		//initialize draggable and droppable
		$('.deck_cards').draggable({
			containment:$('main'),
			cursor:'move',
			revert:true,
			stack:'#playfield div'
		});
		$('.card_slot').droppable({
			accept:'.deck_cards',
			drop: handle_drop_event
		})
		
	}

	//shuffle after Durstenfeld
	function shuffle_array(array) {
		for (var i = array.length-1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i+1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}

	//handle drop event
	function handle_drop_event(event,ui){
		var slot = $(this).text();
		var deck_card = ui.draggable.text();

	  	if (slot === deck_card) {
	  		//alert( 'The correct card with number "' + deck_card + '" was dropped onto slot: ' + slot);
	  		ui.draggable.addClass('done');
	  		ui.draggable.draggable('disable');
	  		$(this).droppable('disable');
	  		ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
		    ui.draggable.draggable( 'option', 'revert', false );
		    set_cards++;
		    //ui.draggable.css('background-color', getRandomColor());
		 } else {
		 	alert('You dropped the card with number ' + deck_card + ' onto slot: ' + slot + ' ! This is wrong dude!');
		 	dude++;
		 }
		 
		 if (set_cards == number_cards) {
			$('main').slideToggle();
			$('footer').text('Wow, you did it! And you just fucked up ' + dude +' times!')
		}
	}

	function getRandomColor () {
		var hex = Math.floor(Math.random() * 0xFFFFFF);
		return ("#" + ("000000" + hex.toString(16)).substr(-6));
}
});