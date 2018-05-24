let length = $('.carousel').children().length;
for(let i = 0; i < length; i++) {
    var button = document.createElement(`div`);
    button.className = `btn${i}`;
    $('.buttonWrap').append(button);
}

var first = $('.carousel').children().eq(0).clone(true)[0];
var last = $('.carousel').children().eq(length-1).clone(true)[0];

$('.carousel').append(first)
$('.carousel').prepend(last)

let current = 0;
$('.carousel').css({
	transform: 'translateX(-530px)'
});

$('.buttonWrap').on('click', 'div', function(e) {
	let button = e.currentTarget;
	let index = $(button).index();
	goToSlide(index)
})

$('#prev').on('click', function() {
	goToSlide(current - 1)
})

$('#next').on('click', function() {
	goToSlide(current + 1)
})


let timer = setInterval(()=> {
	goToSlide(current+1)
}, 2000)

$('.container').on('mouseenter', function() {
	clearInterval(timer)
}).on('mouseleave', function() {
	timer = setInterval(()=> {
		goToSlide(current+1)
	}, 2000)	
})


$(document).on('visibilitychange', function() {
	if(document.visibilityState === 'visible') {
		timer = setInterval(()=> {
			goToSlide(current+1)
		}, 2000)
	}else if(document.visibilityState === 'hidden') {
		clearInterval(timer)
	}

})






function goToSlide(index) {

	if(index > length - 1) {
		index = 0;
	}else if (index < 0) {
		index = length - 1;
	}

	if(current === length - 1 && index === 0) {
		$('.carousel').css({
			transform:`translateX(${-(length + 1) * 530}px)`
		}).one('transitionend', function() {
			$('.carousel').css({
				transform:`translateX(${-(index + 1) * 530}px)`
			}).hide().offset();
			$('.carousel').show();
		})

	}else if(current === 0 && index === length - 1) {
		$('.carousel').css({
			transform:`translateX(${0}px)`
		}).one('transitionend', function() {
			$('.carousel').css({
				transform:`translateX(${-(index + 1) * 530}px)`
			}).hide().offset();
			$('.carousel').show();
		})

	}else{
		$('.carousel').css({
			transform:`translateX(${-(index + 1) * 530}px)`
		})
	}
	current = index;
}




// let timer = setInterval(function() {

// 	$('carousel').css({
// 		transform: `translateX(${-(index * 400)}px)`
// 	})

// 	console.log('haha')
// }, 2000)